// pages/select/select.js
var api = require('../../api/api.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
	data: {
		cardList: [],
		checked: false
	},
	initCardList() {
		let cardList = [];
		let baseArray = [3, 4, 4, 3];
		let array = [];

		baseArray.forEach((v, k) => cardList[k] = new Array(v));
		while (array.length < 14) {
			let number = (Math.random() * 13).toFixed();
			if (array.indexOf(number) < 0) {
				array.push(number);
			}
		}
		let length = array.length - 1;
		baseArray.forEach((v, k) => {
			for (let i = 0; i < baseArray[k]; i++) {
				cardList[k][i] = new Object();
				cardList[k][i].num = array[length];
				cardList[k][i].select = false;
				cardList[k][i].imgsrc = 'http://coco70.51wnl.com/numberologynew/gqy/cards/c' + array[length] + '.png';
				length--;
			}
		});
		console.log(cardList)
		this.setData({
			cardList: cardList
		})
	},
	selectCard(e) {
		if (this.data.checked) return;
		console.log(e);
		var colIndex = e.currentTarget.dataset.colindex;
		var rowindex = e.currentTarget.dataset.rowindex;
		var list = this.data.cardList;
		console.log(list[colIndex][rowindex])
		list[colIndex][rowindex].select = true;
		this.setData({
			cardList: list,
			checked: true
		})
		var cardNumber = list[colIndex][rowindex].num > 9
			? list[colIndex][rowindex].num
			: '0' + list[colIndex][rowindex].num;
		var cardFront = (Math.random() * 1).toFixed();
		var cardStatus = wx.getStorageSync('statusIndex') + 1;
		var cardCode = String(cardNumber) + String(cardFront) + String(cardStatus);
		console.log(cardCode);
		setTimeout(() => {
			var name = app.globalData.userInfo.nickName;
			var openId = wx.getStorageSync('openId');
			api.createOrder(name, cardCode, openId, res => {
				// console.log(res);
				wx.redirectTo({
					url: '../result/result?orderId=' + res.data.data.orderID,
				})
				wx.hideLoading();
			})
			wx.showLoading({
				title: '加载中',
			})
		}, 2500)
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		this.initCardList();
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