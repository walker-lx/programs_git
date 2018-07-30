$(function () {

	var oneCalendr = 0; //公历
	var twoCalendr = 1; //农历
	var sex = 0;
	var orderType = 0; //订单类型，	0,测自己 1,看别人
	var long; //定义出生城市经度
	var lat; //出生城市纬度
	var clientType;

	var yourName;
	var yourBirthday;
	var yourBirthTime;
	var yourBirthPlace;
	var yourBirthTimeCount = 0;


	var orderId;

	var goodsId;

	goodsId = 'DF98D0EDA6D8441EA9B9CACE029D154F'; //正式环境
	// goodsId = '14540C2A305040CDB4A05CA6FB6AD4B6'; //测试环境
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

	var ua = window.navigator.userAgent;


	//判断设备
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
	var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
	var sysVersion = GetIOSVersion() || getAndroidVersion();

	/* posId = posId.toLowerCase(); */
	if (posId) {
		posId = posId.trim();
		switch (posId) {
			case 'QDMZXP':
				goodsId = 'F5D38F193A704143BFA08207758A8254'; //正式环境-往返APP
				/* goodsId = '3FEF935AD71C4AA8A3D40484CE009E26'; //测试环境-往返APP */
				break;

			case 'qdmzxp':
				goodsId = 'F5D38F193A704143BFA08207758A8254'; //正式环境-往返APP
				/* goodsId = '3FEF935AD71C4AA8A3D40484CE009E26'; //测试环境-往返APP */
				break;
		}
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
	//获取测算人数
	getTestNum();

	function getTestNum() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartHalf/GetCeSuanOrderNum',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			beforeSend: function () {

			},
			success: function (res) {
				var testNum = res.data;
				if (testNum > 10000) {
					var testNumDis = parseInt(testNum / 10000);
					var testNumContent = testNumDis + '万人参与测算';
					$("#test-number").html(testNumContent);
				} else {
					var testNumContent = res.data + '人参与测算';
					$("#test-number").html(testNumContent);
				}
				console.log(res.data);
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}


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
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
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
	$('#birth_day_one').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);

	//创建出生时间选择控件
	$('#birth_time_one').mobiscroll().select({
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




	//看自己或者看他人选择

	$(document).on('click', '.set > .self-div', function () {
		$('.set > .self-div > .self').addClass('active');
		$('.set > .other-div > .other').removeClass('active');
		var wnlUserInfo_username = localStorage.getItem('wnlUserInfo_username');
		$('#your_name').val(wnlUserInfo_username);
		var wnlUserInfo_birthDay = localStorage.getItem('wnlUserInfo_birthDay');
		$('#birth_day_one').val(wnlUserInfo_birthDay);
		var wnlUserInfo_birthtime = localStorage.getItem('wnlUserInfo_birthtime');
		$('#birth_time_one_dummy').val(wnlUserInfo_birthtime);
		$("#nameLabel").html('你的名字');
		return orderType = 0;
	});
	$(document).on('click', '.set > .other-div', function () {
		$('.set > .other-div > .other').addClass('active');
		$('.set > .self-div > .self').removeClass('active');
		$('#your_name').val('');
		$('#birth_day_one').val('');
		$('#birth_time_one_dummy').val('');
		$("#nameLabel").html('对方名字');
		return orderType = 1;
	})

	//性别选择
	$(document).on('click', '.sex > .sex-female', function () {
		$('.sex > .sex-female').addClass('sex-on');
		$('.sex > .sex-male').removeClass('sex-on');
		$('.sex-male > img').attr('src', './img/male_icon.png');
		$('.sex-female > img').attr('src', './img/famale_icon.png');
		$('.sex-male > .sex-type').css('color', '#bfbfbf');
		$('.sex-female > .sex-type').css('color', '#fff');
		return sex = 0;

	});
	$(document).on('click', '.sex > .sex-male', function () {
		$('.sex > .sex-male').addClass('sex-on');
		$('.sex > .sex-female').removeClass('sex-on');
		$('.sex-male > img').attr('src', './img/male_icon_unselect.png');
		$('.sex-female > img').attr('src', './img/famale_icon_unselect.png');
		$('.sex-male > .sex-type').css('color', '#fff');
		$('.sex-female > .sex-type').css('color', '#bfbfbf');
		return sex = 1;
	});

	// 判断是男生还是女生

	$(document).on('click', '.sex > .sex-female', function () {

	});

	//输入验证
	$('.input-name').oninput = function () {
		$(this).setCustomValidity('');
	};
	$('.input-name').oninvalid = function () {
		$(this).setCustomValidity('请输入最多5个中文');
	};

	$('.input-name').focus(function () {

	})

	var isWorking = false;
	$(document).on('click', '.order-submit', function () {
		if (isWorking) {
			return false;
		}
		//读取localStorage
		isWorking = true;
		yourName = $('#your_name').val().trim(); //获取姓名
		yourBirthday = $('#birth_day_one').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', ''); //获取出生日期
		yourBirthTime = $('#birth_time_one').val(); //获取出生时间
		yourBirthPlace = $('#your_birth_place').val(); //获取出生地点
		console.log('place' + yourBirthPlace);

		if (localStorage.getItem('trigger_flag') === 'yes') {
			yourName = localStorage.getItem('trigger_yourName');
			yourBirthday = localStorage.getItem('trigger_yourBirthday');
			yourBirthPlace = localStorage.getItem('trigger_yourBirthPlace');
			yourBirthTime = localStorage.getItem('trigger_yourBirthTime');
			long = localStorage.getItem('trigger_yourLong');
			lat = localStorage.getItem('trigger_yourLat');
			orderType = localStorage.getItem('trigger_yourOrderType');
			sex = localStorage.getItem('trigger_yourSex');
			localStorage.setItem('trigger_flag', 'no');
		}

		if (yourName.match(/^[\u4e00-\u9fa5]+$/)) {
			if (yourName.length > 5) {
				isWorking = false;
				drawToast('请正确输入名字');
				return false;
			}
		} else {
			if (yourName.length > 10) {
				isWorking = false;
				drawToast('请正确输入名字');
				return false;
			}
		}
		if (yourName.length == 0) {
			isWorking = false;
			drawToast('请填写您的姓名');
			return false;
		}
		if (yourBirthday.length === 0) {
			isWorking = false
			drawToast('请选择您的出生日期');
			return false;
		}


		if (yourBirthPlace == '') {
			isWorking = false;
			drawToast('请选择您的出生地点');
			return false;
		}

		if (browser.isWx) {
			if (openid) {
				cityFirst = localStorage.getItem('trigger_cityFirst');
				citySecond = localStorage.getItem('trigger_citySecond');
				cityThird = localStorage.getItem('trigger_cityThird');
			}
		}

		//获取城市经纬度
		long = localStorage.getItem('cityLong');
		lat = localStorage.getItem('cityLat');


		//设置localStorage
		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_yourName', yourName);
				localStorage.setItem('trigger_yourBirthday', yourBirthday);
				localStorage.setItem('trigger_yourBirthPlace', yourBirthPlace);
				localStorage.setItem('trigger_yourBirthTime', yourBirthTime);
				localStorage.setItem('trigger_yourLong', long);
				localStorage.setItem('trigger_yourLat', lat);
				localStorage.setItem('trigger_yourOrderType', orderType);
				localStorage.setItem('trigger_yourSex', sex);
				localStorage.setItem('trigger_cityFirst', cityFirst);
				localStorage.setItem('trigger_citySecond', citySecond);
				localStorage.setItem('trigger_cityThird', cityThird);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
				return false;
			}
		}


		//设置用户名的localStorage
		localStorage.setItem('yourName', yourName);
		//设置订单类型的localStorage
		localStorage.setItem('orderType', orderType);
		createOrder();
	});


	//控制tips弹出
	$(document).on('click', '.tips', function () {
		$('.mask').fadeIn(100);
		$('.prompt_explain').fadeIn(200);
	});

	$(document).on('click', '.close_img,.mask', function () {
		$('.mask').fadeOut(100);
		$('.prompt_explain').fadeOut(200);
	});

	$("#your_birth_place").focus(function () {
		document.activeElement.blur();
	});

	//创建订单

	function createOrder() {
		var jsonData = JSON.stringify({
			Name: yourName,
			Birthday: yourBirthday,
			GLBirthday: yourBirthday,
			Calendrtype: oneCalendr,
			birthtimeHour: yourBirthTime,
			Long: long,
			Lat: lat,
			birthdaycity: yourBirthPlace,
			Sex: sex,
			ordertype: orderType,
			goodsid: goodsId,
			parterid: 'ChartHalf',
			ClientType: clientType,
			PToken: pushToken,
			Token: pToken,
			UserID: userId,
			DeviceID: deviceId,
			Idfa: idfa,
			DeviceMac: mac,
			ImeiNumber: imei,
			sysVersion: sysVersion,
			appVersion: appVersion,
			boundid: boundId,
			Channel: sourceType,
			TotalFee: 28
		});
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartHalf/CreateOrder',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: jsonData,
			beforeSend: function () {
				$('.mask').fadeIn(0);
				$('.loading').fadeIn(0);
			},
			success: function (res) {
				$('.mask').fadeOut(0);
				$('.loading').fadeOut(0);
				console.log(res);
				orderId = res.data.orderID;
				location.href = 'home.html?userId=' + userId + '&deviceId=' + deviceId + '&mac=' + mac + '&imei=' + imei + '&idfa=' + idfa + '&channel=' + channel + '&boundId=' + boundId + '&pushToken=' + pushToken + '&pToken=' + pToken + '&posId=' + posId + '&couponId=' + couponId + '&orderId=' + orderId;
				//jumpToResult(orderId);
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}
	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.iphoneXAdaptation').show();
	}
	/* $('.iphoneXAdaptation').show(); */

})

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

