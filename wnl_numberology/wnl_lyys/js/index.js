console.log('init the index');
var isExist = true;
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

if (browser.isIOS()) {
	$('.confirm_btn_fixed').css({
		'background-color': 'rgba(252, 251, 249, 0.8)'
	});
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

var localData = localStorage.getItem('wnl_lyys_local_data');
if (localData) {
	localData = JSON.parse(localData);
} else {
	localData = {};
}

localData.userId = userId;

// iphoneX适配
function isIphoneX() {
	ua = window.navigator.userAgent;
	if (ua.match(/iPhone|iPad|iPod/i)) {
		if (parseInt(window.devicePixelRatio) === 3 && parseInt(window.screen.width) === 375) {
			return true;
		}
		return false;
	}
	return false;
}

function iphoneXFits(container, fitsArr) {
	// var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: rgba(255, 255, 255, 0);"></div>'
	// $('body').append(iphoneXbanner);
	paddingBottomFits(container);
	bottomArrFits(fitsArr);
}

function paddingBottomFits(container) {
	for (i = 0; i < container.length; i++) {
		var heightSet = parseInt($(container[i]).css('height')) + 34;
		$(container[i]).css({
			'height': heightSet
		});
		var paddingSet = parseInt($(container[i]).css('padding-bottom')) + 34;
		$(container[i]).css({
			'padding-bottom': paddingSet
		});
	}
}

function bottomArrFits(fitsArr) {
	var i;
	for (i = 0; i < fitsArr.length; i++) {
		var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34;
		$(fitsArr[i]).css('bottom', bottomSet);
	}
}
if (isIphoneX()) {
	// 需上移的包裹容器
	// var container = ['.inner_content'];
	// // 需上移的Fixed按钮
	// var fitsArr = [''];
	// iphoneXFits(container, fitsArr);
	$('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden_iphoneX');
	$('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden');
	$('.wnl_history_btn').css({
		'bottom': '44px'
	});
	$('.copyRight').css('padding-bottom', '40px');
}

$(function () {
	getPredictNum();
	getComments();
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 8000, //可选选项，自动滑动
		// 如果需要分页器
		pagination: '.swiper-pagination',
		speed: 300

		// 如果需要前进后退按钮
		//nextButton: '.swiper-button-next',
		//prevButton: '.swiper-button-prev',

		// 如果需要滚动条
		//scrollbar: '.swiper-scrollbar',
	})
	$('.cesuan_comments').marquee({
		animateTime: 1000,
		stopTime: 6000,
		adjustHeight: 28
	});

	window.onscroll = function () {
		/* console.log('aaa');
		console.log($('.visible_confirm_btn').offset().top - $(document).scrollTop()); */
		if ($('.visible_confirm_btn').offset().top - $(document).scrollTop() <= -50) {
			if (isIphoneX()) {
				if ($('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden_iphoneX')) {
					$('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden_iphoneX');
					$('.wnl_history_btn').addClass('wnl_history_btn_up_iphoneX');
					$('.confirm_btn_fixed').css({
						'padding-bottom': '34px'
					});
					$('.confirm_btn_fixed').css({
						'height': '94px'
					})
				}
			} else {
				if ($('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden')) {
					$('.confirm_btn_fixed').removeClass('confirm_btn_fixed_hidden');
					$('.wnl_history_btn').addClass('wnl_history_btn_up');
				}
			}
		} else {
			if (isIphoneX()) {
				if (!$('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden_iphoneX')) {
					$('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden_iphoneX');
					$('.wnl_history_btn').removeClass('wnl_history_btn_up_iphoneX');
				}
			} else {
				if (!$('.confirm_btn_fixed').hasClass('confirm_btn_fixed_hidden')) {
					$('.confirm_btn_fixed').addClass('confirm_btn_fixed_hidden');
					$('.wnl_history_btn').removeClass('wnl_history_btn_up');
				}
			}
		}
	};

	$(".groupItem").on("scroll", function () {
		scrollEndX = e.originalEvent.changedTouches[0].pageX,
			scrollEndY = e.originalEvent.changedTouches[0].pageY;
		console.log(scrollEndX);
	})
	$(".groupItem").on("touchstart", function (e) {
		startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(".groupItem").on("touchmove", function (event) {
		//当屏幕有多个touch或者页面被缩放过，就不执行move操作
		// 　　if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
		// 　　var touch = event.targetTouches[0];
		// 　　endPos = {x:touch.pageX - startX,y:touch.pageY - startY};
		// 　　isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
		// 　　if(isScrolling === 0){
		// 　　　　event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
		// 　　　　this.slider.style.left = -this.index * 600 + endPos.x + 'px';
		// 　　}
	});
	$(".groupItem").on("touchend", function (e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY,
			index = parseInt(e.currentTarget.getAttribute('value'));
		if (Math.abs(X) > Math.abs(Y) && X > 10) {
			preItem(index);
		} else if (Math.abs(X) > Math.abs(Y) && X < -10) {
			nextItem(index);
		}
		// else if ( Math.abs(Y) > Math.abs(X) && Y > 10) {
		//     preItem(index);
		// }
		// else if ( Math.abs(Y) > Math.abs(X) && Y < -10 ) {
		//     nextItem(index);
		// }
		// else{
		//     alert("just touch");
		// }
	});
	$('body').click(function () {
		return;
	})
	if (!browser.isWnl()) {
		$('.wnlBanner').show();
	}
	$('.closeBanner').click(function () {
		$('.wnlBanner').hide();
	});
	$('.downloadBtn').click(function () {
		loadSchema('http://jptjios.51wnl.com/app/maintab?index=1', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&android_schema=youloft419805549://maintab?index=1');
	});
	// document.querySelector('.timeSelect').onclick = function() {
	// 	var datePicker = new wnlui.datePicker({
	// 		showLunar: true,
	// 		defaultValue: [1987, 6, 27],
	// 		onChange: function(result) {
	// 			console.log(result);
	// 		},
	// 		onConfirm: function(result) {
	// 			var val = '公历 ' + result.dateObj.cYear + (parseInt(result.dateObj.cMonth)< 10 ? ' 0' : ' ') + result.dateObj.cMonth + (parseInt(result.dateObj.cDay)< 10 ? ' 0' : ' ') + result.dateObj.cDay;
	// 			var bornDate = val.substr(3);
	// 			var year = (bornDate.substring(0, 4)),
	// 				month = (bornDate.substring(5, 7)),
	// 				day = (bornDate.substring(8, 10));
	// 			$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
	// 			if (str2Int(year) < 1936) {
	// 				drawToast('该出生年份无数据，请重新选择');
	// 				year = "1936";
	// 				$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
	// 				$('#spBirthDate').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	// 			} else if (str2Int(year) > 2006) {
	// 				drawToast('该出生年份无数据，请重新选择');
	// 				year = "2005";
	// 				$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
	// 				$('#spBirthDate').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	// 			}
	// 			$('.date_input').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	// 		}
	// 	});
	// 	datePicker.show();
	// };

	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
		}, 0);
	}
	isExist = getQueryValue('isexist');

	localData.deviceId = deviceId;

	localData.posId = posId;
	localData.boundId = boundId;
	localData.channel = channel;
	localData.pushToken = pushToken;
	localData.mac = mac;
	localData.imei = imei;
	localData.pToken = pToken;
	localData.idfa = idfa;
	var sourceType = getQueryValue('sourceType');
	if (!sourceType || sourceType === '') {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1;
		var isIOS = isIOSPhone || ua.indexOf('ipad') > -1;
		var isAndroid = ua.indexOf('android') > -1;
		if (isIOS) {
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
		} else if (isAndroid) {
			sourceType = 'wnl_android';
		} else {
			sourceType = 'other';
		}
	}
	localData.sourceType = sourceType;
	// var wnlUserId = getQueryValue('wnlid');
	// var appver = getQueryValue('appver');
	// var model = getQueryValue('model');
	// var osver = getQueryValue('osver');
	localStorage.setItem('wnl_lyys_local_data', JSON.stringify(localData));

	var jsonObj = {
		userId: userId,
		deviceId: deviceId,
		posId: posId,
		pushToken: pushToken,
		mac: mac,
		imei: imei,
		pToken: pToken,
		idfa: idfa,
		boundId: boundId,
		clientType: channel,
		sourceType: sourceType
	};
	var jsonString = jsonToQueryString(jsonObj);
	$('.cesuan_record_link').attr('href', 'list.html' + jsonString);


	// setTimeout(function() {
	// 	location.href = 'protocol://getuserinfo#userinfocallback';
	// }, 0);

	$('#spBirthDate').mobiscroll().datePicker({
		theme: 'ios',
		mode: 'scroller',
		display: 'bottom',
		lang: 'zh',
		isSolar: 1,
		enableSolarLunar: 1,
		showSolarLunar: 0,
		enableIgnore: 0,
		minDate: new Date(1936, 0, 1),
		maxDate: new Date(2006, 0, 1),
		onSelect: function (val) {
			console.log(val);
			var bornDate = val.substr(3);
			var year = (bornDate.substring(0, 4)),
				month = (bornDate.substring(5, 7)),
				day = (bornDate.substring(8, 10));
			if (str2Int(year) < 1936) {
				drawToast('该出生年份无数据，请重新选择');
				year = "1936";
				$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
				$('#spBirthDate').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
			} else if (str2Int(year) > 2006) {
				drawToast('该出生年份无数据，请重新选择');
				year = "2005";
				$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
				$('#spBirthDate').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
			}
			$('.date_input').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
		}
	});
	$('#spBirthDate').mobiscroll('setArrayVal', [1990, 1, 1], !1, !1, !1, 0);

	if (browser.isIOS()) {
		$('#ddlBirthHour').on('click', function () {
			$('.mask').removeClass('hidden');
		});
		$('#ddlBirthHour').on('blur', function () {
			$('.mask').addClass('hidden');
		});
		$('.mask').click(function () {
			$(this).addClass('hidden');
		});
	}

	$('#ddlBirthHour').change(function () {
		$('.mask').addClass('hidden');
		if ($(this).val() === '-1' || $(this).val() === 'null' || $(this).val().length === 0) {
			return false;
		}
		bornTime = $(this).val();
		$('.bornTimeTxt').html($('#ddlBirthHour option:selected').html());
	});
	$('.sexSelect').click(function () {
		$('.sexIcon').removeClass('active');
		$(this).find('.sexIcon').addClass('active');
		if ($(this).hasClass('manSexSelect')) {
			sex = 1;
		} else if ($(this).hasClass('womanSexSelect')) {
			sex = 0;
		}
	});

	$('#ddlBirthHour').val('24');
	$('#ddlBirthHour').trigger('change');
	$('#txtName').val('');
	$('#spBirthDate').val('');



	var dateNow = new Date();
	var dateNextMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
	dateNextMonth.setMonth(dateNow.getMonth() + 1);
	var beginDate = dateNow.getFullYear() + '-' + ((dateNow.getMonth() + 1) < 10 ? ('0' + (dateNow.getMonth() + 1)) : (dateNow.getMonth() + 1));
	var endDate = dateNextMonth.getFullYear() + '-' + ((dateNextMonth.getMonth() + 1) < 10 ? ('0' + (dateNextMonth.getMonth() + 1)) : (dateNextMonth.getMonth() + 1));

	var isWorking = false;
	$('.confirm_btn_fixed').click(function () {
		var top_banner_height = $('.top_banner').height();
		if (isWorking) {
			return false;
		}
		var name = $('#txtName').val().trim();
		bornDate = $('#spBirthDate').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', '');
		if (name.length === 0) {
			$('body').animate({
				scrollTop: top_banner_height
			}, 600);
			setTimeout(function () {
				drawToast('请填写您的姓名');
			}, 600);
			return false;
		}
		if (bornDate.length === 0) {
			$('body').animate({
				scrollTop: top_banner_height
			}, 600);
			setTimeout(function () {
				drawToast('请选择您的出生日期');
			}, 600);
			return false;
		}
		if (bornTime === '-1') {
			$('body').animate({
				scrollTop: top_banner_height
			}, 600);
			setTimeout(function () {
				drawToast('请选择您的出生时间');
			}, 600);
			return false;
		}
		$('.confirm_btn').trigger('click');
	})
	$('.circleMask, circleMaskBackground').on('touchmove', function (e) {
		e.preventDefault();
	})
	$('.confirm_btn').click(function () {
		// if (!browser.isWnl() && !browser.isWx()) {
		// 	loadSchema('http://jptjios.51wnl.com/app/maintab?index=1', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&android_schema=youloft419805549://maintab?index=1');
		// 	return false;
		// }
		if (isWorking) {
			return false;
		}
		isWorking = true;
		var name = $('#txtName').val().trim();
		bornDate = $('#spBirthDate').val().substr(3).trim().replace('年', '-').replace('月', '-').replace('日', '');
		if (localStorage.getItem('trigger_flag') === 'yes') {
			name = localStorage.getItem('trigger_name');
			bornDate = localStorage.getItem('trigger_bornDate');
			bornTime = localStorage.getItem('trigger_bornTime');
			localStorage.setItem('trigger_flag', 'no');
		}
		var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		if (reg.test(name)) {
			isWorking = false;
			drawToast('请填写正确的姓名');
			return false;

		}
		if (name.match(/^[\u4e00-\u9fa5]+$/)) {
			if (name.length > 5) {
				isWorking = false;
				drawToast('请填写正确的姓名');
				return false;
			}
		} else {
			if (name.length > 10) {
				isWorking = false;
				drawToast('请填写正确的姓名');
				return false;
			}
		}

		if (name.length === 0) {
			isWorking = false;
			drawToast('请填写您的姓名');
			return false;
		}

		if (bornDate.length === 0) {
			isWorking = false;
			drawToast('请选择您的出生日期');
			return false;
		}
		if (bornTime === '-1') {
			isWorking = false;
			drawToast('请选择您的出生时间');
			return false;
		}
		$('.circleMask').removeClass('hidden');
		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				localStorage.setItem('trigger_name', name);
				localStorage.setItem('trigger_bornDate', bornDate);
				localStorage.setItem('trigger_bornTime', bornTime);
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
			}
		}
		var prm = {
			'Name': name,
			'BirthDay': bornDate,
			'TimeHour': bornTime,
			'CalendarType': 0,
			'Sex': sex,
			'beginMonth': beginDate,
			'endMonth': endDate,
			'UserID': userId,
			'DeviceID': deviceId,
			'pushToken': pushToken,
			'DeviceMac': mac,
			'imei': imei,
			'idfa': idfa,
			'pToken': pToken,
			'channel': sourceType,
			'posId': posId,
			'clientType': channel,
			'boundId': boundId,
			'sysVersion': sysVersion,
			'appVersion': appVersion
		};
		var clientObj = {
			'lyys': {
				'name': name, //姓名 未填传空字符串
				'sex': sex, //性别 0：女 1：男 -1：未填
				'date': bornDate, //出生日期 1988-04-22 未填传空字符串
				'time': bornTime + ':00' //出生时间  未填传空字符串
			}
		};
		if (originalAllObj && !originalAllObj.native_jryc) {
			clientObj = {
				'lyys': {
					'name': name,
					'sex': sex,
					'date': bornDate,
					'time': bornTime + ':00'
				},
				'native_jryc': {
					'name': name,
					'sex': sex,
					'date': bornDate,
					'time': bornTime + ':00'
				}
			};
			if (bornTime === '24') {
				clientObj.native_jryc.time = '';
			}
		}
		$.ajax({
			cache: false,
			type: 'GET',
			dataType: 'json',
			url: '//coco70.51wnl.com/numberologynew/lunar/CreateOrder',
			data: prm,
			success: function (result) {
				isWorking = false;
				if (result.status == 0) {
					if (browser.isWnl()) {
						location.href = 'protocol://saveuserinfo#' + Base64.encode(JSON.stringify(clientObj));
					}
					setTimeout(function () {
						jsonObj = {
							userId: userId,
							deviceId: deviceId,
							posId: posId,
							pushToken: pushToken,
							mac: mac,
							imei: imei,
							pToken: pToken,
							idfa: idfa,
							boundId: boundId,
							clientType: channel,
							sourceType: sourceType,
							couponId: couponId
						};
						jsonString = jsonToQueryString(jsonObj);
						$('.maskImage,.maskContent').addClass('jumpOut');
						setTimeout(function () {
							$('.circleMask').addClass('hidden');
							localStorage.setItem('history_couponId', '');
							location.href = 'result.html' + jsonString + '&orderid=' + result.data.id + '&code=' + result.data.code;
						}, 330);
					}, 0);
				} else {
					if (result.msg.indexOf('999') > -1) {
						drawToast('请输入真实的姓名');
						return false;
					}
					drawToast('创建订单错误,请重试');
				}
			},
			error: function (xhr, ajaxOperation, throwErr) {
				isWorking = false;
				return false;
			}
		});
	});

	$('.cesuan_record_link').click(function () {
		if (!browser.isWnl()) {
			loadSchema('http://jptjios.51wnl.com/app/maintab?index=1', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&android_schema=youloft419805549://maintab?index=1');
			return false;
		}
		return true;
	});

});
var bornTime = '-1',
	bornDate = '',
	sex = 1; //男
