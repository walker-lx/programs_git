
var oneSex = 0; //女
var twoSex = 1; //男
/**
 * 获取url中的参数
 * @param  {[type]} key   key
 * @param  {[type]} style 结束标识
 * @return {[type]}       key的值
 */
function getQueryValue(key, style) {
	if (style === undefined || style === '') {
		style = '&';
	}
	var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
	return (match && match[1]) || '';
}
var longLat = [
	['北京市', '39.55 ', '116.24 '],
	['天津市', '39.02 ', '117.12 '],
	['上海市', '34.50 ', '121.43 '],
	['重庆市', '29.35 ', '106.33 '],
	['河北省', '38.02 ', '114.30 '],
	['山西省', '37.54 ', '112.33 '],
	['辽宁省', '41.48 ', '123.25 '],
	['吉林省', '43.54 ', '125.19 '],
	['黑龙江省', '45.44 ', '126.36 '],
	['江苏省', '32.03 ', '118.46 '],
	['浙江省', '30.16 ', '120.10 '],
	['安徽省', '31.52 ', '117.17 '],
	['福建省', '26.05 ', '119.18 '],
	['江西省', '28.40 ', '115.55 '],
	['山东省', '36.40 ', '117.00 '],
	['河南省', '34.46 ', '113.40 '],
	['湖北省', '30.35 ', '114.17 '],
	['湖南省', '28.12 ', '112.59 '],
	['广东省', '23.08 ', '113.14 '],
	['海南省', '20.02 ', '110.20 '],
	['四川省', '30.40 ', '104.04 '],
	['贵州省', '26.35 ', '106.42 '],
	['云南省', '25.04 ', '102.42 '],
	['陕西省', '34.17 ', '108.57 '],
	['甘肃省', '36.04 ', '103.51 '],
	['青海省', '36.38 ', '101.48 '],
	['台湾省', '25.03 ', '121.30 '],
	['内蒙古自治区', '40.48 ', '111.41 '],
	['广西壮族自治区', '22.48 ', '108.19 '],
	['西藏自治区', '29.39 ', '91.08 '],
	['宁夏回族自治区', '38.27 ', '106.16 '],
	['新疆维吾尔自治区', '43.45 ', '87.36 '],
	['香港特别行政区', '22.20 ', '114.10 '],
	['澳门特别行政区', '21.33 ', '115.07 ']
];

