var uniqueid = ''; //用户设备当前标识
var deviceid = getQueryString('deviceid');
var userid = getQueryString('userid');
var couponId = getQueryString('couponId') || '';
var imei = getQueryString('imei') || '';
var ua = window.navigator.userAgent;
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
function iphoneXFits(container, fitsArr){
    var iphoneXbanner = '<div class="iphoneXBanner" style="height:34px;width: 100%;position:fixed;bottom: 0;z-index: 9999;background: rgba(255, 255, 255, 0);"></div>'
    $('body').append(iphoneXbanner);
    paddingBottomFits(container);
    bottomArrFits(fitsArr);
}
function paddingBottomFits(container) {
    if(container.length > 0){
        $(container).css({'padding-bottom': 34})
    }
}
function bottomArrFits(fitsArr) {
    var i;
    for (i=0;i< fitsArr.length;i++){
        var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34;
        $(fitsArr[i]).css('bottom', bottomSet);
    }
}
if(isIphoneX()){
    // 需上移的包裹容器
    // var container = ['.inner_content','.bottom_button'];
    // // 需上移的Fixed按钮
    // var fitsArr = [];
    // iphoneXFits(container, fitsArr);
    $('.inner_content').css('padding-bottom','50px');
    $('.container').css({'padding-bottom': '34px'});
    $('.bottom_button').css({'padding-bottom': '34px'});
    $('.astroBanner').css({'padding-bottom': '34px'});
    $('.astroBanner').css({'margin-top': '-50px'});
}

var openid = '';
if (browser.isWx()) {
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.openid) {
		openid = wnl_loc.openid;
		userid = wnl_loc.wnlUserId;
		deviceid = wnl_loc.wnlUserId;
	}
}

