$(function () {
	var Sex = 0; //性别 男->1,女->0,默认为女
	var yourName;
	var yourBirthDate;
	var yourBirthTime;
	var yourBirthPlace;
	var orderId; //订单编号

	var gLBirthday;
	var calendrtype; //0,公历 1,农历
	var long; //出生城市经度
	var lat; //出生城市维度
	var ordername; //订单名称
	var clientType;
	var goodsId; //产品编号
	var parterId; //商户id
	var ordername;
	var appVersion;
	var sysVersion;

	ordername = '星盘前世今生';
	goodsId = 'F4B189A3A2A447DB828F2D6A4FB40FDC'; //正式
	// goodsId = 'C96997A0DCDF436CB902ED40E0840AB2'; //测试
	parterId = 'ChartPastLife';



	var ua = window.navigator.userAgent;
	appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
	sysVersion = GetIOSVersion() || getAndroidVersion();

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

	//clientType
	clientType = 'Youloft_IOS';
	if (browser.isIOS()) {
		clientType = 'Youloft_IOS';
	} else if (browser.isAndroid()) {
		clientType = 'Youloft_Android';
	} else {
		clientType = 'other';
	}


	function getQueryValue(key) {
		var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
		return null;
	}

	$(document).on('click', '.sex-female,.sex-male', function () {
		$('.sex-female,.sex-male').removeClass('sex-on');
		$(this).addClass('sex-on');
		$('.sex-type').css('color', '#bfbfbf')
		$(this).find('.sex-type').css('color', '#fff');
		if ($('.sex-female').hasClass('sex-on')) {
			Sex = 0;
		} else {
			Sex = 1;
		}
	})

	/* 跳转至资料填写区域 */
	$(document).on('click', '.submitBtn01,.submitBtn02', function () {
		yourName = $("#yourName").val().trim();
		yourBirthDate = $("#yourBirthDay").val().replace(/\s/g, ""); //去掉用户输入的字符
		yourBirthPlace = $('#yourBirthPlace').val();
		var deviceHeight = $(window).height();
		if (yourName == '' || yourBirthDate == '' || yourBirthPlace == '') {
			$('body').animate({
				scrollTop: deviceHeight / 10
			}, 500);
		} else {
			$('#submitBtn').trigger('click');
		}

	})
	$('#yourBirthPlace').focus(function () {
		document.activeElement.blur();
	});
	$('.customerFeedbackContent').marquee();

	getTestNum();

	function getTestNum() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartPastLife/GetCeSuanOrderNum',
			type: 'get',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			async: false,
			beforeSend: function () {

			},
			success: function (res) {
				var testNum = res.data;
				testNum = testNum + 1000;
				if (testNum > 10000) {
					var testNumDis = parseFloat(testNum / 10000).toFixed(1);
					console.log(testNumDis);
					var testNumContent = testNumDis + 'w人揭秘今生';
					$(".revealingNum").html(testNumContent);
				} else {
					var testNumContent = '已有' + testNum + '人揭秘今生';
					$(".revealingNum").html(testNumContent);
				}
				$('.revealingNum').show();
				/* console.log(res.data); */
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}

	$('.circleMask, circleMaskBackground').on('touchmove', function (e) {
		e.preventDefault();
	})

	//日期控件和时间控件初始化
	$("#yourBirthDay").mobiscroll().datePicker({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh',
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		defaultDate: '2011-03-10',
		minDate: new Date(1906, 0, 1),
		maxDate: new Date(2006, 0, 1)
	});

	$('#yourBirthDay').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);
	//创建出生时间控件
	$("#yourBirthTime").mobiscroll().select({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh'
	});

	/* 输入信息提示 */
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

	/* 点击提交按钮 */
	$(document).on('click', '#submitBtn', function () {
		yourName = $("#yourName").val().trim();
		yourBirthDate = $("#yourBirthDay").val().replace(/\s/g, ""); //去掉用户输入的字符
		yourBirthDate = yourBirthDate.substr(2).trim().replace("年", "-").replace("月", "-").replace("日", "");
		yourBirthTime = $('#yourBirthTime').val();
		yourBirthPlace = $('#yourBirthPlace').val();
		//获取城市经纬度
		long = localStorage.getItem('cityLong');
		lat = localStorage.getItem('cityLat');
		var nowYear = new Date().getFullYear()
		if (yourBirthTime == '不清楚出生时间') {
			yourBirthTime = '12:00:00';
		}

		if (localStorage.getItem('trigger_flag') === 'yes') {
			yourName = localStorage.getItem('trigger_name');
			yourBirthDate = localStorage.getItem('trigger_bornDate');
			yourBirthTime = localStorage.getItem('trigger_bornTime');
			Sex = localStorage.getItem('trigger_sex');
			yourBirthPlace = localStorage.getItem('trigger_yourBirthPlace');
			localStorage.setItem('trigger_flag', 'no');

		}

		//判断输入是否有特殊字符
		var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		if (reg.test(yourName)) {
			isWorking = false;
			drawToast('请填写正确的姓名');
			return false;

		}
		if (yourName.match(/^[\u4e00-\u9fa5]+$/)) {
			if (yourName.length > 5) {
				isWorking = false;
				drawToast('请填写正确的姓名');
				return false;
			}
		} else {
			if (yourName.length > 10) {
				isWorking = false;
				drawToast('请填写正确的姓名');
				return false;
			}
		}

		if (yourName.length == 0) {
			isWorking = false;
			drawToast('请填写您的姓名');
			return false;
		}

		if (yourBirthDate.length === 0) {
			isWorking = false
			drawToast('请选择您的出生日期');
			return false;
		}
		if (yourBirthPlace == '') {
			isWorking = false;
			drawToast('请选择您的出生地点');
			return false;
		}

		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_name', yourName);
				localStorage.setItem('trigger_bornDate', yourBirthDate);
				localStorage.setItem('trigger_bornTime', yourBirthTime);
				localStorage.setItem('trigger_sex', Sex);
				localStorage.setItem('trigger_yourBirthPlace', yourBirthPlace);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
			}
		}
		//channle
		//创建订单
		creatOrder();
	})


	function creatOrder() {
		var posIdqsjs = localStorage.getItem('posIdqsjs');
		if (posIdqsjs) {
			posId = posIdqsjs;
		}
		if (channel == '' || channel == null) {
			channel = 'appStore'
		}
		console.log(posId);
		var jsonData = JSON.stringify({
			Name: yourName,
			Birthday: yourBirthDate,
			GLBirthday: yourBirthDate,
			Calendrtype: 0,
			birthtimeHour: yourBirthTime,
			Long: long,
			Lat: lat,
			birthdaycity: yourBirthPlace,
			Sex: Sex,
			ordername: ordername,
			goodsid: goodsId,
			parterid: parterId,
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
			Channel: channel,
			TotalFee: 28
		});

		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartPastLife/CreateOrder',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: jsonData,
			beforeSend: function () {
				$('.mask,.circleMask').removeClass('hidden');
				$('.maskImage,.maskContent').addClass('jumpOut');
			},
			success: function (res) {
				$('.mask,.circleMask').addClass('hidden');
				orderId = res.data.orderID;
				if (res.status == 0) {
					location.href = 'result.html?userId=' + userId + '&deviceId=' + deviceId + '&mac=' + mac + '&imei=' + imei + '&idfa=' + idfa + '&channel=' + channel + '&boundId=' + boundId + '&pushToken=' + pushToken + '&pToken=' + pToken + '&posId=' + posId + '&couponId=' + couponId + '&orderId=' + orderId;
				}
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}

	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.bottomFixBtn').css('bottom', 34);
		$('.iphoneXAdaptation').show();
	}
	/* $('.bottomFixBtn').css('bottom',34);
	$('.iphoneXAdaptation').show(); */
})
