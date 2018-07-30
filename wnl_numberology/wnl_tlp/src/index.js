var astroList = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
var astroDetailList = [
	['aries', '白羊座', '3.21-4.19'],
	['taurus', '金牛座', '4.20-5.20'],
	['gemini', '双子座', '5.21-6.21'],
	['cancer', '巨蟹座', '6.22-7.22'],
	['leo', '狮子座', '7.23-8.22'],
	['virgo', '处女座', '8.23-9.22'],
	['libra', '天秤座', '9.23-10.23'],
	['scorpio', '天蝎座', '10.24-11.22'],
	['sagittarius', '射手座', '11.23-12.21'],
	['capricorn', '摩羯座', '12.22-1.19'],
	['aquarius', '水瓶座', '1.20-2.18'],
	['pisces', '双鱼座', '2.19-3.20']
];
var astroIndex = -1,
	astroName = '';
var selectedAstro = 0;
var orderid = '';
var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
var posId = localData && localData.posId ? localData.posId : getQueryValue('posId');
var boundId = localData && localData.boundId ? localData.boundId : getQueryValue('boundId') || getQueryValue('boundid');
var Token = getQueryValue('pToken') || getQueryValue('PToken') || getQueryValue('ptoken');
var pToken = getQueryValue('pushToken') || getQueryValue('PushToken') || getQueryValue('pushtoken');
var channel = getQueryValue('channel');
var couponId = getQueryValue('couponId') || '';
var ua = window.navigator.userAgent;
	posId = (/posid/i).test(posId) ? '' : posId;
	boundId = (/bundle/i).test(boundId) ? '' : boundId;
	Token = (/Token/i).test(Token) ? '' : Token;
	pToken = (/Token/i).test(pToken) ? '' : pToken;
	channel = (/channel/i).test(channel) ? '' : channel;

var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();
var userId = getQueryValue('userId') || getQueryValue('userid');
if (userId.toUpperCase() === '[WNLUSERID]') {
	userId = '';
	console.log(userId);
}
var deviceId = getQueryValue('deviceId') || getQueryValue('deviceid');
if (deviceId.toUpperCase() === '[OPENUDID]') {
	deviceId = '';
	console.log(deviceId);
}
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

// 判断非微信下 && userId 和 deviceId 为空 || 不是wnl客户端打开时 调用guid生成接口
console.log('check');
if (!browser.isWx() && (!browser.isWnl() || (userId === '' && deviceId === ''))) {
	console.log('check2')
	if (localStorage.getItem('wnl_tlp_guid')) {
		console.log('get the locstorage');
		userId = localStorage.getItem('wnl_tlp_guid');
		deviceId = localStorage.getItem('wnl_tlp_guid');
	} else {
		console.log('not get the localstorage')
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
			type: 'get',
			data: 'json',
			success: function (response) {
				userId = response.toString();
				deviceId = response.toString();
				localStorage.setItem('wnl_tlp_guid', userId);
				console.log('set the localstorage');
			}
		});
	}
}

