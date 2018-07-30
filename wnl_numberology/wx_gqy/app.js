//app.js
var api = require('api/api.js');
App({
	onLaunch: function () {
		this.login();
		// 获取用户信息
		wx.getSetting({
			success: res => {
				// console.log(res)
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				} else {
					api.getUserInfo(res => {
						this.globalData.userInfo = res
						if (this.userInfoReadyCallback) {
							this.userInfoReadyCallback(res)
						}
					});
				}
			}
		})
	},
	login(cb) {
		// 登录
		var openId = wx.getStorageSync('openId');
		if (openId) {
			typeof cb === 'function' && cb(openId);
		} else {
			wx.login({
				success: res => {
					console.log(res);
					api.getOpenId(res.code, res => {
						console.log(res);
						wx.setStorageSync('openId', res.data.OpenID);
					})
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
				}
			})
		}
	},
	globalData: {
		userInfo: null,
		status: [
			{ text1: '单身狗', text2: '求桃花，何时能脱单？' },
			{ text1: '暧昧中', text2: '遭难题，如何获芳心？' },
			{ text1: '恋爱中', text2: '有疑惑，真的合适吗？' },
			{ text1: '已结婚', text2: '问姻缘，是否是正缘？' },
		]
	}
})