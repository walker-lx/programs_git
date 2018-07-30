function isMobile() {
	var regexMatch = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|noletra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
	var u = navigator.userAgent;
	if (u === null) {
		return false;
	}
	var result = regexMatch.exec(u);
	if (result === null) {
		return false;
	}
	return true;
	// var windowwidth = $(window).width();
	// if (windowwidth < 1024) {
	// 	return true
	// }
	// return false
}
$(function() {
	var dwidth = $(window).width();
	// FastClick.attach(document.body);
	$('.index').click(function() {
		$('.lineabout').addClass('hidden');
		$('.lineindex').removeClass('hidden');
		$('.index').css('opacity', 1);
		$('.about').css('opacity', 0.5);
		$('.ddindex').removeClass('hidden');
		$('.ddabout').addClass('hidden');
	});
	$('.about').click(function() {
		$('.lineabout').removeClass('hidden');
		$('.lineindex').addClass('hidden');
		$('.index').css('opacity', 0.5);
		$('.about').css('opacity', 1);
		$('.ddabout').removeClass('hidden');
		$('.ddindex').addClass('hidden');
	});
	//判断是否移动端打开
	if (isMobile()) {
		var ua = window.navigator.userAgent;
		var isWeixin = /MicroMessenger/i.test(ua);
		var isAndroid = (/Android|HTC/i.test(ua) || (window.navigator.platform + '').match(/Linux/i));
		var isIPad = !isAndroid && /iPad/i.test(ua);
		var isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
		var isIOS = isIPad || isIPhone;
		if (isIOS) {
			$('.client, .client1').on('click', function() {
				location.href = 'http://mobile.51wnl.com/ddcalender/apktransform.html';
			});
		}
		else if (isWeixin) {
			$('.client, .client1').on('click', function() {
				location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendarpro';
			});
		}
		else {
			$('.client, .client1').on('click', function() {
				location.href = 'https://cdn.jptj.goodstudydayup.com/apk/201710181202333840-com.youloft.calendarpro_publish_1.0_1.apk';
			});
		}
		$('.pctop').addClass('hidden');
		$('.top').removeClass('hidden');
		$('.usewx, .usewx1').addClass('hidden');
		$('.pcnav').addClass('hidden');
		$('.mobilenav').removeClass('hidden');
		$('.client1').addClass('mobileclient').addClass('shadow');
		$('.text1').addClass('mobiletext');
		$('.content, .aboutfoot').removeClass('hidden');
		$('.pccontent, .pcaboutfoot, .pcdesc').addClass('hidden');
		$('.pcfoot').addClass('hidden');
		$('.foot').removeClass('hidden');
		$('.moreview, .write, .invite, .cloud').css('height', dwidth * 0.56);
	}
	else {
		$('.mobilenav').addClass('hidden');
		$('.pcnav').removeClass('hidden');
		$('.top').addClass('hidden');
		$('.pctop').removeClass('hidden');
		$('.usewx').removeClass('hidden');
		$('.funclist').addClass('pcfunclist');
		$('.content, .aboutfoot').addClass('hidden');
		$('.pccontent, .pcaboutfoot, .pcdesc').removeClass('hidden');
		$('.pcfoot').removeClass('hidden');
		$('.foot').addClass('hidden');
		$('.btn').addClass('pcbtn');
		$('.pcaboutbtn').removeClass('hidden');
		// $('.moreview, .write, .invite, .cloud').css('width', '45%');
		$('.moreview, .write, .invite, .cloud').addClass('pclist');
		$('.moreview, .write, .invite, .cloud').css('height', 486 * 0.56);

		//设置鼠标经过样式
		$('.pcclient').on('mouseover', function() {
			$('.downloadqr').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 200);
		});
		$('.pcclient').on('mouseleave', function() {
			$('.downloadqr').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});
		$('.client1').on('mouseover', function() {
			$('.downloadqr1').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 200);
		});
		$('.client1').on('mouseleave', function() {
			$('.downloadqr1').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});


		$('.pcusewx').on('mouseover', function() {
			$('.usewxqr').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 200);
		});
		$('.pcusewx').on('mouseleave', function() {
			$('.usewxqr').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});
		$('.usewx1').on('mouseover', function() {
			$('.usewxqr1').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 200);
		});
		$('.usewx1').on('mouseleave', function() {
			$('.usewxqr1').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});
	}

	//点击下载
	// $('.client').on('click', () => {
	// 	$('.usewx').removeClass('white');
	// 	$('.client').addClass('white');
	// });
	// $('.usewx').on('click', () => {
	// 	$('.client').removeClass('white');
	// 	$('.usewx').addClass('white');
	// });
});