var openid = '';
var unionid = '';
if (browser.isWx()) {
	openid = getQueryValue('openid');
	unionid = getQueryValue('unionid');
	//如果执行到这块的代码,就说明是在微信内部浏览器内打开的.
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.wnlUserId) {
		userId = wnl_loc.wnlUserId;
		openid = wnl_loc.openid;
		unionid = wnl_loc.unionid;
		deviceId = wnl_loc.wnlUserId;
		if (localStorage.getItem('trigger_flag') === 'yes') {
			$('.begin_btn').trigger('click');
		}
	} else if (!openid) {
		window.localStorage.setItem('wnl_location_direct', window.location.href);
		location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
	} else {
		var nickName = window.btoa(utf16to8(decodeURIComponent(location.href.split('nickname=')[1].split('&')[0])));
		var datastring = "{\"OpenId\":\"" + openid + "\",\"UnionId\":\"" + unionid + "\",\"Gender\":0,\"Platform\":\"2\",\"OpenName\":\"" + nickName + "\",\"Desc\":\"\",\"AppId\":\"ServiceAccount\"}"
		var data = {
			'DataString': datastring
		}
		$.ajax({
			url: '//u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
			dataType: 'json',
			type: 'POST',
			data: data,
			async: false,
			success: function (response) {
				userId = response.data.wnlUserId;
				deviceId = response.data.wnlUserId;
				//测试
				window.localStorage.setItem('wnl_tlp_local', JSON.stringify({
					wnlUserId: userId,
					openid: openid,
					unionid: unionid
				}));
				location.href = localStorage.getItem('wnl_location_direct');
			},
			error: function (response) {
				console.log(response);
			}
		});
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

$(function () {
	if (browser.isWnl()) {
		location.href = 'protocol://getlocalsdksupport#localsdksupportcallback';
	} else {
		// $('.wnlBanner').show();
		// $('.btn_mask').css('bottom', '65px');
		// $('.section').css('margin-bottom', '65px');
		// $('.index_setion').css('margin-bottom', '130px');
	}
	// $('.closeBanner').click(function () {
	// $('.wnlBanner').hide();
	// $('.btn_mask').css('bottom', '0');
	// $('.section').css('margin-bottom', '0');
	// $('.index_setion').css('margin-bottom', '65px');
	// });
	// $('.downloadBtn').click(function () {
	// 	loadSchema('maintab?index=1');
	// });

	var window_height = $(window).height();
	setTimeout(function () {
		window_height = $(window).height();
		if (window.ylwindow) {
			window_height = window.ylwindow.getHeight();
			if (window_height > 1024 && window.devicePixelRatio > 1) {
				window_height = window_height / window.devicePixelRatio;
			}
		}
		$('body').css('min-height', window_height + 'px');
	}, 100);
	var index = 1;
	$('.loading').removeClass('none');
	$('.loading').css('-webkit-transform', 'rotate(' + index * 480 + 'deg)');
	$('.loading').css('transform', 'rotate(' + index * 480 + 'deg)');
	setInterval(function () {
		index++;
		$('.loading').css('-webkit-transform', 'rotate(' + index * 480 + 'deg)');
		$('.loading').css('transform', 'rotate(' + index * 480 + 'deg)');
	}, 1000);


	// var userId = '1';
	// var deviceId = '2';
	var mac = (/mac/i).test(getQueryValue('mac')) ? '' : decodeURIComponent(getQueryValue('mac'));
	var imei = (/imei/i).test(getQueryValue('imei')) ? '' : decodeURIComponent(getQueryValue('imei'));
	var idfa = (/idfa/i).test(getQueryValue('idfa')) ? '' : decodeURIComponent(getQueryValue('idfa'));
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
	router.route('#/', function (req, next) {
		$(window).scrollTop(0, 0);
		window_height = $(window).height();
		$('body').css('min-height', window_height + 'px');
		$(window).scrollTop(0, 0);
		$('.section').addClass('hidden');
		$('.index_setion').removeClass('hidden');
		$('.wnl_history_btn').removeClass('hidden');
	});
	$('.history_btn').click(function () {
		router.redirect('#/history');
	});
	$('.begin_btn').on('click', function () {
		if (browser.isWx()) {
			if (!openid) {
				localStorage.setItem('trigger_flag', 'yes');
				location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + window.location.href;
				return 0;
			}
			if (localStorage.getItem('trigger_flag') === 'yes') {
				localStorage.setItem('trigger_flag', 'no');
			}
		}
		router.redirect('#/astro');
	});
	router.route('#/history', function (req, next) {
		getHistoryList();
		$('.section').addClass('hidden');
		$('.history_section').removeClass('hidden');
		$('.wnl_history_btn').addClass('hidden');
	});
	feedbackAnimation();



	function getHistoryList() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/Tarot/GetOrderList',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				UserID: userId,
				DeviceMac: mac,
				DeviceID: deviceId,
				channel: sourceType,
				imeiNumber: imei,
				idfa: idfa
			})
		}).done(function (result) {
			if (result.status !== 0) {
				return false;
			}
			$('.history_list').empty();
			for (var i = 0; i < result.data.length; i++) {
				var item = result.data[i];
				var temp_history_item = $('.temp_history_item').clone();
				temp_history_item.data('href', '#/result/' + item.orderID + '/1');
				var astroIndex = astroDetailList.findIndex(function (item1) {
					return item.startName === item1[0];
				});
				temp_history_item.find('.history_item_txt1').html('测算星座：' + astroDetailList[astroIndex][1]);
				temp_history_item.find('.history_item_tx2').html('测算时间：' + formatDate(new Date(item.addTime), 'yyyy年MM月dd日'));
				if (item.payStatus === 1) {
					temp_history_item.find('.unlock_txt').addClass('hidden');
				} else {
					temp_history_item.find('.lock_icon').addClass('hidden');
				}
				temp_history_item.removeClass('temp_history_item');
				temp_history_item.removeClass('hidden');
				temp_history_item.appendTo('.history_list');
			}
		});
	}
	$(document).on('click', '.history_item', function () {
		var href = $(this).data('href');
		router.redirect(href);
	});
	var astroClick = true,
		chooseClick = true;
	router.route('#/astro', function (req, next) {
		$('.wnl_history_btn').addClass('hidden');
		window_height = $(window).height();
		$('body').css('min-height', window_height + 'px');
		$(window).scrollTop(0, 0);
		astroClick = true;
		$('.txt_show_line').css('opacity', '0');
		$('.cards_content .card_big').removeClass('rotate');
		$('.section').addClass('hidden');
		$('.astro_section').removeClass('hidden');
		if (localStorage.getItem('wnl_tlp_astroName')) {
			astroName = localStorage.getItem('wnl_tlp_astroName');
			astroIndex = astroDetailList.findIndex(function (item) {
				return astroName === item[0];
			});
			beginTxtAnnimation();
			$('.choose_astro_name').html(astroDetailList[astroIndex][1]);
		} else {
			if (browser.isWnl()) {
				setTimeout(function () {
					location.href = 'protocol://getuserinfo#userinfocallback';
				}, 0);
			} else {
				astroName = '';
				$('.astro_mask').removeClass('hidden');
				$('.astro_select_modal').removeClass('hidden');
			}
		}
		initCardsRotate();
	});
	$('.choose_astro_content').click(function () {
		$('.astro_list_item').removeClass('active');
		astroName !== '' && $('.astro_list_item.' + astroName).addClass('active');
		$('.choose_astro_name').html(astroDetailList[astroIndex][1]);
		setTimeout(function () {
			$('.astro_mask').removeClass('hidden');
			$('.astro_select_modal').removeClass('hidden');
			$('.astro_select_modal').removeClass('hidden');
		}, 0);
	});
	$('.astro_list_item').click(function () {
		if ($(this).hasClass('active')) {
			return false;
		}
		var classList = $(this).attr('class');
		astroName = classList.substr(classList.indexOf('astro_list_item') + 'astro_list_item'.length + 1);
		$('.astro_list_item').removeClass('active');
		$(this).addClass('active');
		// $('.choose_astro_name').html(astroDetailList[astroIndex][1]);
	});
	$('.astro_select_btn').click(function () {
		if (astroName === '') {
			drawToast('请选择星座');
			return false;
		}
		localStorage.setItem('wnl_tlp_astroName', astroName);
		astroIndex = astroDetailList.findIndex(function (item) {
			return astroName === item[0];
		});
		$('.choose_astro_name').html(astroDetailList[astroIndex][1]);
		beginTxtAnnimation();
		$('.astro_mask').addClass('hidden');
		$('.modal').addClass('hidden');
	});
	$('.astro_mask').click(function () {
		if (astroName === '' || !localStorage.getItem('wnl_tlp_astroName')) {
			drawToast('请选择星座');
			return false;
		}
		$('.astro_mask').addClass('hidden');
		$('.astro_select_modal').addClass('hidden');
	});

	function initCardsRotate() {
		$('.cards_content .card_big').css('-webkit-transform', 'rotateZ(0deg)');
		$('.cards_content .card_big').css('transform', 'rotateZ(0deg)');
		for (var i = $('.cards_content .card_big').length - 1; i >= 0; i--) {
			$('.cards_content .card_big:nth-child(' + i + ')').css('-webkit-transform', 'rotateZ(' + -15 * i + 'deg)');
			$('.cards_content .card_big:nth-child(' + i + ')').css('transform', 'rotateZ(' + -15 * i + 'deg)');
		}
	}
	$('.card_mix_btn').click(function () {
		if (astroName === '') {
			drawToast('请选择星座');
			return false;
		}
		if (!astroClick) {
			drawToast('请勿重复点击');
			return false;
		}
		astroClick = false;
		$('.cards_content .card_big').addClass('rotate');
		for (var i = $('.cards_content .card_big').length; i >= 0; i--) {
			var randonRotate = getRandomNum(360 * 3 - 15 * i, 360 * 3);
			$('.cards_content .card_big:nth-child(' + i + ')').css('-webkit-transform', 'rotateZ(' + randonRotate + 'deg)');
			$('.cards_content .card_big:nth-child(' + i + ')').css('transform', 'rotateZ(' + randonRotate + 'deg)');
			$('.choose_astro_content').unbind('click');
		}
		setTimeout(function () {
			router.redirect('#/choose');
			$('.choose_astro_content').bind('click', function () {
				$('.astro_list_item').removeClass('active');
				astroName !== '' && $('.astro_list_item.' + astroName).addClass('active');
				setTimeout(function () {
					$('.astro_mask').removeClass('hidden');
					$('.astro_select_modal').removeClass('hidden');
					$('.astro_select_modal').removeClass('hidden');
				}, 0);
			});
		}, 2800);
	});

	function getRandomNum(min, max) {
		return Math.random() > 0.5 ? max : min;
	}
	var cardActiveCount = 0;
	var cardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	router.route('#/choose', function (req, next) {
		$('.wnl_history_btn').addClass('hidden');
		$(window).scrollTop(0, 0);
		chooseClick = true;
		if (localStorage.getItem('wnl_tlp_astroName')) {
			astroName = localStorage.getItem('wnl_tlp_astroName');
			astroIndex = astroDetailList.findIndex(function (item) {
				return astroName === item[0];
			});
		}
		$('.section').addClass('hidden');
		$('.card_wrapper').removeClass('animation');
		$('.card_wrapper').removeClass('active');
		$('.card').removeClass('fliped');
		$('.card_back').removeClass('fliped');
		$('.card').css('-webkit-transform', ' rotateY(0)');
		$('.card').css('transform', ' rotateY(0)');
		$('.card_back').css('-webkit-transform', ' rotateY(-180deg)');
		$('.card_back').css('transform', ' rotateY(-180deg)');
		cardActiveCount = 0;
		showCardTip();
		initCardBackState();
		cardArray = shuffle(cardArray);
		$('.card_wrapper').each(function (i, item) {
			var index = cardArray[i] >= 10 ? cardArray[i].toString() : ('0' + cardArray[i]);
			$(item).attr('data-index', index);
			$(item).find('.card_back').addClass('back' + index);
		});
		$('.choose_section').fadeIn(0);
		$('.choose_section').removeClass('hidden');
	});

	function initCardBackState() {
		$('.card_wrapper .card_back').each(function () {
			var front = getRandomNum(0, 1);
			if (front === 1) {
				$(this).css('-webkit-transform', 'rotateY(-180deg) rotateZ(180deg)');
				$(this).css('transform', 'rotateY(-180deg) rotateZ(180deg)');
			}
			$(this).data('front', front);
		});
	}
	$('.card_wrapper').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			cardActiveCount--;
			showCardTip();
		} else {
			if (cardActiveCount >= 3) {
				return false;
			}
			$(this).addClass('active');
			cardActiveCount++;
			showCardTip();
		}
	});

	function showCardTip() {
		$('.choose_tip').addClass('hidden');
		$('.result_btn').addClass('hidden');
		if (cardActiveCount === 0) {
			$('.choose_tip.tip1').removeClass('hidden');
		} else if (cardActiveCount === 1) {
			$('.choose_tip.tip2').removeClass('hidden');
		} else if (cardActiveCount === 2) {
			$('.choose_tip.tip3').removeClass('hidden');
		} else if (cardActiveCount === 3) {
			// $('.result_btn').removeClass('hidden');
			chooseOver();
		}
	}

	var cardData = [],
		dateNow = new Date();

	function chooseOver() {
		dateNow = new Date();
		cardData = [];
		$('.card_wrapper.active').each(function () {
			var index = $(this).data('index');
			var front = $(this).find('.card_back').data('front');
			var month = formatDate(dateNow, 'yyyy-MM');
			dateNow.setMonth(dateNow.getMonth() + 1);
			cardData.push({
				'ID': index.toString() + front.toString(),
				'Month': month
			});
			initCardAnimate(this, parseInt(front, 10));
		});
		createOrder();
		setTimeout(function () {
			router.redirect('#/result/' + (payedid === '' ? '-1' : payedid) + '/0');
		}, 2500);
	}


	function initCardAnimate(obj, front) {
		$(obj).removeClass('active');
		$(obj).addClass('animation');
		setTimeout(function () {
			$(obj).find('.card').addClass('fliped');
			$(obj).find('.card').css('-webkit-transform', ' rotateY(-180deg)');
			$(obj).find('.card').css('transform', ' rotateY(-180deg)');
			$(obj).find('.card_back').addClass('fliped');
			if (front === 1) {
				$(obj).find('.card_back').css('-webkit-transform', 'rotateY(-360deg) rotateZ(180deg)');
				$(obj).find('.card_back').css('transform', 'rotateY(-360deg) rotateZ(180deg)');
			} else {
				$(obj).find('.card_back').css('-webkit-transform', 'rotateY(-360deg)');
				$(obj).find('.card_back').css('transform', 'rotateY(-360deg)');
			}
		}, 500);
		$('.choose_section').fadeOut(2500);
		$('.result_section').fadeIn(2500);
	}

	var freeResultData = {
		"data": [{
				"id": 2,
				"cardName": "星币一",
				"cardSign": 1,
				"cardCode": "001",
				"keyWords": "焦虑、物质匮乏、半途而废",
				"cardsIdea": "当星币王牌出现倒立时，从精神世界中伸出来的手就没有办法再握住五角星了，这暗示金钱或机会正从你的指尖流逝。但是你也必须要知道，过分的焦虑反而加剧你的财务和工作紊乱。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n本月你的工作运略微低迷哦！首先在职场上，你本身的不安和焦虑容易让你错失自我发挥的机会。注意要避免因为自身情绪上的失控导致出现失误而被上司责难！关于你的工作内容，还请事无巨细的好好检查哟！",
					"boss": "如果你是老板\r\n本月不适合开启新项目或者是新投资，如果有合作方找上门，要多多考察对方的背景和资本。若仅仅是嘴上说得漂亮，那就要小心咯！如果你已经明显的感觉到了资源无法得到合理的分配，那么先从小的事情开始入手即可。",
					"job": "如果你是求职者\r\n本月如果你要找工作或者是跳槽，容易找到离路途遥远，出行比较辛苦的公司。对方很可能是一家刚兴起的中小型企业，如果你加入进去，一开始可能工作量会比较大，让你感觉到劳累和辛苦，不过坚持下去，也是会有好的回报的！"
				},
				"month": "2017-02"
			},
			{
				"id": 20,
				"cardName": "星币十",
				"cardSign": 1,
				"cardCode": "091",
				"keyWords": "基础不稳、注意受骗",
				"cardsIdea": "星币十的逆位在提醒你不要进行冒险，也不要以不诚实、赌博的方式去应对你在工作、财务方面的麻烦。同时也要注意不要轻信他人，保持理智，别去相信天上掉馅儿饼的好事。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n千万不要在老板的眼皮子底下做有风险的事情，被抓包的几率很高，这是个需要每一步都踏实走稳的关键时刻。如果你目前正面临着业务方面的竞争，那么你的对手可能不止一个，对方的实力也比你强大的多。比起硬碰硬，不如想方法智取，但是要注意，一定不要尝试旁门左道的行为哟~",
					"boss": "如果你是老板\r\n有必要清查你公司的财务情况，看看是否有下属在其中钻空子，挪用公司财产。为了避免更为巨大的损失，不要被对方的人情牌所蒙蔽。如果有人找上门来与你谈看起来很有利润空间的项目，不要轻易相信，调查好对方的背景，以免贪图眼前小利而掉入他人设计的陷阱。",
					"job": "如果你是求职者\r\n你所选择的公司（职位）炙手可热，竞争异常激烈，你似乎也没有特别突出的优势来吸引到对方的眼球，那么尝试全面撒网如何？不要让自己吊死在一棵树而放弃了所有选择的机会，也许更适合你的工作并不仅仅是眼前这一份。"
				},
				"month": "2017-03"
			},
			{
				"id": 23,
				"cardName": "星币骑士",
				"cardSign": 0,
				"cardCode": "110",
				"keyWords": "稳定、计划、责任",
				"cardsIdea": "星币骑士画面中的人物是静止而严肃的。他的眼光越过了五角星，观察着应该走哪条道路。他喜欢所有的事情都是有规律并且是有计划性的，他衡量着自己的选择，并且寻求对自己最有利的方式与方法。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n你要拿出十二万分的执着精神去面对你的工作，并不会仅仅是玩玩，或者是随时可以跳槽的。你目前视工作为一项长期的投资，是你整体人生职业规划中的一部分。你亦很有耐心，不会在关键时刻因为争夺好处而“掉链子”。保持耐心，又勤劳又负责的你自然不会被亏待。",
					"boss": "如果你是老板\r\n对于手中的事业你非常的认真，并且尽可能去亲力亲为。你喜欢所有计划都在你掌握中的感觉，事无巨细，只是一旦某个方面出现了不可预料的变化你就会有些焦虑和抓狂而钻牛角尖。试着让自己放松下来，要明白不可能所有事情的推动与发展都在你的预料之中，而所有的困难与麻烦都是磨炼你心智的过程。",
					"job": "如果你是求职者\r\n你喜欢安稳，并不善于处在变动的环境里，或许每一次的工作变动都会让你非常不安。如果你目前的公司无法满足你物质层面的期许，你或许会考虑到更具有发展价值的单位中去。以你严谨的思维，不必担心自己会吃亏。尽可能去尝试吧~聪明如你总会给自己留好后路的。"
				},
				"month": "2017-04"
			}
		],
		"status": 0,
		"msg": ""
	};

	var payedResultData = {
		"data": [{
				"id": 1,
				"cardName": "星币一",
				"cardSign": 0,
				"cardCode": "000",
				"keyWords": "新机会、务实、精力充沛",
				"cardsIdea": "正位的星币王牌是一张非常积极的牌，它意味着你有足够的金钱、精力，或充分的条件，来开始一项新计划。它暗示你可以平衡生活开支，不论目前花掉了多少钱，赚回来的绝对够本。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"payExplainModel": {
					"cy": "本月财运情况\r\n财运佳！就算一开始小有投入，之后也会钱滚钱，为你带来更多盈利的机会！",
					"rjgx": "本月职场人际关系\r\n人际关系佳！你自信的一面深得他人的信任！但是要注意出风头的时候也要保持谦虚和低调，不然恐招来他人的嫉妒，在不知不觉中树立小人哦~",
					"ky": "职场开运物品\r\n黑玛瑙、小盆栽"
				},
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n本月你的工作运不错哦！你温和与务实的特性会让你在工作中展现迷人的魅力，深得大伙的信任。这也是个开启新计划、新项目的好时机，如果你在职场上有什么创意点子，不妨拿出来跟大伙一起探讨吧！",
					"boss": "如果你是老板\r\n鸿运当头！本月你手中的项目都可以顺利推进！如果你拥有足够的资本，去开创新事业或展开事业中的新阶段，容易成功且稳赚不赔哟！但是也要注意适当的劳逸结合，别因为全情投入工作而忽略了自己的健康和家人哦！",
					"job": "如果你是求职者\r\n广撒简历吧，你的能力在招聘者眼中闪闪发光！只要你不懒惰，本月中你有很大的机会加入到资历雄厚的大型企业、或者是有发展潜力的新兴产业当中去！获得的薪酬也可以满足你内心的期许哦。"
				},
				"month": "2017-02"
			},
			{
				"id": 8,
				"cardName": "星币四",
				"cardSign": 1,
				"cardCode": "031",
				"keyWords": "浪费、动荡、节约过度",
				"cardsIdea": "收支平衡已经困扰你太长时间，而且一味的通过节约你会发现你却在意想不到的地方花费更多的金钱和精力。这是一张让你明白平衡真正意义的牌，并不是一味的节约和固守才会带来金钱运的改观。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"payExplainModel": {
					"cy": "本月财运情况\r\n你有意识的想要用金钱去交换某些筹码，但是可能你付出了10分，只能收获6、7分回报。这种不对等的形式久了会让你感觉心理失衡哦~运用你的判断力，钱要花在刀刃上才好。",
					"rjgx": "本月职场人际关系\r\n职场应酬有明显增加，不进行筛选每次都参加会让你的荷包大出血。你是大家眼中的活跃分子和不会拒绝的老好人，如何把握分寸和尺度，得有自己的判断力哦！",
					"ky": "职场开运物品\r\n茶晶、咖啡"
				},
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n一味的缩减自己的开支并不是一件会让你开心的事情，恐慌积蓄的减少也会让你觉得自己所经历的职场开始有了较大的动荡，你对职场变化尤为敏感。甚至会因为表现出太过明显的“止损动作”而成为别人的把柄，静观其变才是最上乘的应对方式。",
					"boss": "如果你是老板\r\n从本月开始，你过分的缩减开支反会让预期的项目受阻，缩减成本并不是坏事，但是过分的强调成本的缩减会引起合作方或是下属的不满。相信“一分耕耘一分收获”的道理，千万不要过分的紧盯那些推动项目运作的固定或关键开支不放，这反而会消耗你太多的精力。",
					"job": "如果你是求职者\r\n太想要用找到一份工作来改善自己收入情况的心态已经开始暴露弊端，你着急寻找工作的心态不断的让你开始降低自己的心理标准求全一个职位，但是这样寻找到的工作反而不会为你带来想要的收入，却消耗了你更多的精力和金钱。这个阶段你最应该的是调整心态，而不是着急投入到下一份工作中。"
				},
				"month": "2017-03"
			},
			{
				"id": 17,
				"cardName": "星币九",
				"cardSign": 0,
				"cardCode": "080",
				"keyWords": "自律、收获、稳操胜券",
				"cardsIdea": "星币九描述的是事业与物质上的成功，这种成功并非偶然，而是靠脚踏实地的努力去获得的。要获得成就，就必须懂得自我约束与适应规则，这便是成功必须付出的代价。",
				"addTime": "2016-12-12T10:38:03.15",
				"status": 0,
				"extend": null,
				"payExplainModel": {
					"cy": "本月财运情况\r\n本月无论你从事什么样的职业，能够获得提成，灰色收入的机会颇高呢~你把自己的财务安排的井井有条，每一笔钱要投到哪里都很清楚，保持这样的状态，避免无意义的浪费，都可以让你继续得到小财神的护佑！",
					"rjgx": "本月职场人际关系\r\n在职场同事的眼中，你可谓是自律界的模范标兵，是很多人向往成为的人呢！不如把自己的一些工作经验，小窍门分享给你的工作伙伴，你的职场人缘会飙升到新高度哟！",
					"ky": "职场开运物品\r\n黄水晶、五帝钱"
				},
				"freeExplainModel": {
					"work": "如果你是打工一族\r\n你所做的工作可以获得阶段性的成果，所有的辛劳都值回票价！甚至不排除在本月中有更有钱景的项目会主动找上你，工作量的增加可能会需要占用你的部分私人时间，或者是需要把工作带回家进行。在职场上保持你奋勇向前的斗志吧，你可能会被推到一个项目牵头人的位置上去，不必胆怯，要相信自己拥有把控全局的能力！",
					"boss": "如果你是老板\r\n你对自己的事业充满了自信心，这也鼓舞了你的合作伙伴与手下的士气，愿意为了实现共同的理想而努力。你正在经营的某个项目可能会带来理想的收益与回报，但这并不是可以松懈的时刻，你需要以身作则，更加规范大家的行为，资金运作的方式等等，这样才能够去创造一个良性的工作环境。",
					"job": "如果你是求职者\r\n你对自己的能力有着相当的自信，也会有精准的目标。过去的工作经验都可以拿出来成为换到更适合自己平台的筹码。在面试过程中保持从容和自信，可以让你在人前大放异彩，并且掌握主动权。也许你的选择不止一个，在不影响本职工作的同时，接一些合适的兼职也是不错的选择。"
				},
				"month": "2017-04"
			}
		],
		"status": 0,
		"msg": ""
	};

	// var resultData = freeResultData;

	var resultData;

	router.route('#/result/:orderid/:history', function (req, next) {
		$('.wnl_history_btn').addClass('hidden');
		textObj.url = location.href;
		textObj1.url = location.href;
		$(window).scrollTop(0, 0);
		// isHistory = parseInt(req.get('history'), 10);
		orderid = req.get('orderid');
		// var orderid = '00_245497464C74D614',
		var requestPromise;
		var queryString = '';
		$('.result_mask').addClass('hidden');
		$('.payModal').addClass('hidden');
		if (orderid === '-1') {
			createOrder();
			queryString = JSON.stringify({
				UserID: userId,
				DeviceID: deviceId,
				posId: posId,
				boundId: boundId,
				Token: Token,
				PToken: pToken,
				clientType: channel,
				goodsId: 'F1D6A30843A04615BBFACE92C03520EA',
				cardData: cardData
			});
			requestPromise = getCardDetail(queryString);
		} else {
			payedid = orderid;
			queryString = JSON.stringify({
				UserID: userId,
				DeviceID: deviceId,
				posId: posId,
				boundId: boundId,
				Token: Token,
				PToken: pToken,
				clientType: channel,
				goodsId: 'F1D6A30843A04615BBFACE92C03520EA',
				orderID: orderid
			});
			requestPromise = getCardDetail(queryString);
		}
		requestPromise.done(initResultData).fail(function () {
			console.log('未获取到数据');
			console.log(queryString);
		});
		//initResultData(resultData);
	});

	//44f1
	function getCardDetail(queryString) {
		return $.ajax({
			url: '//coco70.51wnl.com/numberologynew/Tarot/GetListCards',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: queryString
		});
	}

	function createOrder() {
		$.ajax({
			url: '//coco70.51wnl.com/numberologynew/Tarot/CreateOrder',
			type: 'POST',
			dataType: 'json',
			jsonp: 'callback',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({
				UserID: userId,
				DeviceMac: mac,
				DeviceID: deviceId,
				channel: sourceType,
				imeiNumber: imei,
				idfa: idfa,
				returnUrl: location.href,
				totalFee: 18,
				startName: astroName,
				posId: posId,
				boundId: boundId,
				Token: Token,
				clientType: channel,
				orderName: '塔罗事业运',
				pToken: pToken,
				goodsId: 'F1D6A30843A04615BBFACE92C03520EA',
				unLockedData: cardData,
				sysVersion: sysVersion,
				appVersion: appVersion
			})
		}).done(function (res) {
			if (res.status === 0) {
				payedid = res.data.orderID;
			}
		}).fail(function (a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		});
	}

	function initResultData(result) {
		resultData = result;
		$('.month_list .month_item').removeClass('unlock');
		$('.cards_top .card_result').removeClass('unactive');
		$('.cards_top .card_result').removeClass('unlock');
		for (var i = 0; i <= 2; i++) {
			var cardCode = resultData.data[i].cardCode.substr(0, 2);
			var front = resultData.data[i].cardCode.substr(2, 1);
			var card_result = $('.cards_top .card_result').eq(i);
			card_result.find('.card_result_img').css('background-image', 'url("../img/card.png")');
			if (!resultData.data[0].hasOwnProperty('payExplainModel')) {
				card_result.find('.card_result_img').eq(i).css('background-image', 'url("../img/cards/' + cardCode + '.jpg")');
				$('.result_content .work_transport').addClass('hidden');
				$('.result_content .lucky_star').addClass('hidden');
			}
			if (resultData.data[0].hasOwnProperty('payExplainModel')) {
				card_result.find('.card_result_img').css('background-image', 'url("../img/cards/' + cardCode + '.jpg")');
				$('.result_content .txt_tip').removeClass('hidden');
				$('.result_content .free_content_list').removeClass('hidden');
			}
			card_result.find('.card_result_img').css('-webkit-transform', 'rotateZ(0)');
			card_result.find('.card_result_img').css('transform', 'rotateZ(0)');
			if (front === '1') {
				card_result.find('.card_result_img').css('-webkit-transform', 'rotateZ(180deg)');
				card_result.find('.card_result_img').css('transform', 'rotateZ(180deg)');
			}
			var month_item = $('.month_list .month_item').eq(i);
			month_item.html(str2Int(resultData.data[i].month.substr(5)) + '月');
		}
		bindSectionData(0);
		if (resultData.data[0].hasOwnProperty('payExplainModel')) {
			//tabSwitch(0);
		}
		$('.cards_top .card_result').eq(0).removeClass('unlock');
		$('.month_list .month_item').eq(0).removeClass('unlock');
		$('.section').addClass('hidden');
		$('.result_section').removeClass('hidden');
		cardsTopAnimation();
		if (/payresult=1/.test(location.href)) {
			console.log(result);
			var shareUrl = "//mobile.51wnl.com/numberology/tlp/dist/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&boundid=[BUNDLE]&posId=[posId]";
			shareRedPackage({
				goodsId: "F1D6A30843A04615BBFACE92C03520EA",
				parterId: "TarotFate",
				orderId: orderid,
				title: '给你分享一个万年历红包',
				text: '100%有奖，立刻能用！',
				image: 'https://coco70.51wnl.com/numberologynew/gqy/static/img/rpshare.jpg',
				url: shareUrl,
				wxShareTitle: '提前知晓未来工作运，升职加薪就不远啦！',
				wxShareText: '万年历神准塔罗测算，把握三个月财运先机',
				wxShareImage: '1',
				wxShareUrl: location.href
			});
		}
	}

	function bindSectionData(index) {
		var data = resultData.data[index];
		setLockSatate();
		var card_result = $('.cards_top .card_result').eq(index);
		var month_item = $('.month_list .month_item').eq(index);
		$('.month_list .month_item').addClass('unlock');
		month_item.removeClass('unlock');
		$('.cards_top .card_result').addClass('unactive');
		card_result.removeClass('unactive');
		$('.result_arrow_wrapper .result_arrow').addClass('hidden');
		$('.result_arrow_list .result_arrow_wrapper').eq(index).find('.result_arrow').removeClass('hidden');
		var front = resultData.data[index].cardCode.substr(2, 1);
		$('.result_top_left .result_top_txt').html(data.cardName + (front === '1' ? '(逆位)' : ''));
		$('.result_top_right .result_top_txt').html(data.keyWords);
		$('.result_middle_txt').html(data.cardsIdea);

		var month = str2Int(data.month.substr(5));
		$('#txt_tip_wrapper_1').html(month + '月工作运');
		$('#txt_tip_wrapper_2').html(month + '月开运星阵');
		$('#txt_tip_wrapper_1').trigger('click');
		$('#txt_tip_wrapper_2').trigger('click');
		$('.mask_payed_content').addClass('hidden');
		$('.payed_content_list').addClass('hidden');
		$('.free_content_list').empty();
		$('.payed_content_list').empty();
		if (data.freeExplainModel) {
			$('.button_bottom').addClass('hidden');
			$('.kyxz').removeClass('hidden');
			$('.mask_payed_content').removeClass('hidden');
			for (var key in data.freeExplainModel) {
				if (data.freeExplainModel.hasOwnProperty(key)) {
					var splitLength = data.freeExplainModel[key].indexOf('\r\n');
					$('.free_content_list').append('<div class="result_section_content"><div class="section_title">' + data.freeExplainModel[key].substring(0, splitLength) + '</div><div class="section_txt">' + data.freeExplainModel[key].substring(splitLength) + '</div></div>');
				}
			}
		}
		if (data.payExplainModel) {
			$('.astroBanner').removeClass('hidden');
			$('.button_bottom').removeClass('hidden');
			$('.kyxz').addClass('hidden');
			$('.mask_payed_content').addClass('hidden');
			$('.payed_content_list').removeClass('hidden');
			for (key in data.payExplainModel) {
				if (data.payExplainModel.hasOwnProperty(key)) {
					splitLength = data.payExplainModel[key].indexOf('\r\n');
					$('.payed_content_list').append('<div class="result_section_content"><div class="section_title">' + data.payExplainModel[key].substring(0, splitLength) + '</div><div class="section_txt">' + data.payExplainModel[key].substring(splitLength) + '</div></div>');
				}
			}
		}
	}

	function setLockSatate() {
		for (var i = 0; i <= 2; i++) {
			var card_result = $('.cards_top .card_result:nth-child(' + (i + 1) + ')');
			var month_item = $('.month_list .month_item:nth-child(' + (i + 1) + ')');
			if (i !== 0 && !resultData.data[i].payExplainModel) {
				card_result.addClass('unlock');
				month_item.addClass('unlock');
			}
		}
	}
	$('.astroBanner').on('click', function() {
		location.href = "//astro.51wnl.com/index.html#/astro?posId=XZSYCY";
	})
	$('.card_result').click(function () {
		// $('.pay_btn').trigger('click');
		if ($(this).hasClass('unlock')) {
			if (payedid === '') {
				console.log('未获取到支付id');
				return false;
			}
			//设置唯一标识
			var uniqueId = !userId || userId.length == 0 ? deviceId : userId;
			//进入支付页面
			// console.log(location.host,location.pathname);
			// console.log(location.href);
			console.log(location.href);
			location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=18&source=塔罗事业运&orderName=塔罗事业运&parterid=Tarot&goodsid=F1D6A30843A04615BBFACE92C03520EA&parteruserid=' + uniqueId + '&data=' + payedid +
				'&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent(location.href) + '&clientType=' + channel + '&openid=' + openid;

		} else {
			var index = parseInt($(this).data('index'), 10) - 1;
			bindSectionData(index);
			if (resultData.data[0].hasOwnProperty('payExplainModel')) {
				//tabSwitch(index);
			}
		}

	});
	$('.list_arrow .month_item').click(function () {
		var index = $(this).index();
		if ($(this).hasClass('lock')) {
			showPayModal();
		}
		if (resultData.data[0].hasOwnProperty('payExplainModel')) {
			bindSectionData(index);
			//tabSwitch(index);
		}
	});

	$('.mask_payed_content .unlock_btn').click(function () {
		//showPayModal();
		if (payedid === '') {
			console.log('未获取到支付id');
			return false;
		}
		//设置唯一标识
		var uniqueId = !userId || userId.length == 0 ? deviceId : userId;
		//进入支付页面
		// console.log(location.host,location.pathname);
		// console.log(location.href);
		console.log(location.href);
		location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=18&source=塔罗事业运&orderName=塔罗事业运&parterid=Tarot&goodsid=F1D6A30843A04615BBFACE92C03520EA&parteruserid=' + uniqueId + '&data=' + payedid +
			'&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent(location.href) + '&clientType=' + channel + '&openid=' + openid;
	});

	function getDirection(startx, starty, endx, endy) {
		var angx = endx - startx;
		var angy = endy - starty;
		var result = 2;

		//如果滑动距离太短
		if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
			return result;
		}
		var angle = Math.atan2(angy, angx) * 180 / Math.PI; //获得角度
		if ((angle >= 160 && angle <= 180) || (angle >= -180 && angle <= -160)) {
			result = 0;
		} else if ((angle >= 0 && angle <= 20) || (angle >= -20 && angle <= 0)) {
			result = 1;
		} else {
			result = 2;
		}
		return result;
	}

	function tabSwitch(index) {
		var startx, starty;
		//手指接触屏幕
		document.addEventListener("touchstart", function (e) {
			startx = e.touches[0].pageX;
			starty = e.touches[0].pageY;
			time = +new Date;
		}, false);
		//手指离开屏幕
		document.addEventListener("touchend", function (e) {
			var endx, endy;
			endx = e.changedTouches[0].pageX;
			endy = e.changedTouches[0].pageY;
			var duration = +new Date - time;
			// console.log(duration);
			var direction = getDirection(startx, starty, endx, endy);
			switch (direction) {
			case 0:
				if (duration > 50 && duration < 300) {
					index = index + 1;
					if (index <= 2) {
						bindSectionData(index);
					}
					if (index > 2) {
						bindSectionData(2);
						index = 2;
					}
				}
				break;
			case 1:
				if (duration > 50 && duration < 300) {
					index = index - 1;
					if (index < 0) {
						bindSectionData(0);
						index = 0;
					}
					if (index >= 0) {
						bindSectionData(index);
					}
				}
				break;
			case 2:
				break;
			default:
			}
		}, false);
	}
	//根据起点终点返回方向 0向左 1向右
	// function getDirection(startx, starty, endx, endy) {
	//     var angx = endx - startx;
	//     var angy = endy - starty;
	//     var result = 2;
	//     var dx = Math.abs(angx);
	//     var dy = Math.abs(angy);
	//     // 如果滑动距离太短
	//     if ((dx < 2) && (dy < 2)) {
	//         return result;
	//     }
	//     if( dx > dy && angx > 20 && dy < 40){ //向右
	//         result = 1;
	//     }
	//     else if( dx > dy && angx < -20 && dy < 40){//向左
	//         result = 0;
	//     }
	//     else if( dy > dx && angy > 0 ){//向上
	//         result = 3;
	//     }
	//     else if(dy > dx && angy > 0){//向下
	//         result = 4;
	//     }
	//     // else {
	//     // 	result = 2;
	//     // }
	//
	//     return result;
	// }
	// function tabSwitch(index) {
	//     var startx, starty;
	//     //手指接触屏幕
	//     document.addEventListener("touchstart", function(e) {
	//         startx = e.touches[0].pageX;
	//         starty = e.touches[0].pageY;
	//         time = +new Date;
	//     }, false);
	//     // document.addEventListener("touchmove", function(e) {
	//     //   return false;
	//     // },false);
	//     //手指离开屏幕
	//     document.addEventListener("touchend", function(e) {
	//         var endx, endy;
	//         endx = e.changedTouches[0].pageX;
	//         endy = e.changedTouches[0].pageY;
	//         var duration = +new Date - time;
	//         var direction = getDirection(startx, starty, endx, endy);
	//         switch (direction) {
	//             case 0:
	//                 if(duration>10&&duration<300){
	//                     index = index +1;
	//                     if(index === 3){
	//                         index = 2;
	//                     }
	//                     console.log("向左滑动");
	//                     // console.log(index);
	//                     bindSectionData(index);
	//                 }
	//                 break;
	//             case 1:
	//                 if(duration>10&&duration<300){
	//                     index = index - 1;
	//                     if(index === -1){
	//                         index = 0;
	//                     }
	//                     console.log("向you滑动");
	//                     bindSectionData(index);
	//                     // console.log(index);
	//                 }
	//                 break;
	//             case 2:
	//                 break;
	//             case 3:
	//                 console.log('向上');
	//                 break;
	//             case 4:
	//                 console.log('向下');
	//                 break;
	//             default:
	//         }
	//     }, false);
	// }

	function showPayModal() {
		// if (!browser.isWx() && !browser.isWnl()) {
		// 	loadSchema('maintab?index=1');
		// 	return false;
		// }
		setTimeout(function () {
			$('.pay_icon').removeClass('hidden');
			$('.loading').addClass('hidden');
			$('.result_mask').removeClass('hidden');
			$('.payModal').css('top', Math.floor($(document.body).scrollTop() + window_height / 2) + 'px');
			$('.payModal').removeClass('hidden');
		});
	}
	$('.result_mask,.modal_close').click(function () {
		if (isLoading) {
			return false;
		}
		setTimeout(function () {
			$('.loading').addClass('hidden');
			$('.result_mask').addClass('hidden');
			$('.payModal').addClass('hidden');
		}, 0);
	});
	$('.result_mask').on('touchmove', function () {
		return false;
	});
	// $('.wx_pay_btn').click(function () {
	// 	payAction(1, this);
	// });
	// $('.zfb_pay_btn').click(function () {
	// 	payAction(2, this);
	// });
	$('.pay_btn').click(function () {
		if (payedid === '') {
			console.log('未获取到支付id');
			return false;
		}
		//设置唯一标识
		var uniqueId = !userId || userId.length == 0 ? deviceId : userId;
		//进入支付页面
		// console.log(location.host,location.pathname);
		// console.log(location.href);
		console.log(location.href);
		location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=18&source=塔罗事业运&orderName=塔罗事业运&parterid=Tarot&goodsid=F1D6A30843A04615BBFACE92C03520EA&parteruserid=' + uniqueId + '&data=' + payedid +
			'&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent(location.href) + '&clientType=' + channel + '&openid=' + openid;
	});
	//
	// function payAction(payType, obj) {
	// 	if (payedid === '') {
	// 		console.log('未获取到支付id');
	// 		return false;
	// 	}
	// 	$(obj).find('.pay_icon').addClass('hidden');
	// 	$(obj).find('.loading').removeClass('hidden');
	// 	isLoading = true;
	// 	$.ajax({
	// 		url: '//coco70.51wnl.com/numberologynew/Tarot/PayOrderWithScore',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		contentType: 'application/json; charset=utf-8',
	// 		data: JSON.stringify({
	// 			UserID: userId,
	// 			DeviceMac: mac,
	// 			DeviceID: deviceId,
	// 			channel: sourceType,
	// 			imeiNumber: imei,
	// 			idfa: idfa,
	// 			orderName: '塔罗事业运',
	// 			payType: payType,
	// 			returnUrl: location.href,
	// 			posId: posId,
	// 			clientType: channel,
	// 			goodsId: 'F1D6A30843A04615BBFACE92C03520EA',
	// 			orderID: payedid
	// 		})
	// 	}).done(function (result) {
	// 		isLoading = false;
	// 		if (result.status === 0) {
	// 			payedid = result.data.orderID;
	// 			if (payType === 1) {
	// 				location.href = 'protocol://paywechat#' + encodeURI(decodeURI(result.data.payData + '<p>' + payedid));
	// 			} else {
	// 				location.href = 'protocol://payali#' + encodeURI(decodeURI(result.data.payData + '<p>' + payedid));
	// 			}
	// 		}
	// 	});
	// }
	router.play(1);

	/**
	 * cardsTopAnimation  结果页顶端卡片滑动效果
	 * @return {[type]} [description]
	 */
	function cardsTopAnimation() {
		var cards_top = $('.cards_top').offset().top;
		var list_top = $('.list_arrow').offset().top;
		$(window).scroll(function () {
			var scrollTop = $(this).scrollTop();
			var opacity = (scrollTop / list_top > 1) ? 0 : scrollTop / list_top;
			var font_size = (0.9 + opacity) * 15;
			if (scrollTop > 0) {
				$('.card_result').css({
					opacity: 1 - opacity
				});
				if (font_size < 21) {
					$('.month_item').css({
						'font-size': font_size + 'px'
					});
					$('.month_item_line').css({
						opacity: (opacity - 0.1) * 1.7
					});
				}
			}
			if (scrollTop >= list_top - cards_top * 3) {
				$('.month_item').css({
					'font-size': 21 + 'px'
				});
				$('.month_item_line').css({
					opacity: 0.5
				});
				if (!resultData.data[0].hasOwnProperty('payExplainModel')) {
					$('.month_item:nth-child(2),.month_item:nth-child(3)').addClass('lock');
				}
			}
			if (scrollTop >= list_top - 20) {
				$('.list_arrow').addClass('list_arrow_fix');
			} else if (scrollTop < list_top - 20) {
				$('.list_arrow').removeClass('list_arrow_fix');
			}
			if (scrollTop < cards_top) {
				$('.card_result').css({
					opacity: 1
				});
				$('.month_item').css({
					'font-size': 15 + 'px'
				});
				$('.month_item_line').css({
					opacity: 0
				});
				$('.month_item:nth-child(2),.month_item:nth-child(3)').removeClass('lock');
			}
		});
	}
});
var payedid = '';
var isLoading = false;