var originalAllObj;

function userinfocallback(result) {
	var originalString = Base64.decode(result);
	originalAllObj = JSON.parse(originalString);
	// if (originalAllObj && originalAllObj.native_score) {
	// 	var native_score = originalAllObj.native_score;
	// 	if (native_score.userId && native_score.userId.length !== 0) {
	// 		userId = native_score.userId;
	// 	}
	// 	if (native_score.deviceId && native_score.deviceId.length !== 0) {
	// 		deviceId = native_score.deviceId;
	// 	}
	// }
	// var localData = localStorage.getItem('wnl_lyys_local_data');
	// if (localData) {
	// 	localData = JSON.parse(localData);
	// }
	// else {
	// 	localData = {};
	// }
	// localData.userId = userId;
	// localData.deviceId = deviceId;
	// localStorage.setItem('wnl_lyys_local_data', JSON.stringify(localData));
	var originalObj = originalAllObj.lyys || originalAllObj.bzcs || originalAllObj.native_jryc || originalAllObj.native_usercenter;
	if (originalObj && originalObj.name && originalObj.name.length !== 0) {
		$('#txtName').val(originalObj.name);
	}
	if (originalObj && originalObj.date && originalObj.date.length !== 0) {
		var year = (originalObj.date.substring(0, 4)),
			month = (originalObj.date.substring(5, 7)),
			day = (originalObj.date.substring(8, 10));
		$('#spBirthDate').val('公历 ' + year + '年' + month + '月' + day + '日');
		$('#spBirthDate').mobiscroll('setArrayVal', [str2Int(year), str2Int(month), str2Int(day)], !1, !1, !1, 0);
	}
	if (originalObj && originalObj.time && originalObj.time.length !== 0) {
		var hour = originalObj.time.substr(0, 2);
		$('#ddlBirthHour').val(hour);
		$('#ddlBirthHour').trigger('change');
	}
	if (originalObj && originalObj.sex !== undefined && parseInt(originalObj.sex) !== -1) {
		sex = parseInt(originalObj.sex);
		if (sex === 0) {
			$('.manSexSelect .sexIcon').removeClass('active');
			$('.womanSexSelect .sexIcon').addClass('active');
		} else {
			$('.manSexSelect .sexIcon').addClass('active');
			$('.womanSexSelect .sexIcon').removeClass('active');
		}
	}
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function jsonToQueryString(json) {
	return '?' +
		Object.keys(json).map(function (key) {
			return encodeURIComponent(key) + '=' +
				encodeURIComponent(json[key]);
		}).join('&');
}

function getQueryValue(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
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
		alert.innerHTML = '';
	}, 2000);
}
ua = window.navigator.userAgent;