var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();
var browser = {
	isAndroid: function () {
		return ua.match(/Android/i) ? true : false;
	},
	isIOS: function () {
		return ua.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	isWx: function () {
		return ua.match(/micromessenger/i) ? true : false;
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
    // 需上移的包裹容器
    var container = ['.inner_content'];
    // 需上移的Fixed按钮
    var fitsArr = [];
    iphoneXFits(container, fitsArr);
    $('.wnl_history_btn').css('bottom', 44);
}

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



$(function () {
	$('.index_loading').fadeOut(0);
	$('.index_mask').fadeOut(0);

	var window_width = $(window).width();
	var title_height = window_width * 0.69333;
	var vedio_height = (window_width - 20) * 0.56338;
	$('.head_section').css({
		'height': title_height
	});
	$('.vedio_section').css({
		'height': vedio_height
	});

	var temp_img_width = (window_width - 60) / 2;
	$('.disc_temp').css({
		'width': temp_img_width
	});
	$('.disc_temp').css({
		'height': temp_img_width / 1.62
	});


	$.ajax({
		url: '//coco70.51wnl.com/numberologynew/TarotDisc/GetCeSuanOrderNum',
		type: 'GET',
		success: function (res) {
			console.log(JSON.parse(res).data);
			$('.like_number').html(JSON.parse(res).data + '人合盘');
		},
		error: function (res) {
			console.log('res=' + JSON.stringify(res));
		}
	});

	var clientType = 'Youloft_IOS';

	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
			console.log(location.href);
		}, 0);
	}
	if (browser.isIOS()) {
		clientType = 'Youloft_IOS';
	} else if (browser.isAndroid()) {
		clientType = 'Youloft_Android';
	} else {
		clientType = 'other';
	}
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

	var oneName;
	var oneBirthday;
	var oneBirthdayCity;
	var oneLong;
	var oneLat;
	var oneTimeHour;
	// var oneSex = 0;  //女
	var twoName;
	var twoBirthday;
	var twoBirthdayCity;
	var twoLong;
	var twoLat;
	var twoTimeHour;
	// var twoSex = 1;  //男

	var orderid;



	//创建日期选择控件
	$('#birth_day_one,#birth_day_two').mobiscroll().datePicker({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh',
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		minDate: new Date(1936, 0, 1),
		maxDate: new Date(2006, 0, 1)
	});
	$('#birth_day_one,#birth_day_two').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);

	//创建出生时间选择控件
	$('#birth_time_one,#birth_time_two').mobiscroll().select({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh'
	});
	$('#birth_time_one_dummy').val('');
	$('#birth_time_one_dummy').attr('placeholder', '不清楚');
	$('#birth_time_two_dummy').val('');
	$('#birth_time_two_dummy').attr('placeholder', '不清楚');

	//创建出生地点选择控件
	$('#birth_place_one,#birth_place_two').mobiscroll().select({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh'
	});
	$('#birth_place_one_dummy,#birth_place_two_dummy').val('');
	$('#birth_place_one_dummy,#birth_place_two_dummy').attr('placeholder', '完善出生地点');


	//性别选择
	$(document).on('click', '.sex_one > .sex_male', function () {
		$('.sex_one > .sex_male').addClass('on');
		$('.sex_one > .sex_famale').removeClass('on');
		$('.sex_one > .sex_male > .sex_icon').attr('src', '../img/male_icon_unselect.png');
		$('.sex_one > .sex_famale > .sex_icon').attr('src', '../img/famale_icon_unselect.png');
		oneSex = 1;
	});
	$(document).on('click', '.sex_one > .sex_famale', function () {
		$('.sex_one > .sex_famale').addClass('on');
		$('.sex_one > .sex_male').removeClass('on');
		$('.sex_one > .sex_male > .sex_icon').attr('src', '../img/male_icon.png');
		$('.sex_one > .sex_famale > .sex_icon').attr('src', '../img/famale_icon.png');
		oneSex = 0;
	});
	$(document).on('click', '.sex_two > .sex_male', function () {
		$('.sex_two > .sex_male').addClass('on');
		$('.sex_two > .sex_famale').removeClass('on');
		$('.sex_two > .sex_male > .sex_icon').attr('src', '../img/male_icon_unselect.png');
		$('.sex_two > .sex_famale > .sex_icon').attr('src', '../img/famale_icon_unselect.png');
		twoSex = 1;
	});
	$(document).on('click', '.sex_two > .sex_famale', function () {
		$('.sex_two > .sex_famale').addClass('on');
		$('.sex_two > .sex_male').removeClass('on');
		$('.sex_two > .sex_male > .sex_icon').attr('src', '../img/male_icon.png');
		$('.sex_two > .sex_famale > .sex_icon').attr('src', '../img/famale_icon.png');
		twoSex = 0;
	});

	//输入验证
	$('.input_name').oninput = function () {
		$(this).setCustomValidity('');
	};
	$('.input_name').oninvalid = function () {
		$(this).setCustomValidity('请输入最多5个中文');
	};





	$(document).on('click', '.my_test', function () {
		setTimeout(function () {
			location.href = 'list.html?deviceid=' + deviceId + '&userid=' + userId;
		}, 0);
	});

	var isWorking = false;
	$(document).on('click', '.free_submit', function () {
		if (isWorking) {
			return false;
		}
		oneName = $('#your_name').val().trim();
		twoName = $('#other_name').val().trim();
		oneBirthday = $('#birth_day_one').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', '');
		twoBirthday = $('#birth_day_two').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', '');
		oneBirthdayCity = $('#birth_place_one_dummy').val().trim();
		twoBirthdayCity = $('#birth_place_two_dummy').val().trim();
		oneTimeHour = $('#birth_time_one').val().toString();
		twoTimeHour = $('#birth_time_two').val().toString();
		if (localStorage.getItem('trigger_flag') === 'yes') {
			oneName = localStorage.getItem('trigger_oneName');
			twoName = localStorage.getItem('trigger_twoName');
			oneBirthday = localStorage.getItem('trigger_oneBirthday');
			twoBirthday = localStorage.getItem('trigger_twoBirthday');
			oneBirthdayCity = localStorage.getItem('trigger_oneBirthdayCity');
			twoBirthdayCity = localStorage.getItem('trigger_twoBirthdayCity');
			oneTimeHour = localStorage.getItem('trigger_oneTimeHour');
			twoTimeHour = localStorage.getItem('trigger_twoTimeHour');
			localStorage.setItem('trigger_flag', 'no');
		}

		if (oneName.length === 0) {
			isWorking = false;
			drawToast('请填写您的姓名');
			return false;
		}
		if (twoName.length === 0) {
			isWorking = false;
			drawToast('请填写对方姓名');
			return false;
		}

		if (oneBirthday.length === 0) {
			isWorking = false;
			drawToast('请选择您的出生日期');
			return false;
		}

		if (twoBirthday.length === 0) {
			isWorking = false;
			drawToast('请选择对方的出生日期');
			return false;
		}

		if (oneBirthdayCity.length === 0) {
			isWorking = false;
			drawToast('请选择您的出生地点');
			return false;
		} else {
			for (var i = 0; i < longLat.length; i++) {
				if (longLat[i][0] === oneBirthdayCity) {
					oneLong = longLat[i][2];
					oneLat = longLat[i][1];
					console.log('城市:' + oneBirthdayCity + '  经度:' + oneLong + '纬度:' + oneLat);
				}
			}
		}


		if (twoBirthdayCity.length === 0) {
			isWorking = false;
			drawToast('请选择对方的出生地点');
			return false;
		} else {
			for (var j = 0; j < longLat.length; j++) {
				if (longLat[j][0] === twoBirthdayCity) {
					twoLong = longLat[j][2];
					twoLat = longLat[j][1];
					console.log('城市:' + twoBirthdayCity + '  经度:' + twoLong + '纬度:' + twoLat);
				}
			}
		}

		if (oneTimeHour.length === 0) {
			isWorking = false;
			drawToast('请选择您的出生时间');
			return false;
		}

		if (twoTimeHour.length === 0) {
			isWorking = false;
			drawToast('请选择对方的出生时间');
			return false;
		}
		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_oneName', oneName);
				localStorage.setItem('trigger_twoName', twoName);
				localStorage.setItem('trigger_oneBirthday', oneBirthday);
				localStorage.setItem('trigger_twoBirthday', twoBirthday);
				localStorage.setItem('trigger_oneBirthdayCity', oneBirthdayCity);
				localStorage.setItem('trigger_twoBirthdayCity', twoBirthdayCity);
				localStorage.setItem('trigger_oneTimeHour', oneTimeHour);
				localStorage.setItem('trigger_twoTimeHour', twoTimeHour);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
				return 0;
			}
		}
		createOrder();
	});


	$(document).on('click', '.prompt_title', function () {
		$('.mask').fadeIn(100);
		$('.prompt_explain').fadeIn(200);
	});

	$(document).on('click', '.close_img,.mask', function () {
		$('.mask').fadeOut(100);
		$('.prompt_explain').fadeOut(200);
	});


	function createOrder() {
		console.log('userId=' + userId);
		console.log('deviceid=' + deviceId);
		var jsonData = JSON.stringify({
			OneName: oneName,
			orderName: '塔罗爱情合盘',
			OneBirthday: oneBirthday,
			OneBirthdayCity: oneBirthdayCity,
			OneLong: oneLong,
			OneLat: oneLat,
			OneTimeHour: oneTimeHour,
			OneSex: oneSex,
			TwoName: twoName,
			TwoBirthday: twoBirthday,
			TwoBirthdayCity: twoBirthdayCity,
			TwoLong: twoLong,
			TwoLat: twoLat,
			TwoTimeHour: twoTimeHour,
			TwoSex: twoSex,
			channel: sourceType,
			PToken: pushToken,
			Token: pToken,
			UserID: userId,
			DeviceID: deviceId,
			Idfa: idfa,
			DeviceMac: mac,
			posId: posId,
			boundId: boundId,
			goodsId: '2C8B778C96D24DD2BD04F80710036E81',
			ClientType: channel,
			ImeiNumber: imei,
			sysVersion: sysVersion,
			appVersion: appVersion
		});
		console.log(jsonData);
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/TarotDisc/CreateOrder',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: jsonData,
			beforeSend: function () {
				$('.mask').fadeIn(0);
				$('.loading').fadeIn(0);
			},
			success: function (res) {
				// console.log(res);
				// debugger;
				$('.mask').fadeOut(0);
				$('.loading').fadeOut(0);
				orderid = res.data.orderID;
				jumpToResult(orderid);
				console.log('orderid=' + orderid);
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
		// jumpToResult(orderid);
	}

	function jumpToResult(orderid) {
		setTimeout(function () {
			location.href = 'result.html?orderid=' + orderid + '&orderName=塔罗爱情合盘&userid=' + userId + '&deviceid=' + deviceId + '&posid=' + posId + '&channel=' + channel + '&onename=' + oneName + '&onesex=' + oneSex + '&twoname=' + twoName + '&twosex=' + twoSex + '&couponId=' + couponId + '&imei=' + imei;
		}, 0);
	}

});