// function localsdksupportcallback(result) {
// 	var localsdksupport = JSON.parse(result);
// 	if (localsdksupport.wechatpay === 1) {
// 		$('.wx_pay_btn').removeClass('hidden');
// 	}
// 	if (localsdksupport.alipay === 1) {
// 		$('.zfb_pay_btn').data('sdk', 1);
// 	}
// }
var router = new Router();

function payResult(result) {
	$('.pay_icon').removeClass('hidden');
	$('.loading').addClass('hidden');
	isLoading = false;
	if (parseInt(result) === 1) {
		setTimeout(function () {
			if (location.href.indexOf('/-1') > -1) {
				router.redirect('#/result/' + payedid);
			} else {
				location.reload();
			}
		}, 500);
	}
}
/**
 * protocal获取客户端数据
 * @param  {[type]} result base64编码后的数据
 * @return {[type]}        [description]
 */
function userinfocallback(result) {
	var originalString = Base64.decode(result);
	var originalAllObj = JSON.parse(originalString);
	var originalObj = originalAllObj.tlp || originalAllObj.lyys || originalAllObj.bzcs || originalAllObj.native_jryc || originalAllObj.native_usercenter;
	if (originalObj && originalObj.date && originalObj.date.length !== 0) {
		var month = str2Int(originalObj.date.substring(5, 7)),
			day = originalObj.date.substring(8, 10);
		astroIndex = toAstroIndex(month, day);
		astroName = astroDetailList[astroIndex][0];
		$('.choose_astro_name').html(astroDetailList[astroIndex][1]);
		$('.astro_list_item').removeClass('active');
		$('.astro_list_item.' + astroName).removeClass('active');
		$('.astro_mask').removeClass('hidden');
		$('.astro_select_modal').removeClass('hidden');
		beginTxtAnnimation();
	} else {
		$('.astro_mask').removeClass('hidden');
		$('.astro_select_modal').removeClass('hidden');
	}
}

