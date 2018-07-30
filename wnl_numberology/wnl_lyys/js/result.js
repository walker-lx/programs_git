// var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
// var userId = localData && localData.userId ? localData.userId : '';
// var deviceId = localData && localData.deviceId ? localData.deviceId : '';
// var posId = localData && localData.posId ? localData.posId : '';
// var imei = localData && localData.imei ? localData.imei : '';
// var mac = localData && localData.mac ? localData.mac : '';
// var pushToken = localData && localData.pushToken ? localData.pushToken : '';
// var pToken = localData && localData.pToken ? localData.pToken : '';
// var sourceType = localData && localData.sourceType ? localData.sourceType : '';

var userId = getQueryValue('userId');
var deviceId = getQueryValue('deviceId');
var posId = getQueryValue('posId') || getQueryValue('posid');
var pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken');
var mac = getQueryValue('mac');
var imei = getQueryValue('imei');
var pToken = getQueryValue('pToken') || getQueryValue('ptoken');
var idfa = getQueryValue('idfa');
var boundId = getQueryValue('boundId');
var sourceType = getQueryValue('sourceType');
var couponId = getQueryValue('couponId') || '';
var id = getQueryValue('orderid');
var ua = window.navigator.userAgent;
var appVersion = ua.split(' ').pop();
var sysVersion = GetIOSVersion() || getAndroidVersion();
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