var intervalCounter = 0;
// 提示信息
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

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

var sex = 1; //男
var originalAllObj;


// userinfocallback();
// 客户端回调函数
function userinfocallback(result) {
	var originalString = Base64.decode(result);
	originalAllObj = JSON.parse(originalString);
	if (originalAllObj && originalAllObj.native_score) {
		var native_score = originalAllObj.native_score;
		if (native_score.userId && native_score.userId.length !== 0) {
			userId = native_score.userId;
		}
		if (native_score.deviceId && native_score.deviceId.length !== 0) {
			deviceId = native_score.deviceId;
		}
	}
	var originalObj = originalAllObj.lyys || originalAllObj.bzcs || originalAllObj.native_jryc || originalAllObj.native_usercenter;
	if (originalObj && originalObj.name && originalObj.name.length !== 0) {
		$('#your_name').val(originalObj.name);
		console.log(originalObj.name);
	}
	if (originalObj && originalObj.date && originalObj.date.length !== 0) {
		var year = (originalObj.date.substring(0, 4)),
			month = (originalObj.date.substring(5, 7)),
			day = (originalObj.date.substring(8, 10));
		$('#birth_day_one').val('公历 ' + year + '年' + month + '月' + day + '日');
		$('#birth_day_one').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	}
	if (originalObj && originalObj.time && originalObj.time.length !== 0) {
		var hour = originalObj.time.substr(0, 2);
		$('#birth_time_one_dummy').val(hour + ':00-' + hour + ':59');

		// $('#birth_time_one_dummy').change(function() {
		// 	if ($(this).val() === '-1' || $(this).val() === 'null' || $(this).val().length === 0) {
		// 		return false;
		// 	}
		// 	bornTime = $(this).val();
		// });
	}
	if (originalObj && originalObj.sex !== undefined && parseInt(originalObj.sex) !== -1) {
		sex = parseInt(originalObj.sex);
		console.log(sex);
		if (sex === 0) {
			$('.sex_one > .sex_famale').addClass('on');
			$('.sex_one > .sex_male').removeClass('on');
			$('.sex_one > .sex_male > .sex_icon').attr('src', '../img/male_icon.png');
			$('.sex_one > .sex_famale > .sex_icon').attr('src', '../img/famale_icon.png');
			oneSex = 0;
		} else {
			$('.sex_one > .sex_male').addClass('on');
			$('.sex_one > .sex_famale').removeClass('on');
			$('.sex_one > .sex_male > .sex_icon').attr('src', '../img/male_icon_unselect.png');
			$('.sex_one > .sex_famale > .sex_icon').attr('src', '../img/famale_icon_unselect.png');
			oneSex = 1;
		}
	}
}
// //取消显示分享
// if (window.ylwindow && window.ylwindow.enableShare) {
// 	window.ylwindow.enableShare(false);
// }
// window.appCallback_showShare = function () {
// 	return 0;
// };

var title = '点我，知晓ta的所有秘密！';
var text = '详批感情纠葛，避开感情陷阱。';
var imageURL = location.origin + '/numberology/xzhp/img/xzhpShare.jpg';
var textObj = {
	title: title,
	text: title,
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
wnlui.wxShare({
  title: '星盘合盘',
  text: '我在万年历看【星盘合盘】，分享给你，一起看吧！',
  imgUrl: imageURL,
  imageUrl: imageURL,
  url: location.href
});

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

// //取消显示收藏
// if (window.ylwindow && window.ylwindow.enableCollect) {
// 	window.ylwindow.enableCollect(false);
// }
// window.appCallback_showCollect = function () {
// 	return 0;
// };
