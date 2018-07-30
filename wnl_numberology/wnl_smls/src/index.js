import 'babel-polyfill';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import '../static/libs/js/flexible';
import './sass/index.scss';
import utils from './util/util';
import './helper/scroll';
import getSelectTime from './helper/getselecttime';
// import util from './util/util';
let imglist = {
	1: 'https://qiniu.image.cq-wnl.com/content/20180509dda2a5417f564db09d160ada2eb16769.png',
	2: 'https://qiniu.image.cq-wnl.com/content/2018050917d21e35fc4a496aa5a6964b70ab509d.png',
	3: 'https://qiniu.image.cq-wnl.com/content/20180509219d3e5ef69d4d72ac2acca6fd825a26.png',
	4: 'https://qiniu.image.cq-wnl.com/content/20180509c88fd441b6a24db0a76e73b667f9204c.png',
	5: 'https://qiniu.image.cq-wnl.com/content/20180509e64cd364413a4996a28ab0ded77f7991.png',
	6: 'https://qiniu.image.cq-wnl.com/content/20180509c84ab109c9444f05aff883f2e02ded41.png',
	7: 'https://qiniu.image.cq-wnl.com/content/201805097448055a13d3488aabdd3099a9c6c508.png',
	8: 'https://qiniu.image.cq-wnl.com/content/20180509e4eaa050578848869f730bbce512b604.png',
	9: 'https://qiniu.image.cq-wnl.com/content/20180509f995bb5f72f64d448d11abbfdff26909.png'
};
let nickname = '张三';
const ajaxUrl = {
	dev: {
		getdetail: 'http://192.168.1.178:3000/mock/14/LifeNum/GetOrderDetail',
		buy: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder',
		getOtherMini: 'http://192.168.1.110:8988/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=14&ismini=true',
		getComment: 'http://192.168.1.178:3000/mock/14/CeSuanComment/GetCommentList?type=8&size=10'
	},
	pro: {
		getdetail: '//coco70.51wnl.com/numberologynew/LifeNum/GetOrderDetail',
		buy: '//coco70.51wnl.com/numberologynew/LifeNum/CreateOrder',
		isopen: '//coco70.51wnl.com/numberologynew/MiniProgram/GetPayConfig',
		getOtherMini: '//coco70.51wnl.com/numberologynew/BaseCeSuan/GetRelevantGoodsList?type=14&ismini=true',
		getComment: '//coco70.51wnl.com/numberologynew/CeSuanComment/GetCommentList?type=8&size=10',
		getOrderList: '//coco70.51wnl.com/numberologynew/LifeNum/GetOrderList',
		add: '//coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=add'
	}
};
let orderid = '';
// 数字详解
let numDesc = { // eslint-disable-line
	1: {
		text: '数字1代表颜色为红色，对应海底轮，数字1的人一生对自我生命价值的看重和价值感要求高，独立、自主、孤独、有个性，自我要求高，对他人要求也高，执行力强，一生来学习自我接受和肯定。',
		color: '红色',
		dyw: '海底轮'
	},
	2: {
		text: '数字2代表颜色为橙色，对应生殖轮，数字2的人，特重关系，喜好与人在一起，追求爱情，喜爱恋爱，不喜孤独，喜欢性和爱，一生来学习关系平衡。',
		color: '橙色',
		dyw: '生殖轮'
	},
	3: {
		text: '数字3代表颜色为黄色，对应脐轮，也称太阳神经从轮，数字3的人，勇敢，冒险，火爆，勇于创新，喜欢新潮，刺激，热情，生命力强大，一生来学习改变和突破。',
		color: '黄色',
		dyw: '脐轮'
	},
	4: {
		text: '数字4代表颜色为绿色，对应心轮，数字4的人，善良，有爱心，害羞，喜欢小动物，亲近大自然，心灵手巧，喜好艺文活动，一生来学习打开心意识力量。',
		color: '绿色',
		dyw: '心轮'
	},
	5: {
		text: '数字5代表颜色为蓝色，对应喉轮，数字5的人，口才好，喜说话，凡事讲求公平公正，表达能力很强，理解力也很强，一生来学习自由平等。',
		color: '蓝色',
		dyw: '喉轮'
	},
	6: {
		text: '数字6代表颜色为靛色，对应眉心轮，数字6的人，喜欢社会服务，喜欢志工活动，对生命充满好奇，内心柔软，直觉性强，敏感，灵感很强，一生来学习悟性觉知。',
		color: '靛色',
		dyw: '眉心轮'
	},
	7: {
		text: '数字7代表颜色为紫色，对应顶轮，数字7的人，喜欢探索真相，不喜隐瞒，追求真理，有研究精神，喜追根究底，大部分拥有敏感性体质，是很好的能量接收者，一生来学习证明真理。',
		color: '紫色',
		dyw: '顶轮'
	},
	8: {
		text: '数字8代表颜色为白色，对应足三里穴位，数字8的人，有数字天分，有经济头脑，喜爱金钱游戏，对财富需求大，生命变化大，很喜欢折腾自己，一生来学习富足的考验。',
		color: '白色',
		dyw: '足三里穴'
	},
	9: {
		text: '数字9代表颜色为黑色，对应涌泉穴，数字9的人，坚毅，追求理想和使命，固执，执着，有大格局思路，一生学习创造新天新地新人生。',
		color: '黑色',
		dyw: '涌泉穴'
	}
};
let lifnum = null;
// 默认图卡展示
let defaultGame = [ // eslint-disable-line
	{ date1: '20180320', img: 'https://qiniu.image.cq-wnl.com/content/2018050329ee4ee7a9be45949cc2de7bcdec361d.jpg', imgDesc: '今天属于你的这张卡，图卡表象呈现的是一个母亲和一个孩子，反应的是我们和母亲的关系，在你注视这张图卡时，你的感受是温暖、是冷漠、是关爱、是责备……无论你的感受是什么，图卡正在提醒着你和母亲的关系，是你有机会可以去转化' },
	{ date1: '20180321', img: 'https://qiniu.image.cq-wnl.com/content/20180503e77827dce68f408582c8808bab555c30.jpg', imgDesc: '一个黑暗的人，在黑夜里，面部全黑，不见五官，但却两眼发光。眼睛是寻魂之窗，只要仍有光芒，生命就有希望，因为代表了心光不灭。' },
	{ date1: '20180322', img: 'https://qiniu.image.cq-wnl.com/content/201805037266f2530a4a498bb8c1b7c454476773.jpg', imgDesc: '一个大人和小孩的互动。大人是熟人或是陌生人，取决于生命中和你关系密切的男性是谁？那个小孩正在对那大人说话，如同你内心想去找的那个人，你有话想对他（她）说。' },
	{ date1: '20180323', img: 'https://qiniu.image.cq-wnl.com/content/2018050307d804e0b0004c23aeaf9530e95f766d.jpg', imgDesc: '2个人在一个跑场上，是合作？是竞争？这取决于你的心态，一个跑场上，也可以是团队一起的共同训练、成长。是竞争是合作，你怎么看呢？' },
	{ date1: '20180324', img: 'https://qiniu.image.cq-wnl.com/content/20180503ba57bd9eddbd4c1488932c83f5ce7104.jpg', imgDesc: '一个人站在一面红墙边，你注意到的是人，还是红色的墙？你注意的如果是人，人在做什么？请你反思你近来的心情，是否有相似之处呢？请你注意墙，那个红色是舒服还是不舒服？' },
	{ date1: '20180325', img: 'https://qiniu.image.cq-wnl.com/content/201805031815a9a5efd9416f9514066bff278084.jpg', imgDesc: '一支铁锹放在墙边，是准备工作呢？还是已经完成了工作？是紧张还是放松呢？它正反应了你对你现在工作的状态，好好思考，你也许会有新发现。' },
	{ date1: '20180326', img: 'https://qiniu.image.cq-wnl.com/content/201805031c92ed2263514e8fafac9d23322cf735.jpg', imgDesc: '', luckPropose: '今日图腾，如同你的幸运般，也是如此不同，你在图卡上，见到了什么？' } // eslint-disable-line
];
let onepay;
let datearr = [];
function getnextdate(dt) {
	if (typeof dt === 'undefined') dt = new Date();
	let y = (dt.getMonth() === 11) ? (dt.getFullYear() + 1) : dt.getFullYear();
	let m = (dt.getMonth() === 11) ? '01' : dt.getMonth() + 2;
	// let preM = Date.getDayOfMonth(y, m);
	// let d = (preM < dt.getDate()) ? preM : dt.getDate();
	return y + '-' + utils.formatNumber(m) + '-01';
}
function addBtnState(dom, el, _class) {
	let move;
	$(document).on('touchend touchstart touchmove touchcancel', dom, function(e) { // eslint-disable-line
		// if (!$(this).hasClass('active')) {
		// 	return;
		// }
		if (e.type === 'touchstart') {
			move = null;
			if (_class) {
				el.removeClass(_class);
			}
			else {
				el.removeClass('hidden');
			}
		}
		else if (e.type === 'touchmove') {
			if (move) return;
			move = true;
			if (_class) {
				el.addClass(_class);
			}
			else {
				el.addClass('hidden');
			}
		}
		else {
			if (move) return;
			if (_class) {
				el.addClass(_class);
			}
			else {
				el.addClass('hidden');
			}
		}
	});
}
let shareData = {
	title: '生命灵数',
	text: '超准的运势，快来看看你的吧',
	image: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	// url: `${window.location.href}//${window.location.host + window.location.pathname}`
	url: `${window.location.protocol}//${window.location.host + window.location.pathname}`
};
// let unionid = '';
let _avtar = '';
let _nickname = '';
$(() => {
	// console.log(getnextdate(new Date('2018-12-12')));
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	let monthnum = new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-01';
	let nextmonthnum = getnextdate();
	const PARTERID = 'wnl';
	const APPVERSION = '1.0.0';
	const GOODSID = '775F426CC9C245E4AEDF4DCFF68E817C';
	const CHANNEL = utils.isIOS ? 'iOS' : 'Android';
	let clientype = utils.isIOS ? 'Youloft_IOS' : 'Youloft_Android';
	let todayobj;
	let nextdayobj;
	let monthobj;
	let nextmonthobj;
	let now = new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-' + utils.formatNumber(new Date().getDate());
	let nowstr = new Date().getFullYear() + utils.formatNumber(new Date().getMonth() + 1) + utils.formatNumber(new Date().getDate());
	let nowmonth = new Date().getFullYear() + '-' + utils.formatNumber(new Date().getMonth() + 1) + '-01';
	$('.monthbtn').attr('data-monthnum', monthnum);
	$('.nextmonthbtn').attr('data-monthnum', nextmonthnum);
	// 点击分享
	$('.todayluck_share, .hasluck_share').on('click', () => {
		if (utils.isWnl) {
			window.wnlui.wnlShare.showSharePlatform();
		}
		else if (utils.isWeixin) {
			$('.wxsharemask').removeClass('hidden');
		}
	});
	$('.wxsharemask').on('click', () => {
		$('.wxsharemask').addClass('hidden');
	});
	// 按钮点击态
	addBtnState('.historybtn', $('.hisactive'));
	addBtnState('.todaybtn', $('.todayactive'));
	addBtnState('.monthbtn', $('.monthactive'));
	addBtnState('.nextmonthbtn', $('.nextmonthactive'));
	addBtnState('.zxcs', $('.zxcsactive'));
	addBtnState('.monthljck', $('.monthactive'));
	addBtnState('.user', $('.changeuser'), '.changeactive');
	function additem(img, text, url) { // 底部相关测算添加
		let dom = $('.xgyy_item').eq(0).clone(true);
		dom.removeClass('hidden');
		dom.attr('data-url', url);
		dom.css('background-image', 'url("' + img + '")');
		dom.find('.text').html(text);
		dom.insertBefore($('.hold'));
	}
	function addfk(name, tel) { // 反馈列表添加
		let dom = $('.fkitem').eq(0).clone(true);
		dom.removeClass('hidden');
		dom.find('.fkname').html(name);
		dom.find('.fktext').html(tel);
		dom.appendTo('.fklist');
	}
	// addfk('sd', 1212);
	function checkbtn() {
		if ($('.todaybtn').attr('class').indexOf('hidden') > -1 && $('.monthbtn').attr('class').indexOf('hidden') > -1 && $('.nextmonthbtn').attr('class').indexOf('hidden') > -1) {
			$('#content').removeClass('posbottom');
			// console.log('aaaa');
		}
		else {
			$('#content').addClass('posbottom');
			// console.log('bbb');
		}
	}
	// 获取评论
	$.ajax({
		url: ajaxUrl.pro.getComment,
		type: 'get',
		success: (res) => {
			// console.log(JSON.parse(res), '评论');
			let _res = JSON.parse(res).data;
			_res.forEach((item) => {
				addfk(item.name, item.content);
			});
			$('#marquee-top').marquee();
		}
	});
	// $('.more, .ckqw').removeClass('hidden');
	$.ajax({ // 获取其他测算
		url: ajaxUrl.pro.getOtherMini,
		type: 'get',
		success: (res) => {
			// console.log(JSON.parse(res).data);
			let obj = JSON.parse(res).data;
			obj.forEach((item) => {
				additem(item.img, item.title, item.url);
			});
			$('.xgyy_item').on('click', function() {
				// console.log($(this).attr('data-url'));
				window.location.href = $(this).attr('data-url');
			});
		}
	});
	function addtk(desc, date, isdefault, img, nodesc) {
		let dom = $('.swiper-slide').eq(0).clone(true);
		dom.removeClass('hidden');
		dom.attr('data-img', img);
		dom.attr('data-desc', desc);
		dom.attr('data-date', date);
		// console.log(desc);
		if (isdefault) {
			if (date >= '20180326') {
				dom.find('.tkleft3').removeClass('hidden');
				dom.attr('data-canclick', 0);
			}
			else {
				dom.find('.tkleft3').addClass('hidden');
				dom.attr('data-canclick', 1);
			}
		}
		else { // eslint-disable-line
			if (date >= nowstr) { // eslint-disable-line
				dom.find('.tkleft3').removeClass('hidden');
				dom.attr('data-canclick', 0);
			}
			else {
				dom.find('.tkleft3').addClass('hidden');
				dom.attr('data-canclick', 1);
			}
		}
		if (desc.length >= 34 && !nodesc) {
			dom.find('.tkleft2').find('span').eq(0).html(desc.slice(0, 34));
			dom.find('.more, .ckqw').removeClass('hidden');
		}
		else {
			dom.find('.tkleft2').find('span').eq(0).html(desc);
			dom.find('#more, #ckqw').addClass('hidden');
		}
		dom.find('.tkright').css('background-image', 'url("' + img + '")');
		// dom.find('.tkright').attr('src', img);
		dom.appendTo($('.swiper-wrapper'));
	}
	// console.log(nowstr);
	function setDayData(obj) { // 设置j今日明日数据
		$('.yryztext').html(obj.oneDayOneForward);
		$('.daylucktext_color_desc').html(obj.luckColorTxt);
		$('.daylucktext_people_desc').html(obj.luckPerson);
		$('.daylucktext_wp_desc').html(obj.luckProduct);
		$('.dayluck_zy_aq_desc').html(obj.loveZY);
		$('.dayluck_zy_sy_desc').html(obj.workZY);
		$('.dayluck_zy_cf_desc').html(obj.moneyZY);
		$('.dayluck_aq_num').html(obj.loveScore);
		$('.dayluck_cf_num').html(obj.moneyScore);
		$('.dayluck_sy_num').html(obj.workScore);
		$('.dayluck_aq_slide').css('width', ((obj.loveScore / 100) * 196) + 'px');
		$('.dayluck_sy_slide').css('width', ((obj.workScore / 100) * 196) + 'px');
		$('.dayluck_cf_slide').css('width', ((obj.moneyScore / 100) * 196) + 'px');
	}
	function setMonthData(monthdata) { // 设置本月下月数据
		$('.monthluck_zy_desc').html(monthdata.oneDayOneForward);
		$('.kyzn_text').html(monthdata.luckPropose);
		for (let i = 1; i <= 5; i += 1) {
			$('.monthluck_zy_aq_icon' + i).removeClass('actaq');
			$('.monthluck_zy_sy_icon' + i).removeClass('actsy');
			$('.monthluck_zy_cf_icon' + i).removeClass('actcf');
		}
		if (monthdata.loveScore > 0) {
			for (let i = 1; i <= monthdata.loveScore; i += 1) {
				$('.monthluck_zy_aq_icon' + i).addClass('actaq');
			}
		}
		if (monthdata.workScore > 0) {
			for (let i = 1; i <= monthdata.workScore; i += 1) {
				$('.monthluck_zy_sy_icon' + i).addClass('actsy');
			}
		}
		if (monthdata.moneyScore > 0) {
			for (let i = 1; i <= monthdata.moneyScore; i += 1) {
				$('.monthluck_zy_cf_icon' + i).addClass('actcf');
				// console.log('财富');
			}
		}
	}
	let numshow = 0; // 0: 不显示数字动画  1: 显示
	if (utils.getQueryValue('add') || utils.getQueryValue('add') === '1') {
		// $('.numani').removeClass('_hidden');
		// $('.numani_num').addClass('numactive');
		numshow = 1;
	}
	let deviceid = '';
	if (utils.getQueryValue('deviceId')) {
		if (utils.getQueryValue('deviceId').indexOf('[') > -1) {
			deviceid = 'test';
		}
		else {
			deviceid = utils.getQueryValue('deviceId');
		}
	}
	else if (utils.isWeixin) {
		// if (utils.getQueryValue('unionid')) {
		// localStorage.clear();
		if (localStorage.getItem('unionid') || utils.getQueryValue('unionid')) {
			deviceid = utils.getQueryValue('unionid') || localStorage.getItem('unionid');
			_avtar = utils.getQueryValue('headimgurl') || localStorage.getItem('avtar');
			_nickname = utils.getQueryValue('nickname') || localStorage.getItem('nickname');
			localStorage.setItem('unionid', deviceid);
			localStorage.setItem('avtar', _avtar);
			localStorage.setItem('nickname', _nickname);
		}
		else {
			// alert(localStorage.getItem('unionid'));
			window.location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href);
		}
	}
	else {
		deviceid = 'test';
	}
	// 获取详情
	function getdetail(ajaxobj) {
		let _obj = {
			// DeviceID: (utils.getQueryValue('deviceId') && utils.getQueryValue('deviceId').indexOf('[') > -1) ? 'test' : utils.getQueryValue('deviceId'),
			DeviceID: deviceid || 'test',
			UserID: '',
			name: '',
			GLBirthDay: '',
			ParterID: PARTERID,
			ClientType: clientype,
			APPVersion: APPVERSION,
			orderid: ajaxobj ? ajaxobj.orderid : orderid
		};
		console.log(_obj, '详情参数');
		if (ajaxobj) {
			_obj.name = ajaxobj.name;
			_obj.GLBirthDay = ajaxobj.birth;
		}
		// else if (localStorage.getItem('name')) {
		// 	_obj.name = localStorage.getItem('name');
		// 	_obj.GLBirthDay = localStorage.getItem('birth');
		// }
		else {
			_obj.name = $('.nickname').text();
			_obj.GLBirthDay = $('.luckbirth').slice(0, 4) + '-' + $('.luckbirth').slice(5, 7) + '-' + $('.luckbirth').slice(8, 10);
		}
		$.ajax({ // 获取运势详情
			url: ajaxUrl.pro.getdetail,
			method: 'post',
			contentType: 'application/json',
			data: JSON.stringify(_obj),
			success: (res) => {
				console.log(JSON.parse(res).data);
				if (JSON.parse(res).status === 0) {
					let content = JSON.parse(res).data.content; // eslint-disable-line
					let game = JSON.parse(res).data.game; // eslint-disable-line
					let userinfo = JSON.parse(res).data.userInfo; // eslint-disable-line
					// console.log(game[6]);
					let birth;
					if (userinfo.name) {
						nickname = userinfo.name;
						birth = userinfo.glBirthday.split('T')[0].split('-')[0] + '年' + userinfo.glBirthday.split('T')[0].split('-')[1] + '月' + userinfo.glBirthday.split('T')[0].split('-')[2] + '日';
					}
					if (JSON.parse(res).data.isPay) {
						onepay = 1;
						$('.historybtn').removeClass('hidden');
					}
					else {
						onepay = 0;
						$('.historybtn').addClass('hidden');
					}
					let index1 = 0; // eslint-disable-line
					// console.log(game.length);
					if (game.length > 0) {
						game.forEach((item, index) => {
							// console.log(item);
							let d = item.date.split('T')[0].replace(/-/g, '');
							if (item.imgDesc <= 0) {
								item.imgDesc = item.luckPropose;
								item.nodesc = true;
								index1 = index;
							}
							else {
								item.nodesc = false;
							}
							addtk(item.imgDesc, d, false, item.img, item.nodesc);
						});
					}
					else {
						defaultGame.forEach((item, index) => {
							if (item.imgDesc <= 0) {
								item.imgDesc = item.luckPropose;
								item.nodesc = true;
								index1 = index;
							}
							else {
								item.nodesc = false;
							}
							addtk(item.imgDesc, item.date1, true, item.img, item.nodesc);
						});
					}
					// addtk();
					// console.log(Swiper);
					let mySwiper = new Swiper ('.swiper-container', { // eslint-disable-line
						continuous: true,
						disableScroll: true,
						spaceBetween: -28,
						initialSlide: index1 || 0
						// centeredSlides: true
					});
					content.forEach((item) => {
						item._date = item.date.split('T')[0]; // eslint-disable-line
						datearr.push(item._date);
					});
					// 是否展示默认数据
					if (datearr.indexOf(now) <= -1) { // 修改了系统时间
						$('.todayluck_tab, .todayselected, .nextdayselected, .monthluck, .kyzn, .todaybtn').addClass('hidden');
						$('.content').addClass('posbottom');
						if (utils.isWeixin) {
							$('.nickname').html(localStorage.getItem('nickname').length > 4 ? localStorage.getItem('nickname').slice(0, 4) : localStorage.getItem('nickname'));
						}
						else {
							$('.nickname').html('张三');
						}
						$('.luckbirth').html('1995年03月26日');
						// if (_avtar && parseInt(userinfo.img) === 1) {
						$('#avtar').attr('src', localStorage.getItem('avtar') || _avtar);
						// }
						checkbtn();
						// $('.indexani').removeClass('hidden');
					}
					else if (userinfo.orderID.length <= 0) { // 没有输入生日
						$('.todayluck_tab, .todayselected, .nextdayselected, .monthluck, .kyzn').addClass('hidden');
						$('.content').addClass('posbottom');
						if (utils.isWeixin) {
							$('.nickname').html(localStorage.getItem('nickname').length > 4 ? localStorage.getItem('nickname').slice(0, 4) : localStorage.getItem('nickname'));
						}
						else {
							$('.nickname').html('张三');
						}
						$('.luckbirth').html('1995年03月26日');
						// if (_avtar && parseInt(userinfo.img) === 1) {
						$('#avtar').attr('src', localStorage.getItem('avtar') || _avtar);
						// }
						console.log(_avtar, 'avtar');
						checkbtn();
						// $('.indexani').removeClass('hidden');
					}
					else {
						$('.nickname').html(userinfo.name.length >= 4 ? userinfo.name.slice(0, 4) + '...' : userinfo.name);
						$('.luckbirth').html(birth);
						if (parseInt(userinfo.img) === 1 && _avtar) {
							// $('.avtar').css('background-image', 'url("' + _avtar + '")');
							$('#avtar').attr('src', localStorage.getItem('avtar') || _avtar);
						}
						content.forEach((item) => {
							// console.log(item.date.split('T')[0].split('-')[1]);
							if (item.type === 0) { // 今日或明日u
								if (now === item.date.split('T')[0]) {
									todayobj = item;
									todayobj.oneDayOneForward = item.oneDayOneForward.length > 0 ? item.oneDayOneForward : '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。';
									todayobj.luckColorTxt = item.luckColorTxt.length > 0 ? item.luckColorTxt : '深灰色';
									todayobj.luckPerson = item.luckPerson.length > 0 ? item.luckPerson : '数字8的人';
									todayobj.luckProduct = item.luckProduct.length > 0 ? item.luckProduct : '黑米';
									todayobj.loveZY = item.loveZY.length > 0 ? item.loveZY : '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。';
									todayobj.workZY = item.workZY.length > 0 ? item.workZY : '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。';
									todayobj.moneyZY = item.moneyZY.length > 0 ? item.moneyZY : '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。';
									todayobj.loveScore = item.loveScore > 0 ? item.loveScore : 40;
									todayobj.moneyScore = item.moneyScore > 0 ? item.moneyScore : 80;
									todayobj.workScore = item.workScore > 0 ? item.workScore : 60;
									setDayData(todayobj);
									// console.log(todayobj, 'today');
								}
								else {
									nextdayobj = item;
									nextdayobj.oneDayOneForward = item.oneDayOneForward.length > 0 ? item.oneDayOneForward : '今天在心中默念十句“我是富有的”增强自己这个月的财富运势。';
									nextdayobj.luckColorTxt = item.luckColorTxt.length > 0 ? item.luckColorTxt : '深灰色';
									nextdayobj.luckPerson = item.luckPerson.length > 0 ? item.luckPerson : '数字8的人';
									nextdayobj.luckProduct = item.luckProduct.length > 0 ? item.luckProduct : '黑米';
									nextdayobj.loveZY = item.loveZY.length > 0 ? item.loveZY : '在今日的你有财运没爱运，要留意和家人的对话语气，深呼吸会让你避过口角。';
									nextdayobj.workZY = item.workZY.length > 0 ? item.workZY : '在今日的你，因财运旺盛，事业也相帮衬，做起事来得心应手，在工作上可以多发力。';
									nextdayobj.moneyZY = item.moneyZY.length > 0 ? item.moneyZY : '在今日的你，因天时旺你偏财运，可以出点小财，买个体彩，既帮人又给自己一个希望。';
									nextdayobj.loveScore = item.loveScore > 0 ? item.loveScore : 40;
									nextdayobj.moneyScore = item.moneyScore > 0 ? item.moneyScore : 80;
									nextdayobj.workScore = item.workScore > 0 ? item.workScore : 60;
									// console.log(nextdayobj, 'nextday');
								}
							}
							else if (item.type === 1) {
								// console.log(item.date.split('T')[0].split('-')[1]);
								// console.log(nowmonth === '06');
								if (nowmonth === item.date.split('T')[0]) {
									monthobj = item;
									monthobj.oneDayOneForward = item.luckPropose.length > 0 ? item.oneDayOneForward : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？ 整体来说请多保持一颗“喜乐”的心，会更容易掌握好运势。';
									monthobj.loveScore = item.loveScore > 0 ? item.loveScore : 2;
									monthobj.moneyScore = item.moneyScore > 0 ? item.moneyScore : 4;
									monthobj.workScore = item.workScore > 0 ? item.workScore : 3;
									monthobj.luckPropose = item.luckPropose;
									if (item.luckPropose.length <= 0) {
										// console.log('month');
										monthobj.ispay = 0;
										$('.monthmask').removeClass('hidden');
										$('.monthbtn').removeClass('hidden');
									}
									else {
										monthobj.ispay = 1;
										setMonthData(monthobj);
										$('.monthbtn').addClass('hidden');
										$('.monthmask').addClass('hidden');
										// console.log('monthobj');
									}
									// checkbtn();
									console.log(!$('.todaybtn').hasClass('.hidden') && !$('.monthbtn').hasClass('.hidden') && !$('.nextmonthbtn').hasClass('.hidden'));
								}
								else {
									nextmonthobj = item;
									nextmonthobj.oneDayOneForward = item.luckPropose.length > 0 ? item.oneDayOneForward : '你在这个月，以时间廊的自我能量密码来说，他是7，所以在这个月，整体的地球上的能量，会出现探索、变动及变局，掌握地球的二股势力，在这个月会互相牵引，各有胜算，因为两股势力的彼此制衡，不相上下的结果，反而让这个月对每个人的生命能量更加充满挑战，如何在这个月里能够多运用自身数字能量密码来稳定自身运势？ 整体来说请多保持一颗“喜乐”的心，会更容易掌握好运势。';
									nextmonthobj.loveScore = item.loveScore > 0 ? item.loveScore : 2;
									nextmonthobj.moneyScore = item.moneyScore > 0 ? item.moneyScore : 4;
									nextmonthobj.workScore = item.workScore > 0 ? item.workScore : 3;
									// nextmonthobj.luckPropose = item.luckPropose.length > 0 ? item.luckPropose : '5月是你的创造金钱的月份，在这个月你会有许多机会可以赚到金钱，可以多上网络，收红包，这个月在网络上，你会有许多意外财，你的金钱能量在这个月会爆棚，要多多留意，并且会出现在虚拟世界，买个体彩也是好主意。财富冲克爱的运势，这个月个人要多留意语言的表达，多说谢谢，会避免自己这个月的爱的冲突。';
									if (item.luckPropose.length <= 0) {
										nextmonthobj.ispay = 0;
									}
									else {
										nextmonthobj.ispay = 1;
										// setMonthData(nextmonthobj);
									}
									// checkbtn();
									// console.log(nextmonthobj.ispay, 'nextmonth');
								}
							}
						});
						$('.csdesc1, .csdesc2, .todaytitle, .todayluck_share, .todaybtn, .kyzn').addClass('hidden');
						$('.todayluck_tab, .todayselected, .monthluck').removeClass('hidden');
						$('.num').html(userinfo.lifeNum);
						// console.log(userinfo.lifeNum);
						$('#color').html(numDesc[parseInt(userinfo.lifeNum)].color);
						$('.lucktext').find('span').html(numDesc[parseInt(userinfo.lifeNum)].dyw);
						lifnum = userinfo.lifeNum;
						orderid = userinfo.orderID;
						localStorage.setItem('name', userinfo.name);
						localStorage.setItem('birth', userinfo.GLBirthDay);
						// console.log(imglist[lifnum]);
						$('.numani_num').css('background-image', 'url("' + imglist[lifnum] + '")');
						if (numshow === 1) {
							$('.numani').removeClass('hidden');
							$('.numani_num').addClass('numactive');
						}
					}
					checkbtn();
					// console.log(monthobj, 'month');
					// console.log(nextmonthobj, 'nextmonth');
				}
				else {
					$.toast().reset('all');
					$.toast('请求数据失败');
					checkbtn();
				}
			},
			error: () => {
				// alert(JSON.stringify(e));
				$.toast().reset('all');
				$.toast('页面加载中...');
				$('.todayluck_tab, .todayselected, .nextdayselected, .monthluck, .kyzn, .todaybtn').addClass('hidden');
				$('.content').addClass('posbottom');
				checkbtn();
			}
		});
	}
	// 是否有参数
	if (utils.getQueryValue('name')) {
		let obj = {
			name: utils.getQueryValue('name'),
			birth: utils.getQueryValue('birth'),
			orderid: utils.getQueryValue('orderid') || ''
		};
		getdetail(obj);
	}
	else {
		let _ajaxdata = {
			DeviceID: deviceid || 'test'
		};
		$.ajax({
			url: ajaxUrl.pro.getOrderList,
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(_ajaxdata),
			success: (res) => {
				console.log(JSON.parse(res).data, 'list');
				let _res = JSON.parse(res).data && JSON.parse(res).data.length > 0 ? JSON.parse(res).data[0] : [];
				let _data = {
					DeviceID: deviceid || _res.deviceID,
					UserID: '',
					name: _res.name || $('.nickname').text(),
					GLBirthDay: _res.glBirthDay || $('.luckbirth').slice(0, 4) + '-' + $('.luckbirth').slice(5, 7) + '-' + $('.luckbirth').slice(8, 10),
					ParterID: PARTERID,
					ClientType: clientype,
					APPVersion: APPVERSION,
					orderid: _res.orderID || orderid || ''
				};
				getdetail(_data);
			}
		});
	}
	$('.wharea').on('touchend', () => { // 打开数字详解弹窗
		lifnum = lifnum !== null ? lifnum : 8;
		$('#lifenum').html(lifnum);
		$('.smlsmask_detail_bottom_text_desc').html(numDesc[lifnum].text);
		$('.smlsmask').removeClass('hidden');
	});
	$('.smlsmask_close').on('click', () => { // 关闭数字详解弹窗
		$('.smlsmask').addClass('hidden');
	});
	$('.user').on('touchend', () => { // 切换用户
		window.location.href = './userlist.html?deviceid=' + deviceid;
	});
	// 今日明日点击
	$('.tlucktext').on('touchend', function () { // eslint-disable-line
		$('.todayselected, .swiper-container').removeClass('hidden');
		$('.nextdayselected').addClass('hidden');
		$('.mlucktext').removeClass('actcolor');
		$(this).addClass('actcolor');
		$('.daymask').addClass('hidden');
		setDayData(todayobj);
		checkbtn();
	});
	$('.mlucktext').on('touchend', function () { // eslint-disable-line
		$('.dayljck').attr('data-monthnum', monthnum);
		if (onepay === 0) {
			$('.daymask').removeClass('hidden');
		}
		else {
			$('.daymask').addClass('hidden');
		}
		// console.log(onepay);
		$('.todayselected, .swiper-container').addClass('hidden');
		$('.nextdayselected').removeClass('hidden');
		$('.tlucktext').removeClass('actcolor');
		$(this).addClass('actcolor');
		// $('.daymask').removeClass('hidden');
		setDayData(nextdayobj);
		checkbtn();
	});
	// 本月下月点击
	$('.monthtext').on('click', function () { // eslint-disable-line
		$('.monthljck').attr('data-monthnum', monthnum);
		if (monthobj.ispay === 0) {
			$('.monthmask').removeClass('hidden');
		}
		else {
			$('.monthmask').addClass('hidden');
		}
		// console.log(monthobj, '月');
		$('.monthselected').removeClass('hidden');
		$('.nextmonthselected').addClass('hidden');
		$('.nextmonthtext').removeClass('actcolor');
		$(this).addClass('actcolor');
		$('.monthtip').html('解析当月运势，查看本月开运建议');
		setMonthData(monthobj);
		if (monthobj.luckPropose.length <= 0) {
			$('.kyzn').addClass('hidden');
			$('.monthbtn').removeClass('hidden');
		}
		else {
			$('.kyzn').removeClass('hidden');
			$('.monthbtn').addClass('hidden');
		}
		$('.nextmonthbtn').addClass('hidden');
		console.log($('.todaybtn').attr('class') > -1 && $('.monthbtn').attr('class') > -1 && $('.nextmonthbtn').attr('class') > -1);
		checkbtn();
	});
	$('.nextmonthtext').on('click', function () { // eslint-disable-line
		$('.monthljck').attr('data-monthnum', nextmonthnum);
		if (nextmonthobj.ispay === 0) {
			$('.monthmask').removeClass('hidden');
		}
		else {
			$('.monthmask').addClass('hidden');
		}
		$('.monthselected').addClass('hidden');
		$('.nextmonthselected').removeClass('hidden');
		$('.monthtext').removeClass('actcolor');
		$(this).addClass('actcolor');
		$('.monthtip').html('提前预知下月运势，查看开运建议');
		setMonthData(nextmonthobj);
		// console.log(nextmonthobj.luckPropose.length);
		if (nextmonthobj.luckPropose.length <= 0) {
			$('.kyzn').addClass('hidden');
			$('.nextmonthbtn').removeClass('hidden');
		}
		else {
			$('.kyzn').removeClass('hidden');
			$('.nextmonthbtn').addClass('hidden');
		}
		$('.monthbtn').addClass('hidden');
		console.log(!$('.todaybtn').hasClass('.hidden') && !$('.monthbtn').hasClass('.hidden') && !$('.nextmonthbtn').hasClass('.hidden'));
		checkbtn();
	});
	// 点击图卡
	$('.swiper-slide').on('click', function() { // eslint-disable-line
		// console.log($(this).attr('data-canclick'));
		if (parseInt($(this).attr('data-canclick')) === 1) {
			$('.tkmask_detail_box_text').html($(this).attr('data-desc'));
			$('.tkmask_detail_box_top').css('background-image', 'url("' + $(this).attr('data-img') + '")');
			$('.tkmask').removeClass('hidden');
		}
	});
	$('.tkmask_close').on('click', () => { // 关闭图卡
		$('.tkmask').addClass('hidden');
	});
	$('.tkmask, .indexani, .numani, .smlsmask').on('touchmove', (e) => { // 关闭图卡
		e.preventDefault();
	});
	// $('.tkmask_con').on('touchmove', function (e) { // eslint-disable-line
	// 	if ($(this).parent().attr('class') !== 'tkmask') {
	// 		e.defaultPrevented();
	// 	}
	// });
	// 关闭首页动画
	// $('.indexani_close').on('touchend touchmove', () => {
	// 	// e.stopPropagation();
	// 	// if (e.type === 'touchmove') {
	// 	// 	e.preventDefault();
	// 	// }
	// 	// else {
	// 	// 	$('.indexani').addClass('_hidden');
	// 	// }
	// 	$('.indexani').addClass('hidden');
	// });
	// 关闭数字动画
	$('.numani_btn').on('click', () => {
		$('.numani').addClass('hidden');
	});
	$('.todaybtn').on('click', () => { // 选择日期
		$('.tip').addClass('slide');
		new wnlui.datePicker({ // eslint-disable-line
			showLunar: true,
			// defaultValue: [1990, 1, 1],
			onChange: (result) => {
				console.log(result);
			},
			onConfirm: (result) => {
				// console.log(result);
				let dateStr;
				let _date;
				if (result.isSolar) { // 公历日期
					let dateobj = result.dateObj;
					dateStr = `${dateobj.cYear}.${utils.formatNumber(dateobj.cMonth)}.${utils.formatNumber(dateobj.cDay)}`;
					// console.log(dateStr);
					_date = dateStr.split('.').join('-');
					$('.luckbirth').html(`${dateStr.split('.')[0]}年${dateStr.split('.')[1]}月${dateStr.split('.')[2]}日`);
				}
				else { // 农历日期
					let dateobj = result.dateObj;
					// let dateStr = `${dateobj.cYear}-${dateobj.cMonth}-${dateobj.cDay}`;
					dateStr = `${dateobj.cYear}.${utils.formatNumber(dateobj.cMonth)}.${utils.formatNumber(dateobj.cDay)}`;
					// console.log(dateStr);
					_date = dateStr.split('.').join('-');
					$('.luckbirth').html(`${dateStr.split('.')[0]}年${dateStr.split('.')[1]}月${dateStr.split('.')[2]}日`);
				}
				localStorage.setItem('birth', _date);
				$('.numani').removeClass('hidden');
				$('.numani_num').addClass('numactive');
				// 添加订单参数
				let buydata = {
					Name: $('.nickname').text() || nickname,
					// Name: nickname,
					CalendarType: 1, // 1:公历  0：农历
					// DeviceID: utils.getQueryValue('deviceId') || 'test',
					DeviceID: deviceid || 'test',
					userID: '',
					ParterID: 'wnl',
					ClientType: clientype,
					Channel: CHANNEL,
					APPVersion: APPVERSION,
					GoodsID: GOODSID,
					Birthday: _date || $('.luckbirth').text().slice(0, 4) + '-' + $('.luckbirth').text().slice(5, 7) + '-' + $('.luckbirth').text().slice(8, 10),
					GLBirthDay: _date || $('.luckbirth').text().slice(0, 4) + '-' + $('.luckbirth').text().slice(5, 7) + '-' + $('.luckbirth').text().slice(8, 10),
					img: 1
				};
				if (getSelectTime(dateStr.split('.')[0], dateStr.split('.')[1], dateStr.split('.')[2]) > new Date().getTime()) {
					$.toast().reset('all');
					$.toast('请选择正确的出生日期');
				}
				else {
					$.ajax({
						url: ajaxUrl.pro.add,
						type: 'post',
						ContentType: 'application/json',
						data: buydata,
						success: (res) => {
							// console.log(JSON.parse(res), '选择日期');
							let obj = {
								name: nickname,
								birth: $('.luckbirth').text().slice(0, 4) + '-' + $('.luckbirth').text().slice(5, 7) + '-' + $('.luckbirth').text().slice(8, 10),
								orderid: JSON.parse(res).data.data.orderID
							};
							// console.log(obj);
							getdetail(obj);
						},
						error: () => {
							$.toast().reset('all');
							$.toast('页面加载中...');
						}
					});
				}
			},
			onCancel: () => {
				$('.tip').removeClass('slide');
			}
		});
	});
	$('.pay').on('click', function() { // eslint-disable-line
		let n = $(this).attr('data-monthnum');
		$.toast().reset('all');
		$.toast('加载中...');
		// console.log(n);
		let orderParams = {
			Name: nickname,
			CalendarType: 1, // 1:公历  0：农历
			DeviceID: deviceid || 'test',
			UserID: '',
			ParterID: 'wnl',
			ClientType: clientype,
			Channel: CHANNEL,
			APPVersion: APPVERSION,
			GoodsID: GOODSID,
			Birthday: $('.luckbirth').text().slice(0, 4) + '-' + $('.luckbirth').text().slice(5, 7) + '-' + $('.luckbirth').text().slice(8, 10),
			GLBirthDay: $('.luckbirth').text().slice(0, 4) + '-' + $('.luckbirth').text().slice(5, 7) + '-' + $('.luckbirth').text().slice(8, 10),
			// img: 1,
			LsDetail: [
				{
					Date: n
				}
			],
			orderID: orderid
		};
		// console.log(JSON.stringify(orderParams), 'orderparams');
		let _goodsid = '';
		let _money = '';
		let _orderid = '';
		$.ajax({
			url: ajaxUrl.pro.buy,
			type: 'post',
			dataType: 'json',
			contentType: 'application/json',
			// data: JSON.stringify(orderParams),
			data: JSON.stringify(orderParams),
			success: (res) => {
				console.log(res);
				let rel = JSON.parse(JSON.stringify(res)).data.data;
				_goodsid = rel.goodsID;
				_money = rel.price;
				_orderid = rel.detailOrderID;
				// 支付参数
				let payParams = { // eslint-disable-line
					money: _money || '0.01',
					source: '生命灵数', // 用于支付的项目(如：‘星盘月运’)
					parterid: `wnl_mall_wnl`,
					goodsid: _goodsid,
					parteruserid: localStorage.getItem('unionid') || 'test',
					data: _orderid || 'B3E18321E590B717', // 订单编号
					posId: utils.getQueryValue('posId') || '',
					couponId: utils.getQueryValue('couponId') || '',
					// imei: imei === null || imei === undefined ? '' : utils.getQueryValue('imei'),
					channel: utils.getQueryValue('channel') || '',
					returnUrl: `${window.location.protocol}//${window.location.host + window.location.pathname}?name=${orderParams.Name}&birth=${orderParams.GLBirthDay}&orderid=${orderid}`,
					failUrl: `${window.location.protocol}//${window.location.host + window.location.pathname}`
				};
				// console.log(payParams);
				$.toast().reset('all');
				window.location.href = `http://order.51wnl.com/pay_web/index_t.html${utils.jsonToQueryString(payParams)}`;
			},
			error: () => {
				$.toast().reset('all');
				$.toast('数据出错');
			}
		});
	});
	// 进入在线测算
	$('.zxcs').on('click', () => {
		window.location.href = 'http://astro.51wnl.com/index.html#/astro/product/10030?posId=NLMM';
	});
	// 查看历史月运
	$('.historybtn').on('click', () => {
		window.location.href = './history.html?orderid=' + orderid;
	});
});

