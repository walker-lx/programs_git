$(function () {
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
	var pushToken;
	var pToken;
	var userId;
	var deviceId;
	var idfa;
	var deviceMac;
	var imeiNumber;
	var sysversion;
	var appversion;
	var bundId;
	var totalFee;
	var channel;

	var orderId; //定义订单Id
	var posId;
	var openId;

	var payResult;

	var resContent;
	var parteruserId;
	var couponId;


	//判断设备
	var ua = window.navigator.userAgent;
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

	//获取Url参数
	function getQueryValue(key, style) {
		if (style === undefined || style === '') {
			style = '&';
		}
		var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
		return (match && match[1]) || '';
	}

	userId = getQueryValue('userId') || getQueryValue('userid');
	if (userId.toLowerCase() === '[wnluserid]') {
		userId = '';
	}
	deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
	if (deviceId.toLowerCase() === '[openudid]') {
		deviceId = '';
	}
	var couponId = getQueryValue('couponId') || '';
	orderId = getQueryValue('orderId') || getQueryValue('orderid');
	imeiNumber = getQueryValue('imei');
	openId = getQueryValue('openid') || getQueryValue('openId');
	payResult = getQueryValue('payResult') || getQueryValue('payresult');


	pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken'); //andriod推送token
	pToken = getQueryValue('pToken') || getQueryValue('ptoken'); //ios推送token
	mac = getQueryValue('mac');
	imeiNumber = getQueryValue('imei');
	idfa = getQueryValue('idfa');
	boundId = getQueryValue('boundId');
	posId = getQueryValue('posId') || getQueryValue('posid');
	channel = getQueryValue('channel') || getQueryValue('CHANNEL') || 'appstore';
	//获取订单详情
	getOrderDetail(orderId);

	function getOrderDetail(orderId) {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/LuckChildren/GetOrderDetail?orderid=' + orderId + '&userid=' + userId + '&deviceid=' + deviceId,
			type: 'POST',
			dataType: 'json',
			async: false,
			beforeSend: function () {},
			success: function (res) {
				var payStatus = res.data.payStatus;
				resContent = res.data;
			},
			err: function (res) {
				console.log('err:' + err);
			}

		});
	}

	var headerSectionTitle = resContent.titleOne;
	var yourName = resContent.name;
	var xingzuo = resContent.xz;
	var shengxiao = resContent.sx;
	var characterLebal = resContent.contentOne;
	var characterLebal01 = characterLebal.substr(0, 4);
	var characterLebal02 = characterLebal.substr(5, 4);
	var characterLebal03 = characterLebal.substr(10, 4);
	var yourBirthDay = resContent.birthday;
	yourBirthDay = '公历' + ' ' + yourBirthDay;
	var yourBirthPlace = resContent.birthdayCity;
	var characterContent = resContent.contentTwo;

	//将测算结果显示在结果页中

	function showLockedResult() {
		//判断星座
		if (xingzuo == '双子座') {
			$('#xingzuoPic').attr('src', './img/shuangzizuo.png');
		} else if (xingzuo == '白羊座') {
			$('#xingzuoPic').attr('src', './img/baiyangzuo.png');
		} else if (xingzuo == '处女座') {
			$('#xingzuoPic').attr('src', './img/chunvzuo.png');
		} else if (xingzuo == '金牛座') {
			$('#xingzuoPic').attr('src', './img/jinniuzuo.png');
		} else if (xingzuo == '巨蟹座') {
			$('#xingzuoPic').attr('src', './img/juxiezuo.png');
		} else if (xingzuo == '摩羯座') {
			$('#xingzuoPic').attr('src', './img/mojiezuo.png');
		} else if (xingzuo == '天秤座') {
			$('#xingzuoPic').attr('src', './img/tianchengzuo.png');
		} else if (xingzuo == '双鱼座') {
			$('#xingzuoPic').attr('src', './img/shuangyuzuo.png');
		} else if (xingzuo == '天蝎座') {
			$('#xingzuoPic').attr('src', './img/tianxiezuo.png');
		} else if (xingzuo == '狮子座') {
			$('#xingzuoPic').attr('src', './img/shizizuo.png');
		} else if (xingzuo == '水瓶座') {
			$('#xingzuoPic').attr('src', './img/shuipingzuo.png');
		} else if (xingzuo == '射手座') {
			$('#xingzuoPic').attr('src', './img/sheshouzuo.png');
		}


		$('#header-section-title').html(headerSectionTitle);
		$('#yourName').html(yourName);
		$('#shengxiao').html(shengxiao);
		$('#characterLebal01').html(characterLebal01);
		$('#characterLebal02').html(characterLebal02);
		$('#characterLebal03').html(characterLebal03);
		$('#yourBirthDay').html(yourBirthDay);
		$('#yourBirthPlace').html(yourBirthPlace);
		$('#characterContent').html(characterContent);
	}

	showLockedResult();

	$('.homeShow').show();
	$(document).on('click', '.payLabel,.payLabel01', function () {
		$('.zhifuWindow').show();
		$('.mask').show();
	})

	$(document).on('click', '.closeImg', function () {
		$('.zhifuWindow').fadeOut(200);
		$('.mask').fadeOut(100);
	})


	//解锁支付
	$(document).on('click', '.orderPay', function () {
		orderID = orderId;
		/* posId = posId.replace('?', '');
		posId = posId.replace('20%', ''); */
		money = 28;
		source = '星盘子女运';
		goodsId = goodsId;
		parterid = 'LuckChildren';
		openId = openId;
		parteruserId = userId;
		if (userId.toLowerCase() === '[wnluserid]') {
			userId = '';
		}
		if (parteruserId == '') {
			parteruserId = deviceId;
		}

		if (browser.isWx()) {
			var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
			openId = wnl_loc.openid;
		}

		//支付页面
		location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + source + '&parterid=LuckChildren&goodsid=' +
			goodsId + '&parteruserid=' + parteruserId + '&data=' + orderID + '&imei=' + imeiNumber + '&posId=' + posId + '&couponId=' + couponId + '&openid=' + openId +
			'&returnUrl=' + encodeURIComponent(location.href.replace('home', 'home-result'));
	})


	/* iphoneX 适配 */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.iphoneXAdaptation').show();
	}
	/* $('.iphoneXAdaptation').show();
	 */
})