var loadTimer = null;

function loadSchema(iosSchema, wxAppLink, apkLink) {
	var loadWating = 3000;
	var iframe = document.createElement('iframe'),
		aLink = document.createElement('a'),
		body = document.body;
	// 隐藏iframe及a
	aLink.style.cssText = iframe.style.cssText = 'display:none;width:0px;height:0px;';
	if (browser.isAndroid()) {
		if (browser.isWx) {
			window.location.href = wxAppLink;
		} else {
			window.location.href = (apkLink && apkLink.length !== 0 ? apkLink : wxAppLink);
		}
		return;
	} else if (browser.isIOS()) {
		if (browser.getIOSVersion() < 9) {
			location.href = wxAppLink;
			return;
		}
		aLink.href = iosSchema;
		body.appendChild(aLink);
		aLink.click();
	}
	// 如果LOAD_WAITING时间后,还是无法唤醒app，则直接打开下载页
	// opera 无效
	var start = Date.now();
	loadTimer = setTimeout(function () {
		if (document.hidden || document.webkitHidden) {
			return;
		}
		// 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
		// 那么代码执行到此处时，时间间隔必然大于设置的定时时间
		if (Date.now() - start > loadWating + 200) {
			// come back from app

			// 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
		} else {
			window.location.href = wxAppLink;
		}
	}, loadWating);
	// 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
	// 在部分浏览器中可行，网上提供方案，作hack处理
	var visibilitychange = function () {
		var tag = document.hidden || document.webkitHidden;
		tag && clearTimeout(loadTimer);
	};
	document.addEventListener('visibilitychange', visibilitychange, false);
	document.addEventListener('webkitvisibilitychange', visibilitychange, false);
	// pagehide 必须绑定到window
	window.addEventListener('pagehide', function () {
		clearTimeout(loadTimer);
	}, false);
	$('.wnl_history_btn').on('click', function () {
		_czc.push(['_trackEvent', 'cs_history.C', 'lyys_index+click+cs_history']);
	})
}
var title = '每月运势早知道';
var text = '流月运势详批，事业、爱情、财富、健康独家开运秘诀';
var imageURL = 'https://coco70.51wnl.com/numberologynew/lyys/img/share.jpg';
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
wnlui.wxShare({
	title: '流年运势',
	text: '我在万年历看【流年运势】，分享给你，一起看吧！',
	imgUrl: imageURL,
	imageUrl: imageURL,
	url: location.href
});

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

