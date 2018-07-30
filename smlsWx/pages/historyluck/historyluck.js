// pages/users.js
const utils = require('../../utils/util.js')
const ajaxUrl = {
	dev: {
		getHistory: 'http://192.168.1.178:3000/mock/14/LifeNum/GetHistoryList'
	},
	pro: {
		getHistory: 'https://coco70.51wnl.com/numberologynew/LifeNum/GetHistoryList'
	}
}
let luckData = []

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		luckdata: luckData
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		console.log(options.orderid)
		wx.request({
			url: ajaxUrl.pro.getHistory,
			method: 'post',
			data: {
				"OrderID": options.orderid
				// "DeviceID": wx.getStorageSync('openid') || "test1"
			},
			ContentType: 'application/json',
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					if (res.data.data) {
						luckData = [...res.data.data]
						luckData.forEach(item => {
							let love = [], work = [], money = [], nolove = [], nomoney = [], nowork = []
							// console.log(item)
							for (let i = 0; i < item.loveScore; i++) {
								love.push({})
							}
							for (let i = 0; i < item.moneyScore; i++) {
								money.push({})
							}
							for (let i = 0; i < item.workScore; i++) {
								work.push({})
							}
							for (let i = 0; i < 5 - item.loveScore; i++) {
								nolove.push({})
							}
							for (let i = 0; i < 5 - item.moneyScore; i++) {
								nomoney.push({})
							}
							for (let i = 0; i < 5 - item.workScore; i++) {
								nowork.push({})
							}
							item.love = love
							item.work = work
							item.money = money
							item.nolove = nolove
							item.nowork = nowork
							item.nomoney = nomoney
							item.month = parseInt(item.date.split('T')[0].split('-')[1])
						})
						that.setData({
							luckdata: luckData
						})
					}
					// console.log(luckData)
				}
				else {
					console.log('获取历史数据失败')
				}
			},
			fail: () => {
				console.log('fail')
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	// 分享
	onShareAppMessage: function (res) {
		let sharetitle = '超准的运势，快来看看你的吧'
		return {
			title: sharetitle,
			path: 'pages/index/index',
			imageUrl: 'https://qiniu.image.cq-wnl.com/content/20180425f3b95c60c0344574b3c91c5e4b4fbe3d.jpg',
			success: function (res) {
				// 转发成功
			},
			fail: function (res) {
				// 转发失败
			}
		}
	}
})