var openid = '';
if (browser.isWx()) {
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if(wnl_loc && wnl_loc.openid) {
		openid = wnl_loc.openid;
	}
}
if (browser.isIOS()){
	$('.confirm_btn_fixed').css({'background-color': 'rgba(252, 251, 249, 0.8)'});
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

var uniqueId = userId === '' ? deviceId : userId; //用户设备当前标识

// iphoneX适配
function isIphoneX(){
	ua = window.navigator.userAgent;
	if (ua.match(/iPhone|iPad|iPod/i)) {
		if (parseInt(window.devicePixelRatio) ===3 && parseInt(window.screen.width) === 375) {
		return true;
		}
		return false;
	}
	return false;
}
if(isIphoneX()){
	// var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: #f6f6f6;"></div>'
 //    $('body').append(iphoneXbanner);
    $('.copyRight').css({'padding-bottom':'34px'});
    $('.tab_wrapper').css({'padding-bottom':'34px'});
    $('.month_tab_list').css({'padding-bottom':'34px'});
    $('.month_tab').css({'padding-bottom':'34px'});
	$('.confirm_btn_fixed').css({'height':'94px'});
}
$(function () {
	if (!browser.isWnl()) {
		$('.wnlBanner').show();
	} else {
		//向客户都发送查询请求
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
		}, 0);
	}
	$('.closeBanner').click(function () {
		$('.wnlBanner').hide();
	});
	$('.downloadBtn').click(function () {
		loadSchema('http://jptjios.51wnl.com/app/maintab?index=1', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&android_schema=youloft419805549://maintab?index=1');
	});
	var isShare = getQueryValue('isShare') || 0;
	var code = getQueryValue('code');
	// var dataO = getQueryValue('data');
	// var data = JSON.parse(Base64.decode(dataO));
	var dateNow = new Date();
	var year = dateNow.getFullYear(),
		month = dateNow.getMonth() + 1,
		day = dateNow.getDate();
	// var totalDays = solarDays(year, month);
	var currentIndex = 0,
		lunarModel = [];
	var maxSlideWidth = 0;
	var window_width = $(window).width();
	if (window.ylwindow) {
		window_width = ylwindow.getWidth();
		if (window_width > 1024 && window.devicePixelRatio > 1) {
			window_width = window_width / window.devicePixelRatio;
		}
	}
	// var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
	var itemWidth = 0,
		isPayed = false;
	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/numberologynew/lunar/GetOrderDetail',
		data: {
			'orderId': id,
			'code': code,
			'userId': userId,
			'deviceId': deviceId,
			'pushToken': pushToken,
			'pToken': pToken,
			'channel': sourceType,
			'isShare': isShare
		},
		success: function (result) {
			if (result.status == 0) {
				console.log(result);
				initUserDetail(result.data);
				if (result.data.payStatus === 1) {
					textObj.url = currUrl;
					textObj1.targetUrl = currUrl;
					lunarModel = result.data.lunarModel;
					var beginYear = str2Int(result.data.beginMonth.substr(0, 4)),
						beginMonth = str2Int(result.data.beginMonth.substr(5));
					var nextIndex = getMonthIndex(beginYear, month);
					$('.result_top_info').attr('value', ((parseInt(lunarModel[0].endDate.split('-')[1]) - 1) === 0 ? 12 : (parseInt(lunarModel[0].endDate.split('-')[1]) - 1)) + '月运势卡');
					if (lunarModel) {
						var index = getShowTabIndex(lunarModel);
						beginYear = str2Int(lunarModel[0].startDate.substr(0, 4)), beginMonth = str2Int(lunarModel[0].startDate.substr(5, 2));
						var monthIndex = getMonthIndex(beginYear, beginMonth);
						var nextBeginDateObj = getDateObjFromString(monthInfo[monthIndex].beginDate);
						if (getIntervalDays1(dateNow, nextBeginDateObj) > 7) {
							// if (((nextBeginDateObj.getFullYear() !== dateNow.getFullYear() || nextBeginDateObj.getMonth() !== dateNow.getMonth()) && getIntervalDays1(nextBeginDateObj, dateNow) >= 7)) {
							$('.not_date_month').html(beginMonth);
							$('.show_date').html(((beginYear !== dateNow.getFullYear()) ? (beginYear + '年') : '') + beginMonth + '月' + str2Int(monthInfo[nextIndex].endDate.substr(6, 2)) + '日');
							$('.mask').removeClass('hidden');
							$('.month_lock_modal.not_date').removeClass('hidden');
							$('.month_lock_modal.not_date .modal_bg').height($('.month_lock_modal.not_date .modal_content').height() - 40);
							return false;
						}
						initPayedServerData(lunarModel[index]);
						if (!/isShare=1/.test(location.href)) {
							$('.result_payed_content').removeClass('hidden');
							$('.tab_wrapper').removeClass('hidden');
							$('.contact_content').removeClass('hidden');
							$('.copyRight').removeClass('hidden');
							$('.confirm_btn_fixed').removeClass('hidden');
							if(!browser.isWnl()){
								$('.cardShareText').remove();
								$('.viewInfo').css('margin-top','18px');
							}
						} else{
							$('.info_sex').removeClass('hidden');
							$('.goPredictBtn').removeClass('hidden');
							$('.contact_content').addClass('hidden');
							$('.copyRight').addClass('hidden');
							$('.card_bottom_share').removeClass('hidden');
							$('.card_bottom_payed').addClass('hidden');
							$('.tab_wrapper').addClass('hidden');
							$('.confirm_btn_fixed').addClass('hidden');
							$('.result_top_info').addClass('result_top_info_share');
						}
						// 客户端&微信端&浏览器端都添加MonthTab
						createMonthTabList(lunarModel, index);

						if (/payresult=1/.test(location.href) & !/isShare=1/.test(location.href)) {
							console.log(result);
							var goodsId = localStorage.getItem('payedGoodsId');
							var shareUrl = "//mobile.51wnl.com/numberology/lyys/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]";
							shareRedPackage({
								goodsId: goodsId,
								parterId: "Lunar",
								orderId: result.data.id,
								url: shareUrl,
								wxShareTitle: '每月运势早知道',
								wxShareText: '流月运势详批，事业、爱情、财富、健康独家开运秘诀',
								wxShareImage: '1',
								wxShareUrl: location.href
							});
						}

						if(isIphoneX()){
							// var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: #f6f6f6;"></div>'
						 	//  $('body').append(iphoneXbanner);
						    $('.copyRight').css({'padding-bottom':'34px'});
						    $('.tab_wrapper').css({'padding-bottom':'34px'});
						    $('.month_tab_list').css({'padding-bottom':'34px'});
						    $('.month_tab').css({'padding-bottom':'34px'});
							$('.confirm_btn_fixed').css({'height':'94px'});
						}
					} else {
						$('.not_date_month').html(beginMonth);
						$('.show_date').html(((beginYear !== dateNow.getFullYear()) ? (beginYear + '年') : '') + beginMonth + '月' + str2Int(monthInfo[nextIndex].endDate.substr(6, 2)) + '日');
						$('.mask').removeClass('hidden');
						$('.month_lock_modal.not_date').removeClass('hidden');
						$('.month_lock_modal.not_date .modal_bg').height($('.month_lock_modal.not_date .modal_content').height() - 40);
					}
				} else {
					textObj.url = baseUrl;
					textObj1.targetUrl = baseUrl;
					$('.result_top_info').attr('value', (parseInt(result.data.beginMonth.split('-')[1]))+ '月运势卡');
					if (result.data.lunarFreeModel) {
						initDateData(getDateObjFromString(result.data.lunarFreeModel[0].startDate));
						initFreeServerData(result.data.lunarFreeModel[0]);
						$('.result_detail_content').removeClass('hidden');
						$('.lock_btn').removeClass('hidden');
					} else {
						beginYear = str2Int(result.data.beginMonth.substr(0, 4)), beginMonth = str2Int(result.data.beginMonth.substr(5));
						alert('暂无' + ((beginYear !== dateNow.getFullYear()) ? (beginYear + '年') : '') + beginMonth + '月的数据');
					}
				}
			}
		}
	});

	function getShowTabIndex(lunarModel) {
		var index = 0,
			isFind = false;
		for (var i = 0; i < lunarModel.length; i++) {
			var startDate = getDateObjFromString(lunarModel[i].startDate);
			if (year === startDate.getFullYear() && month === startDate.getMonth() + 1) {
				index = i;
				isFind = true;
				break;
			}
		}
		var monthIndex = getMonthIndex(year, month);
		var nextBeginDateObj = getDateObjFromString(monthInfo[monthIndex].beginDate);
		if (index !== 0 && ((nextBeginDateObj.getFullYear() !== dateNow.getFullYear() || nextBeginDateObj.getMonth() !== dateNow.getMonth()) && getIntervalDays(nextBeginDateObj, dateNow) >= 7)) {
			index--;
		}
		if (!isFind) {
			var indexDate1 = getDateObjFromString(lunarModel[0].startDate);
			var indexDate2 = getDateObjFromString(lunarModel[lunarModel.length - 1].startDate);
			if ((year < indexDate1.getFullYear()) || (year === indexDate1.getFullYear() && month < indexDate1.getMonth() + 1)) {
				index = 0;
			} else if ((year > indexDate2.getFullYear()) || (year === indexDate2.getFullYear() && month > indexDate2.getMonth() + 1)) {
				index = lunarModel.length - 1;
			}
		}
		return index;
	}

	function initUserDetail(data) {
		var name = data.name;
		if (checkWordLen(name) > 8) {
			name = name.substr(0, 4) + '...';
		}
		$('.info_name').html(name);
		$('.info_sex').html(data.sex ? '男' : '女');
		$('.info_date').html('公历 ' + data.birthDay.substr(0, 10).replace('-', '年').replace('-', '月') + '日' + (data.timeHour !== 24 ? (' ' + data.timeHour + '时') : ''));
		var maxLength = $('.result_name_content').width() + 30 > $('.result_date_content').width() ? $('.result_name_content').width() + 30 : $('.result_date_content').width();
		$('.result_name_content').width(maxLength);
		$('.result_date_content').width(maxLength);
		$('.result_name_content,.result_date_content').css('left', '50%');
		$('.result_name_content,.result_date_content').css('margin-left', '-' + maxLength / 2 + 'px');
		$('.viewNum').text(data.browseNum);
		if(parseInt(data.browseNum) === 0) {
			if (browser.isWnl()) {
				$('.viewInfo').html('出生时辰会为你保密，请放心分享');
			} else {
				$('.viewInfo').remove();
			}

		}
	}

	function initFreeServerData(lunarModel) {
		isPayed = false;
		$('.result_score').html(parseInt(lunarModel.score));
		if(lunarModel.score >= 80) {
			$('.card_bottom_notPayed').find('.cardText').html('查看如何趋利避害');
		}
		var scoreExpressText = scoreExpress(parseInt(lunarModel.score));
		$('.score_tip').text(scoreExpressText);
		$('.cesuan_month').html(lunarModel.scoreName);
		$('.card_bottom_payed').addClass('hidden');
		$('.card_bottom_notPayed').removeClass('hidden');
		$('.contact_content').removeClass('hidden');
		$('.copyRight').removeClass('hidden');
		$('.confirm_btn_fixed').removeClass('hidden');
		$('.card_bottom_notPayed').click(function(){
			$('.lock_btn').trigger('click');
		});
	}

	function initPayedServerData(lunarModel) {
		// window.score1 = parseInt((parseInt(lunarModel.work)*10 + parseInt(lunarModel.study)*10 + parseInt(lunarModel.job)*10 + parseInt(lunarModel.help)*10)/4);
		// window.score2 = parseInt((parseInt(lunarModel.marrage)*10 + parseInt(lunarModel.love)*10 + parseInt(lunarModel.showLove)*10 + parseInt(lunarModel.oldFlame)*10)/4);
		// window.score3 = parseInt((parseInt(lunarModel.mainWealth)*10 + parseInt(lunarModel.minorWealth)*10 + parseInt(lunarModel.fund)*10 +parseInt(lunarModel.consume)*10)/4);
		// window.score4 = parseInt((parseInt(lunarModel.health)*10 + parseInt(lunarModel.family)*10)/2);
		// window.score0 = parseInt((score1 + score2 + score3 + score4)/4);
		window.score1 = 10 * parseInt(lunarModel.workAndStudy);
		window.score2 = 10 * parseInt(lunarModel.marrageAndLove);
		window.score3 = 10 * parseInt(lunarModel.wealth);
		window.score4 = 10 * parseInt(lunarModel.healthAndFamily);
		isPayed = true;
		$('.scoreItemBarInfo').css({background:'#f16300'});
		$('.scoreItemBarInfo1').text(score1);
		$('.scoreItemBarInfo1').css({width: (30+score1*0.7) + '%'});
		$('.scoreItemBarInfo2').text(score2);
		$('.scoreItemBarInfo2').css({width: (30+score2*0.7) + '%'});
		$('.scoreItemBarInfo3').text(score3);
		$('.scoreItemBarInfo3').css({width: (30+score3*0.7) + '%'});
		$('.scoreItemBarInfo4').text(score4);
		$('.scoreItemBarInfo4').css({width: (30+score4*0.7) + '%'});

		initDateData(getDateObjFromString(lunarModel.startDate));
		$('.info_detail_star').removeClass('active');
		$('.result_score').html(parseInt(lunarModel.score));
		$('.confirm_btn_fixed').hide();
		var scoreExpressText = scoreExpress(parseInt(lunarModel.score));
		$('.score_tip').text(scoreExpressText);
		$('.monthTotalScore').text(parseInt(lunarModel.score) + ' ' + scoreExpressText);
		$('.cesuan_month').html(lunarModel.scoreName);

		$('.info_detail.zhengti').html(lunarModel.scoreText);

		$('.info_detail.kaiyun').html(lunarModel.harmText);

		$('.xysy .result_info_txt').html(score1 + ' ' + lunarModel.workAndStudyName);
		$('.gzsy .info_detail_desc').html(lunarModel.workText);
		// 清空stars
		$('.info_detail_title_stars').empty();
		for (var i = 1; i <= Math.floor(lunarModel.work / 2); i++) {
			lunarModel.work > 1 && $('.gzsy .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.work % 2 !== 0) {
			$('.gzsy .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
			i++;
		}
		for (; i <= 5; i++) {
			lunarModel.work > 1 && $('.gzsy .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.xyks .info_detail_desc').html(lunarModel.studyText);
		for (i = 1; i <= Math.floor(lunarModel.study / 2); i++) {
			lunarModel.study > 1 && $('.xyks .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.study % 2 !== 0) {
			i++;
			$('.xyks .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.study > 1 && $('.xyks .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.qzms .info_detail_desc').html(lunarModel.jobText);
		for (i = 1; i <= Math.floor(lunarModel.job / 2); i++) {
			lunarModel.job > 1 && $('.qzms .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.job % 2 !== 0) {
			i++;
			$('.qzms .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.job > 1 && $('.qzms .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.grbf .info_detail_desc').html(lunarModel.helpText);
		for (i = 1; i <= Math.floor(lunarModel.help / 2); i++) {
			lunarModel.help > 1 && $('.grbf .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.help % 2 !== 0) {
			i++;
			$('.grbf .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.help > 1 && $('.grbf .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}
		$('.hlqg .result_info_txt').html(score2 + ' ' + lunarModel.marrageAndLoveName);
		$('.gqrq .info_detail_desc').html(lunarModel.marrageText);
		for (i = 1; i <= Math.floor(lunarModel.marrage / 2); i++) {
			lunarModel.marrage > 1 && $('.gqrq .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.marrage % 2 !== 0) {
			i++;
			$('.gqrq .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.marrage > 1 && $('.gqrq .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.thws .info_detail_desc').html(lunarModel.loveText);
		for (i = 1; i <= Math.floor(lunarModel.love / 2); i++) {
			lunarModel.love > 1 && $('.thws .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.love % 2 !== 0) {
			i++;
			$('.thws .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.love > 1 && $('.thws .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.gbcg .info_detail_desc').html(lunarModel.showLoveText);
		for (i = 1; i <= Math.floor(lunarModel.showLove / 2); i++) {
			lunarModel.showLove > 1 && $('.gbcg .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.showLove % 2 !== 0) {
			i++;
			$('.gbcg .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.showLove > 1 && $('.gbcg .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.jqfr .info_detail_desc').html(lunarModel.oldFlameText);
		for (i = 1; i <= Math.floor(lunarModel.oldFlame / 2); i++) {
			lunarModel.oldFlame > 1 && $('.jqfr .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.oldFlame % 2 !== 0) {
			i++;
			$('.jqfr .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.oldFlame > 1 && $('.jqfr .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.cfys .result_info_txt').html(score3 + ' ' + lunarModel.wealthName);
		$('.zcy .info_detail_desc').html(lunarModel.mainWealthText);
		for (i = 1; i <= Math.floor(lunarModel.mainWealth / 2); i++) {
			lunarModel.mainWealth > 1 && $('.zcy .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.mainWealth % 2 !== 0) {
			i++;
			$('.zcy .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.mainWealth > 1 && $('.zcy .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.pcy .info_detail_desc').html(lunarModel.minorWealthText);
		for (i = 1; i <= Math.floor(lunarModel.minorWealth / 2); i++) {
			lunarModel.minorWealth > 1 && $('.pcy .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.minorWealth % 2 !== 0) {
			i++;
			$('.pcy .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.minorWealth > 1 && $('.pcy .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.tzy .info_detail_desc').html(lunarModel.fundText);
		for (i = 1; i <= Math.floor(lunarModel.fund / 2); i++) {
			lunarModel.fund > 1 && $('.tzy .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.fund % 2 !== 0) {
			i++;
			$('.tzy .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.fund > 1 && $('.tzy .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.xfy .info_detail_desc').html(lunarModel.consumeText);
		for (i = 1; i <= Math.floor(lunarModel.consume / 2); i++) {
			lunarModel.consume > 1 && $('.xfy .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.consume % 2 !== 0) {
			i++;
			$('.xfy .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.consume > 1 && $('.xfy .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.jkys .result_info_txt').html(score4 + ' ' + lunarModel.healthAndFamilyName);
		$('.stjk .info_detail_desc').html(lunarModel.healthText);
		for (i = 1; i <= Math.floor(lunarModel.health / 2); i++) {
			lunarModel.health > 1 && $('.stjk .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.health % 2 !== 0) {
			i++;
			$('.stjk .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.health > 1 && $('.stjk .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}

		$('.jrpa .info_detail_desc').html(lunarModel.familyText);
		for (i = 1; i <= Math.floor(lunarModel.family / 2); i++) {
			lunarModel.family > 1 && $('.jrpa .info_detail_title_stars').append('<div class="info_detail_star "></div>');
		}
		if (lunarModel.family % 2 !== 0) {
			i++;
			$('.jrpa .info_detail_title_stars').append('<div class="info_detail_star half"></div>');
		}
		for (; i <= 5; i++) {
			lunarModel.family > 1 && $('.jrpa .info_detail_title_stars').append('<div class="info_detail_star_blur"></div>');
		}
	}

	function initDateData(dateObj) {
		year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, day = dateObj.getDate();
		var chooseMonthLunarInfo = new calendar(year, month - 1);
		var solarTerms = '',
			dateString1 = '',
			dateString2 = '';
		for (var i = 1; i <= chooseMonthLunarInfo.length; i++) {
			if (chooseMonthLunarInfo[i - 1].solarTerms && chooseMonthLunarInfo[i - 1].solarTerms.length > 0) {
				solarTerms += chooseMonthLunarInfo[i - 1].solarTerms + '、';
				// if (dateString1 === '') {
				// 	var beginDate = lunar2solar(year, chooseMonthLunarInfo[i - 1].lMonth, i + 1);
				// 	dateString1 = ((beginDate.getMonth() + 1) > 9 ? (beginDate.getMonth() + 1) : ('0' + (beginDate.getMonth() + 1))) + '月' + ((beginDate.getDate()) > 9 ? (beginDate.getDate()) : ('0' + (beginDate.getDate()))) + '日';
				// }
				// else if (dateString2 === '') {
				// 	var endDate = lunar2solar(year, chooseMonthLunarInfo[i - 1].lMonth, i + 1);
				// 	dateString2 = ((endDate.getMonth() + 1) > 9 ? (endDate.getMonth() + 1) : ('0' + (endDate.getMonth() + 1))) + '月' + (endDate.getDate() > 9 ? (endDate.getDate()) : ('0' + endDate.getDate())) + '日';
				// }
			}
		}
		solarTerms = solarTerms.substr(0, solarTerms.length - 1);
		$('.liuyue').html(chooseMonthLunarInfo[day - 1].cMonth + '月');
		var dateNum = parseInt(year + '' + (month > 9 ? month : ('0' + month)) + '' + (day > 9 ? day : ('0' + day)), 10);
		for (i = 0; i < monthInfo.length; i++) {
			if (dateNum >= parseInt(monthInfo[i].beginDate, 10) && dateNum <= parseInt(monthInfo[i].endDate, 10)) {
				currentIndex = i;
				dateString1 = monthInfo[i].beginDate.substr(4, 2) + '月' + monthInfo[i].beginDate.substr(6, 2) + '日';
				dateString2 = monthInfo[i].endDate.substr(4, 2) + '月' + monthInfo[i].endDate.substr(6, 2) + '日';
				break;
			}
		}
		$('.jieqi_info').html(dateString1 + ' ~ ' + dateString2);
		$('.solarTerms').html(solarTerms);
		$('.result_top_info').removeClass('visibility_hidden');
		$('.contact_content').removeClass('visibility_hidden');
	}

	function createMonthTabList(data, index) {
		for(var i=0;i<data.length; i++){
			if(data.length - i > 5){
				// data.shift();
			} else {
				break;
			}
		}
		var lockYear = dateNow.getFullYear(),
			lockMonth = dateNow.getMonth() + 1;
		itemWidth = data.length === 1 ? Math.floor(window_width / 2) : Math.floor(window_width / 5 * 2);
		for (var i = 0; i < data.length; i++) {
			lockYear = parseInt(data[i].startDate.substr(0, 4), 10);
			lockMonth = parseInt(data[i].startDate.substr(5, 2), 10);
			var tabString = '<div data-index="' + i + '" data-year="' + lockYear + '" data-month="' + lockMonth + '" class="month_tab" style="width:' + itemWidth + 'px; background-color: rgba(252, 251, 249, 0.92);">' + (lockYear !== dateNow.getFullYear() ? (lockYear + '年') : '') + lockMonth + '月</div>';
			if (browser.isIOS()) {
			 	// tabString = '<div data-index="' + i + '" data-year="' + lockYear + '" data-month="' + lockMonth + '" class="month_tab" style="width:' + itemWidth + 'px; background-color: rgba(252, 251, 249, 0.8);">' + (lockYear !== dateNow.getFullYear() ? (lockYear + '年') : '') + lockMonth + '月</div>';
			}
			if (i === index) {
				tabString = '<div data-index="' + i + '" data-year="' + lockYear + '" data-month="' + lockMonth + '"  class="month_tab active" style="width:' + itemWidth + 'px;">' + (lockYear !== dateNow.getFullYear() ? (lockYear + '年') : '') + lockMonth + '月</div>';
			}
			$(tabString).appendTo('.month_tab_list');
		}
		var lockLastDate = new Date(lockYear, lockMonth - 1, 1);
		lockLastDate.setMonth(lockLastDate.getMonth() + 1);
		//跨月份
		if ((lockLastDate.getFullYear() === dateNow.getFullYear() && lockLastDate.getMonth() < dateNow.getMonth()) || lockLastDate.getFullYear() < dateNow.getFullYear()) {
			lockLastDate.setFullYear(dateNow.getFullYear());
			lockLastDate.setMonth(dateNow.getMonth());
		}
		if (lockLastDate.getFullYear() <= 2018 && lockLastDate.getMonth() <= 11) {
			tabString = '<div data-index="999" data-year="' + lockLastDate.getFullYear() + '" data-month="' + (lockLastDate.getMonth() + 1) + '"  class="month_tab unlock" style="width:' + itemWidth + 'px;"><span class="lock_icon"></span><span class="tab_txt">' + (lockLastDate.getFullYear() !== dateNow.getFullYear() ? lockLastDate.getFullYear() + '年' : '') + (lockLastDate.getMonth() + 1) + '月</span > </div>';
			$(tabString).appendTo('.month_tab_list');
		}
		$('.month_tab_list').width(itemWidth * (data.length + 1) + data.length + 1);
		maxSlideWidth = $('.month_tab_list').width() - window_width;
		if (index !== 0) {
			lastX = -(index * itemWidth) - index + 1;
			lastX = lastX > 0 ? 0 : lastX;
			lastX = Math.abs(lastX) > maxSlideWidth ? -maxSlideWidth : lastX;
			translateNum = lastX;
			document.querySelector('.month_tab_list').style.webkitTransform = 'translate3d(' + lastX + 'px' + ',0,0)';
		}
	}

	$('.goPredictBtn').click(function () {
		location.href = baseUrl;
	})
	$('.mask, .modal_content, .lock_modal_title, .month_select_content, .youhuiquan').on('touchmove', function (e) {
		e.preventDefault();
	})
	$(document).on('click', '.month_tab', function () {
		if ($(this).hasClass('active')) {
			return false;
		}
		var index = parseInt($(this).data('index'), 10);
		var year = parseInt($(this).data('year'), 10);
		var month = parseInt($(this).data('month'), 10);
		var nextIndex = getMonthIndex(year, month);
		var nextBeginDateObj = getDateObjFromString(monthInfo[nextIndex].beginDate);
		if (index === 999) {
			//TODO:跨月份是否提示解锁下一个月
			currentIndex = getMonthIndex(year, month);
			showMonthLockModal(currentIndex);
		} else {
			// if ((year === dateNow.getFullYear() && month === dateNow.getMonth() + 1) || (year < dateNow.getFullYear()) || (year === dateNow.getFullYear() && month < dateNow.getMonth() + 1) || getIntervalDays(nextBeginDateObj, dateNow) <= 7) {
			if ((year === dateNow.getFullYear()) || (year < dateNow.getFullYear()) || (year === dateNow.getFullYear() && month < dateNow.getMonth() + 1) || getIntervalDays(nextBeginDateObj, dateNow) <= 7) {
				if (index !== 0) {
					$('.card_bottom_payed').find('.viewInfo').hide();
					$('.card_bottom_payed').find('.cardText').hide();
				} else {
					$('.card_bottom_payed').find('.viewInfo').show();
					$('.card_bottom_payed').find('.cardText').show();
				}
				$('.month_tab').removeClass('active');
				if (browser.isIOS()) {
					$('.month_tab').css({'background-color': 'rgba(252, 251, 249, 0.8)'});
				} else {
					$('.month_tab').css({'background-color': 'rgba(252, 251, 249, 0.92)'});
				}
				$(this).addClass('active');
				$(this).css({'background-color': '#f16300'});
				initPayedServerData(lunarModel[index]);
				$('.result_top_info').attr('value', ((parseInt(lunarModel[index].endDate.split('-')[1]) - 1) === 0 ? 12 : (parseInt(lunarModel[index].endDate.split('-')[1]) - 1)) + '月运势卡');
			} else {
				if(true) {
					if (index !== 0) {
						$('.card_bottom_payed').find('.viewInfo').hide();
						$('.card_bottom_payed').find('.cardText').hide();
					} else {
						$('.card_bottom_payed').find('.viewInfo').show();
						$('.card_bottom_payed').find('.cardText').show();
					}
					$('.month_tab').removeClass('active');
					if (browser.isIOS()) {
						$('.month_tab').css({'background-color': 'rgba(252, 251, 249, 0.8)'});
					} else {
						$('.month_tab').css({'background-color': 'rgba(252, 251, 249, 0.92)'});
					}
					$(this).addClass('active');
					$(this).css({'background-color': '#f16300'});
					initPayedServerData(lunarModel[index]);
					$('.result_top_info').attr('value', ((parseInt(lunarModel[index].endDate.split('-')[1]) - 1) === 0 ? 12 : (parseInt(lunarModel[index].endDate.split('-')[1]) - 1)) + '月运势卡');
				} else{
					$('.not_date_month').html(month);
					$('.show_date').html(((year !== dateNow.getFullYear()) ? (year + '年') : '') + month + '月' + str2Int(monthInfo[nextIndex].beginDate.substr(6, 2)) + '日');
					$('.mask').removeClass('hidden');
					$('.month_lock_modal.not_date').removeClass('hidden');
					$('.month_lock_modal.not_date .modal_bg').height($('.month_lock_modal.not_date .modal_content').height() - 40);
				}

			}
		}
	});

	function getDateObjFromString(dateString) {
		if (dateString.indexOf('-') > -1) {
			return new Date(dateString.substr(0, 4), (str2Int(dateString.substr(5, 2)) - 1), str2Int(dateString.substr(8, 2)));
		} else {
			return new Date(dateString.substr(0, 4), (str2Int(dateString.substr(4, 2)) - 1), str2Int(dateString.substr(6, 2)));
		}
	}
	$('.not_date_btn').click(function () {
		$('.mask').addClass('hidden');
		$('.month_lock_modal.not_date').addClass('hidden');
	});

	$('.cardShareText').click(function () {
		appCallback_share();
	})

	function getMonthIndex(year, month) {
		for (var i = 0; i < monthInfo.length; i++) {
			if (year === monthInfo[i].year && month === monthInfo[i].month) {
				return i;
			}
		}
	}
	document.querySelector('.month_tab_list').addEventListener('touchstart', touchSatrtFunc, false);
	document.querySelector('.month_tab_list').addEventListener('touchmove', touchMoveFunc, false);
	document.querySelector('.month_tab_list').addEventListener('touchend', touchEndFunc, false);
	//全局变量，触摸开始位置
	var startX = 0,
		startY = 0,
		lastX = 0;
	var translateNum = 0;
	//touchstart事件
	function touchSatrtFunc(evt) {
		try {
			var touch = evt.touches[0]; //获取第一个触点
			startX = touch.pageX; //页面触点X坐标
			startY = touch.pageY; //页面触点Y坐标
		} catch (e) {
			alert('touchSatrtFunc：' + e.message);
		}
	}
	//touchmove事件，这个事件无法获取坐标
	function touchMoveFunc(evt) {
		evt.preventDefault();
		try {
			var touches = evt.touches[0];
			var X = touches.pageX - startX;
			var Y = touches.pageY - startY;
			var slideWidth = translateNum + X;
			var totalWidth = $('.month_tab').width() * $('.month_tab').length - $('.result_payed_content').width() - 30;
			if (Math.abs(X) > Math.abs(Y) && slideWidth <= 0 && Math.abs(slideWidth) < maxSlideWidth) {
				(function () {
					// console.log(translateNum + '     ' + X + '     ' + slideWidth);
					lastX = slideWidth;
					if (slideWidth < -totalWidth){
						slideWidth = -totalWidth;
					}
					document.querySelector('.month_tab_list').style.webkitTransform = 'translate3d(' + slideWidth + 'px' + ',0,0)';
				})(slideWidth);
			}
		} catch (e) {
			alert('touchMoveFunc：' + e.message);
		}
	}
	//touchend事件
	function touchEndFunc() {
		try {
			lastX = lastX > 0 ? 0 : lastX;
			lastX = lastX > maxSlideWidth ? maxSlideWidth : lastX;
			translateNum = lastX;
		} catch (e) {
			alert('touchEndFunc：' + e.message);
		}
	}


	$('.lock_btn,.info_detail').click(function () {
		// if (!browser.isWnl() && !browser.isWx()) {
		// 	loadSchema('http://jptjios.51wnl.com/app/maintab?index=1', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&android_schema=youloft419805549://maintab?index=1');
		// 	return false;
		// }
		if (isPayed) {
			return false;
		}
		var endDateObj = getDateObjFromString(monthInfo[currentIndex].endDate);
		if (getIntervalDays(endDateObj, new Date(year, month - 1, day)) <= 7) {
			var currentIndexString = getIndexDateString(currentIndex);
			$('.current_month_info,.lock_current_btn .lock_month_date').html(currentIndexString);
			var nextIndexString = getIndexDateString(currentIndex + 1);
			$('.lock_next_btn .lock_month_date').html(nextIndexString);
			$('.mask').removeClass('hidden');
			$('.month_lock_modal.next_tip').removeClass('hidden');
			$('.month_lock_modal.next_tip .modal_bg').height($('.month_lock_modal.next_tip .modal_content').height() - 40);
		} else {
			showMonthLockModal(currentIndex);
		}
		var goodsId = isThreeMonth ? '72B696D4AB4F4925B94205769B3C4C80' : '128D9894D55F49E79D974383399E9140';
		IsShowUseCoupon(goodsId);
	});

	function getIndexDateString(index) {
		var beginDate = monthInfo[index].beginDate,
			endDate = monthInfo[index].endDate;
		var beginString = str2Int(beginDate.substr(4, 2)) + '月' + str2Int(beginDate.substr(6, 2)) + '日';
		var endString = str2Int(endDate.substr(4, 2)) + '月' + str2Int(endDate.substr(6, 2)) + '日';
		return beginString + ' ~ ' + endString;
	}
	$('.lock_next_btn').click(function () {
		currentIndex += 1;
		showMonthLockModal(currentIndex);
	});
	$('.lock_current_btn').click(function () {
		showMonthLockModal(currentIndex);
	});
	var oneMonthString = '',
		threeMonthString = '';

	function showMonthLockModal(index) {
		//TODO: 未来没有三个月了怎么办
		$('.mask').removeClass('hidden');
		$('.month_lock_modal').addClass('hidden');
		var indexMonth = monthInfo[index].month;
		$('.one_month .month_tip').html(indexMonth + '月运势');
		$('.one_month .month_select').html(getIndexDateString(index));
		var indexMonth2 = monthInfo[index + 2].month;
		var threeMonthString2 = '';
		if (parseInt(monthInfo[index + 2].year) > parseInt(monthInfo[index].year)) {
			threeMonthString2 = indexMonth + '月 ~ ';
			if(parseInt(monthInfo[index + 2].year) > 2018) {
				window.alert('专家正在准备数据,请稍后再查看！');
				return;
			}
		} else {
			threeMonthString2 = indexMonth + '月 ~ ' + ((monthInfo[index + 2].year !== monthInfo[index].year) ? (monthInfo[index + 2].year + '年') : '') + indexMonth2 + '月';
		}
		$('.three_month .month_tip').html('三个月运势 (' + threeMonthString2 + ')');
		$('.month_select.month_1').html(getIndexDateString(index));
		$('.month_select.month_2').html(getIndexDateString(index + 1));
		$('.month_select.month_3').html(getIndexDateString(index + 2));
		$('.month_lock_modal.current_use').removeClass('hidden');
		$('.month_lock_modal.current_use .modal_bg').height($('.month_lock_modal.current_use .modal_content').height() - 40);
		if (isPayed) {
			oneMonthString = indexMonth + '月运势数据准备中，更新后第一时间通知您';
			threeMonthString = threeMonthString2 + '运势更新后第一时间通知您';
		} else {
			oneMonthString = '一次性解锁3个月享8折优惠！';
			threeMonthString = '立即解锁' + monthInfo[currentIndex].month + '月。后续月份运势更新后第一时间通知您';
		}
		$('.month_lock_modal.current_use').find('.modal_tip').html(oneMonthString);
	}
	isThreeMonth = false;
	$('.month_select_content').click(function () {
		$('.month_select_content').removeClass('select');
		$(this).addClass('select');
		if ($(this).hasClass('one_month')) {
			isThreeMonth = false;
			$(this).parents('.month_lock_modal').find('.modal_tip').html(oneMonthString);
		} else {
			isThreeMonth = true;
			$(this).parents('.month_lock_modal').find('.modal_tip').html(threeMonthString);
		}
		var goodsId = isThreeMonth ? '72B696D4AB4F4925B94205769B3C4C80' : '128D9894D55F49E79D974383399E9140';
		IsShowUseCoupon(goodsId);
	});
	$('.unlock_btn').click(function () {
		var money = 9.9,
			discount = 0;
		var source = '流月运势-' + monthInfo[currentIndex].month + '月';
		if (isThreeMonth) {
			money = 23;
			discount = 29.7;
			source = '流月运势-' + monthInfo[currentIndex].month + '月、' + monthInfo[currentIndex + 1].month + '月、' + monthInfo[(currentIndex + 2)%12].month + '月';
			_czc.push(['_trackEvent', '3months.C', 'lyys_unlock_popup+click+3months']);
		} else {
			_czc.push(['_trackEvent', '1month.C', 'lyys_unlock_popup+click+1month']);
		}
		var beginMonth = monthInfo[currentIndex].beginDate;
		var endMonth = isThreeMonth ? (monthInfo[currentIndex + 2].beginDate) : (monthInfo[currentIndex].beginDate);
		var goodsId = isThreeMonth ? '72B696D4AB4F4925B94205769B3C4C80' : '128D9894D55F49E79D974383399E9140';
		IsShowUseCoupon(goodsId);
		//获取ID
		$.ajax({
			cache: false,
			type: 'GET',
			dataType: 'json',
			url: '//coco70.51wnl.com/numberologynew/lunar/unlockorder',
			data: {
				'code': code,
				'userID': userId,
				'deviceId': deviceId,
				'pushToken': pushToken,
				'pToken': pToken,
				'channel': sourceType,
				'orderType': (isThreeMonth ? 1 : 0),
				'imei': imei,
				'idfa': idfa,
				'posId': posId,
				'boundId': boundId,
				'beginMonth': beginMonth.substring(0, 4) + '-' + beginMonth.substring(4, 6) + '-' + beginMonth.substring(6, 8),
				'endMonth': endMonth.substring(0, 4) + '-' + endMonth.substring(4, 6) + '-' + endMonth.substring(6, 8),
				'goodsId': goodsId,
				'orderName': source,
				'sysVersion': sysVersion,
				'appVersion': appVersion
			},
			success: function (result) {
				if (result.data != null) {
					var orderID = result.data.id;
					localStorage.setItem('payedGoodsId', goodsId);
					location.href = '//order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=' + source + '&parterid=Lunar&goodsid=' + goodsId + '&parteruserid=' + uniqueId + '&data=' + orderID + '&posId=' + posId + '&openid=' + openid + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent(location.href + '&orderid=' + orderID + '&code=' + code);
				}
			}
		});

		//goodsId:goodsId orderName:source
		// location.href = 'payWeb/index.html?orderid=' + orderid + '&returnUrl=' + ('http://' + location.host + location.pathname) + '&discount=' + discount + '&money=' + money + '&source=' + source + '&index=' + currentIndex;
	});
	$('.mask').click(function () {
		$(this).addClass('hidden');
		$('.month_lock_modal').addClass('hidden');
	});
});

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function getQueryValue(key, style) {
	if (style === undefined || style === '') {
		style = '&';
	}
	var match = location.href.match(new RegExp(key + '=([^' + style + ']*)'));
	return (match && match[1]) || '';
}
//检测文字长度
function checkWordLen(str) {
	var num = 0;
	for (var i = 0, l = str.length; i < l; i++) {
		if (str.charCodeAt(i) > 255) { //大于255为中文,小于为英文
			num += 2;
		} else {
			num++;
		}
	}
	return num;
}
var monthInfo = [{
		'year': 2016,
		'month': 11,
		'name': '',
		'beginDate': '20161107',
		'endDate': '20161206'
	},
	{
		'year': 2016,
		'month': 12,
		'name': '',
		'beginDate': '20161207',
		'endDate': '20170105'
	},
	{
		'year': 2017,
		'month': 1,
		'name': '',
		'beginDate': '20170106',
		'endDate': '20170202'
	},
	{
		'year': 2017,
		'month': 2,
		'name': '',
		'beginDate': '20170203',
		'endDate': '20170304'
	},
	{
		'year': 2017,
		'month': 3,
		'name': '',
		'beginDate': '20170305',
		'endDate': '20170403'
	},
	{
		'year': 2017,
		'month': 4,
		'name': '',
		'beginDate': '20170404',
		'endDate': '20170504'
	},
	{
		'year': 2017,
		'month': 5,
		'name': '',
		'beginDate': '20170505',
		'endDate': '20170604'
	},
	{
		'year': 2017,
		'month': 6,
		'name': '',
		'beginDate': '20170605',
		'endDate': '20170706'
	},
	{
		'year': 2017,
		'month': 7,
		'name': '',
		'beginDate': '20170707',
		'endDate': '20170806'
	},
	{
		'year': 2017,
		'month': 8,
		'name': '',
		'beginDate': '20170807',
		'endDate': '20170906'
	},
	{
		'year': 2017,
		'month': 9,
		'name': '',
		'beginDate': '20170907',
		'endDate': '20171007'
	},
	{
		'year': 2017,
		'month': 10,
		'name': '',
		'beginDate': '20171008',
		'endDate': '20171106'
	},
	{
		'year': 2017,
		'month': 11,
		'name': '',
		'beginDate': '20171107',
		'endDate': '20171206'
	},
	{
		'year': 2017,
		'month': 12,
		'name': '',
		'beginDate': '20171207',
		'endDate': '20180104'
	},
	{
		'year': 2018,
		'month': 1,
		'name': '',
		'beginDate': '20180105',
		'endDate': '20180203'
	},
	{
		'year': 2018,
		'month': 2,
		'name': '',
		'beginDate': '20180204',
		'endDate': '20180304'
	},
	{
		'year': 2018,
		'month': 3,
		'name': '',
		'beginDate': '20180305',
		'endDate': '20180404'
	},
	{
		'year': 2018,
		'month': 4,
		'name': '',
		'beginDate': '20180405',
		'endDate': '20180504'
	},
	{
		'year': 2018,
		'month': 5,
		'name': '',
		'beginDate': '20180505',
		'endDate': '20180605'
	},
	{
		'year': 2018,
		'month': 6,
		'name': '',
		'beginDate': '20180606',
		'endDate': '20180706'
	},
	{
		'year': 2018,
		'month': 7,
		'name': '',
		'beginDate': '20180707',
		'endDate': '20180806'
	},
	{
		'year': 2018,
		'month': 8,
		'name': '',
		'beginDate': '20180807',
		'endDate': '20180907'
	},
	{
		'year': 2018,
		'month': 9,
		'name': '',
		'beginDate': '20180908',
		'endDate': '201801007'
	},
	{
		'year': 2018,
		'month': 10,
		'name': '',
		'beginDate': '20181008',
		'endDate': '20181106'
	},
	{
		'year': 2018,
		'month': 11,
		'name': '',
		'beginDate': '20181107',
		'endDate': '20181206'
	},
	{
		'year': 2018,
		'month': 12,
		'name': '',
		'beginDate': '20181207',
		'endDate': '20190104'
	},
	{
		'year': 2018,
		'month': 12,
		'name': '',
		'beginDate': '20181207',
		'endDate': '20190104'
	},
	{
		'year': 2019,
		'month': 1,
		'name': '',
		'beginDate': '20190105',
		'endDate': '20190205'
	},
	{
		'year': 2019,
		'month': 2,
		'name': '',
		'beginDate': '20190206',
		'endDate': '20190305'
	},
	{
		'year': 2019,
		'month': 3,
		'name': '',
		'beginDate': '20190306',
		'endDate': '20190406'
	},
	{
		'year': 2019,
		'month': 4,
		'name': '',
		'beginDate': '20190407',
		'endDate': '20190507'
	}
];

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
}
var title = '惊！我的X月运势居然是这样...';
var text = '赶快来领取你的专属本月运势卡吧！';
var imageURL = 'https://coco70.51wnl.com/numberologynew/lyys/img/share.jpg';
var baseUrl = '//mobile.51wnl.com/numberology/lyys/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&pToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]';
var currUrl = location.href.replace('&payresult=1','') + '&isShare=1';
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
	url: currUrl
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
	if (getQueryValue('history') !== '') {
		if (window.ylwindow) {
			ylwindow.reportHasBack(false);
		}
		return 0;
	}
	location.href = 'index.html?userid=' + userId + '&deviceid=' + deviceId + '&pushtoken=' + pushToken + '&ptoken=' + pToken + '&mac=' + mac + '&imei=' + imei + '&boundid=' + sourceType;
	if (window.ylwindow) {
		ylwindow.reportHasBack(true);
	}
	return 1;
}


//客户端回调全局函数
function userinfocallback(result) {
	var originalString = Base64.decode(result); //base64解密
	var originalAllObj = JSON.parse(originalString);
	if (!originalAllObj.native_score) {
		return false;
	}
	var native_score = originalAllObj.native_score;
	if ((!native_score.userId || native_score.userId.length === 0)) {
		//未登录
		uniqueId = native_score.deviceId; //设备标识，重装会变
	} else {
		//已登录
		uniqueId = native_score.userId;
	}
}

function scoreExpress(num) {
	var result = ['较弱','偏弱','平淡','小吉','大吉','大吉'];
	var num = parseInt(num / 20);
	var resultString = result[num];
	return resultString;
}


// 是否显示优惠券
function IsShowUseCoupon(goodsid) {
	var goodsid = goodsid;
	var id = id;
	$.ajax({
		url: '//order.51wnl.com/api/coupon/IsShowUseCouponNew',
		type: 'post',
		dataType: 'json',
		data: {
			'goodsId': goodsid,
			'orderId': id
		},
		success: function (response) {
			if (response.data.isShow) {
				if(couponId){
					CouponIDStatus(couponId, goodsid, id);
				}
				// $('.bottom').css('top', $('.payContent').height());
				// $('.youhuiquanDesc').on('click', function () {
				// 	console.log('trigger click');
				// 	$('.youhuiquan').addClass('youhuiquanActive');
				// 	setTimeout(function () {
				// 		$('.bottom').css('transition', 'top 0.4s ease-in-out');
				// 		$('.bottom').css('top', $('.payContent').height());
				// 	}, 66);
				// });
				// if (response.data.coupModel && response.data.coupModel.couponID) {
				// 	couponIdShow(response.data.coupModel.couponID);
				// }
			}
		}
	})
}

// 显示优惠券状态
function CouponIDStatus(couponid, goodsid, fromUrl) {
	$.ajax({
		url: '//order.51wnl.com/api/coupon/CouponIDStatus',
		type: 'post',
		dataType: 'json',
		data: {
			couponId: couponid,
			goodsId: goodsid,
			orderId: id
		},
		success: function (response) {
			var money = 9.9;
			if (isThreeMonth) {
				money = 23;
			}
			if(response.data.status) {
				$('.youhuiquanDesc').html('优惠券已抵扣' + response.data.coupon.price + '元');
				$('.youhuiquan').css('display', 'block');
				$('.unlock_btn').text('支付 ￥' + (money - response.data.coupon.price) + ' 立即解锁');
			} else {
				$('.unlock_btn').text('支付 ￥' + money + ' 立即解锁');
				$('.youhuiquanDesc').html(response.data.remark);
				$('.youhuiquan').css('display', 'block');
			}
			// console.log(response)
			// console.log(response.data)
			// console.log(response.data.status)
			// if (!response.data.status) {
			// 	selectedCouponId = '';
			// 	$('.bottomText').text(response.data.remark);
			// 	$('.introInfo').css('display', 'none');
			// 	$('.payedCount').text(money + '元');
			// } else {
			// 	selectedCouponId = id;
			// 	$('.bottomText').text('');
			// 	$('.introInfo').css('display', 'block');
			// 	console.log(money);
			// 	$('.prePay').text(money + '元');
			// 	$('.couponPay').text('-' + response.data.coupon.price + '元');
			// 	$('.payedCount').text((money - response.data.coupon.price) + '元');
			// 	if (fromUrl) {
			// 		$('.youhuiquanSubmit').css('opacity', '0.4');
			// 		$('.youhuiquanSubmit').off();
			// 		$('.youhuiquanInput').attr('disabled', true);
			// 	}
			// }
		}
	})
}
