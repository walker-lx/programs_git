// pages/result/result.js
var api = require('../../api/api.js');
var util = require('../../utils/util.js');
var app = getApp();
var orderId = '';
Page({

  /**
   * 页面的初始数据
   */
	data: {
		process: false,
		order: {},
		rotate: 0,
		position: '正位',
		resultTitle: [],
		keyWords: [],
		isrp: false,
		imgsrc: '',
		payStatus: false,
		happyLevel: [],
		resultContent: [],
		resultTitleList: [
			['我近期桃花运如何？', '我会邂逅什么样的对象？', '在哪里遇到命定之人？', '专属提升魅力开运秘法！'],
			['我和他/她有可能在一起吗？', '他/她对我们关系的看法？', '我们交往需要注意什么？', '专属提升魅力开运秘法'],
			['他/她是我对的人吗？', '我们存在第三者的困扰吗？', '如何让我们感情增温？', '专属提升魅力开运秘法！'],
			['我们的婚姻质量乐观吗？', '如何面对“七年之痒”？', '我们的婚姻中有信任危机吗？', '专属提升魅力开运秘法！']
		],
	},
	navigateToPay() {
		var that = this;
		wx.navigateTo({
			url: '../pay/pay?orderId=' + that.data.order.orderID,
		})
	},
	setOrderDetail(orderId) {
		var that = this;
		var openId = wx.getStorageSync('openId');
		api.getOrderDetail({
			orderId: orderId,
			deviceId: openId
		}, res => {
			console.log(res.data.data);
			var data = res.data.data;
			var isrp = false;
			var happyLevel = data.data.freeData.happyZS;
			var payStatus = data.payStatus == 1 ? true : false;
			if (happyLevel !== parseInt(happyLevel)) {
				isrp = true;
				happyLevel = parseInt(happyLevel);
			}
			var resultContent = [];
			if (data.payStatus && this.data.process) {
				for (var k in data.data.payData) {
					resultContent.push(data.data.payData[k]);
				}
			} else {
				var questionCode = data.data.questionCode;
				resultContent = util.resultData[questionCode - 1];
			}
			// 是否旋转
			var rotate = data.cardCode.substring(2, 3);
			var position = '正位';
			if (rotate == 1) {
				position = '逆位';
			}
			// 图片展示
			var cardCode = parseInt(data.cardCode.substring(0, 2));
			var imgsrc = 'http://coco70.51wnl.com/numberologynew/gqy/cards/c' + cardCode + '.png';
			// console.log(imgsrc);
			that.setData({
				order: data,
				isrp: isrp,
				payStatus: payStatus,
				imgsrc: imgsrc,
				happyLevel: happyLevel,
				rotate: rotate,
				position: position,
				resultContent: resultContent,
				resultTitle: that.data.resultTitleList[data.data.questionCode - 1],
				keyWords: data.data.freeData.keyWord.split(/[、，]/ig)
			})
			wx.hideLoading();
		})
		wx.showLoading({
			title: '加载中',
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		orderId = options.orderId;
		console.log(options.orderId);
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
		var process = wx.getStorageSync('process');
		// console.log(process)
		this.setData({
			process: process
		})
		this.setOrderDetail(orderId);
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
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '塔罗感情运势占卜',
			path: '/pages/result/result?orderId=' + orderId,
			success: function (res) {
				console.log(res);
				// 转发成功
			},
			fail: function (res) {
				console.log('fail');
				// 转发失败
			}
		}
	}
})