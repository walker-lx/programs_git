import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import './sass/userlist.scss';
import utils from './util/util';

const ajaxUrl = {
	dev: {
		getOrderList: 'http://192.168.1.178:3000/mock/14/LifeNum/GetOrderList'
	},
	pro: {
		getOrderList: '//coco70.51wnl.com/numberologynew/LifeNum/GetOrderList',
		del: '//coco70.51wnl.com/numberologynew/LifeNum/Del',
		update: '//coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=edit'
	}
};
let userlen;
let shareData = {
	title: '生命灵数',
	text: '超准的运势，快来看看你的吧',
	image: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	url: `${window.location.protocol}//${window.location.host + window.location.pathname.replace('userlist', 'index')}`
};
function addBtnState(dom, el) {
	let move;
	$(document).on('touchend touchstart touchmove touchcancel', dom, function(e) { // eslint-disable-line
		// if (!$(this).hasClass('active')) {
		// 	return;
		// }
		if (e.type === 'touchstart') {
			move = null;
			el.removeClass('hidden');
		}
		else if (e.type === 'touchmove') {
			if (move) return;
			move = true;
			el.addClass('hidden');
		}
		else {
			if (move) return;
			el.addClass('hidden');
		}
	});
}

$(() => {
	let deviceid = (utils.getQueryValue('deviceid') !== 'null' && utils.getQueryValue('deviceid').length > 0) ? utils.getQueryValue('deviceid') : 'test';
	addBtnState('.comfirm', $('.addactive'));
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	const PARTERID = 'wnl';
	const APPVERSION = '1.0.0';
	const CHANNEL = utils.isIOS ? 'iOS' : 'Android';
	let clientype = utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android';
	let _item = $('.item');
	for (let i = 1; i <= _item.length; i += 1) {
		$('.item').eq(i).remove();
	}
	function addDom(name, birth, orderid, id) {
		let dom = $('.item').eq(0).clone(true);
		dom.removeClass('hidden');
		dom.data('id', id);
		dom.find('.item_top').attr('data-name', name);
		dom.find('.item_top').attr('data-birth', birth);
		dom.find('.item_top').attr('data-orderid', orderid);
		dom.find('.item_top').attr('data-id', id);
		dom.find('.item_top_name').html(name.length > 4 ? name.slice(0, 4) + '...' : name);
		dom.find('.item_top_birth').html(birth);
		dom.find('.bj').attr('data-name', name);
		dom.find('.bj').attr('data-birth', birth);
		dom.find('.bj').attr('data-orderid', orderid);
		dom.find('.sc').attr('data-orderid', orderid);
		// console.log(dom.find('.item_top').data('name'));
		dom.appendTo($('.userlist'));
	}
	// addDom('asd', 'rt', 34);
	function getlist() {
		let _data = {
			DeviceID: deviceid || 'test'
		};
		// console.log(_data);
		$.ajax({
			url: ajaxUrl.pro.getOrderList,
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(_data),
			success: (res) => {
				console.log(JSON.parse(res));
				if (JSON.parse(res).status === 0) {
					let rel = JSON.parse(res).data;
					if (rel.length > 0) {
						userlen = rel.length;
						rel.forEach((item) => {
							addDom(item.name, item.birthday, item.orderID, item.id);
						});
					}
					else {
						userlen = 0;
						$('.nouser').removeClass('hidden');
						$('.userlist').addClass('hidden');
					}
					// console.log(userlen);
				}
				else {
					$.toast().reset('all');
					$.toast('数据请求失败');
				}
			},
			error: () => {
				$.toast().reset('all');
				$.toast('数据出错');
			}
		});
	}
	getlist();
	// 返回
	$('.item_top').on('click', function () { // eslint-disable-line
		$('.item').removeClass('actborder');
		$(this).parent().addClass('actborder');
		window.location.href = `./index.html?name=${$(this).attr('data-name')}&birth=${$(this).attr('data-birth')}&orderid=${$(this).attr('data-orderid')}`;
	});
	// 删除
	$('.sc').on('click', function () { // eslint-disable-line
		// console.log($('.sc').eq(2).attr('data-orderid'));
		let list = $('.sc');
		$('.modal').removeClass('hidden');
		for (let i = 0; i < list.length; i += 1) {
			if (list.eq(i).attr('data-orderid') === $(this).attr('data-orderid')) {
				// let name = $(this).attr('data-name');
				// let birth = $(this).attr('data-birth');
				let orderid = $(this).attr('data-orderid');
				$('.qd').attr('data-orderid', orderid);
				break;
			}
		}
	});
	$('.qd').on('click', function () { // eslint-disable-line
		$('.modal').addClass('hidden');
		// $.toast().reset('all');
		// $.toast('');
		let orderid = $(this).attr('data-orderid');
		let ajaxData = {
			userID: '',
			DeviceID: deviceid || 'test',
			orderID: orderid || ''
		};
		$.ajax({
			url: ajaxUrl.pro.del,
			type: 'post',
			ContentType: 'application/json',
			data: ajaxData,
			success: (res) => {
				// console.log(JSON.parse(res));
				if (JSON.parse(res).status === 0) {
					// if (JSON.parse(res).status !== 0) {
					// 	$.toast().reset('all');
					// 	$.toast(res.data.msg);
					// }
					// else {
					// window.location.href = `./edit.html?name=${name}&birth=${birth}&orderid=${orderid}`;
					// }
					$.toast().reset('all');
					$.toast('删除成功');
					let list = $('.item');
					for (let i = 1; i < list.length; i += 1) {
						list.eq(i).remove();
					}
					getlist();
					// $('.modal').removeClass('hidden');
				}
				else {
					$.toast().reset('all');
					$.toast(JSON.parse(res).msg);
				}
			},
			error: () => {
				$.toast().reset('all');
				$.toast('请求出错');
			}
		});
		// window.location.reload();
	});
	$('.qx').on('click', () => { // 关闭对话框弹窗
		$('.modal').addClass('hidden');
	});
	$('.mask').on('touchmove', (e) => { // 关闭对话框弹窗
		e.preventDefault();
	});
	// 编辑
	$('.bj').on('click', function () { // eslint-disable-line
		let name = $(this).attr('data-name');
		let birth = $(this).attr('data-birth');
		let orderid = $(this).attr('data-orderid');
		let ajaxData = {
			Name: encodeURIComponent(name),
			CalendarType: 1,
			userID: '',
			DeviceID: deviceid || 'test',
			ParterID: PARTERID,
			ClientType: clientype,
			Channel: CHANNEL,
			APPVersion: APPVERSION,
			GoodsID: '775F426CC9C245E4AEDF4DCFF68E817C',
			Birthday: birth.split('.').join('-'),
			GLBirthDay: birth.split('.').join('-'),
			orderID: orderid || ''
		};
		$.ajax({
			url: ajaxUrl.pro.update,
			type: 'post',
			ContentType: 'application/json',
			data: ajaxData,
			success: (res) => {
				// console.log(JSON.parse(res));
				if (JSON.parse(res).status === 0) {
					// if (JSON.parse(res).status !== 0) {
					// 	$.toast().reset('all');
					// 	$.toast(res.data.msg);
					// }
					// else {
					window.location.href = `./edit.html?name=${name}&birth=${birth}&orderid=${orderid}&deviceid=${deviceid}`;
					// }
				}
				else {
					$.toast().reset('all');
					$.toast(JSON.parse(res).msg);
				}
			},
			error: () => {
				$.toast().reset('all');
				$.toast('请求出错');
			}
		});
		// window.location.href = './edit.html';
	});
	$('.comfirm').on('click', () => {
		if (userlen >= 10) {
			$.toast().reset('all');
			$.toast('最多添加10个用户哦~');
		}
		else {
			window.location.href = './add.html?userlen=' + userlen + '&deviceid=' + deviceid;
		}
	});
});