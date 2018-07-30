// pages/order/order.js
var app = getApp();
var api = require('../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
	data: {
		active: 0,
		orderStatus: ['全部订单', '已支付', '待支付'],
		userInfo: {},
		allOrders: [],
		orderList: []
	},
	selectOrderStatus(e) {
		var index = e.currentTarget.dataset.index;
		this.setData({
			active: index
		})
		this.setOrderList(index);
	},
	setOrderList(index) {
		if (index === 0) {
			this.setData({
				orderList: this.data.allOrders
			})
		}
		if (index === 1) {
			var orderList = this.data.allOrders.filter(v => v.payStatus === 1);
			this.setData({
				orderList: orderList
			})
		}
		if (index === 2) {
			var orderList = this.data.allOrders.filter(v => v.payStatus === 0);
			this.setData({
				orderList: orderList
			})
		}
	},
	toResult(e) {
		console.log(e)
		var orderId = e.currentTarget.dataset.orderid;
		wx.navigateTo({
			url: '../result/result?orderId=' + orderId,
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {

		// console.log(this.data.userInfo)
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
		this.setData({
			userInfo: app.globalData.userInfo
		})
		var openId = wx.getStorageSync('openId');
		api.getSyncOrderList({
			deviceId: openId
		}, res => {
			wx.hideLoading();
			res.data.data.forEach(v => {
				v.fmtPayStatus = v.payStatus === 1 ? '已支付' : '未支付';
			})
			console.log(res)
			this.setData({
				allOrders: res.data.data,
				orderList: res.data.data
			})
		});
		wx.showLoading({
			title: '加载中',
		})
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
	onShareAppMessage: function (res) {
		
	}
})