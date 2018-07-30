$(function () {

	var resContent;
	var userId;
	var deviceId;
	var orderId;


	//获取Url参数
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
	userId = getQueryValue('userId') || getQueryValue('userid');
	if (userId.toLowerCase() === '[wnluserid]') {
		userId = '';
	}
	deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
	if (deviceId.toLowerCase() === '[openudid]') {
		deviceId = '';
	}
	orderId = getQueryValue('orderId') || getQueryValue('orderid');


	//红包优惠券配置

	var shareUrl = '//mobile.51wnl.com/numberology/zny/index.html?userId=WNLUSERID&deviceId=OPENUDID&pushToken=PTOKEN&pToken=PTOKEN&mac=MAC&imei=IMEI&idfa=IDFA&channel=CHANNEL&posId=posId&boundId=BUNDLE';
	shareRedPackage({
        goodsId: '50FE1680DF4B48CD9095D03C404C64B7', //正式
        /* goodsId: 'C55058EA96B3495E86FB62C6A548F993', //测试 */
		parterId: "LuckChildren",
		orderId: orderId,
		url: shareUrl,
		wxShareTitle: '天下没有教育不好的孩子？',
		wxShareText: '只有不会教育孩子的家长！',
		wxShareImage: 'https://qiniu.image.cq-wnl.com/content/20170803268fb3b8362d40bdaaf28c7a31cdfe21.jpg',
		wxShareUrl: location.href.replace('&payresult=1', '') + '&isShare=1',
	});


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
                if(res.data.payStatus==0) {
                    window.history.back();
                } else {
                    resContent = res.data;
                }
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
	var educationContentDeatil = resContent.contentThree.content;
	var score01 = resContent.contentThree.score;
	var goAbroadContentDeatil = resContent.contentFour.content;
	var score02 = resContent.contentFour.score;
	var employmentContentDetail = resContent.contentFive;

	var personalityContent01 = resContent.contentSix;
	var personalityContent02 = resContent.contentSeven;
	var parentsContent = resContent.contentEight;
	var teachContent = resContent.contentNine;
	var studyContent = resContent.contentTen;
	var abroadContent = resContent.contentEleven;
	var grandmasterContent = resContent.contentTwelve;

	//显示详情
	showLockedResultDetail();

	function showLockedResultDetail() {
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

		//自由式雨约束式
		//教育方式
		if (score01 == 0) {
			$('#value01').css('margin-left', '0%');
		} else if (score01 == 0.5) {
			$('#value01').css('margin-left', '8%');
		} else if (score01 == 1) {
			$('#value01').css('margin-left', '16%');
		} else if (score01 == 1.5) {
			$('#value01').css('margin-left', '25%');
		} else if (score01 == 2) {
			$('#value01').css('margin-left', '30%');
		} else if (score01 == 2.5) {
			$('#value01').css('margin-left', '45%');
		} else if (score01 == 3) {
			$('#value01').css('margin-left', '54%');
		} else if (score01 == 3.5) {
			$('#value01').css('margin-left', '65%');
		} else if (score01 == 4) {
			$('#value01').css('margin-left', '72%');
		} else if (score01 == 4.5) {
			$('#value01').css('margin-left', '80%');
		} else if (score01 == 5) {
			$('#value01').css('margin-left', '99%');
		} else {
			$('#value01').css('margin-left', '60%');
		}

		//出国可能性
		if (score02 == 0) {
			$('#value02').css('margin-left', '0%');
		} else if (score02 == 0.5) {
			$('#value02').css('margin-left', '8%');
		} else if (score02 == 1) {
			$('#value02').css('margin-left', '16%');
		} else if (score02 == 1.5) {
			$('#value02').css('margin-left', '25%');
		} else if (score02 == 2) {
			$('#value02').css('margin-left', '30%');
		} else if (score02 == 2.5) {
			$('#value02').css('margin-left', '45%');
		} else if (score02 == 3) {
			$('#value02').css('margin-left', '54%');
		} else if (score02 == 3.5) {
			$('#value02').css('margin-left', '65%');
		} else if (score02 == 4) {
			$('#value02').css('margin-left', '72%');
		} else if (score02 == 4.5) {
			$('#value02').css('margin-left', '80%');
		} else if (score02 == 5) {
			$('#value02').css('margin-left', '99%');
		} else {
			$('#value02').css('margin-left', '60%');
		}

		$('#headerSectionTitle').html(headerSectionTitle);
		$('#yourName').html(yourName);
		$('#shengxiao').html(shengxiao);
		$('#characterLebal01').html(characterLebal01);
		$('#characterLebal02').html(characterLebal02);
		$('#characterLebal03').html(characterLebal03);
		$('#yourBirthDay').html(yourBirthDay);
		$('#yourBirthPlace').html(yourBirthPlace);
		$('#characterContent').html(characterContent);

		$('#educationContentDeatil').html(educationContentDeatil);
		$('#goAbroadContentDeatil').html(goAbroadContentDeatil);
		$('#employmentContentDetail').html(employmentContentDetail);
		$('#personalityContent01').html(personalityContent01);
		$('#personalityContent02').html(personalityContent02);
		$('#parentsContent').html(parentsContent);
		$('#teachContent').html(teachContent);
		$('#studyContent').html(studyContent);
		$('#abroadContent').html(abroadContent);
		$('#grandmasterContent').html(grandmasterContent);
		$('.homeResultShow').show();
	}

	//底部推广
	$(document).on('click', '.bottom-banner', function () {
		location.href = 'https://astro.51wnl.com/index.html#/astro?posId=XZZNY';
	})

	/* 适配iphoneX */
	if (browser.isIOS() && window.devicePixelRatio === 3 && document.body.clientWidth === 375) {
		$('.iphoneXAdaptation').show();
    }
    /* $('.iphoneXAdaptation').show(); */
})
