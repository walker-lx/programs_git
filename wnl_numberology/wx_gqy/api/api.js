var hex_md5 = require('../utils/md5.js').hex_md5;
var protocol = 'https:';

//获取微信用户信息
function getUserInfo(cb) {
	wx.getUserInfo({
		success: function (res) {
			typeof cb === 'function' && cb(res.userInfo);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}


//获取微信openid
function getOpenId(code, cb) {
	wx.request({
		url: protocol + '//b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo',
		method: 'GET',
		data: {
			name: 'dd',
			code: code
		},
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}

function getProcess(cb) {
	wx.request({
		url: protocol + '//coco70.51wnl.com/numberologynew/MiniProgram/Process',
		method: 'GET',
		data: {
			parterID: 'TarotLove'
		},
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}

//创建订单
function createOrder(name, cardCode, openId, cb) {
	var clientInfo = wx.getSystemInfoSync();
	wx.request({
		url: protocol + '//coco70.51wnl.com/numberologynew/TarotLove/CreateOrder',
		method: 'POST',
		data: {
			Name: name,
			BirthDay: '1999-01-01',
			CardCode: cardCode,
			ClientType: clientInfo.system,
			channel: 'mini Program',
			UserID: '',
			DeviceID: openId,
			orderName: '塔罗感情运',
			goodsId: '99202A2DB12742B58CE38B8C7108D63F',
		},
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}

//发起支付
function payOrder(params, cb) {
	var clientInfo = wx.getSystemInfoSync();
	var timestamp = new Date().getTime();
	var sign = '';
	var data = {
		parterId: 'TarotLove',
		goodsId: '99202A2DB12742B58CE38B8C7108D63F',
		payType: 1,
		parterUserId: params.openId,
		trade_type: 'MINIPROGRAM',
		openId: params.openId,
		wnlChannel: clientInfo.system,
		extraData: params.orderId,
		timestamp: timestamp,
		deviceID: params.openId,
		mhtOrderNo: params.orderId,
		PrivateKey: 'WnlPay_Youloft_20161129_PrivateKey'
	}
	var keys = Object.keys(data).sort(function (a, b) {
		var s = a.toLowerCase();
		var t = b.toLowerCase();
		if (s < t) return -1;
		if (s > t) return 1;
	});
	keys.forEach(function (v, k, arr) {
		k < arr.length - 1 ? sign += v + '=' + data[v] + '&' :
			sign += v + '=' + data[v]
	})
	console.log(sign)
	data.sign = hex_md5(sign);
	delete data.PrivateKey;
	console.log(data);
	wx.request({
		url: protocol + '//order.51wnl.com/api/payorder/getsignstr',
		method: 'GET',
		data: data,
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}

//获取订单
function getOrderDetail(params, cb) {
	wx.request({
		url: protocol + '//coco70.51wnl.com/numberologynew/TarotLove/GetOrderDetail',
		method: 'POST',
		data: {
			OrderID: params.orderId,
			UserID: params.userId || '',
			DeviceID: params.deviceId,
		},
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}

//获取历史订单列表
function getSyncOrderList(params, cb) {
	wx.request({
		url: protocol + '//order.51wnl.com/api/ordersync/GetSyncOrderList',
		method: 'GET',
		data: {
			userid: params.userId || '',
			deviceid: params.deviceId,
			OrderStatus: -1,
			pageindex: params.pageindex || 1,
			pagesize: params.pagesize || 1000,
			parterId: 'TarotLove'
		},
		success(res) {
			typeof cb === 'function' && cb(res);
		},
		fail: function (e) {
			console.log(e)
			typeof cb === 'function' && cb(e);
		}
	})
}
module.exports.getUserInfo = getUserInfo
module.exports.getOpenId = getOpenId
module.exports.createOrder = createOrder
module.exports.getOrderDetail = getOrderDetail
module.exports.payOrder = payOrder
module.exports.getSyncOrderList = getSyncOrderList
module.exports.getProcess = getProcess