/**
 * feedbackAnimation  客户反馈滚动显示
 * @return {[type]} [description]
 */
function feedbackAnimation() {
	var ul = $('.quotation ul');
	setTimeout(function () {
		setInterval(function () {
			var txtHeight = ul.find('li:first').height();
			ul.animate({
				marginTop: -txtHeight + 'px'
			}, 1000, function () {
				ul.find('li').next().prependTo(ul);
				ul.find("li:first").hide();
				ul.css({
					marginTop: 17.5 + 'px'
				});
				ul.find('li:last').removeClass('hidden');
				ul.find('li:first').show();
			});
		}, 4000);
	}, 0)
}




/**
 * 开始文字动画
 * @return {[type]} [description]
 */
function beginTxtAnnimation() {
	var _slideFun = [
		function () {
			$('.txt_show_line.line1').animate({
				'opacity': 1
			}, 1000, _takeOne);
		},
		function () {
			$('.txt_show_line.line2').animate({
				'opacity': 1
			}, 1000, _takeOne);
		},
		function () {
			return $('.txt_show_line.line3').animate({
				'opacity': 1
			}, 1000, _takeOne);
		},
		function () {
			$('.txt_show_line.line4').animate({
				'opacity': 1
			}, 1000, _takeOne);
		}
	];
	$('.choose_astro_content').queue('slideList', _slideFun);
	var _takeOne = function () {
		$('.choose_astro_content').dequeue('slideList');
	};
	_takeOne();
}
/**
 * 公历月',日判断所属星座
 * @param  cMonth [description]
 * @param  cDay [description]
 * @return Cn string
 */
