$(function() {
	var orderId; //定义订单号
	var money; //定义解锁价格
	var source; //定义orderName
	var goodsId;
	var userId;
	var deviceId;
	var parterid;
	var pushToken;
	var pToken;
	var mac;
	var imei;
	var idfa;
	var boundId;
	var posId;
	var channel;
	var returnUrl; //支付成功需要返回的页面
	var couponId; //优惠券

	var keyWords;
	var lockedContent;

	var scoreTitle; //定义关键字标题

	var payResult;

	var openId;
	var unionId;
	var goodsId;

	goodsId = 'DF98D0EDA6D8441EA9B9CACE029D154F'; //正式环境
	// goodsId = '14540C2A305040CDB4A05CA6FB6AD4B6'; //测试环境
	money = 28;

	function getQueryValue(key, style) {
		if (style === undefined || style === '') {
			style = '&';
		}
		var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
		return (match && match[1]) || '';
	}

	pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken'); //andriod推送token
	pToken = getQueryValue('pToken') || getQueryValue('ptoken'); //ios推送token
	mac = getQueryValue('mac');
	imei = getQueryValue('imei');
	idfa = getQueryValue('idfa');
	boundId = getQueryValue('boundId');
	posId = getQueryValue('posId') || getQueryValue('posid');
	channel = getQueryValue('channel') || getQueryValue('CHANNEL') || 'appstore';
	openId = getQueryValue('openid') || getQueryValue('openId');
	userId = getQueryValue('userId') || getQueryValue('userid');
	deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');

	if (posId) {
		posId = posId.trim();
		switch (posId) {
			case 'QDMZXP':
				goodsId = 'F5D38F193A704143BFA08207758A8254'; //正式环境-往返APP
				/* goodsId = '3FEF935AD71C4AA8A3D40484CE009E26'; //测试环境-往返APP */
				money = 38;
				break;

			case 'qdmzxp':
				goodsId = 'F5D38F193A704143BFA08207758A8254'; //正式环境-往返APP
				/* goodsId = '3FEF935AD71C4AA8A3D40484CE009E26'; //测试环境-往返APP */
				money = 38;
				break;
		}
	}

	var ua = window.navigator.userAgent;
	//判断设备
	var browser = {
		isAndroid: function() {
			return ua.match(/Android/i) ? true : false;
		},
		isIOS: function() {
			return ua.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		isWx: function() {
			return ua.match(/micromessenger/i) ? true : false;
		},
		isWp: function() {
			return ua.toLowerCase().indexOf('windows phone') > -1;
		},
		isWnl: function() {
			return ua.toLowerCase().indexOf('wnl') > -1;
		},
		getIOSVersion: function() {
			if (window.MSStream) {
				return false;
			}
			var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
				version;
			if (match !== undefined && match !== null) {
				version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
				return parseFloat(version.join('.'));
			}
			return false;
		}
	};

	unionId == userId;
	if (userId == '') {
		unionId = deviceId;
	}

	orderId = getQueryValue('orderId') || getQueryValue('orderid');
	payResult = getQueryValue('payResult') || getQueryValue('payresult');

	couponId = getQueryValue('couponId') || getQueryValue('couponid') || '';

	getReslutContent(orderId);

	function getReslutContent(orderid) {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartHalf/GetOrderDetail?orderid=' + orderid + '&userid=' + userId + '&deviceid=' + deviceId,
			type: 'POST',
			dataType: 'json',
			async: false,
			beforeSend: function() {},
			success: function(res) {
				var isPay = res.data.isPay;
				keyWords = res.data.keyWord;
				lockedContent = res.data.data;
				scoreTitle = res.data.scoreTitle;
			},
			err: function(res) {
				console.log('err:' + err);
			}
		});
	}
	var ua = window.navigator.userAgent;

	//定义关键字
	keyWord01 = keyWords[0];
	keyWord02 = keyWords[1];
	keyWord03 = keyWords[2];
	keyWord04 = keyWords[3];

	//定义标题段内容
	titleCode1 = lockedContent[0];
	titleCode2 = lockedContent[1];
	titleCode3 = lockedContent[2];
	titleCode4 = lockedContent[3];
	titleCode5 = lockedContent[4];

	//将测算结果显示在结果页中
	function showLockedResult() {
		//keyWordsTitle图片
		if (scoreTitle == '他的感情观') {
			$('.top-key').css('background', 'url(https://qiniu.image.cq-wnl.com/content/20180522c99ab78d0b1b4022a5a8c18acc20bfdb.png)');
			$('.top-key').css('background-size', 'cover');
		} else if (scoreTitle == '她的感情观') {
			$('.top-key').css('background', 'url(https://qiniu.image.cq-wnl.com/content/2018052233fbd3e4dc34459e91b8ec68a7f5023e.png)');
			$('.top-key').css('background-size', 'cover');
		} else {
			$('.top-key').css('background', 'url(https://qiniu.image.cq-wnl.com/content/20180522f28cd1501bd54411b44fdc5fce1d4131.png)');
			$('.top-key').css('background-size', 'cover');
		}
		$('#keyWordsTitle').html(scoreTitle);
		//关键字
		$('#keyword01').html(keyWord01);
		$('#keyword02').html(keyWord02);
		$('#keyword03').html(keyWord03);
		$('#keyword04').html(keyWord04);

		//标题段1
		$('#title-01').html(titleCode1.title);
		$('#lockedContentTitle01').html(titleCode1.contentUnLockTitle);

		//标题段2
		$('#title-02').html(titleCode2.title);
		$('#lockedContentTitle02').html(titleCode2.contentUnLockTitle);

		//标题段3
		$('#title-03').html(titleCode3.title);
		$('#lockedContentTitle03').html(titleCode3.contentUnLockTitle);

		//标题段4
		$('#title-04').html(titleCode4.title);
		$('#lockedContentTitle04-01').html(titleCode4.contentUnLockTitle);
		$('#lockedContentTitle04-02').html(titleCode4.contentUnLockTwoTitle);

		//标题段5
		$('#title-05').html(titleCode5.title);
		$('#lockedContentTitle05-01').html(titleCode5.contentUnLockTitle);
		$('#lockedContentTitle05-02').html(titleCode5.contentUnLockTwoTitle);
	}
	showLockedResult();

	function getQueryValue(key, style) {
		if (style === undefined || style === '') {
			style = '&';
		}
		var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
		return (match && match[1]) || '';
	}

	$('.homeShow').show();
	$(document).on('click', '.view-report-detail', function() {
		orderID = orderId;
		posId = getQueryValue('posId') || getQueryValue('posid');
		posId = posId.replace('?', '');
		source = '星盘另一半';
		goodsId = goodsId;
		parterid = 'ChartHalf';
		openId = openId;
		if (browser.isWx()) {
			var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
			openId = wnl_loc.openid;
		}
		if (!unionId) {
			if (userId) {
				unionId = userId;
			} else {
				unionId = deviceId;
			}
		}
		//支付页面
		location.href =
			'//order.51wnl.com/pay_web/index_t.html?money=' +
			money +
			'&source=' +
			source +
			'&parterid=ChartHalf&goodsid=' +
			goodsId +
			'&parteruserid=' +
			unionId +
			'&data=' +
			orderID +
			'&posId=' +
			posId +
			'&openid=' +
			openId +
			'&couponId=' +
			couponId +
			'&returnUrl=' +
			encodeURIComponent(location.href.replace('home', 'home-result'));
	});

	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.iphoneXAdaptation').show();
	}
	/* $('.iphoneXAdaptation').show(); */
});
