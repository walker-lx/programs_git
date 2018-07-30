import utils from '../util/util';

function handleSlide(el0, el1, pos) {
	if (window.pageYOffset >= pos) {
		el0.addClass('slideup');
		el1.addClass('slide');
		// document.querySelector('.wnl_history_btn').className = 'wnl_history_btn slide';
	}
	else {
		el0.removeClass('slideup');
		el1.removeClass('slide');
		// document.querySelector('.wnl_history_btn').className = 'wnl_history_btn';
	}
}
function handleBarSlide(el, top) {
	if (window.pageYOffset >= top) {
		el.addClass('slideleft');
	}
	else {
		el.removeClass('slideleft');
	}
}
function scrollTo(targetel) { // 滚动到指定元素位置
	$('html, body').animate({
		scrollTop: targetel.offset().top - 20
	}, 400);
}
function getday(AddDayCount) {
	let date0 = new Date();
	date0.setDate(date0.getDate() + AddDayCount); // 获取AddDayCount天后的日期
	// let y = dd.getFullYear();
	let m1 = date0.getMonth() + 1; // 获取当前月份
	let d1 = date0.getDate(); // 获取当前几号
	let m0 = new Date().getMonth() + 1;
	let d0 = new Date().getDate();
	return `${parseInt(m0)}月${parseInt(d0)}日-${m1}月${d1}日`;
}
function getAddDayDate(AddDay, date) {
	let nowDate = date ? new Date(date.toString()) : new Date();
	nowDate.setDate(nowDate.getDate() + (AddDay ? parseInt(AddDay) : 0)); // 获取AddDay天后的日期
	let y1 = nowDate.getFullYear();
	let m1 = nowDate.getMonth() + 1; // 获取月份
	let d1 = nowDate.getDate();
	// let h1 = nowDate.getHours();
	// let min1 = nowDate.getMinutes();
	// let s1 = nowDate.getSeconds();
	// let ms1 = nowDate.getMilliseconds();
	// console.log(nowDate);
	// let m0 = new Date().getMonth() + 1;
	// let d0 = new Date().getDate();
	// return `${parseInt(m0)}月${parseInt(d0)}日-${m1}月${d1}日`;
	// return [y1, m1, d1, h1, min1, s1, ms1];
	return [y1, m1, d1];
	// return (y1 + '-' + m1 + '-' + d1).toString();
}
function translateDate(date) {
	let arr = date.toString().split('-');
	let arr1 = [arr[0].substring(5), arr[1].substring(5)];
	let timeArr = [];
	let timeStr;
	let arrItem0;
	let arrItem1;
	arr1.forEach((item) => {
		arrItem0 = utils.str2Int(item.substring(0, 2));
		arrItem1 = utils.str2Int(item.substring(3, 5));
		item = `${arrItem0}月${arrItem1}日`;
		timeArr.push(item);
	});
	timeStr = timeArr.join('-');
	return timeStr;
}

export function addClickState(dom) {
	let move;
	$(document).on('touchend touchstart touchmove touchcancel', dom, function(e) {
		// if (!$(this).hasClass('active')) {
		// 	return;
		// }
		if (e.type === 'touchstart') {
			move = null;
			$(this).addClass('active');
		}
		else if (e.type === 'touchmove') {
			if (move) return;
			move = true;
			$(this).removeClass('active');
		}
		else {
			if (move) return;
			$(this).removeClass('active');
		}
	});
}
export function addBtnState(dom, el) {
	let move;
	$(document).on('touchend touchstart touchmove touchcancel', dom, function(e) { // eslint-disable-line
		// if (!$(this).hasClass('active')) {
		// 	return;
		// }
		if (e.type === 'touchstart') {
			move = null;
			el.removeClass('hidden');
		}
		else if (e.type === 'touchmove') {
			if (move) return;
			move = true;
			el.addClass('hidden');
		}
		else {
			if (move) return;
			el.addClass('hidden');
		}
	});
}
export {
	handleSlide,
	handleBarSlide,
	scrollTo,
	getday,
	translateDate,
	getAddDayDate
};