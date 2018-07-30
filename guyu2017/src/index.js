import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import '../static/libs/js/flexible';
import './sass/index.scss';
import utils from './util/util';

let share = {
	title: '【查收】谷雨时节有好运！', // 分享title
	link: 'https://b.cqyouloft.com/guyu2017/index.html?share=1', // 分享链接
	imgUrl: 'https://b.cqyouloft.com/guyu2017/img/share.jpg', // wx分享icon
	image: 'https://b.cqyouloft.com/guyu2017/img/share.jpg', // wnl分享icon',
	text: '你有一张谷雨好运卡待领取>>' // 分享描述
};
let sharepic = utils.getQueryValue('sharepic') || '';
let shareImage;
let count;
let count1;
$(() => {
	if (sharepic) {
		$('.shadow, .shadow2').remove();
		$('.page').addClass('hidden');
		$('.page1').find('.top1').append(`<img id="imgshare" src=${sharepic}/>`);
		$('#imgshare').addClass('results');
		$('.page1').find('.again, .share').addClass('hidden');
		$('.page1').find('.click').removeClass('hidden');
		$('.page1').removeClass('hidden');
		$('.page1').find('.click').on('click', () => {
			window.location.href = 'https://b.cqyouloft.com/guyu2017/index.html';
		});
	}
	//首页燕子动画
	const mouseDom = $('.bird');
	const mouseImg = mouseDom.find('img');
	let mouseScal = (ease) => {
		const height = 96 + (ease * 20);
		const width = 96 + (ease * 40);
		mouseImg.attr('height', height);
		mouseImg.attr('width', width);
	};
	let mouseAnimate = function() {
		const width = $('.page').width();
		const p5 = { x: -96, y: 180 };
		const p4 = { x: (width / 4) * 1, y: 220 };
		const p3 = { x: (width / 4) * 2, y: 200 };
		const p2 = { x: (width / 4) * 3, y: 100 };
		const p1 = { x: ((width / 4) * 4) - 85, y: 85 };
		mouseDom.css('display', 'block');
		mouseDom.removeClass('fadeout');
		let bezierAnimate = new bezier({ // eslint-disable-line
			points: [p1, p2, p3, p4, p5],
			frame: (np, v) => {
				mouseDom.css({ left: np.x, top: np.y });
				mouseScal(v);
				// console.log('np', np);
			},
			complete: () => {
				mouseDom.fadeOut(500, () => {
					$(this).addClass('fadeout');
				});
			},
			duration: 2000
		});
	};
	setTimeout(() => {
		mouseAnimate();
	}, 800);
	let img = new Image();
	let randomFirstNum = Math.floor((Math.random() * 5) + 1);
	img.src = `https://b.cqyouloft.com/guyu2017/img/card${randomFirstNum}.png`;
	img.onload = () => {
		$(img).addClass('results');
		count = img.src.substr(41, 1);
		$('.shadow').removeClass('hidden').append(img); // 生成随机的结果页
	};
	//首页点击
	$('.page').on('click', (e) => {
		e.preventDefault();
		$('.foot, .icon').fadeOut(300);
		$('.water').addClass('down');
		$('.page').fadeOut(1500);
		$('.page1').fadeIn(2600).removeClass('hidden');
		// console.log(count)
		shareImage = $('.shadow').find('img').eq(0).attr('src');
		share.title = '【好友@你】好运卡待查收';
		share.text = '你有一张谷雨好运卡待领取>>';
		share.link = `https://b.cqyouloft.com/guyu2017/index.html?sharepic=https://b.cqyouloft.com/guyu2017/img/card${count}.png`;
	});
	//再领一次
	$('.again').on('click', () => {
		let randomNum = Math.floor((Math.random() * 5) + 1);
		let shadow2 = `<div class="shadow2"><img class="results" src="https://b.cqyouloft.com/guyu2017/img/card${randomNum}.png"></div>`;
		let imgSrc = $(shadow2).find('img').attr('src');
		let div0 = $('.top1').find('div');
		count1 = imgSrc.substr(41, 1);
		$('.again').attr('disabled', 'true');
		$('.water').removeClass('down');
		let img1 = new Image();
		img1.src = `https://b.cqyouloft.com/guyu2017/img/card${count1}.png`;
		img1.onload = () => {
			$('.top1').append(shadow2);
			div0.animate({ // 消失动画
				marginLeft: '-100%',
				opacity: 0
			}, 900, () => {
				$(this).remove();
			});
			$('.shadow2').animate({ // 进入动画
				left: 0
			}, 900, () => {
				$('.again').removeAttr('disabled');
			});
		};
		shareImage = $('.shadow2').find('img').eq(0).attr('src'); // 结果页分享图片链接
		share.link = `https://b.cqyouloft.com/guyu2017/index.html?sharepic=https://b.cqyouloft.com/guyu2017/img/card${count1}.png`;
	});
	//点击分享
	$('.share').on('click', () => {
		window.wnlui.wnlShare.setShareData({
			image: shareImage
		});
		window.wnlui.wnlShare.showSharePlatform();
	});
});