function toAstroIndex(cMonth, cDay) {
	var s = '\u6469\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u6469\u7faf';
	var arr = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
	var astroName = s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7'; //座
	var index = astroList.indexOf(astroName);
	return index;
}
/**
 * 字符转换成数组--修复安卓首字母为0的bug
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

//utf-16转utf-8
function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

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
var intervalCounter = 0;
/**
 * toast函数
 * @param  {[type]} message 显示的文本
 * @return {[type]}         [description]
 */
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
/**
 * findIndex的es5实现
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
if (!Array.prototype.findIndex) {
	Object.defineProperty(Array.prototype, 'findIndex', {
		value: function (predicate) {
			'use strict';
			if (this == null) {
				throw new TypeError('Array.prototype.findIndex called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return i;
				}
			}
			return -1;
		},
		enumerable: false,
		configurable: false,
		writable: false
	});
}

function formatDate(date, fmt) {
	var o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		'S': date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	return fmt;
}

// var isHistory = false;

// function ylappCallback_back() {
// 	if (location.hash === '' && !/backToExit/.test(location.href)) {
// 		alert('1');
// 		if (window.ylwindow) {
// 			//window.ylwindow.reportHasBack(false);
// 			return 0;
// 		}
// 	} else if (location.hash === '') {
// 		alert('2');
// 		// if (window.ylwindow) {
// 		// 	window.ylwindow.reportHasBack(true);
// 		// }
// 		location.href = 'protocol://exit';
// 	} else if (location.hash !== '' && location.href.indexOf('#/result') > -1) {
// 		alert('redirct');
// 		//router.redirect('#/');
// 		if (window.ylwindow) {
// 			window.ylwindow.reportHasBack(true);
// 			return 0;
// 		}
// 		return 0;
// 	}
// 	if (window.ylwindow) {
// 		alert('no nono');
// 		//window.ylwindow.reportHasBack(false);
// 	} else {
// 		location.href = 'protocol://exit';
// 	}
// 	return 0;
// }

function shuffle(arr) {
	var i, j, temp;
	for (i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}
var title = '提前知晓未来工作运，升职加薪就不远啦！';
var text = '万年历神准塔罗测算，把握三个月财运先机';
var imageURL = 'https://coco70.51wnl.com/numberologynew/ndys/img/share.jpg';
var textObj = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	url: location.href.replace('&payresult=1', '') + "&share=1",
	pureText: text,
	prefix: ''
};
var textObj1 = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	targetUrl: location.href.replace('&payresult=1', '') + "&share=1",
	perfix: ''
};

function appCallback_share() {
	if (window.ylwindow) {
		window.ylwindow.reportHasShare(true);
		location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
	} else {
		location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
	}
	return 1;
}
