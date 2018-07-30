import $ from 'jquery';
import isMobile from './utils/os';
// import FastClick from './utils/fastclick';
import './css/index.css';

$(() => {
	let dwidth = $(window).width();
	console.log(dwidth);
	$('.index').click(() => {
		$('.lineabout').addClass('hidden');
		$('.lineindex').removeClass('hidden');
		$('.index').css('opacity', 1);
		$('.about').css('opacity', 0.5);
		$('.ddindex').removeClass('hidden');
		$('.ddabout').addClass('hidden');
	});
	$('.about').click(() => {
		$('.lineabout').removeClass('hidden');
		$('.lineindex').addClass('hidden');
		$('.index').css('opacity', 0.5);
		$('.about').css('opacity', 1);
		$('.ddabout').removeClass('hidden');
		$('.ddindex').addClass('hidden');
	});
	//判断是否移动端打开
	if (isMobile()) {
		let ua = window.navigator.userAgent;
		let isWeixin = /MicroMessenger/i.test(ua);
		let isAndroid = (/Android|HTC/i.test(ua) || (window.navigator.platform + '').match(/Linux/i));
		let isIPad = !isAndroid && /iPad/i.test(ua);
		let isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
		let isIOS = isIPad || isIPhone;
		if (isIOS) {
			$('.client, .client1').on('click', () => {
				location.href = '';
			});
		}
		else if (isWeixin) {
			$('.client, .client1').on('click', () => {
				location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youloft.calendarpro';
			});
		}
		else {
			$('.client, .client1').on('click', () => {
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
		$('.pcclient').on('mouseover', () => {
			$('.downloadqr').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 500);
		});
		$('.pcclient').on('mouseleave', () => {
			$('.downloadqr').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});
		$('.client1').on('mouseover', () => {
			$('.downloadqr1').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 500);
		});
		$('.client1').on('mouseleave', () => {
			$('.downloadqr1').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});


		$('.pcusewx').on('mouseover', () => {
			$('.usewxqr').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 500);
		});
		$('.pcusewx').on('mouseleave', () => {
			$('.usewxqr').addClass('hidden').animate({
				opacity: 0,
				filter: 'alpha(opacity=0)'
			});
		});
		$('.usewx1').on('mouseover', () => {
			$('.usewxqr1').removeClass('hidden').animate({
				opacity: 1,
				filter: 'alpha(opacity=100)'
			}, 500);
		});
		$('.usewx1').on('mouseleave', () => {
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