function ylappCallback_back() {
	if (isExist !== null) {
		return 0;
	}
	location.href = 'protocol://exit';
	if (window.ylwindow) {
		ylwindow.reportHasBack(true);
	}
	return 1;
}

function getComments() {
	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/NumberologyNew/CeSuanComment/GetCommentList?size=5&type=1',
		success: function (result) {
			console.log(result);
			$('.cesuan_comments').empty();
			for (var i = 0; i < result.data.length; i++) {
				var comment = result.data[i];
				var html = '<div class="marqueeItem">';
				html += '<div class="head">';
				html += '<span class="name">' + comment.name + '<span>';
				html += '<span class="city">' + comment.city + '</span>';
				html += '<span class="stars">';
				for (var j = 0; j < result.data[i].score; j++) {
					html += '<span class="star starActive"></span>';
				}
				for (var j = 5; j > result.data[i].score; j--) {
					html += '<span class="star"></span>';
				}
				html += '</span>';
				html += '</div>';
				html += '<div class="comment">' + comment.content + '</div>';
				html += '</div>';
				$('.cesuan_comments').prepend(html);
			}
			// 评论滚动
			// $('.cesuan_comments').marquee({
			// 	animateTime: 1000,
			// 	stopTime: 6000,
			// 	adjustHeight: 28
			// });
		}
	});
}

