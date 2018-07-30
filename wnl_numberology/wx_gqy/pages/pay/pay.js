// pages/pay/pay.js
var api = require('../../api/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		orderId: ''
	},
	//支付
	pay() {
		var openId = wx.getStorageSync('openId');
		var orderId = this.data.orderId;
		// uti.getSign();
		api.payOrder({
			orderId: orderId,
			openId: openId
		}, res => {
			var params = JSON.parse(res.data.data.data);
			console.log(params);
			//调起微信支付
			wx.requestPayment({
				'timeStamp': params.timeStamp,
				'nonceStr': params.nonceStr,
				'package': params.package,
				'signType': 'MD5',
				'paySign': params.paySign,
				'success': function (res) {
					// console.log(res);
					wx.redirectTo({
						url: '../result/result?orderId=' + orderId,
					})
				},
				'fail': function (res) {
				}
			})
		})
	},
	navigateBack() {
		wx.navigateBack({
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(options)
		this.setData({
			orderId: options.orderId
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
	onShareAppMessage: function () {

	}
})
