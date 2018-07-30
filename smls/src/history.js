import 'babel-polyfill';
import './css/common.css';
import '../static/libs/css/wnlui.css';
import '../static/libs/css/jquery.toast.css';
import '../static/libs/js/jquery.toast';
import './sass/history.scss';
import utils from './util/util';

let shareData = {
	title: '生命灵数',
	text: '超准的运势，快来看看你的吧',
	image: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	imgUrl: 'https://qiniu.image.cq-wnl.com/content/20180509b4ac5bda312e4b85b6ededa7cd272368.jpg',
	url: `${window.location.protocol}//${window.location.host + window.location.pathname.replace('history', 'index')}`
};
const ajaxUrl = {
	dev: {
		getHistory: '//192.168.1.178:3000/mock/14/LifeNum/GetHistoryList'
	},
	pro: {
		getHistory: '//coco70.51wnl.com/numberologynew/LifeNum/GetHistoryList'
	}
};
$(() => {
	window.wnlui.wnlShare.setShareData(shareData);
	window.wnlui.wxShare(shareData);
	function adddom(month, monthdesc, kyzn, obj) {
		let dom = $('.listitem').eq(0).clone(true);
		dom.removeClass('hidden');
		dom.find('.monthtitle').text(month);
		dom.find('.monthdesc').html(monthdesc);
		dom.find('.kyzndesc').html(kyzn);
		// console.log(obj);
		if (obj.loveScore > 0) {
			for (let i = 1; i <= obj.loveScore; i += 1) {
				// $('.monthluck_zy_aq_icon' + i).addClass('actaq');
				dom.find('.monthluck_zy_aq_icon' + i).addClass('actaq');
				// console.log(obj.loveScore);
			}
		}
		if (obj.workScore > 0) {
			for (let i = 1; i <= obj.workScore; i += 1) {
				// $('.monthluck_zy_sy_icon' + i).addClass('actsy');
				dom.find('.monthluck_zy_sy_icon' + i).addClass('actsy');
			}
		}
		if (obj.moneyScore > 0) {
			for (let i = 1; i <= obj.moneyScore; i += 1) {
				// $('.monthluck_zy_cf_icon' + i).addClass('actcf');
				dom.find('.monthluck_zy_cf_icon' + i).addClass('actcf');
			}
		}
		dom.appendTo('.history_list');
	}
	// adddom();
	// let historyparam = {
	// 	OrderID: utils.getQueryValue('orderid')
	// };
	$.ajax({
		url: ajaxUrl.pro.getHistory,
		type: 'post',
		// contentType: 'json',
		data: {
			OrderID: utils.getQueryValue('orderid') || 'test'
		},
		// data: JSON.stringify(historyparam),
		success: (res) => {
			console.log(JSON.parse(res));
			let obj = JSON.parse(res).data;
			obj.forEach((item) => {
				let m = parseInt(item.date.split('T')[0].split('-')[1]) + '月运势';
				// console.log(m);
				let desc = item.oneDayOneForward;
				let kyzn = item.luckPropose;
				let _obj = {};
				_obj.loveScore = item.loveScore;
				_obj.workScore = item.workScore;
				_obj.moneyScore = item.moneyScore;
				adddom(m, desc, kyzn, _obj);
			});
		}
	});
});