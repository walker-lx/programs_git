'use strict';
var Promise = require('Promise');
var util = {
	formatNumber: function (n) {
		n = n.toString();
		return n[1] ? n : '0' + n;
	},
	formatDate: function (date, fmt) {
		var o = {
			'M+': date.getMonth() + 1, //月份
			'd+': date.getDate(), //日
			'h+': date.getHours(), //小时
			'm+': date.getMinutes(), //分
			's+': date.getSeconds(), //秒
			'q+': Math.floor((date.getMonth() + 3) / 3), //季度
			'S': date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		return fmt;
	},
	sleep: function (time) {
		return new Promise(resolve => setTimeout(resolve, time));
	},
	//根据起点和终点返回方向
	getSlideDirection: function (startX, startY, endX, endY, timeStamp, threshold) {
		let swipedir = '';
		threshold = threshold ? threshold : 125;//required min distance traveled to be considered swipe
		let restraint = 125; // maximum distance allowed at the same time in perpendicular direction
		// let allowedTime = 300;
		let distX = endX - startX; // get horizontal dist traveled by finger while in contact with surface
		let distY = endY - startY; // get vertical dist traveled by finger while in contact with surface
		// if (timeStamp <= allowedTime) { // first condition for awipe met
		// 	if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
		// 		swipedir = (distX < 0) ? 'left' : 'right';// if dist traveled is negative, it indicates left swipe
		// 	}
		// 	else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
		// 		swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
		// 	}
		// }
		if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
			swipedir = (distX < 0) ? 'left' : 'right';// if dist traveled is negative, it indicates left swipe
		}
		else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
			swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
		}
		return swipedir;
	},
	base64EncodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	base64DecodeChars: new Array(
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
		-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
		-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
	//base64编码
	base64encode: function (str) {
		return util.utf16to8(util.base64encodeAction(str));
	},
	base64encodeAction: function (str) {
		var out, i, len;
		var c1, c2, c3;

		len = str.length;
		i = 0;
		out = '';
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i == len) {
				out += util.base64EncodeChars.charAt(c1 >> 2);
				out += util.base64EncodeChars.charAt((c1 & 0x3) << 4);
				out += '==';
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i == len) {
				out += util.base64EncodeChars.charAt(c1 >> 2);
				out += util.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out += util.base64EncodeChars.charAt((c2 & 0xF) << 2);
				out += '=';
				break;
			}
			c3 = str.charCodeAt(i++);
			out += util.base64EncodeChars.charAt(c1 >> 2);
			out += util.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += util.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			out += util.base64EncodeChars.charAt(c3 & 0x3F);
		}
		return out;
	},
	//base64解码
	base64decode: function (str) {
		return util.utf8to16(util.base64decodeAction(str));
	},
	base64decodeAction: function (str) {
		var c1, c2, c3, c4;
		var i, len, out;

		len = str.length;
		i = 0;
		out = '';
		while (i < len) {
			/* c1 */
			do {
				c1 = util.base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c1 == -1);
			if (c1 == -1)
				break;

			/* c2 */
			do {
				c2 = util.base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c2 == -1);
			if (c2 == -1)
				break;

			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

			/* c3 */
			do {
				c3 = str.charCodeAt(i++) & 0xff;
				if (c3 == 61)
					return out;
				c3 = util.base64DecodeChars[c3];
			} while (i < len && c3 == -1);
			if (c3 == -1)
				break;

			out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

			/* c4 */
			do {
				c4 = str.charCodeAt(i++) & 0xff;
				if (c4 == 61)
					return out;
				c4 = util.base64DecodeChars[c4];
			} while (i < len && c4 == -1);
			if (c4 == -1)
				break;
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		}
		return out;
	},
	//utf-8转utf16
	utf16to8: function (str) {
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
	},
	//utf-16转utf-8
	utf8to16: function (str) {
		var out, i, len, c;
		var char2, char3;

		out = '';
		len = str.length;
		i = 0;
		while (i < len) {
			c = str.charCodeAt(i++);
			switch (c >> 4) {
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					// 0xxxxxxx
					out += str.charAt(i - 1);
					break;
				case 12: case 13:
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
	}
};
module.exports = util;
