let Promise = require('Promise');
let api = module.exports = {};
api.default = api;
api.debug = true;
Object.defineProperty(api, 'app', {
	get: function () {
		return getApp();
	}
});
let noPromiseMethods = {
	stopRecord: true,
	pauseVoice: true,
	stopVoice: true,
	pauseBackgroundAudio: true,
	stopBackgroundAudio: true,
	createAudioContext: true,
	createVideoContext: true,
	showNavigationBarLoading: true,
	hideNavigationBarLoading: true,
	createAnimation: true,
	createContext: true,
	drawCanvas: true,
	canvasToTempFilePath: true,
	hideKeyboard: true,
	stopPullDownRefresh: true
};

function forEach(key) {
	if (noPromiseMethods[key] || key.substr(0, 2) === 'on' || /\w+Sync$/.test(key)) {
		api[key] = function () {
			if (api.debug) {
				let res = wx[key].apply(wx, arguments);
				if (!res && res !== '') {
					res = {};
				}
				if (res && typeof res === 'object') {
					res.then = function () {
						console.warn('wx.' + key + ' is not a async function, you should not use Promise');
					};
				}
				return res;
			}
			return wx[key].apply(wx, arguments);
		};
		return;
	}
	api[key] = function (obj) {
		obj = obj || {};
		return new Promise(function (resolve, reject) {
			obj.success = resolve;
			obj.fail = function (res) {
				if (res && res.errMsg) {
					reject(new Error(res.errMsg));
				}
				else {
					reject(res);
				}
			};
			wx[key](obj);
		});
	};
}
Object.keys(wx).forEach(forEach);
function request(method = 'GET') {
	return function (url, data = {}) {
		return api.request({
			url,
			data,
			method,
			header: {
				'Content-Type': 'application/json'
			}
		});
	};
}
api.GET = request('GET');
api.POST = request('POST');
api.PUT = request('PUT');
api.DELETE = request('DELETE');