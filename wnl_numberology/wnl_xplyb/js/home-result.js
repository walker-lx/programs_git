$(function () {
	var yourName;
	var orderType;
	var orderId;
	var userId;
	var deviceId;

	var keywords;
	var posId;

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

	yourName = getQueryValue('yourName') || getQueryValue('yourname');
	orderType = getQueryValue('orderType') || getQueryValue('ordertype');
	userId = getQueryValue('userId') || getQueryValue('userid');
	if (userId.toLowerCase() === '[wnluserid]') {
		userId = '';
	}
	deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
	if (deviceId.toLowerCase() === '[openudid]') {
		deviceId = '';
	}
	orderId = getQueryValue('orderId') || getQueryValue('orderid');

	posId = getQueryValue('posId') || getQueryValue('posid');

	console.log(posId);

	posId = posId.trim();
	if (posId == 'QDMZXP' || posId == 'qdmzxp') {

	} else {
		//红包优惠券配置
		var shareUrl = '//mobile.51wnl.com/numberology/wnl_xplyb/index.html?userId=WNLUSERID&deviceId=OPENUDID&pushToken=PTOKEN&pToken=PTOKEN&mac=MAC&imei=IMEI&idfa=IDFA&channel=CHANNEL&posId=posId&boundId=BUNDLE';
		shareRedPackage({
            goodsId: 'DF98D0EDA6D8441EA9B9CACE029D154F',//正式
            /* goodsId: '14540C2A305040CDB4A05CA6FB6AD4B6',//测试 */
			parterId: "ChartHalf",
			orderId: orderId,
			url: shareUrl,
			wxShareTitle: '不用脱光也能脱单的秘密武器！',
			wxShareText: '让我们不将就不随便地找到另一半吧！',
			wxShareImage: 'https://qiniu.image.cq-wnl.com/content/201707212059dbb1f67545d0b33d6b05e8dc0862.jpg',
			wxShareUrl: location.href.replace('&payresult=1', '') + '&isShare=1',
		});
	}
	//定义标题段内容
	var unLockedContent;
	var titleCode1;
	var titleCode2;
	var titleCode3;
	var titleCode4;
	var titleCode5;


	var scoreTitle;


	getDetailReslutContent(orderId);

	function getDetailReslutContent(orderId) {
		console.log(orderId);
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/ChartHalf/GetOrderDetail?orderid=' + orderId + '&userid=' + userId + '&deviceid=' + deviceId,
			type: 'POST',
			dataType: 'json',
			async: false,
			beforeSend: function () {},
			success: function (res) {
				if (!res.data.isPay) {
					window.history.back();
				} else {
					console.log(orderId);
					console.log(res);
					keyWords = res.data.keyWord;
					unLockedContent = res.data.data;
					scoreTitle = res.data.scoreTitle;
				}
			},
			err: function (res) {
				console.log('err:' + err);
			}

		});
	}


	//定义关键字标题
	var keyWordsTitle = yourName + '的感情观';
	//定义关键字
	var keyWord01 = keyWords[0];
	var keyWord02 = keyWords[1];
	var keyWord03 = keyWords[2];
	var keyWord04 = keyWords[3];

	titleCode1 = unLockedContent[0];
	titleCode2 = unLockedContent[1];
	titleCode3 = unLockedContent[2];
	titleCode4 = unLockedContent[3];
	titleCode5 = unLockedContent[4];

	var scoreOne = titleCode5.score;
	var scoreTwo = titleCode5.twoscore;

	console.log(scoreOne, scoreTwo);

	function showLockedResultDetail() {
		if (scoreTitle == '他的感情观') {
			$('.top-key').css("background", "url(https://qiniu.image.cq-wnl.com/content/20180522c99ab78d0b1b4022a5a8c18acc20bfdb.png)");
			$('.top-key').css("background-size", "cover");
		} else if (scoreTitle == '她的感情观') {
			$('.top-key').css("background", "url(https://qiniu.image.cq-wnl.com/content/2018052233fbd3e4dc34459e91b8ec68a7f5023e.png)");
			$('.top-key').css("background-size", "cover");
		} else {
			$('.top-key').css("background", "url(https://qiniu.image.cq-wnl.com/content/20180522f28cd1501bd54411b44fdc5fce1d4131.png)");
			$('.top-key').css("background-size", "cover");
		}
		$('#keyWordsTitle').html(scoreTitle);

		$('#keyword01').html(keyWord01);
		$('#keyword02').html(keyWord02);
		$('#keyword03').html(keyWord03);
		$('#keyword04').html(keyWord04);



		//标题段1
		$('#title-01').html(titleCode1.title);
		$('#unLockedContentDetail01').html(titleCode1.content);

		//标题段2
		$('#title-02').html(titleCode2.title);
		$('#unLockedContentDetail02').html(titleCode2.content);

		//标题段3
		$('#title-03').html(titleCode3.title);
		$('#unLockedContentDetail03').html(titleCode3.content);

		//标题段4
		$('#title-04').html(titleCode4.title);
		$('#unLockedContentDetail04-01').html(titleCode4.content);
		$('#unLockedContentDetail04-02').html(titleCode4.contentTwo);

		//标题段5
		$('#title-05').html(titleCode5.title);
		$('#unLockedContentDetail05-01').html(titleCode5.content);
		$('#unLockedContentDetail05-02').html(titleCode5.contentTwo);


		//感情波折指数
		var r = /^\+?[1-9][0-9]*$/; //正整数
		if (r.test(scoreOne)) {
			for (var i = 0; i < scoreOne; i++) {
				$('.stars-01 li').eq(i).children().attr("src", "./img/red-star.png");
			}
		} else {
			scoreOne = parseInt(scoreOne);
			for (var i = 0; i < scoreOne; i++) {
				$('.stars-01 li').eq(i).children().attr("src", "./img/red-star.png");
			}
			$('.stars-01 li').eq(scoreOne).children().attr("src", "./img/half-of-red-star.png");
		}

		//感情稳定指数
		if (r.test(scoreTwo)) {
			for (var i = 0; i < scoreTwo; i++) {
				$('.stars-02 li').children().attr("src", "./img/red-star.png");
			}
		} else {
			scoreTwo = parseInt(scoreTwo);
			for (var i = 0; i < scoreTwo; i++) {
				$('.stars-02 li').eq(i).children().attr("src", "./img/red-star.png");
			}
			$('.stars-02 li').eq(scoreTwo).children().attr("src", "./img/half-of-red-star.png");
		}
	}
	$(document).on('click', '.view-report', function () {
		location.href = 'https://www.51wnl.com/linksite/DoLink.aspx?key=3536&loc=13&MAC=[MAC]&IDFA=[IDFA]&OPENUDID=[OPENUDID]&IMEI=[IMEI]&WNLUSERID=[WNLUSERID]&BUNDLE=[BUNDLE]&PTOKEN=[PTOKEN]';
	})

	//底部推广
	$(document).on('click', '.bottom-banner', function () {
		location.href = 'https://astro.51wnl.com/index.html#/astro?posId=XZLYB';
	})

	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.iphoneXAdaptation').show();
	}

	/*  $('.iphoneXAdaptation').show(); */

	showLockedResultDetail();
	$('.homeResultShow').show();
})
