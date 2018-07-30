import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import '../static/libs/js/flexible';
import './sass/result.scss';
import utils from './util/util';
import { getAddDayDate } from './helper/helper';
import './helper/red';

let imgSrc = 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg';
let shareData = {
	title: '你的未来三十天什么最重要？',
	text: '点击查看未来运势，全方位了解未来吉凶。',
	image: imgSrc,
	imgUrl: imgSrc,
	url: window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1'
};

$(() => {
	$('body').removeClass('hidden');
	let params = {
		orderid: utils.getQueryValue('orderid'),
		deviceid: utils.getQueryValue('deviceid'), // eslint-disable-line
		// GLBirthday: utils.getQueryValue('GLBirthday'),
		GLBirthday: utils.getQueryValue('date') || utils.getQueryValue('glbirthday'),
		sex: utils.getQueryValue('sex'),
		name: utils.getQueryValue('name') ? utils.getQueryValue('name') : utils.getQueryValue('username')
	};
	if (utils.getQueryValue('returnname')) {
		params.name = utils.getQueryValue('returnname');
	}
	// alert(utils.getQueryValue('orderid'));
	// if (params.name.indexOf('%') > -1) {
	// 	params.name = decodeURIComponent(params.name);
	// }
	// let detaildata = JSON.parse(decodeURIComponent(utils.getQueryValue('user_info')));
	// let detaildata = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : JSON.parse(decodeURIComponent(utils.getQueryValue('user_info')));
	if (localStorage.getItem('name') === null && utils.getQueryValue('username') === null) {
		$('.lock_title_name').html('');
	}
	else {
		$('.lock_title_name').html(params.name || localStorage.getItem('name'));
	}
	// console.log(detaildata);
	// let detaildata = utils.getQueryValue('user_info') ? JSON.parse(utils.getQueryValue('user_info')) : JSON.parse(localStorage.getItem('user_info'));
	// shareData.url += '&user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
	// shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(params)) + '&username=' + params.name; // eslint-disable-line
	shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + utils.jsonToQueryString(params) + '&share=1';
	let redParam = {
		goodsId: utils.getQueryValue('goodsid'), // goodsId
		parterId: utils.getQueryValue('parterid'), // parterId
		orderId: utils.getQueryValue('orderid'), // 订单编号
		url: window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock'),
		wxShareTitle: '你的未来三十天什么最重要？', // 微信分享 title ，一般不设置。除非你自己想写别的分享内容
		wxShareText: '点击查看未来运势，全方位了解未来吉凶。', // 微信分享内容，一般不设置。除非你自己想写别的分享内容
		wxShareImage: imgSrc, // 微信分享图片，一般不设置。除非你自己想写别的分享内容
		wxShareUrl: shareData.url
	};
	// params.orderid = utils.getQueryValue('orderid1');
	redParam.wxShareUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(params)) + '&username=' + encodeURIComponent(utils.getQueryValue('name')); // eslint-disable-line
	if (/payresult=1/.test(window.location.href) && parseInt(localStorage.getItem('showred')) === 1) {
		window.shareRedPackage(redParam);
	}
	if (utils.getQueryValue('orderid1')) {
		params.orderid = utils.getQueryValue('orderid1');
		// shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
		shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + utils.jsonToQueryString(params) + '&share=1'; // eslint-disable-line
		// params.orderid = utils.getQueryValue('orderid1');
		// shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
		// shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(params)) + '&username=' + encodeURIComponent(utils.getQueryValue('name')); // eslint-disable-line
		// alert(shareData.url);
		window.wnlui.wxShare(shareData);
		window.wnlui.wnlShare.setShareData(shareData);
		// if (utils.isWeixin) {
		// 	window.wnlui.wxShare(shareData);
		// }
		// else if (utils.isWnl) {
		// 	window.wnlui.wnlShare.setShareData(shareData);
		// }
	}
	else if (utils.isWeixin) {
		window.wnlui.wxShare(shareData);
	}
	else if (utils.isWnl) {
		window.wnlui.wnlShare.setShareData(shareData);
	}
	$('.sharebtn').on('click', () => {
		// $('.wxsharemask').removeClass('hidden');
		if (utils.isWnl) {
			window.wnlShare.showSharePlatform();
		}
		else if (utils.isWeixin) {
			$('.wxsharemask').removeClass('hidden');
		}
	});
	if (utils.isIOS && window.innerWidth >= 410) {
		// console.log('6s');
		$('.lock_title_date').addClass('iosplus');
	}
	let goodsid;
	let orderid;
	let parterid;
	let pricestr;
	$.ajax({ // 获取其他测算
		url: '//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=30&type=11',
		// url: '//192.168.1.110:8988/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=30&type=11',
		type: 'GET',
		success: (res) => {
			const rel = JSON.parse(res).data;
			// console.log(rel);
			let _item = $('.csitem').find('.item');
			let _itemtext = $('.csitem').find('.itemtext');
			rel.forEach((item, index) => {
				_item.eq(index).css('background-image', 'url("' + item.img + '")').removeClass('hidden');
				_item.eq(index).attr('data-link', item.url);
				_itemtext.eq(index).html(item.title);
			});
		},
		error: () => {
			$.toast().reset('all');
			$.toast('数据出错');
		}
	});
	let csitem = $('.csitem').find('.item');
	csitem.on('click', function() { // eslint-disable-line
		// console.log($(this).attr('data-link'));
		if ($(this).attr('data-link')) {
			window.location.href = $(this).attr('data-link');
		}
	});
	function addDom(title, time, rtext, focustime, el, isABS) { // 添加节点
		let node = $('.con').eq(0).clone(true);
		node.removeClass('hidden');
		node.addClass('con_detail');
		node.find('.toptext').html(title);
		node.find('.topdate').html(time);
		node.find('.leftcenter').html(rtext);
		node.find('.leftbottom').html(focustime);
		if (!isABS) {
			node.find('.good').addClass('hidden');
			node.find('.bad').removeClass('hidden');
		}
		else {
			node.find('.good').removeClass('hidden');
			node.find('.bad').addClass('hidden');
		}
		$(`.${el}`).append(node);
	}
	let click = false;
	let smonth = '';
	let emonth = '';
	function getdetail(_orderid, did, cb) { // 获取详情
		params.orderid = _orderid;
		// if (utils.isWeixin) {

		// }
		// alert(params);
		// if (_userinfo.name.indexOf('%')) {
		// 	_userinfo.name = decodeURIComponent(_userinfo.name);
		// }
		$.ajax({
			url: `//coco70.51wnl.com/numberologyNew/chartlunar/GetOrderDetail${utils.jsonToQueryString(params)}`,
			type: 'GET',
			success: (res, status) => {
				// console.log(res);
				if (status === 'success') {
					cb(res);
				}
				else {
					$.toast().reset('all');
					$.toast('请求失败!');
				}
			},
			error: () => {
				$.toast().reset('all');
				$.toast('网络错误');
			}
		});
	}
	function addData(arr, _obj) {
		arr.forEach((item, index) => {
			if (item === 'zyjx') {
				arr.splice(index, 1);
			}
			else if (item === 'xyfx') {
				arr.splice(index, 1);
			}
			else {
				_obj[item].forEach((list) => {
					// console.log(list);
					let datespan = `${parseInt(list.timeSpan.substr(5, 7))}月${parseInt(list.timeSpan.substr(8, 10))}日-${parseInt(list.timeSpan.substr(17, 19))}月${parseInt(list.timeSpan.substr(20, 22))}日`;
					let focusdate = `重点关注：${parseInt(list.primaryDate.substr(5, 7))}月${parseInt(list.primaryDate.substr(8, 10))}日`;
					addDom(list.title, datespan, list.content, focusdate, item, list.IsABS);
				});
				let dotlen = $(`.${item}`).find('.dot').length;
				$(`.${item}`).find('.dot').eq(dotlen - 1).removeClass('mbottom');
			}
		});
	}
	let enddate;
	let monthobj;
	let monthobj1;
	let objarr;
	let objarr1;
	let _obj;
	let _obj1;
	function setData(opts) {
		if (utils.getQueryValue('score') === '1') {
			$('.synum').html(opts._sy).css('width', (0.95 * (parseInt(opts._sy) / 100)) + 'rem');
			$('.gqnum').html(opts._gq).css('width', (0.95 * (parseInt(opts._gq) / 100)) + 'rem');
			$('.cynum').html(opts._cy).css('width', (0.95 * (parseInt(opts._cy) / 100)) + 'rem');
			$('.jknum').html(opts._jk).css('width', (0.95 * (parseInt(opts._jk) / 100)) + 'rem');
		}
		else {
			$('.lock_btns').addClass('hidden');
		}
		$('.qq_text').text(`${opts._qq}`);
		$('.hq_text').text(`${opts._hq}`);
		$('.kyw_title').text(`开运物：${opts._kywtitle}`);
		$('.kyw_text').text(opts._kywtext);
		$('.xyfx_text').text(opts._xyfx);
		$('.lock_title_date').html(opts.month);
	}
	function removecon() {
		let len = $('.con_detail') ? $('.con_detail').length : 1;
		for (let i = 0; i < len; i += 1) {
			// $('.con').eq(i).remove();
			if ($('.con_detail')) {
				$('.con_detail').remove();
			}
		}
	}
	let monthclick = 1;
	localStorage.setItem('monthclick', monthclick);
	if (utils.getQueryValue('orderid1')) {
		// if (parseInt(localStorage.getItem('monthclick')) === 2) {
		// detaildata.orderid = utils.getQueryValue('orderid1');
		// // shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
		// shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&username=' + encodeURIComponent(utils.getQueryValue('username')); // eslint-disable-line
		// // console.log(JSON.parse(decodeURIComponent(getParam('user_info', shareData.url))));
		// // console.log(shareData.url);
		// if (utils.isWeixin) {
		// 	window.wnlui.wxShare(shareData);
		// }
		// else if (utils.isWnl) {
		// 	window.wnlui.wnlShare.setShareData(shareData);
		// }
		// }
		$('.nextmonth').addClass('btnbg');
		$('.lockicon').addClass('hidden');
		getdetail(utils.getQueryValue('orderid1'), params.deviceid, (res) => {
			params.orderid = utils.getQueryValue('orderid1');
			// shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
			shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + utils.jsonToQueryString(params) + '&share=1'; // eslint-disable-line
			// shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(params)) + '&username=' + encodeURIComponent(utils.getQueryValue('name')); // eslint-disable-line
			// shareData.url += '&user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
			window.wnlui.wxShare(shareData);
			window.wnlui.wnlShare.setShareData(shareData);
			if (JSON.parse(res).data) {
				JSON.parse(res).data.forEach((item) => {
					if (item.isChecked) {
						monthobj1 = item;
						localStorage.setItem('monthobj1', JSON.stringify(monthobj1));
					}
				});
			}
			objarr1 = Object.keys(monthobj1.model);
			localStorage.setItem('objarr1', JSON.stringify(objarr1));
			let obj;
			JSON.parse(res).data && JSON.parse(res).data.forEach((item) => { // eslint-disable-line
				if (item.isChecked) {
					obj = item;
				}
			});
			let _sdate = `${parseInt(obj.beginTime.split('T')[0].split('-')[1])}月${parseInt(obj.beginTime.split('T')[0].split('-')[2])}日`;
			let _edate = `${parseInt(obj.endTime.split('T')[0].split('-')[1])}月${parseInt(obj.endTime.split('T')[0].split('-')[2])}日`;
			emonth = _sdate + '-' + _edate;
			$('.lock_title_date').html(`${_sdate}-${_edate}`);
			let qq = '';
			let hq = '';
			let kywtitle;
			let kywtext;
			let syscore;
			let gqscore;
			let cyscore;
			let jkscore;
			let xyfx;
			xyfx = obj.model.xyfx.Content ? obj.model.xyfx.Content : '善心、灵修、戒除不良习惯、发觉自身潜能';
			let qqtext = '';
			let hqtext = '';
			let numqq;
			let numhq;
			obj.model.zyjx.forEach(item => { // eslint-disable-line
				if (item.title.indexOf('+') > -1) {
					qqtext = item.content;
					numqq = item.title.replace('+', '');
				}
				if (item.title.indexOf('-') > -1) {
					hqtext = item.content;
					numhq = item.title.replace('-', '');
				}
				if (item.title.indexOf('score') > -1) {
					syscore = item.content.sy;
					gqscore = item.content.gq;
					cyscore = item.content.cy;
					jkscore = item.content.jk;
				}
				if (item.title.indexOf('kyw') > -1) {
					// console.log(typeof 'ads' === 'string');
					if (typeof item.content === 'string') { // eslint-disable-line
						kywtitle = item.content;
						kywtext = '';
					}
					else {
						kywtitle = item.content.kyw;
						kywtext = item.content.js;
					}
				}
				// if (item.title.indexOf('+') > -1 && numqq === numhq) {
				// 	qq = qqtext;
				// 	hq = hqtext;
				// }
				// else if (item.title.indexOf('+') > -1 && !(numqq === numhq)) {
				// 	qq = hqtext;
				// 	hq = qqtext;
				// }
			});
			if (numqq === numhq) {
				qq = qqtext;
				hq = hqtext;
			}
			else {
				qq = hqtext;
				hq = qqtext;
			}
			_obj1 = {
				_sy: syscore,
				_gq: gqscore,
				_cy: cyscore,
				_jk: jkscore,
				_kywtitle: kywtitle,
				_kywtext: kywtext,
				_qq: qq,
				_hq: hq,
				_xyfx: xyfx,
				month: emonth,
				_emonth: emonth
			};
			// function getParam(name, url) {
			// 	if (typeof name !== 'string') return false;
			// 	if (!url) url = window.location.href;
			// 	// 当遇到name[xx]时，对括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
			// 	name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
			// 	const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
			// 	const results = regex.exec(url);
			// 	if (!results) return null;
			// 	if (!results[2]) return '';
			// 	return decodeURIComponent(results[2].replace(/\+/g, ' '));
			// }
			if (utils.getQueryValue('next')) {
				setTimeout(() => {
					$('.lock_title_date').html(`${_sdate}-${_edate}`);
					removecon();
					addData(objarr1, localStorage.getItem('monthobj1') ? JSON.parse(localStorage.getItem('monthobj1')).model : monthobj1.model);
					setData(_obj1);
				}, 600);
			}
			localStorage.setItem('qq', qq);
			localStorage.setItem('xyfx', xyfx);
		});
	}
	let payParams;
	let orderdata = {
		Birthday: params.GLBirthday || localStorage.getItem('sdate'),
		GLBirthday: params.GLBirthday || localStorage.getItem('sdate'), // 公历生日
		birthdaycity: utils.getQueryValue('bcity') || localStorage.getItem('city'),
		// Sex: utils.getQueryValue('sex') === '1' ? true : false, // eslint-disable-line
		Sex: params.sex.toString() === 'true' ? true : false, // eslint-disable-line
		// DeviceID: utils.getQueryValue('did') || 'test', // eslint-disable-line
		DeviceID: params.deviceid || 'test', // eslint-disable-line
		UserID: utils.getQueryValue('userid') !== null && utils.getQueryValue('userid') !== 'null' ? utils.getQueryValue('userid') : '', // eslint-disable-line
		Channel: utils.getQueryValue('channel') || 'ios', // eslint-disable-line
		Long: utils.getQueryValue('long') || localStorage.getItem('long'),
		Lat: utils.getQueryValue('lat') || localStorage.getItem('lat')
	};
	let ajaxData = {
		Name: params.name || localStorage.getItem('name') || '星盘月运',
		BeginTime: getAddDayDate(30).join('-'),
		// BeginTime: '2018-4-20',
		Birthday: orderdata.Birthday,
		GLBirthday: orderdata.GLBirthday, // 公历生日
		CalendarType: 0,
		HomePageUrl: window.location.href,
		DetailsUrl: `${((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://')}${window.location.host + window.location.pathname}?lat=${orderdata.Lat}&long=${orderdata.Long}&channel=${orderdata.Channel}&deviceid=${orderdata.DeviceID}&bcity=${orderdata.birthdaycity}&date=${orderdata.Birthday}&username=${params.name || localStorage.getItem('name')}&sex=${orderdata.Sex}&GLBirthday=${params.GLBirthday || localStorage.getItem('sdate') || utils.getQueryValue('bdate')}&deviceid=${params.deviceid || 'test'}&orderid=${utils.getQueryValue('orderid')}&orderid1=[ORDERID]&parterid=[PARTERID]&goodsid=[GOODSID]&price=[PRICE]`, // eslint-disable-line
		// DetailsUrl: `//${window.location.host}/lock.html?did=${utils.getQueryValue('deviceId') || deviceId}`, // eslint-disable-line
		birthdaycity: orderdata.birthdaycity,
		// Sex: utils.getQueryValue('sex') ? parseInt(utils.getQueryValue('sex')) : 1,
		Sex: orderdata.Sex,
		ordername: '星盘月运',
		ClientType: utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android',
		// DeviceID: deviceId || 'test', // eslint-disable-line
		DeviceID: orderdata.DeviceID, // eslint-disable-line
		UserID: orderdata.UserID, // eslint-disable-line
		Channel: orderdata.Channel, // eslint-disable-line
		Long: orderdata.Long,
		Lat: orderdata.Lat,
		BirthTimeHour: '12:00',
		// posid: (utils.getQueryValue('posid') !== null && utils.getQueryValue('posid') !== 'null') ? utils.getQueryValue('posid') : '',
		// GoodsID: '2341DFE9D0A64DE49D1FFE5534A893DC'
		GoodsID: '601EF79371314038931FA1E708637DD6'
	};
	if (utils.getQueryValue('posid') !== null && utils.getQueryValue('posid') !== 'null' && utils.getQueryValue('posid').toString().length > 0) {
		ajaxData.posid = utils.getQueryValue('posid');
	}
	getdetail(utils.getQueryValue('orderid'), params.deviceid, (res) => {
		if (JSON.parse(res).data) {
			JSON.parse(res).data.forEach((item) => {
				if (item.isChecked) {
					monthobj = item;
					localStorage.setItem('monthobj', JSON.stringify(monthobj));
				}
			});
		}
		objarr = Object.keys(monthobj.model);
		localStorage.setItem('monthobj', JSON.stringify(monthobj));
		addData(objarr, monthobj.model);
		let _sdate = `${parseInt(monthobj.beginTime.split('T')[0].split('-')[1])}月${parseInt(monthobj.beginTime.split('T')[0].split('-')[2])}日`;
		let _edate = `${parseInt(monthobj.endTime.split('T')[0].split('-')[1])}月${parseInt(monthobj.endTime.split('T')[0].split('-')[2])}日`;
		let _nextsdate;
		let _nextedate;
		if (new Date().getTime() < new Date(monthobj.endTime.split('T')[0]).getTime()) {
			_nextsdate = `${getAddDayDate(1, monthobj.endTime.split('T')[0])[1]}月${getAddDayDate(1, monthobj.endTime.split('T')[0])[2]}日`;
			_nextedate = `${getAddDayDate(30, monthobj.endTime.split('T')[0])[1]}月${getAddDayDate(30, monthobj.endTime.split('T')[0])[2]}日`;
			enddate = getAddDayDate(1, monthobj.endTime.split('T')[0]).join('-');
		}
		else {
			_nextsdate = `${getAddDayDate()[1]}月${getAddDayDate()[2]}日`;
			_nextedate = `${getAddDayDate(29)[1]}月${getAddDayDate(29)[2]}日`;
			enddate = getAddDayDate().join('-');
		}
		ajaxData.beginTime = enddate;
		console.log(enddate);
		// let nextmonthdate = `${getAddDayDate(0, enddate).split('-')[1]}月${getAddDayDate(0, enddate).split('-')[2]}日-${getAddDayDate(29, enddate).split('-')[1]}月${getAddDayDate(29, enddate).split('-')[2]}日`;
		// 设置底部购买月份数据
		$('.monthdate').html(`${_sdate}-${_edate}`);
		$('.nextmonthdate, .paymask_text').html(`${_nextsdate}-${_nextedate}`);
		click = true;
		let obj;
		JSON.parse(res).data && JSON.parse(res).data.forEach((item) => { // eslint-disable-line
			if (item.isChecked) {
				obj = item;
			}
		});
		smonth = _sdate + '-' + _edate;
		let qq = '';
		let hq = '';
		let kywtitle;
		let kywtext;
		let syscore;
		let gqscore;
		let cyscore;
		let jkscore;
		let xyfx;
		xyfx = obj.model.xyfx.Content ? obj.model.xyfx.Content : '善心、灵修、戒除不良习惯、发觉自身潜能';
		let qqtext = '';
		let hqtext = '';
		let numqq;
		let numhq;
		obj.model.zyjx.forEach(item => { // eslint-disable-line
			if (item.title.indexOf('+') > -1) {
				qqtext = item.content;
				numqq = item.title.replace('+', '');
			}
			if (item.title.indexOf('-') > -1) {
				hqtext = item.content;
				numhq = item.title.replace('-', '');
			}
			if (item.title.indexOf('score') > -1) {
				syscore = item.content.sy;
				gqscore = item.content.gq;
				cyscore = item.content.cy;
				jkscore = item.content.jk;
			}
			if (item.title.indexOf('kyw') > -1) {
				// console.log(typeof 'ads' === 'string');
				if (typeof item.content === 'string') { // eslint-disable-line
					kywtitle = item.content;
					kywtext = '';
				}
				else {
					kywtitle = item.content.kyw;
					kywtext = item.content.js;
				}
			}
			// if (item.title.indexOf('+') > -1 && numqq === numhq) {
			// 	qq = qqtext;
			// 	hq = hqtext;
			// }
			// else if (item.title.indexOf('+') > -1 && !(numqq === numhq)) {
			// 	// console.log(item);
			// 	console.log(numqq === numhq);
			// 	qq = hqtext;
			// 	hq = qqtext;
			// 	console.log(hqtext);
			// }
			// console.log(qq);
		});
		if (numqq === numhq) {
			qq = qqtext;
			hq = hqtext;
		}
		else {
			qq = hqtext;
			hq = qqtext;
		}
		_obj = {
			_sy: syscore,
			_gq: gqscore,
			_cy: cyscore,
			_jk: jkscore,
			_kywtitle: kywtitle,
			_kywtext: kywtext,
			_qq: qq,
			_hq: hq,
			_xyfx: xyfx,
			month: smonth
		};
		if (!utils.getQueryValue('next')) {
			$('.lock_title_date').html(`${_sdate}-${_edate}`);
			$('.xyfx_text').text(xyfx);
			removecon();
			addData(objarr, localStorage.getItem('monthobj') ? JSON.parse(localStorage.getItem('monthobj')).model : monthobj.model);
			setData(_obj);
			console.log(_obj);
		}
		localStorage.setItem('qq', qq);
		localStorage.setItem('xyfx', xyfx);
	});
	$('.month').on('click', () => {
		// localStorage.setItem('click', '1');
		monthclick = 1;
		localStorage.setItem('monthclick', monthclick);
		params.orderid = utils.getQueryValue('orderid1');
		// shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
		shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + utils.jsonToQueryString(params) + '&share=1'; // eslint-disable-line
		// params.orderid = utils.getQueryValue('orderid');
		// shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + '?share=1&user_info=' + encodeURIComponent(JSON.stringify(params)) + '&username=' + encodeURIComponent(utils.getQueryValue('name')); // eslint-disable-line
		// shareData.url += '&user_info=' + encodeURIComponent(JSON.stringify(detaildata)) + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
		window.wnlui.wxShare(shareData);
		window.wnlui.wnlShare.setShareData(shareData);
		// if (utils.isWeixin) {
		// 	window.wnlui.wxShare(shareData);
		// }
		// else if (utils.isWnl) {
		// 	window.wnlui.wnlShare.setShareData(shareData);
		// }
		if (click) {
			removecon();
			addData(objarr, JSON.parse(localStorage.getItem('monthobj')).model || monthobj.model);
			setData(_obj);
		}
	});
	$('.nextmonth').on('click', () => {
		monthclick = 2;
		localStorage.setItem('monthclick', monthclick);
		if (click) {
			if (utils.getQueryValue('orderid1')) {
				removecon();
				addData(objarr1, JSON.parse(localStorage.getItem('monthobj1')).model || monthobj1.model);
				setData(_obj1);
				params.orderid = utils.getQueryValue('orderid1');
				// shareData.url += '&nextmonthobj=' + nextmonthobj + '&username=' + encodeURIComponent(utils.getQueryValue('username'));
				shareData.url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('result', 'lock') + utils.jsonToQueryString(params) + '&share=1'; // eslint-disable-line
				window.wnlui.wxShare(shareData);
				window.wnlui.wnlShare.setShareData(shareData);
				// if (utils.isWeixin) {
				// 	window.wnlui.wxShare(shareData);
				// }
				// else if (utils.isWnl) {
				// 	window.wnlui.wnlShare.setShareData(shareData);
				// }
			}
			else {
				$.toast().reset('all');
				$.toast({
					text: '加载中...',
					hideAfter: true
				});
				$.ajax({
					// url: 'http://192.168.1.178:3000/mock/14/ChartLunar/CreateOrder',
					url: '//coco70.51wnl.com/numberologyNew/ChartLunar/CreateOrder',
					type: 'POST',
					contentType: 'application/x-www-form-urlencoded',
					data: ajaxData,
					success: (res) => {
						// console.log(JSON.parse(res), '返回数据');
						let resdata = JSON.parse(res).data;
						if (JSON.parse(res).status === 0) {
							goodsid = resdata.goodsID;
							orderid = resdata.orderID;
							parterid = resdata.parterID;
							pricestr = parseFloat(resdata.price);
							// console.log(orderid, 'orderid');
							localStorage.setItem('parterid', `${utils.getQueryValue('parterid')}`);
							localStorage.setItem('goodsid', goodsid || utils.getQueryValue('goodsid'));
							localStorage.setItem('parteruserid', params.deviceid || ''); // eslint-disable-line
							localStorage.setItem('data', orderid || utils.getQueryValue('orderid'));
							localStorage.setItem('money', pricestr || utils.getQueryValue('pricestr'));
							payParams = {
								money: localStorage.getItem('money') || utils.getQueryValue('pricestr'),
								source: '星盘月运', // 用于支付的项目(如：‘星盘月运’)
								parterid: `${('wnl_mall_' + parterid) || utils.getQueryValue('parterid') || 'wnl_mall_wnlzx'}`, // eslint-disable-line
								// goodsid: localStorage.getItem('goodsid') || utils.getQueryValue('goodsid'), // eslint-disable-line
								goodsid: goodsid || utils.getQueryValue('goodsid'), // eslint-disable-line
								parteruserid:  localStorage.getItem('parteruserid') || params.deviceid, // eslint-disable-line
								// data: localStorage.getItem('data') || utils.getQueryValue('orderid1'), // 订单编号
								data: orderid, // 订单编号
								// posId: posId === null || posId === undefined ? '' : posId, // eslint-disable-line
								posId: utils.getQueryValue('posid') || '', // eslint-disable-line
								couponId: utils.getQueryValue('couponId') || '', // eslint-disable-line
								channel: orderdata.Channel,
								// imei: imei === null || imei === undefined ? '' : imei, // eslint-disable-line
								// channel: channel === null || channel === undefined ? '' : channel, // eslint-disable-line
								// returnUrl: `${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname}?long=${utils.getQueryValue('long') || ''}&lat=${utils.getQueryValue('lat') || ''}&bcity=${utils.getQueryValue('bcity') || ''}&couponid=${utils.getQueryValue('couponId') || ''}&pricestr=${utils.getQueryValue('pricestr')}&orderid=${utils.getQueryValue('orderid') || localStorage.getItem('data')}&parterid=${utils.getQueryValue('parterid') || 'wnlzx'}&goodsid=${utils.getQueryValue('goodsid') || localStorage.getItem('goodsid')}&did=${utils.getQueryValue('did') || localStorage.getItem('parteruserid')}&channel=${utils.getQueryValue('channel') || ''}`, // eslint-disable-line
								// failUrl: `${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname}?parterid=${utils.getQueryValue('parterid') || 'wnlzx'}&goodsid=${utils.getQueryValue('goodsid')}&did=${utils.getQueryValue('did') || deviceId}&orderid=${localStorage.getItem('data') || utils.getQueryValue('orderid')}&pricestr=${localStorage.getItem('money') || utils.getQueryValue('pricestr')}&couponid=${utils.getQueryValue('couponId') || ''}`, // eslint-disable-line
								// returnUrl: `${window.location.href}&next=1&orderid1=${orderid}`,
								failUrl: `${window.location.href}`
							};
							// alert(payParams.returnUrl);
							if (utils.isWeixin) {
								payParams.openid = localStorage.getItem('openid') || ''; // eslint-disable-line
							}
							$.toast().reset('all');
							$('.paymask').removeClass('hidden');
						}
						else {
							$.toast().reset('all');
							$.toast('订单创建失败');
						}
					},
					error: () => {
						$.toast().reset('all');
						$.toast('数据出错');
					},
					complete: () => {
						$.toast().reset('all');
					}
				});
			}
		}
	});
	const support = $('.like');
	const oppose = $('.unlike');
	let chooseNum;
	let _choose;
	support.on('click', () => { // 喜欢
		support.addClass('active');
		oppose.removeClass('active');
		chooseNum = 5;
		_choose = 'satisfied';
		_czc.push(['_trackEvent', _choose, 'click']);
	});
	oppose.on('click', () => { // 一般
		oppose.addClass('active');
		support.removeClass('active');
		chooseNum = 5;
		_choose = 'unsatisfied';
		_czc.push(['_trackEvent', _choose, 'click']);
	});
	$('#info').on('input', (e) => { // 150字限制
		let val = e.target.value;
		if (val.length > 150) {
			$.toast().reset('all');
			$.toast('只能150字以内！');
			$('#info').val(val.trim().substr(0, 150));
		}
	});
	$('.sub').on('click', () => { // 提交反馈
		let backdata = {
			DataContent: $('#info').val(),
			Score: chooseNum,
			BirthdayCity: utils.getQueryValue('bcity') || '',
			OrderID: utils.getQueryValue('orderid') || '',
			UserID: utils.getQueryValue('userid') || '',
			Long: utils.getQueryValue('long') || '',
			Lat: utils.getQueryValue('lat') || '',
			Channel: utils.getQueryValue('channel') || '',
			PToken: utils.getQueryValue('pToken') || '',
			Token: utils.getQueryValue('pushToken') || '',
			DeviceID: utils.getQueryValue('deviceid') || '',
			Idfa: utils.getQueryValue('idfa') || '',
			DeviceMac: utils.getQueryValue('mac') || '',
			ImeiNumber: utils.getQueryValue('imei') || '',
			BoundId: utils.getQueryValue('boundId') || '',
			SysVersion: utils.isIOS ? utils.iOSVersion : utils.androidVersion,
			AppVersion: utils.appVersionString,
			ClientType: utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android',
			datatype: 1
		};
		if (utils.isWeixin) {
			backdata.Channel = '';
		}
		// console.log(backdata);
		if (chooseNum && $('#info').val().trim()) {
			$.ajax({
				// url: 'http://192.168.1.178:3000/mock/14/ChartLunar/Feedback',
				url: '//coco70.51wnl.com/numberologyNew/ChartLunar/Feedback',
				ContentType: 'application/x-www-form-urlencoded',
				type: 'POST',
				data: backdata,
				success: (res) => {
					// console.log(res);
					if (JSON.parse(res).data) {
						$.toast().reset('all');
						$.toast('提交成功');
						$('#info').get(0).value = '';
						support.removeClass('active');
						oppose.removeClass('active');
						chooseNum = null;
						_czc.push(['_trackEvent', _choose, 'click']);
					}
					else {
						$.toast().reset('all');
						$.toast('提交失败');
					}
				},
				error: () => {
					$.toast().reset('all');
					$.toast('提交失败');
				}
			});
		}
		else if (!$('#info').val().trim()) {
			$.toast().reset('all');
			$.toast('请输入内容');
		}
		else {
			$.toast().reset('all');
			$.toast('请选择态度');
		}
	});
	$('.paymask_mask').on('click', () => {
		$('.paymask').addClass('hidden');
	});
	$('.paymask_mask').on('touchmove', (e) => {
		e.preventDefault();
	});
	$('.paymask_btn').on('click', () => {
		$('.paymask').addClass('hidden');
		window.location.href = `http://order.51wnl.com/pay_web/index_t.html${utils.jsonToQueryString(payParams)}&returnUrl=${encodeURIComponent(`${window.location.href}&next=1&orderid1=${orderid}&returnname=${params.name}`)}`; // eslint-disable-line
	});
	let h = window.innerHeight;
	if (utils.isAndroid) {
		$(window).on('resize', () => {
			if (window.innerHeight < h) {
				$('.fixbtn').addClass('az');
			}
			else {
				$('.fixbtn').removeClass('az');
			}
		});
	}
	$('.wxsharemask').on('click', () => {
		$('.wxsharemask').addClass('hidden');
	});
	$('.wxsharemask, .paymask_detail').on('touchmove', (e) => {
		e.preventDefault();
	});
});