var originalAllObj;


// 客户端回调函数
function userinfocallback(result) {
	var originalString = Base64.decode(result);
	originalAllObj = JSON.parse(originalString);
	console.log(originalAllObj.native_usercenter);
	if (originalAllObj.native_usercenter) {
		$('#your_name').val(originalAllObj.native_usercenter.name);

		localStorage.setItem('wnlUserInfo_username', originalAllObj.native_usercenter.name);

	}

	if (originalAllObj.native_usercenter) {
		var wnlUserBirthday = originalAllObj.native_usercenter.date;
		var year = wnlUserBirthday.substring(0, 4);
		var month = wnlUserBirthday.substring(5, 7);
		var day = wnlUserBirthday.substring(8, 10);
		var wnlUserInfo_birthDay = '公历 ' + year + '年' + month + '月' + day + '日';
		localStorage.setItem('wnlUserInfo_birthDay', wnlUserInfo_birthDay);
		$('#birth_day_one').val('公历 ' + year + '年' + month + '月' + day + '日');
		console.log(wnlUserBirthday, year, month, day);
	}

	if (originalAllObj.native_usercenter) {
		var wnlUserBirthtime = originalAllObj.native_usercenter.time;
		console.log(wnlUserBirthtime);
		var hour = wnlUserBirthtime.substr(0, 2);
		console.log(hour);
		var wnlUserInfo_birthtime = hour + ':00-' + hour + ':59'
		localStorage.setItem('wnlUserInfo_birthtime', wnlUserInfo_birthtime);
		$('#birth_time_one_dummy').val(wnlUserInfo_birthtime);
	}

}
