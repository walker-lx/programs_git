var uniqueId = ''; //用户设备当前标识
var localData = JSON.parse(localStorage.getItem('wnl_lyys_local_data'));
var posId = getQueryString('posid') || getQueryString('posId') || getQueryString('PosId') || getQueryString('posID') || getQueryString('PosID');
var couponId = getQueryString('couponId') || '';
var imei = getQueryString('imei') || '';
var ua = navigator.userAgent.toLocaleLowerCase();
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
var isWeixin = /micromessenger/i.test(ua);
var openid = '';
var userid = '';
if (isWeixin) {
	var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
	if (wnl_loc && wnl_loc.openid) {
		openid = wnl_loc.openid;
		userid = wnl_loc.wnlUserId;
	}
}
else {
	if (localStorage.getItem('wnl_tlp_guid')) {
		userid = localStorage.getItem('wnl_tlp_guid');
	}
}

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
    var i;
    for (i=0;i< container.length;i++){
    	var heightSet = parseInt($(container[i]).css('height')) + 34;
        $(container[i]).css({'height': heightSet});
    	var paddingSet = parseInt($(container[i]).css('padding-bottom')) + 34;
        $(container[i]).css({'padding-bottom': paddingSet});
    }
}
function bottomArrFits(fitsArr) {
    var i;
    for (i=0;i< fitsArr.length;i++){
        var bottomSet = parseInt($(fitsArr[i]).css('bottom')) + 34;
        $(fitsArr[i]).css('bottom', bottomSet);
    }
}

