/* eslint-disable */
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
	Object.keys(obj).forEach(key => {
		copy[key] = deepCopy(obj[key], cache);
	});
	return copy;
}

function forEachValue(obj, fn) {
	Object.keys(obj).forEach(key => fn(obj[key], key));
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

function assert(condition, msg) {
	if (!condition) throw new Error(`[vuex] ${msg}`);
}
var ua = window.navigator.userAgent;
var isWeixin = /MicroMessenger/i.test(ua);
var isWnl = /wnl/i.test(ua);
var appVersion = parseInt(ua.split(' ').pop().replace(/\./g, ''));
var iOSVersion = GetIOSVersion();
var androidVersion = getAndroidVersion();
var isAndroid = (/Android|HTC/i.test(ua) || (window.navigator['platform'] + '').match(/Linux/i));
var isIPad = !isAndroid && /iPad/i.test(ua);
var isIPhone = !isAndroid && /iPod|iPhone/i.test(ua);
var isIOS = isIPad || isIPhone;

function GetIOSVersion() {
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

function getAndroidVersion() {
	ua = ua.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? parseFloat(match[1]) : false;
}
var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//base64编码
var base64encode = function(str) {
	// return utf16to8(base64encodeAction(str));
	return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
		return String.fromCharCode('0x' + p1);
	}));
};
var base64encodeAction = function(str) {
	var out, i, len;
	var c1, c2, c3;

	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += '==';
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += '=';
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
};
//base64解码
var base64decode = function(str) {
	// return utf8to16(base64decodeAction(str));
	return decodeURIComponent(window.atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
};
var base64decodeAction = function(str) {
	var c1, c2, c3, c4;
	var i, len, out;

	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;

		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;

		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;

		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
};
//utf-8转utf16
var utf16to8 = function(str) {
	var out, i, len, c;

	out = '';
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		}
		else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
		else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
};
//utf-16转utf-8
var utf8to16 = function(str) {
	var out, i, len, c;
	var char2, char3;

	out = '';
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				// 110x xxxx   10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
				break;
		}
	}
	return out;
};

function jsonToQueryString(json) {
	return '?' +
		Object.keys(json).map(function(key) {
			return encodeURIComponent(key) + '=' +
				encodeURIComponent(json[key]);
		}).join('&');
}

function checkPhone(text) {
	return /^\d{11}$/.test(text);
}

function canEditUserDetail() {
	if (isWnl) {
		if ((isIOS && appVersion >= 455) || (isAndroid && appVersion >= 460)) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return true;
	}
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

function formatDate(date, fmt) {
	var o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		'S': date.getMilliseconds(), //毫秒
		'chn': ''
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
}

function str2Int(str) {
	str = str.replace(/^0+/g, '');
	if (str.length == 0) {
		return 0;
	}
	return parseInt(str);
}

function hasClass(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
	if (!util.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}

function removeAllClass(obj) {
	obj.className = '';
}

function toggleClass(obj, cls) {
	if (hasClass(obj, cls)) {
		removeClass(obj, cls);
	}
	else {
		addClass(obj, cls);
	}
}

function getQueryValue(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

function uuid(len, radix) {
	var chars = CHARS,
		uuid = [],
		i;
	radix = radix || chars.length;
	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	}
	else {
		// rfc4122, version 4 form
		var r;
		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
}

function transitionEndEventName() {
	var i,
		undefined,
		el = document.createElement('div'),
		transitions = {
			'transition': 'transitionend',
			'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		};

	for (i in transitions) {
		if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
			return transitions[i];
		}
	}
}
var util = {
	isWnl,
	isWeixin,
	isIOS,
	isAndroid,
	appVersion,
	iOSVersion,
	androidVersion,
	base64decode,
	base64encode,
	find,
	deepCopy,
	forEachValue,
	isObject,
	isEmptyObject,
	isPromise,
	assert,
	jsonToQueryString,
	checkPhone,
	canEditUserDetail,
	formatNumber,
	formatDate,
	str2Int,
	hasClass,
	addClass,
	removeClass,
	removeAllClass,
	toggleClass,
	getQueryValue,
	uuid,
	transitionEndEventName
};
export default util;
