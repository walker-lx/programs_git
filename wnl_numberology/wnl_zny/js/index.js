$(function () {
	var yourName;
	var yourBirthday;
	var yourBirthTime;
	var yourBirthPlace;

	var xz;
	var sx;
	var gLBirthday;
	var calendrtype; //0,公历 1,农历
	var long; //出生城市经度
	var lat; //出生城市维度
	var sex; //	1,男 0,女
	var ordername; //订单名称
    /* var goodsId = 'C55058EA96B3495E86FB62C6A548F993'; //产品编号--测试 */
    var goodsId = '50FE1680DF4B48CD9095D03C404C64B7'; //产品编号--正式
	var parterid; //商户id
	var clientType;

	var sysversion;
	var appversion;
	var totalFee;
	var orderId; //定义订单Id

	ordername = '星盘子女运';

	//性别切换
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

	$(document).on('click', '.turnToData', function () {
		yourName = $('#yourName').val().trim();
		yourBirthday = $('#yourBirthDay').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', ''); //获取出生日期
		yourBirthTime = $('#yourBirthTime').val(); //获取出生时间
		yourBirthPlace = $('#yourBirthPlace').val(); //获取出生地点
		if (yourName && yourBirthday && yourBirthTime && yourBirthPlace) {
			$('.order-submit').trigger('click');
		} else {
			var height = $(window).height();
			$('body').scrollTop(35 * height / 100);
		}
	})
	$(function () {
		$("#yourBirthPlace").focus(function () {
			document.activeElement.blur();
		});
	})
	//获取测算人数
	getTestNum();

	function getTestNum() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/LuckChildren/GetCeSuanOrderNum',
			type: 'post',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			async: false,
			beforeSend: function () {

			},
			success: function (res) {
				var testNum = res.data;
				if (testNum > 10000) {
					var testNumDis = parseFloat(testNum / 10000);
					testNumDis = testNumDis.toFixed(1);
					var testNumContent = testNumDis + '万人参与测算';
					$("#test-number").html(testNumContent);
				} else {
					var testNumContent = '已有' + res.data + '用户参与测试,';
					$("#test-number").html(testNumContent);
				}
				$("#test-number-great").html('97%的用户点赞');
				console.log(res.data);
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}
	//信息提示
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
	//clientType
	var clientType = 'Youloft_IOS';
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


	if (browser.isWx()) {
		channel = sourceType;
	}
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

	//创建日期控件
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

	//控制tips弹出
	$(document).on('click', '.tips', function () {
		$('.mask').fadeIn(100);
		$('.prompt_explain').fadeIn(200);
	});

	$(document).on('click', '.close_img,.mask', function () {
		$('.mask').fadeOut(100);
		$('.prompt_explain').fadeOut(200);
	});

	var isWorking = false;


	//订单提交
	$('.order-submit').on('click', function () {
		//获取用户输入的信息
		isWorking = true;
		yourName = $('#yourName').val().trim();
		yourBirthday = $('#yourBirthDay').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', ''); //获取出生日期
		yourBirthTime = $('#yourBirthTime').val(); //获取出生时间
		yourBirthPlace = $('#yourBirthPlace').val(); //获取出生地点


		if (localStorage.getItem('trigger_flag') === 'yes') {
			yourName = localStorage.getItem('trigger_yourName');
			yourBirthday = localStorage.getItem('trigger_yourBirthday');
			yourBirthPlace = localStorage.getItem('trigger_yourBirthPlace');
			yourBirthTime = localStorage.getItem('trigger_yourBirthTime');
			long = localStorage.getItem('trigger_yourLong');
			lat = localStorage.getItem('trigger_yourLat');
			sex = localStorage.getItem('trigger_yourSex');
			localStorage.setItem('trigger_flag', 'no');
		}

		//判断输入是否有特殊字符
		var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		if (reg.test(yourName)) {
			isWorking = false;
			drawToast('请正确输入名字');
			return false;
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

		long = localStorage.getItem('cityLong');
		lat = localStorage.getItem('cityLat');

		//将公历转换为农历
		var glDate = yourBirthday.split('-');
		var glYear = glDate[0];
		var glMonth = glDate[1];
		var glDay = glDate[2];
		var nlDate = calendar.solar2lunar(glYear, glMonth - 1, glDay);

		var nlYear = nlDate.cYear;
		var nlMonth = nlDate.cMonth;
		var nlDay = nlDate.cDay;
		sx = nlDate.Animal;
		xz = nlDate.astro;

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
				localStorage.setItem('trigger_yourSex', sex);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
				return false;
			}
		}

		createOrder();
	});


	/**
	 * 创建订单
	 *
	 */
	function createOrder() {
		var jsonData = JSON.stringify({
			Name: yourName,
			xz: xz,
			sx: sx,
			Birthday: yourBirthday,
			GLBirthday: yourBirthday,
			Calendrtype: 0,
			birthtimeHour: yourBirthTime,
			Long: long,
			Lat: lat,
			birthdaycity: yourBirthPlace,
			Sex: sex,
			ordername: ordername,
			goodsid: goodsId,
			parterid: 'LuckChildren',
			ClientType: clientType,
			PToken: pushToken,
			Token: pToken,
			UserID: userId,
			DeviceID: deviceId,
			Idfa: idfa,
			DeviceMac: mac,
			ImeiNumber: imei,
			sysVersion: sysversion,
			appVersion: appversion,
			boundid: boundId,
			Channel: sourceType,
			TotalFee: 58
		});
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/LuckChildren/CreateOrder',
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
				jumpToResult(orderId);
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}

	function jumpToResult(orderid) {

		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/LuckChildren/GetOrderDetail?orderid=' + orderid + '&userid=' + userId + '&deviceid=' + deviceId,
			type: 'POST',
			dataType: 'json',
			beforeSend: function () {},
			success: function (res) {
				//将返回的JSON存到到localStorage里
				location.href = 'home.html?userId=' + userId + '&deviceId=' + deviceId + '&mac=' + mac + '&imei=' + imei + '&idfa=' + idfa + '&channel=' + channel + '&boundId=' + boundId + '&pushToken=' + pushToken + '&pToken=' + pToken + '&posId=' + posId + '&couponId=' + couponId + '&orderId=' + orderId;
			},
			err: function (res) {
				console.log('err:' + err);
			}

		});
	}


	/**
	 * 用户反馈
	 */
	//customerFeedbackContent();

	function customerFeedbackContent() {
		$('#customerFeedbackContentDetail01 > li').each(function () {
			var customerFeedbackContentDetailHeight = $(this).children().eq(1).height();
			if (customerFeedbackContentDetailHeight == 36) {
				$(this).css('height', '36px');
			}
		})
	}


	customerFeedbackScroll();

	function customerFeedbackScroll() {
		var area = document.getElementById('customerFeedbackContentDetail');
		var con1 = document.getElementById('customerFeedbackContentDetail01');
		var con2 = document.getElementById('customerFeedbackContentDetail02');
		con2.innerHTML = con1.innerHTML;

		function scrollUp() {
			if (area.scrollTop >= con1.offsetHeight) {
				area.scrollTop = 0;
			} else {
				area.scrollTop++;
			}
		}
		var time = 50;
		var mytimer = setInterval(scrollUp, time);
		area.onmouseover = function () {
			clearInterval(mytimer);
		}
		area.onmouseout = function () {
			mytimer = setInterval(scrollUp, time);
		}
    }
    /* 适配iphoneX */
    if(browser.isIOS() && window.devicePixelRatio===3 && document.body.clientWidth === 375) {
        $('.iphoneXAdaptation').show();
    }
    /* $('.iphoneXAdaptation').show(); */
})
