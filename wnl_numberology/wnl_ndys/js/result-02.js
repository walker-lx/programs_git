$(function () {
	var window_height = $(window).height();
	setTimeout(function () {
		window_height = $(window).height();
		if (window.ylwindow) {
			window_height = window.ylwindow.getHeight();
			if (window_height > 1024 && window.devicePixelRatio > 1) {
				window_height = window_height / window.devicePixelRatio;
			}
		}
	}, 100);
	var orderid = getQueryValue('orderid');
	var index = getQueryValue('index');
	$('.result_card_img').attr('src', 'img/cards/' + index + '.jpg');
	var userId = getQueryValue('userId');
	var deviceId = getQueryValue('deviceId');
	var posId = getQueryValue('posId');
	var openid = getQueryValue('openid');
	var resultData = {};
	var currentMonth = (new Date()).getMonth();
	var currentIndex = Math.floor(currentMonth / 3);
	$.ajax({
		cache: false,
		type: 'GET',
		dataType: 'json',
		url: '//coco70.51wnl.com/numberologynew/TarotFate/GetOrderDetail',
		// url: '//showvote.cqyouloft.com/numberologynew/TarotFate/GetOrderDetail',
		data: {
			'OrderID': orderid,
			'UserID': userId,
			'DeviceID': deviceId
		},
		success: function (result) {
			if (result.status == 0) {
				resultData = result.data;
				$('.result_card_title').html(resultData.yearData.tarotName);
				$('.result_card_txt').html(resultData.yearData.title);
				$('.result_title').html(resultData.yearData.remark);
				$('.year_keyword_txt').html(resultData.yearData.keyWord);
				var yearScore = parseInt(resultData.yearData.yearScore, 10);
				setStarActive('.star_list.year', yearScore);
				$('.year_txt').html(resultData.yearData.yearDesc);
				$('.result_tip_txt').html(resultData.yearData.yearXX.replace('\r\n', '<div class="tip_div"></div>').replace('\n', '<div class="tip_div"></div>'));
				setQuarterData(currentIndex);
				setQuarterPayedStatus();
				if (resultData.details[0].quarterData.isPay || resultData.details[1].quarterData.isPay || resultData.details[2].quarterData.isPay || resultData.details[3].quarterData.isPay) {
					$('.select_item_year').addClass('hidden');
				}
				topVal = $('.quater_index_list').offset().top;
			} else {
				drawToast('获取订单详情错误,请重试');
			}
		},
		error: function (xhr, ajaxOperation, throwErr) {
			return false;
		}
	});
	$('.quater_index').click(function () {
		var index = parseInt($(this).data('index'), 10);
		setQuarterData(index);
	});

	function setQuarterData(index) {
		currentIndex = index;
		$('.quater_index_list .quater_index').removeClass('active');
		$('.quater_index_list .quater_index:nth(' + index + ')').addClass('active');
		var quarterIndexData = resultData.details[index].quarterData;
		$('.quater_keyword_txt').html(quarterIndexData.fateKeyWord);
		$('.quarter_txt_1').html(quarterIndexData.fateDesc);
		//付款
		if (quarterIndexData.isPay) {
			$('.quater_index_list .quater_index:nth(' + index + ')').addClass('payed');
			setStarActive('.index_item.zonghe', parseInt(quarterIndexData.totalZHZS, 10));
			setStarActive('.index_item.jiankang', parseInt(quarterIndexData.totalJKZS, 10));
			setStarActive('.index_item.caiyun', parseInt(quarterIndexData.totalCYZS, 10));
			$('.quarter_zongyun_title').html(quarterIndexData.totalFateTitle);
			$('.quarter_zongyun_txt').html(quarterIndexData.totalFateDesc);
			setStarActive('.star_list.gqszs', parseInt(quarterIndexData.gqszs, 10));
			$('.gqstitle').html(quarterIndexData.gqsTitle);
			$('.gqsdesc').html(quarterIndexData.gqsDesc);
			setStarActive('.star_list.gqzs', parseInt(quarterIndexData.gqzs, 10));
			$('.gqtitle').html(quarterIndexData.gqTitle);
			$('.gqdesc').html(quarterIndexData.gqDesc);
			setStarActive('.star_list.workzs', parseInt(quarterIndexData.workZS, 10));
			$('.worktitle').html(quarterIndexData.workTitle);
			$('.workdesc').html(quarterIndexData.workDesc);
			$('.free_content').addClass('hidden');
			$('.payed_content').removeClass('hidden');
			$('.payed_item_content').removeClass('hidden');
		} else {
			$('.month_range').html((index * 3 + 1) + '~' + ((index + 1) * 3));
			$('.free_content').removeClass('hidden');
			$('.payed_content').addClass('hidden');
			$('.payed_item_content').addClass('hidden');
		}
	}

	function setQuarterPayedStatus() {
		for (var index = 0; index <= 3; index++) {
			var quarterIndexData = resultData.details[index].quarterData;
			if (quarterIndexData.isPay) {
				$('.quater_index_list .quater_index:nth(' + index + ')').addClass('payed');
			}
		}
	}

	function setStarActive(domid, score) {
		for (var i = 1; i <= score; i++) {
			$(domid + ' .star_item:nth(' + (i - 1) + ')').addClass('active');
		}
		if (score.toString().indexOf('.') > -1) {
			$(domid + ' .star_item:nth(' + (score + 0.5 - 1) + ')').addClass('active');
		}
	}
	$('.free_content').click(function () {
		setTimeout(function () {
			$('.pay_icon').removeClass('hidden');
			$('.loading').addClass('hidden');
			$('.result_mask').removeClass('hidden');
			$('.payModal').css('top', Math.floor($(document.body).scrollTop() + window_height / 2) + 'px');
			$('.payModal').removeClass('hidden');
		});
		$('.quater_index_list').removeClass('fixed');
	});
	$('.result_mask').on('touchmove', function () {
		return false;
	});
	$('.result_mask,.modal_close').click(function () {
		setTimeout(function () {
			$('.loading').addClass('hidden');
			$('.result_mask').addClass('hidden');
			$('.payModal').addClass('hidden');
		}, 0);
		(function (scrollTop) {
			if (scrollTop > topVal + 50) {
				$('.quater_index_list').addClass('fixed');
			} else {
				$('.quater_index_list').removeClass('fixed');
			}
		})($(window).scrollTop());
	});
	$('.select_item').click(function () {
		if ($(this).hasClass('selected')) {
			return false;
		}
		$('.select_item').removeClass('selected');
		$(this).addClass('selected');
	});
	$('.pay_btn').click(function () {
		var QuarterNO = currentIndex + 1;
		var OrderType = 1,
			money = 18;
		var goodsid = '430487E65FDF4A5EB1CFA403AC3D0F33';
		if ($('.select_item_year').hasClass('selected')) {
			OrderType = 0;
			money = 58;
			goodsid = '172CDA4639E44C62AA1DDD5F66F8AC87';
		}
		var extraData = {
			'OrderID': orderid,
			'UserID': userId,
			'DeviceID': deviceId,
			'QuarterNO': QuarterNO,
			'OrderType': OrderType,
			'orderName': index
		};
		var ua = navigator.userAgent.toLocaleLowerCase();
		var isWeixin = /micromessenger/i.test(ua);
		if (isWeixin && userId === '') {
			userId = deviceId;
			location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=万年历2017年度运势&orderName=万年历2017年度运势&parterid=TarotFate&goodsid=' + goodsid + '&parteruserid=' + userId + '&posId=' + posId + '&openid=' + openid + '&data=' + JSON.stringify(extraData) + '&returnUrl=' + encodeURIComponent(location.href);
		} else {
			location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&source=万年历2017年度运势&orderName=万年历2017年度运势&parterid=TarotFate&goodsid=' + goodsid + '&parteruserid=' + userId + '&posId=' + posId + '&openid=' + openid + '&data=' + JSON.stringify(extraData) + '&returnUrl=' + encodeURIComponent(location.href) + '&failUrl=' + encodeURIComponent(location.href);
		}
	});
	var topVal = $('.quater_index_list').offset().top;
	$(window).scroll(function () {
		(function (scrollTop) {
			if (scrollTop > topVal + 50) {
				$('.quater_index_list').addClass('fixed');
			} else {
				$('.quater_index_list').removeClass('fixed');
			}
		})($(window).scrollTop());
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
	}, 2000);
}
var title = '八字难理解？生肖怕不准？';
var text = '没关系！万年历独创年运让你2017所向披靡！';
var imageURL = 'https://coco70.51wnl.com/numberologynew/ndys/img/share.jpg';
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
