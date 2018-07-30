// pages/users.js
const utils = require('../../utils/util.js')
const ajaxUrl = {
	dev: {
		add: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder?tag=add'
	},
	pro: {
		add: 'https://coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=add'
	}
}
let sdate, ldate, datetype
let userlen
let sys = wx.getStorageSync('sys')
const openid = wx.getStorageSync('openid')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		datePickerMode: 'hidden',
		datePickerValue: {},
		isSolar: false,
		name: '',
		birth: '请选择出生日期',
		toasttext: ''
	},
	getname: function (e) {
		// console.log(e.detail.value)
		this.setData({
			name: e.detail.value,
			finish: 'editclick'
		})
	},
	toast: function (text) {
		this.setData({
			isactive: true,
			toasttext: text
		})
		setTimeout(() => {
			this.setData({
				isactive: false
			})
		}, 800)
	},
	openDatePicker: function () {
		this.setData({
			datePickerMode: 'show',
			stopscroll: true
		})
	},
	getDateInfo: function (e) {
		// console.log(e.detail)
		if (e.detail.year) { // 公历
			let chooseBirth = e.detail.year + '.' + utils.formatNumber(e.detail.month) + '.' + utils.formatNumber(e.detail.day)
			datetype = 1
			sdate = e.detail.year + '-' + e.detail.month + '-' + e.detail.day
			ldate = sdate
			wx.setStorageSync('sdate', sdate)
			this.setData({
				birth: chooseBirth,
				finish1: 'editclick'
			})
		} else { // 农历
			let chooseBirth = e.detail.cYear + '.' + utils.formatNumber(e.detail.cMonth) + '.' + utils.formatNumber(e.detail.cDay)
			datetype = 0
			ldate = e.detail.lYear + '-' + e.detail.lMonth + '-' + e.detail.lDay
			sdate = e.detail.cYear + '-' + e.detail.cMonth + '-' + e.detail.cDay
			wx.setStorageSync('sdate', sdate)
			wx.setStorageSync('ldate', ldate)
			this.setData({
				birth: chooseBirth,
				stopscroll: false,
				finish1: 'editclick'
			})
		}
	},
	addclick: function () {
		this.setData({
			clickstyle: 'clickstyle'
		})
	},
	removeclick: function () {
		this.setData({
			clickstyle: ''
		})
	},
	//   按钮点击态
	addclick1: function () {
		this.addclick()
	},
	removeaddclick1: function () {
		this.removeclick()
	},
	comfirm: function () { // 确定
		// console.log(wx.getStorageSync('sys'))
		let y = parseInt(this.data.birth.split('.')[0])
		let m = parseInt(this.data.birth.split('.')[1])
		let d = parseInt(this.data.birth.split('.')[2])
		let ajaxData = {
			"Name": encodeURIComponent(this.data.name),
			"CalendarType": datetype,
			"userID": "",
			"DeviceID": wx.getStorageSync('unionid') || 'test',
			"ParterID": sys.ParterID || "wnl",
			"ClientType": sys.ClientType || 'Youloft_IOS',
			"Channel": sys.Channel || 'iOS',
			"APPVersion": sys.APPVersion || '1.0.1',
			"GoodsID": sys.GoodsID || "775F426CC9C245E4AEDF4DCFF68E817C",
			"Birthday": ldate ? ldate : this.data.birth.split('.').join('-'),
			"GLBirthDay": sdate ? sdate : this.data.birth.split('.').join('-'),
			"img": 1
		}
		if (userlen <= 0) {
			ajaxData.img = 1
		}
		else {
			ajaxData.img = 0
		}
		// console.log(new Date(y, m - 1, d).getTime(), 'choose')
		// console.log(new Date().getTime(), 'now')
		if (this.data.name.length <= 0 || this.data.birth.indexOf('.') === -1) {
			wx.hideLoading()
			this.toast('请输入完整信息')
		}
		else if (new Date(y, m - 1, d).getTime() >= new Date().getTime()) {
			wx.hideLoading()
			this.toast('请选择正确的出生日期')
		}
		else {
			wx.showLoading({
				title: '信息提交中...',
			})
			wx.request({
				url: ajaxUrl.pro.add,
				method: 'post',
				ContentType: 'application/json',
				data: ajaxData,
				success: res => {
					// console.log(res.data.data.data)
					wx.hideLoading()
					if (res.statusCode === 200) {
						this.toast('添加成功')
						// console.log(getCurrentPages()[1])
						let data = {
							DeviceID: wx.getStorageSync('unionid') || 'test',
							// name: that.data.name || '',
							// orderid: orderid || '',
							// GLBirthDay: sdate ? sdate : that.data.birth.split('.').join('-'),
							name: this.data.name || '',
							glBirthDay: this.data.birth.split('.').join('-')
						}
						// console.log(getCurrentPages())
						getCurrentPages()[0].data.lifenum = res.data.data.data.lifeNum
						getCurrentPages()[0].onLoad(data, false, true)
						setTimeout(() => {
							wx.navigateBack({
								delta: 4
							})
						}, 400)
					}
					else {
						wx.hideLoading()
						this.toast('添加失败')
					}
				},
				fail: () => {
					wx.hideLoading()
					this.toast('添加失败')
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options)
		userlen = parseInt(options.userlen)
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