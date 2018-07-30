(function(global) {
	'use strict';
	var userId = '',
		deviceId = '';
	var historyBaseUrl = 'http://coco70.51wnl.com/numberologynew/cs/list.html';
	var ua = window.navigator.userAgent;
	var isWnl = ua.toLowerCase().indexOf('wnl') > -1;
	var localData = localStorage.getItem('wnl_numerology_history_data');
	var browser = {
		isAndroid: function() {
			return ua.match(/Android/i) ? true : false;
		},
		isIOS: function() {
			return ua.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		isWx: function() {
			return ua.match(/micromessenger/i) ? true : false;
		},
		isWp: function() {
			return ua.toLowerCase().indexOf('windows phone') > -1;
		},
		isWnl: function() {
			return ua.toLowerCase().indexOf('wnl') > -1;
		},
		getIOSVersion: function() {
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
	if (localData) {
		localData = JSON.parse(localData);
	}
	else {
		localData = {};
	}
	userId = getQueryValue('userId');
	if (userId === null || userId === '' || userId.toLowerCase() === '[wnluserid]') {
		userId = '';
	}
	userId = userId === '' || userId == null ? userId : userId.replace('?name=', '');
	localData.userId = userId;
	deviceId = getQueryValue('deviceId');
	if (deviceId === null || deviceId === '' || deviceId.toLowerCase() === '[openudid]') {
		deviceId = '';
	}
	localData.deviceId = deviceId;
	var posId = getQueryValue('posId') || getQueryValue('posid');
	localData.posId = posId;
	var pushToken = getQueryValue('pushToken') || getQueryValue('pushtoken');
	localData.pushToken = pushToken;
	var mac = getQueryValue('mac');
	localData.mac = mac;
	var imei = getQueryValue('imei');
	localData.imei = imei;
	var pToken = getQueryValue('pToken') || getQueryValue('ptoken');
	localData.pToken = pToken;
	var idfa = getQueryValue('idfa');
	localData.idfa = idfa;
	var boundid = getQueryValue('boundid');
	localStorage.setItem('wnl_numerology_history_data', JSON.stringify(localData));
	var historyBtn = global.document.createElement('a');
	historyBtn.innerHTML = '我的订单';
	historyBtn.setAttribute('class', 'wnl_history_btn');
	var cssText1 = '.wnl_history_btn{font-size:16px;line-height:16px;position: fixed;box-sizing: border-box;text-align: right;z-index: 1000;right: 15px;width: 112px;bottom: 45px;height: 40px;border-radius: 20px;-webkit-backdrop-filter: blur(5px);backdrop-filter: blur(5px);background-color: rgba(0, 0, 0, 0.6);box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);color: #FFF;text-decoration: none;padding: 12px;padding-right: 15px;}';
	var cssText2 = '.wnl_history_btn::before{content: "";position: absolute;z-index: 1000;left: 15px;top: 12px;width: 12px;height: 15px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAtCAYAAADGD8lQAAAB+UlEQVR4Ae2WNYwdMRCGw9hLYa7SpU0v2Q4zM3bBOoxNeL0bpi7UB/s+nF6hY+a7uRn5nvXegjS790g6W5rFf//5nunNqCwNArUEPPEePNmMZygMfKblO9KMGm6DByvnQyC3gK9Oo+lZE+ok6FWLCmC06LEAiSG786EgWDETfY9ZX8xBuShnFOTeyimYOEg017Id7qrFpDU9I4AZ742/mI7XdYk6yv1851QLhAk/MszPGa1oSgHUOOR/mNGjnwBgNIn388zVPtND8hcbCLUGaJlk6X1xgDMEbaDFfXi5cawxl2fZQKi1o+CJq4zefU/CupDJG5M8vsG9Q+NR84oB84q0iT6Yg3KFvqsbFfurGA308qWoPU76UByndzyPaG/zgYrfHJADqjwQ3Fs5x64sXhwHb9nc4gNZGLux8YO+QajiA2lx1GrSQx0tPlAg12YG8tWa4gMBjMb3N2xRxglTrF13y94B5RlcTz2HaN4BjC46EK2UzKsMV+gI2Idwt82yU2M00i5fdCALlfa/DGHcsnflhys/XPnhlr0DckAVBdKyL7RUL5cNCHOFOqOPgL6GHv4BX14g+pKGyfE3tKN/QSDxyD6odGj5MFcJtlYBTIst5sCXG/FhW+VgsEO02hCa8asW4YtnSPoTzwNlgBgAyuXJp3BPLcxxDAIW7eqU/T4wfwAAAABJRU5ErkJggg==) no-repeat;background-size: cover;}';
	addCSSText(cssText1 + cssText2);
	if (!isWnl) {
		historyBtn.style.bottom = '65px';
		var wnl_loc = JSON.parse(localStorage.getItem('wnl_tlp_local'));
		if (wnl_loc && wnl_loc.wnlUserId) {
			historyBtn.style.display = 'block';
			userId = wnl_loc.wnlUserId;
			deviceId = '';
		}
		else {
			historyBtn.style.display = 'none';
		}
	}
	else {
		setTimeout(function() {
			location.href = 'protocol://getuserinfo#userinfocallback_history';
		}, 0);
	}

	// 判断非微信下 && userId 且 deviceId 为空 || 不是wnl客户端打开时 调用guid生成接口
	console.log('check');
	if (!browser.isWx() && (!browser.isWnl() || (userId === '' && deviceId === ''))) {
		console.log('check2');
		if (localStorage.getItem('wnl_tlp_guid')) {
			console.log('has the local~');
			userId = localStorage.getItem('wnl_tlp_guid');
			deviceId = localStorage.getItem('wnl_tlp_guid');
			historyBtn.style.display = 'block';
		}
		else {
			console.log('not has the local~');
			var xhr = new XMLHttpRequest();  
			xhr.open('GET', '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid');  
			xhr.onreadystatechange = function (response) {
				userId = response.toString();
				deviceId = response.toString();
				localStorage.setItem('wnl_tlp_guid', userId);
				history_url = historyBaseUrl + (historyBaseUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId +
					'&deviceId=' + deviceId + '&pushToken=' + pushToken +
					'&pToken=' + pToken + '&mac=' + mac +
					'&imei=' +
					imei + '&boundid=' + boundid + '&idfa=' + idfa;
				historyBtn.style.display = 'block';
				console.log('get the local~');
			}  
			xhr.send();  
			// $.ajax({
			// 	url: '//coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
			// 	type: 'get',
			// 	data: 'json',
			// 	async: 'false',
			// 	success: function(response) {
			// 		userId = response.toString();
			// 		deviceId = response.toString();
			// 		localStorage.setItem('wnl_tlp_guid', userId);
			// 		history_url = historyBaseUrl + (historyBaseUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId +
			// 			'&deviceId=' + deviceId + '&pushToken=' + pushToken +
			// 			'&pToken=' + pToken + '&mac=' + mac +
			// 			'&imei=' +
			// 			imei + '&boundid=' + boundid + '&idfa=' + idfa;
			// 		historyBtn.style.display = 'block';
			// 		console.log('get the local~');
			// 	}
			// });
		}
	}

	var history_url = historyBaseUrl + (historyBaseUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId +
		'&deviceId=' + deviceId + '&pushToken=' + pushToken +
		'&pToken=' + pToken + '&mac=' + mac +
		'&imei=' +
		imei + '&boundid=' + boundid + '&idfa=' + idfa;
	historyBtn.setAttribute('href', history_url);
	global.document.body.appendChild(historyBtn);

	function addCSSText(cssText) {
		var style = document.createElement('style'), //创建一个style元素
			head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
		style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
		if (style.styleSheet) { //IE
			var func = function() {
				try { //防止IE中stylesheet数量超过限制而发生错误
					style.styleSheet.cssText = cssText;
				}
				catch (e) {
					console.log(e);
				}
			};
			//如果当前styleSheet还不能用，则放到异步中则行
			if (style.styleSheet.disabled) {
				setTimeout(func, 10);
			}
			else {
				func();
			}
		}
		else { //w3c
			//w3c浏览器中只要创建文本节点插入到style元素中就行了
			var textNode = document.createTextNode(cssText);
			style.appendChild(textNode);
		}
		head.appendChild(style); //把创建的style元素插入到head中
	}

	function getQueryValue(key) {
		var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
		return null;
	}

	global.userinfocallback_history = function(result) {
		var originalString = base64decode(result);
		var originalAllObj = JSON.parse(originalString);
		if (originalAllObj && originalAllObj.native_score) {
			var native_score = originalAllObj.native_score;
			if (native_score.userId && native_score.userId.length !== 0) {
				userId = native_score.userId;
			}
			if (native_score.deviceId && native_score.deviceId.length !== 0) {
				deviceId = native_score.deviceId;
			}
		}
		var localData = localStorage.getItem('wnl_numerology_history_data');
		if (localData) {
			localData = JSON.parse(localData);
		}
		else {
			localData = {};
		}
		if (userId === '' && deviceId === '') {
			return;
		}
		localData.userId = userId;
		localData.deviceId = deviceId;
		localStorage.setItem('wnl_numerology_history_data', JSON.stringify(localData));
		history_url = historyBaseUrl + (historyBaseUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId +
			'&deviceId=' + deviceId + '&pushToken=' + pushToken +
			'&pToken=' + pToken + '&mac=' + mac +
			'&imei=' +
			imei + '&boundid=' + boundid + '&idfa=' + idfa;
		historyBtn.setAttribute('href', history_url);
	};
	var base64decode = function(str) {
		return utf8to16(base64decodeAction(str));
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
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
})(window);
