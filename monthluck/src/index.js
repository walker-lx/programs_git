import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import '../static/libs/js/flexible';
import '../static/libs/js/scroll';
import { scrollTo, getAddDayDate } from './helper/helper';
import './sass/index.scss';
import utils from './util/util';

let shareData = {
	title: '你的未来三十天什么最重要？',
	text: '点击查看未来运势，全方位了解未来吉凶。',
	image: 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg',
	imgUrl: 'https://raw.githubusercontent.com/18883846209/img/master/img/%E5%88%86%E4%BA%AB200icon.jpg',
	url: window.location.protocol + '//' + window.location.host + window.location.pathname
};

$(() => {
	// console.log(getAddDayDate().join('-'));
	$('body').removeClass('hidden');
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	$('#marquee-top').marquee();
	let sdate; // 公历日期
	let ldate; // 农历日期
	let isSolar = 0; // 1 农历  0 公历
	let sex = true; // 1 男 0 女
	let long = 116; // 经度
	let lat = 39; // 纬度
	let ajaxData;
	function checkName(len) {
		let length = parseInt(len);
		if (length > 5) {
			return false;
		}
		return true;
	}
	let ua = navigator.userAgent.toLocaleLowerCase();
	if ((ua.indexOf('oppo') > -1 || ua.indexOf('r9') > -1) && parseInt(utils.androidVersion) < 6) {
		// alert('oppo');
		$('.sex').addClass('oppo5');
		$('.nametext, .addrtext, .datetext').addClass('oppor9');
	}
	if (utils.isIOS && window.innerWidth <= 323) {
		// alert('5s');
		$('.sex').addClass('ios5s');
		$('.nametext, .addrtext, .datetext').addClass('ios5s');
		$('.nav').addClass('ios5snav');
	}
	const name = $('.name');
	const mail = $('.mail');
	const femail = $('.femail');
	mail.on('click', function(e) { // eslint-disable-line
		sex = false;
		$('.mail, .femail').removeClass('choosed');
		$(this).addClass('choosed');
	});
	femail.on('click', function(e) { // eslint-disable-line
		sex = true;
		$('.mail, .femail').removeClass('choosed');
		$(this).addClass('choosed');
	});
	const city = $('.city');
	const date = $('.birth');
	date.on('click', () => {
		new wnlui.datePicker({ // eslint-disable-line
			showLunar: true,
			// defaultValue: [1990, 1, 1],
			onChange: (result) => {
				console.log(result);
			},
			onConfirm: (result) => {
				console.log(result);
				if (result.isSolar) { // 公历日期
					let dateobj = result.dateObj;
					let dateStr = `${dateobj.cYear}-${dateobj.cMonth}-${dateobj.cDay}`;
					date.val(dateStr);
					sdate = `${dateobj.cYear}-${utils.formatNumber(dateobj.cMonth)}-${utils.formatNumber(dateobj.cDay)}`;
					ldate = sdate;
					isSolar = 0;
					localStorage.setItem('sdate', sdate);
					localStorage.setItem('ldate', ldate);
					localStorage.setItem('isSolar', isSolar);
				}
				else { // 农历日期
					let dateobj = result.dateObj;
					let dateStr = `${dateobj.lYear}-${dateobj.lMonth}-${dateobj.lDay}`;
					sdate = `${dateobj.cYear}-${utils.formatNumber(dateobj.cMonth)}-${utils.formatNumber(dateobj.cDay)}`;
					ldate = dateStr;
					isSolar = 1;
					date.val(`${dateobj.cYear}-${dateobj.cMonth}-${dateobj.cDay}`);
				}
			}
		});
	});
	city.on('click', () => {
		new wnlui.cityPicker({ // eslint-disable-line
			cityCode: false,
			onChange: (result) => {
				console.log(result);
			},
			onConfirm: (result) => {
				console.log(result);
				let cityArr = result;
				let cityStr = `${cityArr[0].label}-${cityArr[1].label}-${cityArr[2].label}`;
				city.val(cityStr);
				long = parseInt(cityArr[2].longitude);
				lat = parseInt(cityArr[2].latitude);
				localStorage.setItem('city', cityStr);
				localStorage.setItem('long', long);
				localStorage.setItem('lat', lat);
			}
		});
	});
	let btnclick = true;
	$('.subbtn').on('click', () => {
		if (btnclick) {
			if (!name.val() || !date.val() || !city.val()) {
				$.toast().reset('all');
				$.toast('请填写信息');
				scrollTo($('.inputdiv'));
			}
			else if (!checkName(name.val().length)) {
				$.toast().reset('all');
				$.toast('姓名不能超过5个字');
				scrollTo($('.inputdiv'));
			}
			else {
				btnclick = false;
				localStorage.setItem('name', name.val());
				console.log(sex);
				let orderdata = {
					Birthday: ldate || localStorage.getItem('ldate'),
					GLBirthday: ldate || localStorage.getItem('ldate'), // 公历生日
					birthdaycity: city.val() || localStorage.getItem('city'),
					Sex: sex, // eslint-disable-line
					DeviceID: deviceId || '123', // eslint-disable-line
					UserID: utils.getQueryValue('userId') && utils.getQueryValue('userId').indexOf('[') > -1 ? '' : utils.getQueryValue('userId'), // eslint-disable-line
					Channel: channel || 'test', // eslint-disable-line
					Long: long || localStorage.getItem('long'),
					Lat: lat || localStorage.getItem('lat'),
					posid: utils.getQueryValue('posId') ? utils.getQueryValue('posId') : ''  // eslint-disable-line
					// posid: utils.getQueryValue('posid') !== null && utils.getQueryValue('posid') !== 'null' ? utils.getQueryValue('posId') : ''  // eslint-disable-line
					// posid: utils.getQueryValue('posId') && utils.getQueryValue('posId').indexOf('[') > -1 ? '' : utils.getQueryValue('posId')  // eslint-disable-line
				};
				if (utils.isIOS) {
					orderdata.Channel = 'IOS';
				}
				else if (utils.isAndroid) {
					orderdata.Channel = 'Android';
				}
				else {
					orderdata.Channel = 'other';
				}
				// console.log(orderdata);
				ajaxData = {
					Name: name.val() || '星盘月运',
					// BeginTime: '2018-7-15',
					BeginTime: getAddDayDate().join('-'),
					Birthday: orderdata.Birthday,
					GLBirthday: orderdata.Birthday, // 公历生日
					CalendarType: parseInt(isSolar),
					HomePageUrl: window.location.href,
					DetailsUrl: `${((window.location.href.indexOf('https') > -1) ? 'https://' : 'http://')}${window.location.host + window.location.pathname.replace('index', 'result')}?sex=${sex}&lat=${orderdata.Lat}&long=${orderdata.Long}&channel=${orderdata.Channel}&deviceid=${orderdata.DeviceID}&bcity=${orderdata.birthdaycity}&date=${orderdata.Birthday}&glbirthday=${sdate || localStorage.getItem('sdate')}&username=${name.val() || '星盘月运'}&orderid=[ORDERID]&parterid=[PARTERID]&goodsid=[GOODSID]&price=[PRICE]`, // eslint-disable-line
					// DetailsUrl: `//${window.location.host}/lock.html?did=${utils.getQueryValue('deviceId') || deviceId}`, // eslint-disable-line
					birthdaycity: orderdata.birthdaycity,
					// Sex: sex === 1 ? true : false, // eslint-disable-line
					Sex: sex, // eslint-disable-line
					ordername: '星盘月运',
					ClientType: utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android',
					DeviceID: orderdata.DeviceID, // eslint-disable-line
					UserID: orderdata.UserID, // eslint-disable-line
					Channel: orderdata.Channel, // eslint-disable-line
					Long: orderdata.Long,
					Lat: orderdata.Lat,
					BirthTimeHour: '12:00',
					// posid: orderdata.posid,
					// GoodsID: '2341DFE9D0A64DE49D1FFE5534A893DC'
					GoodsID: '601EF79371314038931FA1E708637DD6'
				};
				if (orderdata.posid.toString().length > 0) {
					ajaxData.posid = orderdata.posid;
				}
				if (utils.isWeixin) {
					if (utils.getQueryValue('openid')) {
						ajaxData.openid = utils.getQueryValue('openid');
						localStorage.setItem('openid', utils.getQueryValue('openid'));
					}
				}
				localStorage.setItem('ajaxdata', JSON.stringify(ajaxData));
				if (utils.isWeixin) {
					ajaxData.Channel = utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android';
				}
				$.toast().reset('all');
				$.toast({
					text: '创建订单中...',
					hideAfter: true
				});
				let goodsid;
				let orderid;
				let parterid;
				let pricestr;
				// console.log(JSON.stringify(ajaxData), '请求数据');
				$.ajax({
					// url: 'http://192.168.1.178:3000/mock/14/ChartLunar/CreateOrder',
					url: '//coco70.51wnl.com/numberologyNew/ChartLunar/CreateOrder',
					type: 'POST',
					contentType: 'application/x-www-form-urlencoded',
					data: ajaxData,
					success: (res) => {
						// console.log(res, '返回数据');
						$.toast().reset('all');
						$.toast('订单创建成功');
						let resdata = JSON.parse(res).data;
						if (JSON.parse(res).status === 0) {
							goodsid = resdata.goodsID;
							orderid = resdata.orderID;
							parterid = resdata.parterID;
							pricestr = parseFloat(resdata.price);
							let detaildata = {
								orderid: `${orderid}`,
								deviceid: `${utils.getQueryValue('deviceId') || 'test'}`, // eslint-disable-line
								GLBirthday: ajaxData.GLBirthday,
								sex: ajaxData.Sex,
								name: ajaxData.Name
							};
							localStorage.setItem('user_info', JSON.stringify(detaildata));
							// console.log(JSON.stringify(utils.getQueryValue('user_info')));
							let params = {
								// user_info: JSON.stringify(detaildata),
								sex: ajaxData.Sex,
								long: `${long}`,
								lat: `${lat}`,
								bcity: ajaxData.birthdaycity,
								// channel: utils.getQueryValue('channel') || channel, // eslint-disable-line
								channel: orderdata.Channel,
								// deviceid: `${orderdata.deviceid || detaildata.deviceid}`, // eslint-disable-line
								deviceid: ajaxData.DeviceID, // eslint-disable-line
								parterid: `${parterid}`,
								bdate: JSON.parse(res).data.createDate,
								goodsid: `${goodsid}`,
								couponid: `${utils.getQueryValue('couponid') || ''}`, // eslint-disable-line
								date: ajaxData.GLBirthday,
								orderid: `${orderid}`,
								parterid: `wnl_mall_${parterid}`, // eslint-disable-line
								pricestr: `${pricestr}`,
								posid: orderdata.posid,
								userid: orderdata.UserID // eslint-disable-line
							};
							btnclick = true;
							window.location.href = `./lock.html${utils.jsonToQueryString(params)}&username=${name.val()}`;
						}
						else {
							btnclick = true;
							$.toast().reset('all');
							$.toast('订单创建失败');
						}
					},
					error: () => {
						$.toast().reset('all');
						$.toast('数据出错');
						btnclick = true;
					}
				});
			}
		}
		_czc.push(['_trackEvent', 'ck', 'click']);
	});
	$('.cs-list-item').on('click', () => {
		_czc.push(['_trackEvent', 'csitems', 'click']);
	});
});