$(function () {
	FastClick.attach(document.body);
	//向客户都发送查询请求
	if (browser.isWnl()) {
		setTimeout(function () {
			location.href = 'protocol://getuserinfo#userinfocallback';
		}, 0);
	}
	if ($(window).height() < 400 && $('.yiqiDesc1').css('position') === 'absolute') {
		$('.yiqiDesc1').css('position', 'static');
	}
	if ($(window).height() < 400 && $('.wnlBannerLink').css('position') === 'absolute') {
		$('.wnlBannerLink').css('position', 'static');
	}
	var share = getQueryString('share');
	if(/isShare=1/.test(location.href)){
		$('.share').removeClass('hidden');
		$('.shareTitle').removeClass('hidden');
	} else {
		$('.viewDetail').removeClass('hidden');
		$('.contact_content').removeClass('hidden');
		$('.copyRight').removeClass('hidden');
		$('.descContent').removeClass('hidden');
		if (browser.isWnl()){
			$('.shareBtn').removeClass('hidden');
		}
	}

	if(isIphoneX()){
	    // 需上移的包裹容器
	    // var container = ['body', '.viewDetail'];
	    // // 需上移的Fixed按钮
	    // var fitsArr = [];
	    // iphoneXFits(container, fitsArr);
	    // console.log('isIphoneX');
	    $('.copyRight').css('padding-bottom','34px');
	    $('body').css({'padding-bottom': '34px'});
	    $('.viewDetail').css('padding-bottom','64px');
	}

	$('.wnlBannerLink').click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var wx = ua.indexOf('micromessenger') > -1;
		var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1;
		var isIOS = isIOSPhone || ua.indexOf('ipad') > -1;
		var isAndroid = ua.indexOf('android') > -1;
		if (wx) {
			_hmt.push(['_trackEvent', 'jryc_download_wx_click', 'click', 'jryc_download_wx_click', 'jryc_download_wx_click']);
			location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653';
		}
		else {
			if (isIOS) {
				_hmt.push(['_trackEvent', 'jryc_download_ios_click', 'click', 'jryc_download_ios_click', 'jryc_download_ios_click']);
				location.href = 'http://um0.cn/89wDL';
			}
			else if (isAndroid) {
				_hmt.push(['_trackEvent', 'jryc_download_android_click', 'click', 'jryc_download_android_click', 'jryc_download_android_click']);
				location.href = 'http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]';
			}
			else {
				location.href = 'http://www.51wnl.com';
			}
		}
	});
	var orderid = getQueryString('orderid');
	var url = '//coco70.51wnl.com/NumberologyNew/NRLorder/GetOrderAnswer?orderid=' + orderid;
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: function (data) {
			if (data && data.status == 0) {
				if (data.data.isPayed) {
					location.href = 'bzhhpayed.html?orderid=' + orderid;
				}
				$('.name1').html(data.data.maleName);
				$('.name2').html(data.data.femaleName);
				$('.count').html(data.data.rateScore + '分');
				$('.rateStringContent').html(data.data.rateString);
				var randomCount = Math.floor(Math.random() * -5 + 10);
				$('#percent').html(data.data.rateScore - randomCount >= 100 ? 100 : data.data.rateScore - randomCount + '%');
				if (share) {
					$('.wnlBannerLink').removeClass('hidden');
				}
				else {
					$('.yiqiDesc1').removeClass('hidden');
				}
				$('.main').removeClass('hidden');
				$('.leftDescContent').width($('.descWrapper').width() / 2 + 5);
			}
		}
	});

	$('.linkLockIcon').click(function () {
		$('.viewDetail').trigger('click');
	});
	$('.viewDetail').click(function () {
		if (share) {
			$('#tipModal').modal();
			$('.downloadBtn').click(function () {
				// 下载链接
				var ua = navigator.userAgent.toLocaleLowerCase();
				var wx = ua.indexOf('micromessenger') > -1;
				var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1;
				var isIOS = isIOSPhone || ua.indexOf('ipad') > -1;
				var isAndroid = ua.indexOf('android') > -1;
				if (wx) {
					_hmt.push(['_trackEvent', 'bzhh_download_wx_click', 'click', 'bzhh_download_wx_click', 'bzhh_download_wx_click']);
					location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendar&g_f=991653';
				}
				else {
					if (isIOS) {
						_hmt.push(['_trackEvent', 'bzhh_download_ios_click', 'click', 'bzhh_download_ios_click', 'bzhh_download_ios_click']);
						location.href = 'http://um0.cn/89wDL';
					}
					else if (isAndroid) {
						_hmt.push(['_trackEvent', 'bzhh_download_android_click', 'click', 'bzhh_download_android_click', 'bzhh_download_android_click']);
						location.href = 'http://www.51wnl.com/linksite/Transfer.aspx?key=229&loc=0&MAC=[MAC]&IDFA=[IDFA]';
					}
					else {
						location.href = 'http://www.51wnl.com';
					}
				}
			});
		}
		else {
			if (!uniqueId) {
				uniqueId = userid;
			}
			if (browser.isWx()) {
				location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=68&source=八字合婚&orderName=八字合婚&parterid=NRLorder&goodsid=65F3A94EAF3B4C999ACAD54F4276D566&parteruserid=' + uniqueId + '&data=' + orderid + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname.replace('bzhhfree', 'bzhhpayed') + '?orderid=' + orderid) + '&openid=' + openid;
			}
			else {
				location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=68&source=八字合婚&orderName=八字合婚&parterid=NRLorder&goodsid=65F3A94EAF3B4C999ACAD54F4276D566&parteruserid=' + uniqueId + '&data=' + orderid + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname.replace('bzhhfree', 'bzhhpayed') + '?orderid=' + orderid) + '&failUrl=' + encodeURIComponent(location.href) + '&openid=' + openid;
			}
			// location.href = 'http://order.51wnl.com/pay_web/index_t.html?money=68&source=八字合婚&orderName=八字合婚&parterid=NRLorder&goodsid=65F3A94EAF3B4C999ACAD54F4276D566&parteruserid=' + uniqueId + '&data=' + orderid + '&posId=' + posId + '&couponId=' + couponId + '&imei=' + imei + '&returnUrl=' + encodeURIComponent('http://' + location.host + location.pathname.replace('bzhhfree', 'bzhhpayed') + '?orderid=' + orderid) + '&openid=' + openid;
			// location.href="payWeb/index.html?orderid="+orderid+"&returnUrl="+("http://"+location.host+location.pathname.replace("bzhhfree","bzhhpayed"))+"&money=68&source=八字合婚";
			//var versionIndex=getWNLVersion();
			//if(versionIndex>=433){
			//    location.href="payWeb/index.html?orderid="+orderid+"&returnUrl=../tools/bzhhpayed.html&money=68&source=八字合婚";
			//}
			//else{
			//    $("#dvPay").modal();
			//}
		}
	});
	$('.hhInfoTitle').click(function () {
		$('.viewDetail').trigger('click');
	});
	$('.pickConfirmBtn').click(function () {
		var ua = navigator.userAgent.toLocaleLowerCase();
		var isIOSPhone = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1;
		var isIOS = isIOSPhone || ua.indexOf('ipad') > -1;
		var isAndroid = ua.indexOf('android') > -1;
		var sourceType = -1;
		if (isIOS) {
			sourceType = 0;
		}
		else if (isAndroid) {
			sourceType = 1;
		}
		else {
			sourceType = 2;
		}
		window.location.href = '../NRLorder/PayedOrder?orderid=' + orderid + '&returnUrl=/Numberology/Tools/bzhhpayed.html&sourceType=' + sourceType;
	});

	$('.shareBtn').on('click',function(){
		appCallback_share();
	});
});
var textObj1, textObj;

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
wnlui.wxShare({
  title: '八字合婚',
  text: '我在万年历看【八字合婚】，分享给你，一起看吧！',
  imgUrl: location.origin + '/numberology/Tools/images/bzhhShare.jpg',
  imageUrl: location.origin + '/numberology/Tools/images/bzhhShare.jpg',
  url: location.href + "&share=1"
});

function appCallback_share() {
	_hmt.push(['_trackEvent', 'bzhh_share_click', 'click', 'bzhh_share_click', 'bzhh_share_click']);
	var title = '我在万年历做的八字合婚测算，好准！你也来看看？';
	var link = location.href + '&isShare=1';
	var imageURL = location.origin + '/numberology/Tools/images/bzhhShare.jpg';
	textObj = {
		text: title,
		image: '0',
		imageURL: imageURL,
		url: link,
		pureText: title,
		prefix: ''
	};
	textObj1 = {
		text: title,
		image: '0',
		imageURL: imageURL,
		targetUrl: link,
		perfix: ''
	};
	try {
		if (window.ylwindow) {
			ylwindow.reportHasShare(true);
			location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
		}
		else {
			location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
		}
	}
	catch (e) {
		alert(e);
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
	}
	else {
		//已登录
		uniqueId = native_score.userId;
	}
}
