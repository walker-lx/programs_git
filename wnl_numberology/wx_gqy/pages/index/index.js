//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var api = require('../../api/api.js');

Page({
	data: {
		process: false,
		max: true,
		feedback: [
			'开运法则真的有用噢',
			'哈哈，我的桃花运真的来了',
			'帮我终于认清了一个人，感谢',
			'太专业了，整个人都被看穿了233',
			'在占卜结果的指导下，找到了心爱的他',
			'这个占卜还真不错，好多都应验了！',
			'我和我老公都测算了彼此，很准！',
			'感觉比八字之类的要准呢',
			'棘手的问题迎刃而解，不再纠结了',
			'女神，等着我~'
		],
		amount: 0,
		showFeedback: false,
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	navigateToOrder() {
		wx.navigateTo({
			url: '../order/order',
		})
	},
	start() {
		wx.navigateTo({
			url: '../status/status',
		})
	},
	showFeedback() {
		this.setData({
			showFeedback: true
		})
	},
	setAmount() {
		var date = new Date().getTime();
		date = (date / 100000).toFixed(0);
		date = String(date);
		date = date.slice(date.length - 5, date.length);
		// console.log(date)
		this.setData({
			amount: date
		})
	},
	onLoad: function () {
		var that = this;
		api.getProcess(res => {
			console.log(res.data.data)
			wx.setStorageSync('process', res.data.data);
			this.setData({
				process: res.data.data
			})
		})
		this.showFeedback();
		this.setAmount();
		if (app.globalData.userInfo) {
			console.log(app.globalData.userInfo)
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true,
				max: false
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				// console.log(app.globalData.userInfo)
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true,
					max: false
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true,
						max: false
					})
				}
			})
		}
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true,
			max: false
		})
	},
	onShow: function () {
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '塔罗感情运势占卜',
			path: '/pages/index/index',
			success: function (res) {
				console.log(res);
				// 转发成功
			},
			fail: function (res) {
				console.log('fail');
				// 转发失败
			}
		}
	},
})
