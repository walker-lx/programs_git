
var ua = window.navigator.userAgent;
var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop(); //app版本号
var sysVersion = getIOSVersion() || getAndroidVersion(); //系统版本号
var couponId = getQueryValue('couponId') || localStorage.getItem('history_couponId') || '';
localStorage.setItem('history_couponId', couponId);
if (posId == '[posId]' || posId == '' || !posId) {
	posId = 'default';
}
var price;
var goodsId = '6B6519CC78FF4B7F8DA4B949FCE72B9D';
var parterid = 'BigGif';
var QuestionCode = '0';
console.log(location.href);
console.log(1);
// 获取iOS版本号
function getIOSVersion() {
	try{
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
	} catch(e){
		return '1.0.0';
	}
	
}
// 获取andriod版本号
function getAndroidVersion() {
	try{
		ua = ua.toLowerCase();
		var match = ua.match(/android\s([0-9\.]*)/);
		return match ? parseFloat(match[1]) : false;
	} catch(e){
		return '1.0.0';
	}
	
}
// 获取参数值
function getQueryValue(key) {
	var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
// 检测设备
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
	}
};
// clientType
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
// 错误信息提示
function drawToast(message) {
	var alert = document.getElementById('toast');
	if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
		return false;
	}
	alert.className = alert.className.replace('hidden', '');
	alert.style.opacity = .8;
	alert.innerHTML = message;
	alert.className += 'show';
	var height = $('.header-section').height() - 70;
			$('body').animate({
			scrollTop: height
		}, 600);
	intervalCounter = setTimeout(function () {
		alert.style.opacity = 0;
		clearInterval(intervalCounter);
		
	}, 1500);
	setTimeout(function () {
		alert.className = alert.className.replace('show', 'hidden');
		alert.innerHTML = '';
		
	}, 2000);
}

// 获取大礼包价格
function getPayPrice(posId){
    $.ajax({
        url: '//coco70.51wnl.com/numberologynew/BaseCeSuan/GetPosPrice?parterid='+parterid+'&posid=' + posId,
        type: 'get',
        dataType: 'json',
        success: function(res){
        	price = res.data.price;
            $('.totalPrice').find('.priceSpan').html(res.data.price + '元');
        }
    })
}

var startY = 0;
var Y = 0;
var moveEndY = 0;
function getGiftLists(){
	$.ajax({
		url: '//coco70.51wnl.com/numberologynew/BigGift/GetConfigList?goodsID=' + goodsId,
		type: 'get',
		dataType: 'json',
		success: function(res) {
			console.log(res)
			var items = res.data;
			var pprice = 0;
			for (var i = 0;i< items.length;i++){
				var item = items[i];
				var domItem = '<div class="goodsItem"><div class="bigImg hidden"><div class="bigImgBefore"></div><div class="close"></div><div class="scrollImg" style="max-height: 70vh;overflow:scroll"><img style="width:100%;position: relative;z-index: 3;" src="'+item.unPayImg+'"/></div></div><div class="goodsImg"><img src="' + item.img + '"/></div><div class="desc desc1">' + item.txt.split('#')[0] + '</div><div class="desc desc2">' + (item.txt.split('#').length > 1 ? item.txt.split('#')[1] : '') + '</div><div class="price">原价：' + item.price + '元</div></div>';
				$('.totalPrePrice').before(domItem);
				pprice += item.price;
			}
			$('.totalPrePrice').find('.span').text(pprice);
			$('.goodsItem').on('click', function(){
				$(this).find('.bigImg').removeClass('hidden');
			})
			$('.close').on('click', function(e){
				e.stopPropagation();
				$(this).parent().addClass('hidden');
			});
			$('.bigImg::before').on('touchmove',function(e){
				e.preventDefault();
			});
			$('.bigImg').on('touchmove',function(e){
				e.preventDefault();
			});
			$(".scrollImg").on("touchstart", function(e) {
		　　　　startY = e.touches[0].pageY;
		　　});
			$('.scrollImg').on('touchmove',function(e){
				e.stopPropagation();
				if($(this).find('img').height() <= 0.7 * window.screen.height){
					e.preventDefault();
					return ;
				} else {
					moveEndY = e.touches[0].pageY,
			　　　　Y = moveEndY - startY;
					if ( Y < 0 && (parseInt($(this).scrollTop()) + parseInt(0.7 * window.screen.height) >= parseInt($(this).find('img').height()) )) {
			　　　　　　e.preventDefault();
			　　　　} else if ( Y > 0 && (parseInt($(this).scrollTop()) === 0)) {
			　　　　　　e.preventDefault();
			　　　　}
		}
			});
		}
	})
}

getPayPrice(posId);
getGiftLists();