function getPredictNum() {
	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/numberologynew/lunar/GetUseCount',
		success: function (result) {
			console.log(result);
			$('#predictNum').text(result.data);
		}
	});
}

/* 获取底部热门测算 */
getHotCesuan();

function getHotCesuan() {
	$.ajax({
		url: "//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=9",
		/* url: "//118.190.93.204:8032/numberologynew/BaseCeSuan/GetRelevantGoodsList?size=8&type=9", */
		type: "post",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (res) {
			if (res.data.length > 0) {
				// console.log("has data");
				var cesaunItemTemplate =
					'<a class="hot-cesuan-item" href="<%- itemUrl %>">\
						<div class="hot-cesuan-item-header">\
							<img src="<%- itemImg %>">\
						</div>\
						<div class="hot-cesuan-item-footer"><%- itemTitle %></div>\
					</a>';

				$.each(res.data, function () {
					var mkpItem = _.template(cesaunItemTemplate)({
						itemUrl: this.url + '&posId=' + posId,
						itemImg: this.img,
						itemTitle: this.title
					});
					$("#hotCesuanArea").append(mkpItem);
				});
				$(".hot-cesuan-area").removeClass("hidden");
				/* $(".hot-cesuan-item").on("click", function (e) {
					var url = e.currentTarget.dataset.url;
					console.log("url" + url);
					if (url.toLocaleLowerCase().indexOf("posid=") > -1) {
						// 如果配 posId
						// console.log("有 posId");
						// location.href = url.replace("&posId=[posId]", "") + "&posId=" + posId;
						location.href = url;
					} else {
						// 没有 posId;
						// console.log("没有 posId");
						location.href = url + "&posId=" + posId;
					}
				}); */
			} else {
				// console.log("has no data");
			}
		},
		error: function (res) {
			console.log("res=" + res);
		}
	});
}

function nextItem(index) {
	var gap = parseInt($('.groupItem[value=' + index + ']').width()) + 5;
	var gap2 = gap * 2;
	if (index === 1) {
		$(".cesuan_group_content").animate({
			scrollLeft: gap
		}, 600);
		return;
	} else if (index === 2) {
		$(".cesuan_group_content").animate({
			scrollLeft: gap2
		}, 600);
		return;
	} else {
		return;
	}

}

function preItem(index) {
	var gap = parseInt($('.groupItem[value=' + index + ']').width()) + 5;
	if (index === 3) {
		$(".cesuan_group_content").animate({
			scrollLeft: gap
		}, 600);
		return;
	} else if (index === 2) {
		$(".cesuan_group_content").animate({
			scrollLeft: 0
		}, 600);
		return;
	} else {
		return;
	}
}