$(function () {
	var window_width = $(window).width();
	var match_width = (window_width) - 20;
	$('.matching_index').css({
		'width': match_width
	});
	$('.matching_index').css({
		'height': match_width / 2.2327
	});

	var num = parseInt($('.crown').css('marginLeft'));
	$('.crown').css({
		'margin-left': (num - 48) + 'px'
	});

	var temp_width = window_width - 30;
	$('.temp_img').css({
		'width': temp_width
	});
	$('.temp_img').css({
		'height': temp_width / 3.45
	});

	var progress_width = $('.result_progress').width();
	console.log(progress_width);

	//向客户都发送查询请求
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
		}, 0);
	}

	var orderid = getQueryString('orderid');
	var posid = getQueryString('posid');
	var code = getQueryString('code');

	var resultData;
	var scoreData = [];
	getOrderDetail();

	function getOrderDetail() {
		$.ajax({
			//url: '//coco70.51wnl.com/numberologyNew/TarotDisc/GetOrderDetail?deviceid=' + deviceid + '&orderid=' + orderid + '&userid=' + userid,
			url: '//coco70.51wnl.com/numberologyNew/TarotDisc/GetOrderDetail?deviceid=' + deviceid + '&orderid=' + orderid + '&userid=' + userid,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8'
		}).done(function (res) {
			resultData = res.data;
			// (function(scoreData){
			for (var i = 0; i < res.data.data.length; i++) {
				scoreData.push(parseInt(res.data.data[i].scoreModel.score));
			}
			// })(scoreData);

			console.log(scoreData);
			console.log(resultData);
			setRadar(scoreData);
			initialReasultData(resultData);

			if (/payresult=1/.test(location.href)) {
				console.log(resultData);
				var shareUrl = "//mobile.51wnl.com/numberology/xzhp/src/index.html?userId=[WNLUSERID]&deviceId=[OPENUDID]&mac=[MAC]&imei=[IMEI]&idfa=[IDFA]&channel=[CHANNEL]&posId=[posId]&boundId=[BUNDLE]&pushToken=[PTOKEN]&pToken=[PTOKEN]";
				var params = 'goodsId=2C8B778C96D24DD2BD04F80710036E81&parterId=TarotLove' + '&orderId=' + resultData.orderID + '&shareUrl=' + shareUrl;
				var url = 'http://mobile.51wnl.com/numberology/redpackage/redpackage.html?' + params;
				shareRedPackage({
					goodsId: "2C8B778C96D24DD2BD04F80710036E81",
					parterId: "TarotLove",
					orderId: resultData.orderID,
					title: '给你分享一个万年历红包',
					text: '100%有奖，立刻能用！',
					image: 'https://coco70.51wnl.com/numberologynew/gqy/static/img/rpshare.jpg',
					url: shareUrl,
					wxShareTitle: '点我，知晓ta的所有秘密！',
					wxShareText: '详批感情纠葛，避开感情陷阱。',
					wxShareImage: '1',
					wxShareUrl: location.href
				});
			}

		}).fail(function (res) {
			console.log(res.data);
		});
	}

	function initialReasultData(data) {
		$('.one_name').html(data.oneName);
		$('.two_name').html(data.twoName);
		if (data.oneSex === 0) {
			$('.head_img_1').attr('src', '../img/famale_head.png');
		} else {
			$('.head_img_1').attr('src', '../img/male_head.png');
		}
		if (data.twoSex === 0) {
			$('.head_img_2').attr('src', '../img/famale_head.png');
		} else {
			$('.head_img_2').attr('src', '../img/male_head.png');
		}

		if (data.payStatus === 1) { //已解锁
			$('.astroBanner').removeClass('hidden');
			$('.bottom_button').addClass('hidden');
			$('.free_content').addClass('hidden');
			$('.pay_content').removeClass('hidden');
			$('.match_txt,.match_txt_2,.score_question').addClass('hidden');
			$('.pay_match_txt,.score').removeClass('hidden');

			$('.pay_match_txt').html(data.unLockText);

			var sumScore = 0; //平均得分
			for (var j = 0; j < data.data.length; j++) {
				sumScore += parseInt(data.data[j].scoreModel.score);
			}
			$('.average_score').html(Math.round(sumScore / data.data.length));

			//result_content内容
			for (var i = 0; i < data.data.length; i++) {

				var content_temp = $('.content_temp').clone();
				content_temp.find('.result_title').html(data.data[i].title);
				content_temp.find('.progress_2').css({
					'width': (data.data[i].scoreModel.score) / 100 * progress_width
				});
				content_temp.find('.score_num').html(data.data[i].scoreModel.score);

				var childTitleOne = data.data[i].childTitleOne;
				var onename = childTitleOne.split(' ')[0];
				var onetitle = childTitleOne.split(' ')[1];
				content_temp.find('.onename').html(onename);
				content_temp.find('.onetitle').html(onetitle);
				content_temp.find('.child_title_one_content').html(data.data[i].childTitleOneContent);

				var childTitleTwo = data.data[i].childTitleTwo;
				var twoname = childTitleTwo.split(' ')[0];
				var twotitle = childTitleTwo.split(' ')[1];
				content_temp.find('.twoname').html(twoname);
				content_temp.find('.twotitle').html(twotitle);
				content_temp.find('.child_title_two_content').html(data.data[i].childTitleTwoContent);

				content_temp.removeClass('hidden');
				content_temp.removeClass('content_temp');
				content_temp.appendTo($('.pay_content'));
			}

		} else { //未解锁
			$('.bottom_button').removeClass('hidden');
			$('.free_content').removeClass('hidden');
			$('.pay_content').addClass('hidden');
			$('.match_txt,.match_txt_2').removeClass('hidden');
			$('.pay_match_icon').addClass('hidden');
			$('.pay_match_txt').addClass('hidden');

			var lockText = data.lockText;
			var num = lockText.replace(/[^0-9]/ig, ''); //提取文本中的百分比
			$('.match_percent').html(num);
			// data = [65,57,79,90,60,65];
			// scoreData = [65,57,79,90,60,65];
		}
	}

	function setRadar(scoredata) {
		//canvas radar
		var radarOptions = {
			scaleOverlay: false,
			scaleOverride: true, //是否用硬编码重写y轴网格线
			scaleSteps: 5, //y轴刻度的个数
			scaleStepWidth: 20, //y轴每个刻度的宽度
			scaleStartValue: 0, //y轴的起始值
			pointDot: false, //是否显示点
			// pointDotRadius: 0, //点的半径
			// pointDotStrokeWidth: 0, //点的线宽
			datasetStrokeWidth: 0, //数据线的线宽
			animation: true, //是否有动画效果
			animationSteps: 60, //动画的步数
			scaleLineWidth: 1, //X轴线宽

			scaleLineColor: 'rgba(77, 203, 255,0.3)', // Y/X轴的颜色
			// scaleShowGridLines: true,
			// scaleGridLineColor : 'rgba(0,0,0,1)',
			// scaleGridLineWidth:2,

			// scaleFontSize : 12,
			// scaleFontColor : '#fff',
			// scaleShowLabels: false,
			// scaleShowLabelBackdrop : false,
			// scaleBackdropColor : 'rgba(57, 156, 249,0.5)',
			// scaleBackdropPaddingY : 2,
			// scaleBackdropPaddingX : 2,
			// angleShowLineOut : true,
			//Y轴线条颜色
			angleLineColor: 'rgba(57, 156, 249,0.3)',
			angleLineWidth: 1,
			//pointLabelFontFamily : 'Arial',
			//pointLabelFontStyle : 'normal',
			pointLabelFontSize: 12,
			//标签颜色
			pointLabelFontColor: 'rgba(142, 255, 222,0)',
			datasetStroke: true,
			datasetFill: true,
			animationEasing: 'easeOutQuart',
			//onAnimationComplete: null,
			responsive: true //自适应

		};

		// var data = [65,57,79,90,60,65];

		// console.log(resultScore);

		// Radar Data
		var radarData = {
			labels: ['感情观相似度', '默契度', '性爱和谐度', '沟通效率', '忠诚度', '物质要求'],
			datasets: [{
				fillColor: 'rgba(63, 115, 132, 0.7)',
				strokeColor: 'rgba(63, 115, 132, 0.7)',
				pointColor: 'rgba(63, 115, 132, 0.7)',
				pointStrokeColor: 'rgba(63, 115, 132, 0.7)',
				data: scoredata
			}]
		};
		var ctx = $('.chart').get(0).getContext('2d');
		var myRadarChart = new Chart(ctx).Radar(radarData, radarOptions);
		// var myRadarChar = new Chart(ctx, {
		//     type: 'radar',
		//     data: radarData,
		//     options: radarOptions
		// });
	}
	if(browser.isWx()){
		$('.inner_content').on('click', function() {
			var money = '36';
			var source = '塔罗爱情合盘';
			var goodsid = '2C8B778C96D24DD2BD04F80710036E81';
			if (!orderid) {
				drawToast('获取订单信息失败');
				return 0;
			}
			location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&orderName=' + source + '&posId=' + posid + '&nameOrder=' + source + '&source=' + source + '&parterid=TarotDisc&goodsid=' + goodsid + '&parteruserid=' + deviceid + '&data=' + orderid + '&openid=' + openid + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?orderid=' + orderid + '&code=' + code);
		})
	}

	$(document).on('click', '.pay_submit,.temp_img', function () {
		//支付
		var money = '36';
		var source = '塔罗爱情合盘';
		var goodsid = '2C8B778C96D24DD2BD04F80710036E81';
		console.log('goodsid=' + goodsid + '  uniqueid=' + uniqueid + '  orderid=' + orderid + '  posId=' + posid + '  code=' + code);
		if (!orderid) {
			drawToast('获取订单信息失败');
			return 0;
		}
		location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=' + money + '&orderName=' + source + '&posId=' + posid + '&nameOrder=' + source + '&source=' + source + '&parterid=TarotDisc&goodsid=' + goodsid + '&parteruserid=' + deviceid + '&data=' + orderid + '&openid=' + openid + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname + '?orderid=' + orderid + '&code=' + code);
	});

	$('.astroBanner').on('click', function() {
		location.href = "//astro.51wnl.com/index.html#/astro?posId=XZHP";
	})
});

