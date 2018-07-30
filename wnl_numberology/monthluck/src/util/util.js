const ua = window.navigator.userAgent.toLowerCase();
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
	return list.filter(f)[0];
}
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache = []) {
	// just return if obj is immutable value
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	// if obj is hit, it is in circular structure
	const hit = find(cache, c => c.original === obj);
	if (hit) {
		return hit.copy;
	}
	const copy = Array.isArray(obj) ? [] : {};
	// put the copy into cache at first
	// because we want to refer it in recursive deepCopy
	cache.push({
		original: obj,
		copy
	});
	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key], cache);
	});
	return copy;
}

function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function isPromise(val) {
	return val && typeof val.then === 'function';
}

function GetIOSVersion() {
	if (window.MSStream) {
		return false;
	}
	let match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
	if (match !== undefined && match !== null) {
		let version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
		return parseFloat(version.join('.'));
	}
	return false;
}

function getAndroidVersion() {
	//eslint-disable-next-line
	let match = ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : false;
}

function jsonToQueryString(json) {
	return ('?' + Object.keys(json).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&'));
}

function queryStringToJson(urlStr) {
	if (urlStr.indexOf('http') !== 0) return false;
	let searchStrStart = urlStr.indexOf('?') + 1;
	let searchStr = urlStr.substring(searchStrStart, urlStr.length); // 获取url中"?"符后的字串参数
	let requestObj = {};
	if (searchStrStart !== 0) {
		let partsArr = searchStr.split('&');
		// for (let i = 0; i < partsArr.length; i += 1) {
		// 	let minArr = partsArr[i].split('=');
		// 	requestObj[minArr[0]] = minArr[1]; // eslint-disable-line
		// }
		let minArr;
		partsArr.forEach((item) => {
			minArr = item.split('=');
			requestObj[minArr[0]] = minArr[1]; // eslint-disable-line
		});
	}
	if (Object.getOwnPropertyNames(requestObj).length === 0) return false; // 判断是否有参数
	return requestObj;
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

function formatDate(date, fmt) {
	let dateFormateObj = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	dateFormateObj.keys((key) => {
		if (new RegExp('(' + key + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? dateFormateObj[key] :
				('00' + dateFormateObj[key]).substr(('' + dateFormateObj[key]).length));
		}
	});
	return fmt;
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length === 0) {
		return 0;
	}
	return parseInt(str);
}

function outHeight(elm) {
	let elmHeight = 0;
	let elmMargin = 0;
	if (document.all) {
		// IE
		elmHeight = elm.currentStyle.height;
		elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10) + 'px';
	}
	else {
		// Mozilla
		elmHeight = document.defaultView
			.getComputedStyle(elm, '')
			.getPropertyValue('height')
			.replace('px', '');
		elmMargin =
			parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) +
			parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
	}
	return Math.ceil(elmHeight + elmMargin);
}

function getQueryValue(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	return null;
}
/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
function throttle(fn, delay, atleast) {
	let timer = null;
	let previous = null;
	return function(args) {
		let now = +new Date();
		if (!previous) previous = now;
		if (atleast && now - previous > atleast) {
			fn(args);
			// 重置上一次开始时间为本次结束时间
			previous = now;
			clearTimeout(timer);
		}
		else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn(args);
				previous = null;
			}, delay);
		}
	};
}

function getDayDistance(startDate, endDate) {
	let starttimes = startDate.getTime();
	let endtimes = endDate.getTime();
	let intervalTime = starttimes - endtimes; //两个日期相差的毫秒数 一天86400000毫秒
	let InterDays = Math.floor(((intervalTime).toFixed(2) / 86400000)); //加1，是让同一天的两个日期返回一天
	return InterDays;
}

function getDayDistanceString(distance) {
	let dayDistance = '';
	if (distance === 0) {
		dayDistance = '今天';
	}
	else if (distance === -1) {
		dayDistance = '明天';
	}
	else if (distance === 1) {
		dayDistance = '昨天';
	}
	else if (distance < -1) {
		dayDistance = Math.abs(distance) + '天后';
	}
	else if (distance > 1) {
		dayDistance = distance + '天前';
	}
	return dayDistance;
}

function setHairlines() {
	if (window.devicePixelRatio && devicePixelRatio >= 2) {
		let testElem = document.createElement('div');
		testElem.style.border = '.5px solid transparent';
		document.body.appendChild(testElem);
		if (testElem.offsetHeight === 1) {
			document.querySelector('html').classList.add('hairlines');
		}
		document.body.removeChild(testElem);
	}
}

let isWeixin = /micromessenger/i.test(ua);
let isWnl = /wnl/i.test(ua);
let appVersion = parseInt(ua.substr(ua.indexOf('wnl ') + 4, 5).replace(/\./g, ''));
let appVersionString = ua.substr(ua.indexOf('wnl ') + 4, 5);
let iOSVersion = GetIOSVersion();
let androidVersion = getAndroidVersion();
let isAndroid = /android|htc/i.test(ua) || (window.navigator.platform + '').match(/linux/i);
let isIPad = !isAndroid && /iPad/i.test(ua);
let isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
let isIOS = isIPad || isIPhone;
let isIphoneX = isIPhone && window.innerWidth === 375 && window.devicePixelRatio === 3;

const util = {
	isWnl,
	isWeixin,
	isIOS,
	isAndroid,
	appVersion,
	appVersionString,
	iOSVersion,
	androidVersion,
	isIphoneX,
	find,
	deepCopy,
	isObject,
	isEmptyObject,
	isPromise,
	jsonToQueryString,
	queryStringToJson,
	formatNumber,
	formatDate,
	str2Int,
	outHeight,
	getQueryValue,
	throttle,
	getDayDistance,
	getDayDistanceString,
	setHairlines
};
export default util;
