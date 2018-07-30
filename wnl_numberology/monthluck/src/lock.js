import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/js/flexible';
import './sass/lock.scss';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import utils from './util/util';

let shareData = {
	title: '你的未来三十天什么最重要？',
	text: '点击查看未来运势，全方位了解未来吉凶。',
	image: 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg',
	imgUrl: 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg',
	url: window.location.protocol + '//' + window.location.host + window.location.pathname
};

$(() => {
	$('body').removeClass('hidden');
	let hasscore = 1;
	// let succdetail = utils.getQueryValue('user_info');
	// let detaildata = utils.getQueryValue('user_info') ? JSON.parse(decodeURIComponent(utils.getQueryValue('user_info'))) : JSON.parse(localStorage.getItem('user_info'));
	let params = {
		// orderid: detaildata.orderid,
		// deviceid: detaildata.deviceid, // eslint-disable-line
		// GLBirthday: detaildata.GLBirthday,
		// sex: detaildata.sex,
		// name: detaildata.name
		orderid: utils.getQueryValue('orderid'),
		deviceid: utils.getQueryValue('deviceid'), // eslint-disable-line
		GLBirthday: utils.getQueryValue('date') ? utils.getQueryValue('date') : utils.getQueryValue('GLBirthday'),
		sex: utils.getQueryValue('sex'),
		name: utils.getQueryValue('name') ? utils.getQueryValue('name') : utils.getQueryValue('username')
	};
	// if (detaildata.name.indexOf('%') > -1) {
	// 	detaildata.name = decodeURIComponent(detaildata.name);
	// 	params.name = decodeURIComponent(params.name);
	// }
	// console.log(params);
	if (utils.getQueryValue('username') === null || utils.getQueryValue('username') === 'null') {
		// $('.lock_title_name').html(localStorage.getItem('name'));
		if (params.name) {
			$('.lock_title_name').html(params.name);
		}
		else {
			$('.lock_title_name').html('');
		}
	}
	else {
		$('.lock_title_name').html(params.name || decodeURIComponent(utils.getQueryValue('username')) || localStorage.getItem('name'));
	}
	// shareData.url += '?user_info=' + JSON.stringify(params) + '&share=1&username=' + encodeURIComponent(params.name);
	shareData.url += utils.jsonToQueryString(params) + '&share=1';
	// alert(JSON.stringify(params));
	// alert(window.location.href);
	// alert(shareData.url);
	let qq = '';
	let hq = '';
	let kywtitle;
	let kywtext;
	let syscore;
	let gqscore;
	let cyscore;
	let jkscore;
	let _sytip;
	let _gqtip;
	let _cytip;
	let _jktip;
	let _cxtip;
	let _rjgxtip;
	let xyfx;
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	if (utils.getQueryValue('share')) {
		$('.payitem, .shareicon').addClass('hidden');
		$('.toindex').removeClass('hidden');
	}
	let ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('huaweieva') > -1) {
		$('.btnprogress').addClass('huawei');
	}
	if (utils.isIOS && window.innerWidth >= 410) {
		// console.log('6s');
		$('.lock_title_date').addClass('iosplus');
	}
	// let _detaildata = {
	// 	// orderid: utils.getQueryValue('orderid'),
	// 	deviceid: detaildata.deviceid, // eslint-disable-line
	// 	GLBirthday: detaildata.GLBirthday,
	// 	sex: detaildata.sex,
	// 	name: detaildata.name
	// };
	let qqtext = '';
	let hqtext = '';
	let numqq;
	let numhq;
	$.ajax({
		url: `//coco70.51wnl.com/numberologyNew/chartlunar/GetOrderDetail${utils.jsonToQueryString(params)}`, // eslint-disable-line
		// url: `//coco70.51wnl.com/numberologyNew/chartlunar/GetOrderDetail?orderid=${orderid}&deviceid=${deviceId || 'test'}`, // eslint-disable-line
		type: 'GET',
		success: (_res, status) => {
			// console.log(_res, '_res');
			if (status === 'success') {
				let obj;
				JSON.parse(_res).data && JSON.parse(_res).data.forEach((item) => { // eslint-disable-line
					if (item.isChecked) {
						obj = item;
					}
				});
				let _sdate = `${parseInt(obj.beginTime.split('T')[0].split('-')[1])}月${parseInt(obj.beginTime.split('T')[0].split('-')[2])}日`;
				let _edate = `${parseInt(obj.endTime.split('T')[0].split('-')[1])}月${parseInt(obj.endTime.split('T')[0].split('-')[2])}日`;
				_sytip = obj.model.gz[0].title;
				_gqtip = obj.model.ds[0].title;
				_cytip = obj.model.cy[0].title;
				_jktip = obj.model.jk[0].title;
				_cxtip = obj.model.cx[0].title;
				_rjgxtip = obj.model.rjgx[0].title;
				xyfx = obj.model.xyfx.Content ? obj.model.xyfx.Content : '许愿方向：善心、灵修、戒除不良习惯、发觉自身潜能';
				$('.lock_title_date').html(`${_sdate}-${_edate}`);
				$('.sytip').html(_sytip);
				$('.gqtip').html(_gqtip);
				$('.cytip').html(_cytip);
				$('.jktip').html(_jktip);
				$('.cxtip').html(_cxtip);
				$('.rjgxtip').html(_rjgxtip);
				// let isSame = true;
				obj.model.zyjx.forEach(item => { // eslint-disable-line
					console.log(item);
					if (item.title.indexOf('+') > -1) {
						qqtext = item.content;
						numqq = item.title.replace('+', '');
					}
					else if (item.title.indexOf('-') > -1) {
						hqtext = item.content;
						numhq = item.title.replace('-', '');
					}
					else if (item.title.indexOf('score') > -1) {
						syscore = item.content.sy;
						gqscore = item.content.gq;
						cyscore = item.content.cy;
						jkscore = item.content.jk;
						hasscore = 1;
						$('.lock_btns').removeClass('hidden');
					}
					else {
						hasscore = 2;
						// console.log(hasscore);
						// console.log(typeof 'ads' === 'string');
						$('.lock_btns').addClass('hidden');
						if (typeof item.content === 'string') { // eslint-disable-line
							kywtitle = item.content;
							kywtext = '';
						}
						else {
							kywtitle = item.content.kyw;
							kywtext = item.content.js;
						}
					}
					// console.log(numqq === numhq);
					// if (item.title.indexOf('+') > -1 && numqq === numhq) {
					// 	qq = qqtext;
					// 	hq = hqtext;
					// }
					// else if (item.title.indexOf('+') > -1 && !(numqq === numhq)) {
					// 	qq = hqtext;
					// 	hq = qqtext;
					// }
					// if (item.title.indexOf('-') > -1 && numqq === numhq) {
					// 	qq = qqtext;
					// }
					// else if (item.title.indexOf('-') > -1 && !(numqq === numhq)) {
					// 	qq = hqtext;
					// }
				});
				// console.log(qq, hq);
				localStorage.setItem('qq', qq);
				localStorage.setItem('xyfx', xyfx);
			}
			else {
				$.toast().reset('all');
				$.toast('请求失败!');
			}
		},
		error: () => {
			$.toast().reset('all');
			$.toast('数据出错');
		}
	}).then(() => {
		if (numqq === numhq) {
			qq = qqtext;
			hq = hqtext;
		}
		else {
			qq = hqtext;
			hq = qqtext;
		}
		if (utils.getQueryValue('nextmonthobj')) {
			let nextmonthobj = JSON.parse(decodeURIComponent(utils.getQueryValue('nextmonthobj')));
			if (hasscore === 1) {
				$('.synum').html(nextmonthobj._sy).css('width', (0.95 * (parseInt(nextmonthobj._sy) / 100)) + 'rem');
				$('.gqnum').html(nextmonthobj._gq).css('width', (0.95 * (parseInt(nextmonthobj._gq) / 100)) + 'rem');
				$('.cynum').html(nextmonthobj._cy).css('width', (0.95 * (parseInt(nextmonthobj._cy) / 100)) + 'rem');
				$('.jknum').html(nextmonthobj._jk).css('width', (0.95 * (parseInt(nextmonthobj._jk) / 100)) + 'rem');
			}
			$('.qq_text').text(`前期：${nextmonthobj._qq}`);
			$('.hq_text').text(`后期：${nextmonthobj._hq}`);
			$('.kyw_title').text(`开运物：${nextmonthobj._kywtitle}`);
			$('.lock_title_date').html(`${nextmonthobj._emonth}`);
			// $('.kyw_text').text(kywtext);
		}
		else {
			if (hasscore === 1) {
				$('.synum').html(syscore).css('width', (0.95 * (parseInt(syscore) / 100)) + 'rem');
				$('.gqnum').html(gqscore).css('width', (0.95 * (parseInt(gqscore) / 100)) + 'rem');
				$('.cynum').html(cyscore).css('width', (0.95 * (parseInt(cyscore) / 100)) + 'rem');
				$('.jknum').html(jkscore).css('width', (0.95 * (parseInt(jkscore) / 100)) + 'rem');
			}
			$('.qq_text').text(`${qq}`);
			$('.hq_text').text(`${hq}`);
			$('.kyw_title').text(`开运物：${kywtitle}`);
			$('.kyw_text').text(kywtext);
		}
	});
	$('.shareicon').on('click', () => {
		if (utils.isWnl) {
			window.wnlShare.showSharePlatform();
		}
		else {
			$('.wxsharemask').removeClass('hidden');
		}
	});
	$('.toindex').on('click', () => {
		window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('lock', 'index');
	});
	localStorage.setItem('parterid', `${utils.getQueryValue('parterid')}`);
	localStorage.setItem('goodsid', utils.getQueryValue('goodsid'));
	localStorage.setItem('parteruserid', utils.getQueryValue('userid') !== null && utils.getQueryValue('userid') !== 'null' ? utils.getQueryValue('userid') : ''); // eslint-disable-line
	localStorage.setItem('data', utils.getQueryValue('orderid'));
	localStorage.setItem('money', utils.getQueryValue('pricestr'));
	let succparams = { // eslint-disable-line
		sex: params.sex, // eslint-disable-line
		// orderid: params.orderid,
		deviceid: params.deviceid,
		score: hasscore,
		GLBirthday: params.GLBirthday,
		// name: params.name,
		// user_info: encodeURIComponent(JSON.stringify(detaildata)),
		// user_info: succdetail,
		long: `${utils.getQueryValue('long')}`,
		lat: `${utils.getQueryValue('lat')}`,
		channel: utils.getQueryValue('channel') || channel || 'ios', // eslint-disable-line
		// did: `${utils.getQueryValue('did') || deviceId}`, // eslint-disable-line
		goodsid: `${utils.getQueryValue('goodsid')}`,
		couponid: `${utils.getQueryValue('couponid') || ''}`, // eslint-disable-line
		date: utils.getQueryValue('date'),
		orderid: `${utils.getQueryValue('orderid')}`,
		parterid: `${utils.getQueryValue('parterid')}`, // eslint-disable-line
		pricestr: `${utils.getQueryValue('pricestr')}`,
		posid: (utils.getQueryValue('posid') !== null && utils.getQueryValue('posid') !== 'null') ? utils.getQueryValue('posid') : '',
		userid: utils.getQueryValue('userid') !== null && utils.getQueryValue('userid') !== 'null' ? utils.getQueryValue('userid') : ''
	};
	// if (succparams.name.indexOf('%') > -1) {
	// 	succparams.name = decodeURIComponent(succparams.name);
	// }
	let payParams = {
		money: localStorage.getItem('money') || utils.getQueryValue('pricestr'),
		source: '星盘月运', // 用于支付的项目(如：‘星盘月运’)
		parterid: `${utils.getQueryValue('parterid') || 'wnlzx'}`, // eslint-disable-line
		goodsid: localStorage.getItem('goodsid') || utils.getQueryValue('goodsid'), // eslint-disable-line
		parteruserid: localStorage.getItem('parteruserid') || utils.getQueryValue('deviceid') || 'test', // eslint-disable-line
		data: localStorage.getItem('data') || utils.getQueryValue('orderid'), // 订单编号
		// posId: posId === null || posId === undefined ? '' : posId, // eslint-disable-line
		posId: utils.getQueryValue('posid') || '', // eslint-disable-line
		couponId: utils.getQueryValue('couponId') || '', // eslint-disable-line
		channel: utils.getQueryValue('channel') || 'ios', // eslint-disable-line
		// imei: imei === null || imei === undefined ? '' : imei, // eslint-disable-line
		// channel: channel === null || channel === undefined ? '' : channel, // eslint-disable-line
		// returnUrl: `${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname.replace('lock', 'result')}?kywtext=${utils.getQueryValue('kywtext')}&kywtitle=${utils.getQueryValue('kywtitle')}&qq=${utils.getQueryValue('qq') || ''}&hq=${utils.getQueryValue('hq')}&sdate=${utils.getQueryValue('sdate')}&edate=${utils.getQueryValue('edate')}&sy=${sy}&gq=${gq}&cy=${cy}&jk=${jk}&sex=${utils.getQueryValue('sex') || '1'}&name=${utils.getQueryValue('name')}&date=${utils.getQueryValue('date')}&long=${utils.getQueryValue('long') || ''}&lat=${utils.getQueryValue('lat') || ''}&bcity=${utils.getQueryValue('bcity') || ''}&couponid=${utils.getQueryValue('couponId') || ''}&pricestr=${utils.getQueryValue('pricestr')}&orderid=${utils.getQueryValue('orderid') || localStorage.getItem('data')}&parterid=${utils.getQueryValue('parterid') || 'wnlzx'}&goodsid=${utils.getQueryValue('goodsid') || localStorage.getItem('goodsid')}&did=${utils.getQueryValue('did') || localStorage.getItem('parteruserid')}&channel=${utils.getQueryValue('channel') || ''}`, // eslint-disable-line
		// returnUrl: `${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname.replace('lock', 'result')}${utils.jsonToQueryString(succparams)}`,
		// failUrl: `${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname}?username=${succparams.username}&parterid=${utils.getQueryValue('parterid') || 'wnlzx'}&goodsid=${utils.getQueryValue('goodsid')}&did=${utils.getQueryValue('did') || deviceId}&orderid=${localStorage.getItem('data') || utils.getQueryValue('orderid')}&pricestr=${localStorage.getItem('money') || utils.getQueryValue('pricestr')}&couponid=${utils.getQueryValue('couponId') || ''}` // eslint-disable-line
		failUrl: window.location.protocol + '//' + window.location.host + window.location.pathname.replace('lock', 'index') // eslint-disable-line
	};
	// console.log(utils.jsonToQueryString(succparams));
	// if (utils.isWeixin) {
	// 	payParams.openid = openid; // eslint-disable-line
	// }
	$('.paymask_mask').on('click', () => {
		$('.paymask').addClass('hidden');
	});
	$('.paymask_mask').on('touchmove', (e) => {
		e.preventDefault();
	});
	$('.payitem_btn').on('click', () => {
		// alert(JSON.stringify(succparams));
		// alert(utils.jsonToQueryString(succparams));
		// alert(`http://order.51wnl.com/pay_web/index_t.html${utils.jsonToQueryString(payParams)}&returnUrl=${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname.replace('lock', 'result')}${utils.jsonToQueryString(succparams)}`);
		let returnurl = encodeURIComponent(`${(window.location.href.indexOf('https') > -1) ? 'https://' : 'http://'}${window.location.host + window.location.pathname.replace('lock', 'result')}${utils.jsonToQueryString(succparams)}&name=${params.name}`);
		window.location.href = `http://order.51wnl.com/pay_web/index_t.html${utils.jsonToQueryString(payParams)}&returnUrl=${returnurl}`; // eslint-disable-line
	});
	$('.wxsharemask').on('click', () => {
		$('.wxsharemask').addClass('hidden');
	});
	$('.wxsharemask').on('touchmove', (e) => {
		e.preventDefault();
	});
});
