import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import './sass/add.scss';
import utils from './util/util';
import getSelectTime from './helper/getselecttime';

const ajaxUrl = {
	dev: {
		add: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder?tag=add'
	},
	pro: {
		add: '//coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=add'
	}
};
let shareData = {
	title: '生命灵数',
	text: '超准的运势，快来看看你的吧',
	image: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	url: `${window.location.protocol}//${window.location.host + window.location.pathname.replace('add', 'index')}`
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
	let deviceid = utils.getQueryValue('deviceid');
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	const PARTERID = 'wnl';
	const APPVERSION = '1.0.0';
	const CHANNEL = utils.isIOS ? 'iOS' : 'Android';
	let clientype = utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android';
	$('#birthinput_text').on('focus', function () { // eslint-disable-line
		$(this).removeClass('active');
	});
	$('.birthinput').on('click', () => {
		$('.tip').addClass('slide');
		new wnlui.datePicker({ // eslint-disable-line
			showLunar: true,
			// defaultValue: [1990, 1, 1],
			onChange: (result) => {
				console.log(result);
			},
			onConfirm: (result) => {
				// console.log(result);
				if (result.isSolar) { // 公历日期
					let dateobj = result.dateObj;
					let dateStr = `${dateobj.cYear}.${utils.formatNumber(dateobj.cMonth)}.${utils.formatNumber(dateobj.cDay)}`;
					// console.log(dateStr);
					$('.birthinput_text').html(dateStr);
				}
				else { // 农历日期
					let dateobj = result.dateObj;
					// let dateStr = `${dateobj.cYear}-${dateobj.cMonth}-${dateobj.cDay}`;
					let dateStr = `${dateobj.cYear}.${utils.formatNumber(dateobj.cMonth)}.${utils.formatNumber(dateobj.cDay)}`;
					// console.log(dateStr);
					$('.birthinput_text').html(dateStr);
				}
				$('.birthinput_text').removeClass('active');
			},
			onCancel: () => {
				$('.tip').removeClass('slide');
			}
		});
	});
	addBtnState('.comfirm', $('.addactive')); // 按钮点击态
	// 点击确定
	$('.comfirm').on('click', () => {
		let namelen = $('#name').val().trim().length;
		let birthlen = $('.birthinput_text').text().indexOf('.') > -1 ? 1 : 0;
		let birth = $('.birthinput_text').text();
		// console.log(namelen);
		// console.log(birthlen);
		let ajaxData = {
			Name: encodeURIComponent($('#name').val().trim()),
			CalendarType: 1,
			userID: '',
			DeviceID: deviceid || 'test',
			ParterID: PARTERID,
			ClientType: clientype,
			Channel: CHANNEL,
			APPVersion: APPVERSION,
			GoodsID: '775F426CC9C245E4AEDF4DCFF68E817C',
			Birthday: $('.birthinput_text').text().split('.').join('-'),
			GLBirthDay: $('.birthinput_text').text().split('.').join('-'),
			img: 1
		};
		if (utils.getQueryValue('userlen') <= 0) {
			ajaxData.img = 1;
		}
		else {
			ajaxData.img = 0;
		}
		if (namelen <= 0 || birthlen <= 0) {
			$.toast().reset('all');
			$.toast('请输入完整信息');
		}
		else if (getSelectTime(birth.split('.')[0], birth.split('.')[1], birth.split('.')[2]) > new Date().getTime()) {
			$.toast().reset('all');
			$.toast('请选择正确的出生日期');
		}
		else {
			$.toast().reset('all');
			$.toast('信息提交中...');
			$.ajax({
				url: ajaxUrl.pro.add,
				method: 'post',
				ContentType: 'application/json',
				data: ajaxData,
				success: (res) => {
					console.log(res);
					if (JSON.parse(res).status === 0) {
						$.toast().reset('all');
						$.toast('添加成功');
						window.location.href = `./index.html?name=${$('#name').val()}&birth=${ajaxData.GLBirthDay}&orderid=${JSON.parse(res).data.data.orderID}&add=1`;
					}
					else {
						$.toast().reset('all');
						$.toast('添加失败');
					}
				},
				error: () => {
					$.toast().reset('all');
					$.toast('数据出错');
				}
			});
		}
	});
});