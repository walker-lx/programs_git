var astroList = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();

function GetIOSVersion() {
	if (window.MSStream) {
		return false;
	}
	var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
		version;
	if (match !== undefined && match !== null) {
		version = [
			parseInt(match[1], 10),
			parseInt(match[2] || 0, 10),
			parseInt(match[3] || 0, 10)
		];
		return version.join('.');
	}

	return false;
}

function getAndroidVersion() {
	ua = ua.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : false;
}
var userId = getQueryValue('userId') || getQueryValue('userid');
var channel = getQueryValue("channel") && getQueryValue("channel").length !== 0 ? getQueryValue("channel") : ""
if (userId.toUpperCase === '[WNLUSERID]') {
	userId = '';
}
var deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
if (deviceId.toUpperCase === '[OPENUDID]') {
	deviceId = '';
}

var openid = '';
var unionid = '';
document.addEventListener('WeixinJSBridgeReady', function () {
	openid = getQueryValue('openid');
	unionid = getQueryValue('unionid');
	//如果执行到这块的代码,就说明是在微信内部浏览器内打开的.
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.wnlUserId) {
		userId = wnl_loc.wnlUserId;
		openid = wnl_loc.openid;
		unionid = wnl_loc.unionid;
		deviceId = wnl_loc.wnlUserId;
	}
});

$(function () {
	var name = getQueryValue('name');
	var date = getQueryValue('date');

	var posId = getQueryValue('posId') || getQueryValue('posid');
	var boundId = getQueryValue('boundId') || getQueryValue('boundid');
	var channel = getQueryValue('channel');
	var mac = getQueryValue('mac');
	var imei = getQueryValue('imei');
	var Token = getQueryValue('pToken') || getQueryValue('PToken') || getQueryValue('ptoken');
	var pToken = getQueryValue('pushToken') || getQueryValue('PushToken') || getQueryValue('pushtoken');
	var idfa = getQueryValue('idfa');
	var sourceType = 'wnl';
	if (browser.isIOS()) {
		sourceType = 'wnl_ios';
		if (boundId) {
			var boundstring = '';
			switch (boundId) {
			case 'com.ireadercity.yhgrlc':
				boundstring = '_5';
				break;
			case 'com.51wnl.wnl-shadow2':
				boundstring = '_2';
				break;
			case 'com.51wnl.wnl-shadow1':
				boundstring = '_1';
				break;
			case 'com.ireadercity.zhwll':
				boundstring = '';
				break;
			}
			sourceType += (boundstring);
		}
	} else if (browser.isAndroid()) {
		sourceType = 'wnl_android';
	} else {
		sourceType = 'other';
	}
	var month = str2Int(date.substring(5, 7)),
		day = str2Int(date.substring(8, 10));
	var astroName = toAstro(month, day);
	var index = astroList.indexOf(astroName);
	$('.card_back').addClass('back' + index);
	$('.card').click(function () {
		$(this).addClass('fliped');
		$('.card_back').addClass('fliped');
		setTimeout(function () {
			var prm = {
				'Name': name,
				'orderName': '塔罗年运',
				'ClientType': browser.isAndroid() ? 'Youloft_Android' : 'Youloft_IOS',
				'BirthDay': date,
				'StarName': astroName,
				'Year': 2017,
				'UserID': userId,
				'DeviceID': deviceId,
				'posId': posId,
				'boundId': boundId,
				'Token': Token,
				'DeviceMac': mac,
				'Idfa': idfa,
				'PToken': pToken,
				'ImeiNumber': imei,
				'clientType': channel,
				'goodsid': '172CDA4639E44C62AA1DDD5F66F8AC87',
				'channel': sourceType,
				'sysVersion': sysVersion,
				'appVersion': appVersion
			};
			$.ajax({
				cache: false,
				type: 'GET',
				dataType: 'json',
				// url: '//showvote.cqyouloft.com/numberologynew/TarotFate/CreateOrder',
				url: '//coco70.51wnl.com/numberologynew/TarotFate/CreateOrder',
				data: prm,
				success: function (result) {
					if (result.status == 0) {
						var orderID = result.data.orderID;
						setTimeout(function () {
							location.href = 'result.html?orderid=' + orderID + '&userId=' + userId + '&deviceId=' + deviceId + '&posId=' + posId + '&index=' + index + '&channel=' + channel + '&openid=' + openid;
						}, 0);
					} else {
						drawToast('创建订单错误,请重试');
					}
				},
				error: function (xhr, ajaxOperation, throwErr) {
					drawToast('创建订单错误,请重试');
					return false;
				}
			});
		}, 2000);
	});
});
/**
 * 公历月',日判断所属星座
 * @param  cMonth [description]
 * @param  cDay [description]
 * @return Cn string
 */
function toAstro(cMonth, cDay) {
	// var s = '\u6469\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u6469\u7faf';
	var s = '摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
	var arr = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
	return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '座'; //座
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function getQueryValue(key) {
	// if (style === undefined || style === '') {
	// 	style = '&';
	// }
	// var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
	// return (match && decodeURIComponent(match[1])) || '';
	var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return '';
}
ua = window.navigator.userAgent;
var browser = {
	isAndroid: function () {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	isIOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	isWx: function () {
		return navigator.userAgent.match(/micromessenger/i) ? true : false;
	},
	isWp: function () {
		return ua.toLowerCase().indexOf('windows phone') > -1;
	},
	isWnl: function () {
		return ua.toLowerCase().indexOf('wnl') > -1;
	},
	getIOSVersion: function () {
		if (window.MSStream) {
			return false;
		}
		var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
			version;
		if (match !== undefined && match !== null) {
			version = [
				parseInt(match[1], 10),
				parseInt(match[2], 10),
				parseInt(match[3] || 0, 10)
			];
			return parseFloat(version.join('.'));
		}
		return false;
	}
};
var intervalCounter = 0;

function drawToast(message) {
	var alert = document.getElementById('toast');
	if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
		return false;
	}
	alert.className = alert.className.replace('lines', '');
	alert.style.opacity = .8;
	alert.innerHTML = message;
	var temp_alert = document.getElementById('toast1');
	temp_alert.innerHTML = message;
	alert.className += 'show';
	alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
	intervalCounter = setTimeout(function () {
		alert.style.opacity = 0;
		clearInterval(intervalCounter);
	}, 1500);
	setTimeout(function () {
		alert.className = alert.className.replace('show', '');
	}, 2000);
}
var title = '八字难理解？生肖怕不准？';
var text = '没关系！万年历独创年运让你2017所向披靡！';
var imageURL = 'https://coco70.51wnl.com/numberologynew/ndys/img/share.jpg';
var textObj = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	url: location.href,
	pureText: text,
	prefix: ''
};
var textObj1 = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	targetUrl: location.href,
	perfix: ''
};

function appCallback_share() {
	try {
		if (window.ylwindow) {
			ylwindow.reportHasShare(true);
			location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
		} else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	} catch (e) {}
	return 1;
}