var title = '点我，知晓ta的所有秘密！';
var text = '详批感情纠葛，避开感情陷阱。';
var imageURL = location.origin + '/numberology/xzhp/img/xzhpShare.jpg';
var url = location.href.replace('&payresult=1', '') + "&share=1";
var textObj = {
	title: title,
	text: title,
	image: '0',
	imageURL: imageURL,
	url: url,
	pureText: text,
	prefix: ''
};
var textObj1 = {
	title: title,
	text: text,
	image: '0',
	imageURL: imageURL,
	targetUrl: url,
	perfix: ''
};
wnlui.wxShare({
  title: '星盘合盘',
  text: '我在万年历看【星盘合盘】，分享给你，一起看吧！',
  imgUrl: imageURL,
  imageUrl: imageURL,
  url: url
});

function appCallback_share() {
	try {
		if (window.ylwindow) {
			window.ylwindow.reportHasShare(true);
			location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
		} else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	} catch (e) {
		console.log(e);
	}
	return 1;
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var patt = window.location.search; //获取参数部分
	var r = patt.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	}
	return null;
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
		uniqueid = native_score.deviceId; //设备标识，重装会变
	} else {
		//已登录
		uniqueid = native_score.userId;
	}
}
// //取消显示分享
// if (window.ylwindow && window.ylwindow.enableShare) {
// 	window.ylwindow.enableShare(false);
// }
// window.appCallback_showShare = function () {
// 	return 0;
// };
//取消显示收藏
if (window.ylwindow && window.ylwindow.enableCollect) {
	window.ylwindow.enableCollect(false);
}
window.appCallback_showCollect = function () {
	return 0;
};

var intervalCounter = 0;
// 提示信息
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