$(function () {
	var name;
	var bornDate; //农历出生日期
	var glBornDate; //公历出生日期
	var bornTime;
	var bornPlace;
	var calendartype; //历法 0公历 1农历
	var sex = 1; //1->男 0->女  默认为0
	var ordername = "新春大礼包";
	var orderId; //createOrder返回
	var parterId; //createOrder返回
	
	var long; //出生城市经度
	var lat; //出生城市纬度

	// // 底部解锁按钮显示
	// $(window).scroll(function () {
	// 	if ($(".confirm_btn").offset().top - $(document).scrollTop() <= -50) {
	// 		// $(".confirm_btn_fixed_show").removeClass("confirm_btn_fixed_hidden");
	// 		$('.wnl_history_btn').addClass('btn_pop');
	// 	} else {
	// 		// $(".confirm_btn_fixed_show").addClass("confirm_btn_fixed_hidden");
	// 		$('.wnl_history_btn').removeClass('btn_pop');
	// 	}
	// })

	// 出生日期选择
	$('.dateTxt').on('touchstart', function(){
		if(parseInt(sysVersion.split('.')[0]) < 10 && browser.isIOS()){
			$('.wnl_history_btn').addClass('hidden');
		}
		setTimeout(function(){
			$('.wnl_history_btn').removeClass('hidden');
		}, 600);
	})
	$('.dateTxt').on('touchmove', function(){
		$('.wnl_history_btn').removeClass('hidden');
	})
	$('.dateTxt').click(function () {
		var datePicker = new wnlui.datePicker({
			showLunar: true,
			defaultValue: [1990, 1, 1],
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('.dateTxt').attr("placeHolder", "");
				console.log(result);
				if (result.isSolar) {
					var resultDate = result.dateObj;
					calendartype = 0;
					var dateStr = '公历 ' + resultDate.cYear + '年' + resultDate.cMonth + '月' + resultDate.cDay + '日';
					$('.dateTxt').val(dateStr);
					bornDate = resultDate.lYear + '-' + resultDate.lMonth + '-' + resultDate.lDay;
					glBornDate = resultDate.cYear + '-' + resultDate.cMonth + '-' + resultDate.cDay;
					localStorage.setItem("bornDate", bornDate);
					localStorage.setItem("glBornDate", glBornDate);
					localStorage.setItem("type", calendartype);
				} else {
					var resultDate = result.dateObj;
					calendartype = 1;
					var dateStr = '农历 ' + resultDate.lYear + '年' + resultDate.IMonthCn + resultDate.IDayCn;
					$('.dateTxt').val(dateStr);
					bornDate = resultDate.lYear + '-' + resultDate.lMonth + '-' + resultDate.lDay;
					glBornDate = resultDate.cYear + '-' + resultDate.cMonth + '-' + resultDate.cDay;
					localStorage.setItem("bornDate", bornDate);
					localStorage.setItem("glBornDate", glBornDate);
					localStorage.setItem("type", calendartype);
					// console.log(bornDate + "---" + glBornDate+"----"+calendrtype);
				}

			}
		});
		$('.wnlui_mask').on('touchmove', function (e) {
			e.preventDefault();
		});
		datePicker.show();
	});
	// 出生时间选择
	$('#bornTime').on('touchstart', function(){
		if(parseInt(sysVersion.split('.')[0]) < 10 && browser.isIOS()){
			$('.wnl_history_btn').addClass('hidden');
		}
		setTimeout(function(){
			$('.wnl_history_btn').removeClass('hidden');
		}, 600);
	})
	$('#bornTime').on('touchmove', function(){
		$('.wnl_history_btn').removeClass('hidden');
	})
	$("#bornTime").click(function () {
		$('.wnl_history_btn').addClass('hidden');
		console.log('!!!!!+++++++++++@@@@@@@@@@@@@++++++++')
		wnlui.picker([{
				label: '不清楚',
				value: '12:00:00',
				/* disabled: true*/
			},
			{
				label: '00:00-00:59',
				value: '0:30:00'
			},
			{
				label: '01:00-01:59',
				value: '1:30:00'
			},
			{
				label: '02:00-02:59',
				value: '2:30:00'
			}, {
				label: '03:00-03:59',
				value: '3:30:00'
			},
			{
				label: '04:00-04:59',
				value: '4:30:00'
			},
			{
				label: '05:00-05:59',
				value: '5:30:00'
			},
			{
				label: '06:00-06:59',
				value: '6:30:00'
			},
			{
				label: '07:00-07:59',
				value: '7:30:00'
			},
			{
				label: '08:00-08:59',
				value: '8:30:00'
			}, {
				label: '09:00-09:59',
				value: '9:30:00'
			},
			{
				label: '10:00-10:59',
				value: '10:30:00'
			},
			{
				label: '11:00-11:59',
				value: '11:30:00'
			},
			{
				label: '12:00-12:59',
				value: '12:30:00'
			},
			{
				label: '13:00-13:59',
				value: '13:30:00'
			},
			{
				label: '14:00-14:59',
				value: '14:30:00'
			}, {
				label: '15:00-15:59',
				value: '15:30:00'
			},
			{
				label: '16:00-16:59',
				value: '16:30:00'
			},
			{
				label: '17:00-17:59',
				value: '17:30:00'
			},
			{
				label: '18:00-18:59',
				value: '18:30:00'
			},
			{
				label: '19:00-19:59',
				value: '19:30:00'
			},
			{
				label: '20:00-20:59',
				value: '20:30:00'
			}, {
				label: '21:00-21:59',
				value: '21:30:00'
			},
			{
				label: '22:00-22:59',
				value: '22:30:00'
			},
			{
				label: '23:00-23:59',
				value: '23:30:00'
			}
		], {
			className: 'custom-classname',
			container: 'body',
			// defaultValue: [1],
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#bornTime').attr("placeHolder", "");
				console.log(result);
				var timeStr = result[0].label;
				$('#bornTime').val(timeStr);
				bornTime = result[0].value;
				localStorage.setItem("bornTime", bornTime);
			},
			id: 'singleLinePicker'
		});
		$('.wnlui_mask').on('touchmove', function (e) {
			e.preventDefault();
		})
		setTimeout(function(){
			$('.wnl_history_btn').removeClass('hidden');
		}, 200);
		
	});
	// 出生地点选择
	var cityPickerLongLat = new wnlui.cityPicker({
		cityCode: false,
		onChange: function (result) {
			console.log(result);
		},
		onConfirm: function (result) {
			$("#birthPlace").attr("placeHolder", "");
			console.log(result);
			var cityStr = result[0].label + '-' + result[1].label + '-' + result[2].label;
			console.log(cityStr);
			$('#birthPlace').val(cityStr);
			long = result[2].longitude;
			lat = result[2].latitude;
			localStorage.setItem("long", long);
			localStorage.setItem("lat", lat);
		}
	});
	$('#birthPlace').on('touchstart', function(){
		if(parseInt(sysVersion.split('.')[0]) < 10 && browser.isIOS()){
			$('.wnl_history_btn').addClass('hidden');
		}
		setTimeout(function(){
			$('.wnl_history_btn').removeClass('hidden');
		}, 600);
	})
	$('#birthPlace').on('touchmove', function(){
		$('.wnl_history_btn').removeClass('hidden');
	})
	$("#birthPlace").click(function () {
		cityPickerLongLat.show();
		$('.wnlui_mask').on('touchmove', function (e) {
			e.preventDefault();
		})

	});
	$('.circleMask, circleMaskBackground').on('touchmove', function (e) {
		e.preventDefault();
	});

	// 性别切换
	$(".sex-type").first().click(function () {
		sex = 1; //男
		$(".sex-type").removeClass("sex-on");
		$(this).addClass("sex-on");
		if ($(".sex-bg").first().hasClass("sex-check2")) {
			$(".sex-bg").first().removeClass("sex-check2").addClass("male-bg");
			$(".sex-bg").last().removeClass("sex-check1").addClass("female-bg");
		}
	});
	$(".sex-type").last().click(function () {
		sex = 0; //女
		$(".sex-type").removeClass("sex-on");
		$(this).addClass("sex-on");
		$(".sex-bg").first().removeClass("male-bg").addClass("sex-check2");
		$(".sex-bg").last().removeClass("female-bg").addClass("sex-check1");
	});
	//
	$(".nameTxt").on("click", function () {
		$(".nameMask").removeClass("hidden");
	});
	$(".nameTxt").on("blur", function () {
		$(".nameMask").trigger("click");
	});
	$(".nameMask").click(function () {
		if (!$(".nameMask").hasClass("hidden")) {
			$(".nameMask").addClass("hidden");
		} else {
			return;
		}
	})
	// tips弹出与隐藏
	$(".exp").click(function () {
		$(".explain").removeClass('hidden');
	});
	$('.close').click(function(e){
		e.stopPropagation();
		$(this).parent().addClass('hidden');
	})
	$('.txtItem').on('click',function(e){
		$('.txtItem').removeClass('active');
		$(this).addClass('active');
		QuestionCode = $(this).attr('value');
	})
	// 底部解锁按钮点击
	// $(".confirm_btn_fixed_show,.confirm_btn_reason").click(function () {
	// 	$(".confirm_btn").trigger("click");
	// });
	
	// $(".order-number span").html(25000);
	// 提交订单
	$('.totalPrice').click(function() {
		$(".confirm_btn").trigger('click');
	})
	$(".confirm_btn").click(function () {
		name = $(".nameTxt").val().trim();
		bornPlace = $("#birthPlace").val();
		var borndate = $(".dateTxt").val();
		var borntime = $("#bornTime").val();
		// 检测是否合理
		if (name.length == 0) {
			drawToast("请填写您的姓名");
			return false;
		}
		var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
		if (reg.test(name)) {
			drawToast("请输入正确的姓名");
			return false;
		}
		if (name.match(/^[\u4e00-\u9fa5]+$/)) {
			if (name.length > 5) {
				drawToast("请输入正确的姓名");
				return false;
			}
		} else {
			if (name.length > 20) {
				drawToast("请输入正确的姓名");
				return false;
			}
		}
		if (borndate.length == 0) {
			drawToast("请选择您的出生日期");
			return false;
		}
		// 有效的出生年份范围
		var nowYear = parseInt(new Date().getFullYear());
		var year = localStorage.getItem("glBornDate");
		var bornYear = parseInt(year.slice(0, 4));

		if ((nowYear - bornYear < 10) || (bornYear > nowYear) || (nowYear - bornYear > 80)) {
			drawToast("该出生年份无数据，请重新选择");
			return false;
		}
		if (borntime.length == 0) {
			drawToast("请选择您的出生时间");
			return false;
		}
		if (bornPlace.length == 0) {
			drawToast("请选择您的出生地点");
			return false;
		}

		if (QuestionCode === '0'){
			drawToast("请选择您的感情状况");
			return false;
		}
		createOrder();

	});
	// 创建订单
	function createOrder() {
		if(userId) {
			uniqueId = userId;
		} else {
			uniqueId = deviceId;
		}
		var returnUrl = "//mobile.51wnl.com/numberology/dalibao/result.html?userId=" + userId + "&deviceId=" + deviceId + '&orderID=[ORDERID]'+"&pushToken="+pushToken+"&pToken="+pToken+"&mac="+mac+"&imei="+imei+"&idfa="+idfa+"&channel="+channel+"&posId="+posId+"&boundId="+boundId;
		var jsonData = JSON.stringify({
			Name: name,
			QuestionCode: QuestionCode,
			Birthday: localStorage.getItem("bornDate"),
			GLBirthday: localStorage.getItem("glBornDate"),
			CalendarType: localStorage.getItem("type"),
			birthtimeHour: localStorage.getItem("bornTime"),
			posid: posId,
			Long: localStorage.getItem("long"),
			Lat: localStorage.getItem("lat"),
			HomePageUrl: "//mobile.51wnl.com/numberology/dalibao/index.html?userId=" + userId + "&deviceId="+deviceId+"&pushToken="+pushToken+"&pToken="+pToken+"&mac="+mac+"&imei="+imei+"&idfa="+idfa+"&channel="+channel+"&posId="+posId+"&boundId="+boundId,
			DetailsUrl: returnUrl,
			birthdaycity: bornPlace,
			Sex: sex,
			ordername: ordername,
			ClientType: clientType,
			PToken: pushToken,
			Token: pToken,
			UserID: userId,
			DeviceID: deviceId,
			Idfa: idfa,
			DeviceMac: mac,
			ImeiNumber: imei,
			sysversion: sysVersion,
			appversion: appVersion,
			boundid: boundId,
			Channel: sourceType,
			goodsID: goodsId
		});
		console.log(jsonData);
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/BigGift/CreateOrder',
			cache: false,
			type: "POST",
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			data: jsonData,
			beforeSend: function () {
				$('.circleMask').removeClass('hidden');
			},
			success: function (res) {
				console.log(res);
				console.log(res.data);
				console.log(posId);
				$('.circleMask').addClass('hidden');
				orderId = res.data.orderID;
				parterId = res.data.parterID;
				minGoodsId = res.data.goodsID;
				returnUrl = returnUrl.split('[ORDERID]')[0] + orderId + returnUrl.split('[ORDERID]')[1];
				if (orderId == '') {
					drawToast('下单失败,请稍后重试');
				} else {
					window.location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + price + '&source=' + ordername + '&parterid=wnl_mall_BigGif&goodsid=' + minGoodsId + '&parteruserid=' + uniqueId + '&data=' + orderId + '&posId=' + posId + '&openid=' + openid + '&couponId=' + couponId + '&returnUrl=' + encodeURIComponent(returnUrl);
				}
			},
			error: function (res) {
				console.log('res=' + res);
			}
		});
	}
	
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

	if (isIphoneX()) {
		$(".wnl_history_btn").addClass("btn_fit");
		$(".iphoneXBanner").removeClass("hidden");
	}

})
