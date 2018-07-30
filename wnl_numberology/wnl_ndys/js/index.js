var userId = '',
	isWeixin = false,
	deviceId = '';
var astroList = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];

$(function () {
	$(document).on('touchstart', function () {});

	userId = getQueryValue('userId');
	if (!userId || userId.toLowerCase() === '[wnluserid]') {
		userId = '';
	}
	deviceId = getQueryValue('deviceId');
	if (!deviceId || deviceId.toLowerCase() === '[openudid]') {
		deviceId = '';
	}
	posId = getQueryValue('posId') || getQueryValue('posid');
	// var name = getQueryValue('name');
	// var date = getQueryValue('date');

	var posId = getQueryValue('posId') || getQueryValue('posid');
	var boundId = getQueryValue('boundId') || getQueryValue('boundid');
	var channel = getQueryValue('channel');
	var mac = getQueryValue('mac');
	var imei = getQueryValue('imei');
	var Token = getQueryValue('pToken') || getQueryValue('PToken') || getQueryValue('ptoken');
	var pToken = getQueryValue('pushToken') || getQueryValue('PushToken') || getQueryValue('pushtoken');
	var idfa = getQueryValue('idfa');
	var couponId = getQueryValue('couponId') || localStorage.getItem('history_couponId') || '';
	var sourceType = 'wnl';

	localStorage.setItem('history_couponId', couponId);
	// iphoneX适配
function isIphoneX(){
	ua = window.navigator.userAgent;
	if (ua.match(/iPhone|iPad|iPod/i)) {
		if (parseInt(window.devicePixelRatio) ===3 && parseInt(window.screen.width) === 375) {
		return true;
		}
		return false;
	}
	return false;
}
function iphoneXFits(container, fitsArr){
    // var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: rgba(255, 255, 255, 0);"></div>'
    // $('body').append(iphoneXbanner);
	paddingBottomFits(container);
	bottomArrFits(fitsArr);
}
function paddingBottomFits(container) {
    var i;
    for (i=0;i< container.length;i++){
    	var paddingSet = parseInt($(container[i]).css('padding-bottom')) + 34;
        $(container[i]).css({'padding-bottom': paddingSet});
    }
}
function bottomArrFits(fitsArr) {
    var i;
    for (i=0;i< fitsArr.length;i++){
        var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34 + 'px !important';
        $(fitsArr[i]).css({'bottom': bottomSet});
    }
}
if(isIphoneX()){
	var container = ['.main', '.btn_mask'];
    // 需上移的Fixed按钮
    var fitsArr = [];
    iphoneXFits(container, fitsArr);
    $('.wnl_history_btn').css('bottom', 104);
}

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
	// var searchTxt = location.search;
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
		}, 0);
	}

	// 判断非微信下 && userId 和 deviceId 为空 || 不是wnl客户端打开时 调用guid生成接口
	console.log('check');
	if (!browser.isWx() && (!browser.isWnl() || (userId === '' && deviceId === ''))) {
		console.log('check2');
		if (localStorage.getItem('wnl_tlp_guid')) {
			console.log('check3');
			userId = localStorage.getItem('wnl_tlp_guid');
			deviceId = localStorage.getItem('wnl_tlp_guid');
		} else {
			console.log('check22');
			$.ajax({
				url: '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
				type: 'get',
				data: 'json',
				success: function (response) {
					userId = response.toString();
					deviceId = response.toString();
					localStorage.setItem('wnl_tlp_guid', userId);
					console.log('check32');
				}
			});
		}
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
			deviceId = '';
			if (localStorage.getItem('trigger_flag') === 'yes') {
				$('.begin_btn').trigger('click');
			}
		} else if (!openid) {
			window.localStorage.setItem('wnl_location_direct', window.location.href);
			//location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
		} else {
			var nickName = window.btoa(location.href.split('nickname=')[1].split('&')[0]);
			var datastring = "{\"OpenId\":\"" + openid + "\",\"UnionId\":\"" + unionid + "\",\"Gender\":0,\"Platform\":\"2\",\"OpenName\":\"" + nickName + "\",\"Desc\":\"\",\"AppId\":\"ServiceAccount\"}"
			var data = {
				'DataString': datastring
			}
			if(localStorage.getItem('history_couponId')){
				localStorage.setItem('history_couponId', '');
			}
			$.ajax({
				url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
				dataType: 'json',
				type: 'POST',
				data: data,
				async: false,
				success: function (response) {
					userId = response.data.wnlUserId;
					deviceId = response.data.wnlUserId;
					//测试
					window.localStorage.setItem('wnl_tlp_local', JSON.stringify({
						wnlUserId: userId,
						openid: openid,
						unionid: unionid
					}));
					location.href = localStorage.getItem('wnl_location_direct');
				},
				error: function (response) {
					console.log(response);
				}
			});
		}
	});

	$('.date_input_1').mobiscroll().datePicker({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh',
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		onSelect: function (val) {
			$('.date_input').val(val);
			var bornDate = val.substr(3);
			var year = (bornDate.substring(0, 4)),
				month = (bornDate.substring(5, 7)),
				day = (bornDate.substring(8, 10));
			$('.date_input').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
		}
	});
	$('.date_input_1').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);
	$('.date_input_2').mobiscroll().datePicker({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh',
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		onSelect: function (val) {
			$('.date_input').val(val);
			var bornDate = val.substr(3);
			var year = (bornDate.substring(0, 4)),
				month = (bornDate.substring(5, 7)),
				day = (bornDate.substring(8, 10));
			$('.date_input').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
		}
	});
	$('.date_input_2').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);
	$('.name_input').on('blur', function () {
		var text = $(this).val().trim();
		if (text.length !== 0) {
			$('.name_input').val(text);
		}
	});
	var isWorking = false;
	$('.begin_btn').on('click', function () {
		if (isWorking) {
			return false;
		}
		isWorking = true;
		var name = $('.name_input_1').val().trim().length !== 0 ? $('.name_input_1').val().trim() : $('.name_input_2').val().trim();
		//是否判断汉字 ^[\u4E00-\u9FFF]+$
		var dateString = $('.date_input_1').val().trim().length !== 0 ? $('.date_input_1').val().trim() : $('.date_input_2').val().trim();
		if (localStorage.getItem('trigger_flag') === 'yes') {
			name = localStorage.getItem('trigger_name');
			dateString = localStorage.getItem('trigger_dateString');
			localStorage.setItem('trigger_flag', 'no');
		}
		var bornDate = dateString.substr(3).replace('年', '-').replace('月', '-').replace('日', '');
		if (name.length === 0) {
			drawToast('请填写您的姓名');
			isWorking = false;
			return false;
		}
		if (dateString.length === 0) {
			drawToast('请选择您的出生日期');
			isWorking = false;
			return false;
		}
		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_name', name);
				localStorage.setItem('trigger_dateString', dateString);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
				return false;
			}
		}
		var clientObj = {
			'ndys': {
				'name': name, //姓名 未填传空字符串
				'date': bornDate //出生日期 1988-04-22 未填传空字符串
			}
		};
		var month = str2Int(bornDate.substring(5, 7)),
			day = str2Int(bornDate.substring(8, 10));
		var astroName = toAstro(month, day);
		var index = astroList.indexOf(astroName);
		if (browser.isWnl()) {
			setTimeout(function () {
				location.href = 'protocol://saveuserinfo#' + Base64.encode(JSON.stringify(clientObj));
				// location.href = 'card.html' + searchTxt + '&name=' + name + '&date=' + bornDate + '&posId=' + posId + '&boundId' + boundId + '&channel=' + channel;
			}, 0);
		}
		// 这是正式环境用的代码
		var prm = {
			'Name': name,
			'orderName': '塔罗年运',
			'ClientType': browser.isAndroid() ? 'Youloft_Android' : 'Youloft_IOS',
			'BirthDay': bornDate,
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
			'goodsid': '7B7472703522492F8751ABE8770AAF3A',
			'channel': sourceType,
			'sysVersion': browser.getIOSVersion() || browser.getAndroidVersion(),
			'appVersion': browser.appVersion
		};

		// 这是测试环境用的代码
		// var prm = {
		// 	'Name': name,
		// 	'orderName': '塔罗年运',
		// 	'ClientType': browser.isAndroid() ? 'Youloft_Android' : 'Youloft_IOS',
		// 	'BirthDay': bornDate,
		// 	'StarName': astroName,
		// 	'Year': 2017,
		// 	'UserID': userId,
		// 	'DeviceID': deviceId,
		// 	'posId': posId,
		// 	'boundId': boundId,
		// 	'Token': Token,
		// 	'DeviceMac': mac,
		// 	'Idfa': idfa,
		// 	'PToken': pToken,
		// 	'ImeiNumber': imei,
		// 	'clientType': channel,
		// 	'goodsid': '1AB6C64CA2C74B1898718FEA21E60317', 正式的7B7472703522492F8751ABE8770AAF3A
		// 	'channel': sourceType,
		// 	'sysVersion': browser.getIOSVersion() || browser.getAndroidVersion(),
		// 	'appVersion': browser.appVersion
		// };
		$.ajax({
			cache: false,
			type: 'GET',
			dataType: 'json',
			url: '//coco70.51wnl.com/numberologynew/TarotFate/CreateOrder',
			data: prm,
			success: function (result) {
				if (result.status == 0) {
					var orderID = result.data.orderID;
					setTimeout(function () {
						location.href = 'result3.html?orderid=' + orderID + '&userId=' + userId + '&deviceId=' + deviceId + '&posId=' + posId + '&index=' + index + '&channel=' + channel + '&openid=' + openid + '&couponId=' + couponId;
					}, 0);
				} else {
					isWorking = false;
					drawToast('创建订单错误,请重试');
				}
			},
			error: function () {
				drawToast('创建订单错误,请重试');
				isWorking = false;
				return false;
			}
		});
	});
	$('.history_btn').click(function () {
		location.href = 'history.html?userId=' + userId + '&deviceId=' + deviceId;
	});
});


function userinfocallback(result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	var originalObj = originalAllObj.ndys || originalAllObj.lyys || originalAllObj.bzcs || originalAllObj.native_jryc || originalAllObj.native_usercenter;
	if (originalObj && originalObj.name && originalObj.name.length !== 0) {
		$('.name_input').val(originalObj.name);
	}
	if (originalObj && originalObj.date && originalObj.date.length !== 0) {
		var year = (originalObj.date.substring(0, 4)),
			month = (originalObj.date.substring(5, 7)),
			day = (originalObj.date.substring(8, 10));
		$('.date_input').val('公历 ' + year + '年' + month + '月' + day + '日');
		$('.date_input').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	}
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function getQueryValue(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
var ua = window.navigator.userAgent;
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
	appVersion: parseInt(ua.split(' ').pop().replace(/\./g, '')),
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
	},
	getAndroidVersion: function () {
		ua = ua.toLowerCase();
		var match = ua.match(/android\s([0-9\.]*)/);
		return match ? parseFloat(match[1]) : false;
	}
};
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
			window.ylwindow.reportHasShare(true);
			location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
		} else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	} catch (e) {
		console.log(e);
	}
	return 1;
}
