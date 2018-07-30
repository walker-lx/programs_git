// pages/users.js
const utils = require('../../utils/util.js')
const ajaxUrl = {
	dev: {
		update: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder?tag=edit',
		buy: 'http://192.168.1.178:3000/mock/14/LifeNum/CreateOrder'
	},
	pro: {
		update: 'https://coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=edit',
		buy: 'https://coco70.51wnl.com/numberologynew/LifeNum/CreateOrder'
	}
}
let sdate, ldate, datetype = 0;
let sys = wx.getStorageSync('sys')
let orderid = ''
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
		birth: '',
		toasttext: ''
	},
	nameinput: function (e) {
		// console.log(e.detail)
		this.setData({
			name: e.detail.value
		})
	},
	openDatePicker: function () {
		this.setData({
			datePickerMode: 'show'
		})
	},
	getDateInfo: function (e) {
		// console.log(e.detail)
		let that = this
		if (e.detail.year) { // 公历
			let chooseBirth = e.detail.year + '.' + utils.formatNumber(e.detail.month) + '.' + utils.formatNumber(e.detail.day)
			datetype = 1
			sdate = e.detail.year + '-' + e.detail.month + '-' + e.detail.day
			ldate = sdate
			wx.setStorageSync('sdate', sdate)
			wx.setStorageSync('ldate', ldate)
			this.setData({
				birth: chooseBirth
			})
		} else { // 农历
			let chooseBirth = e.detail.cYear + '.' + utils.formatNumber(e.detail.cMonth) + '.' + utils.formatNumber(e.detail.cDay)
			datetype = 0
			ldate = e.detail.lYear + '-' + e.detail.lMonth + '-' + e.detail.lDay
			sdate = e.detail.cYear + '-' + e.detail.cMonth + '-' + e.detail.cDay
			wx.setStorageSync('sdate', sdate)
			wx.setStorageSync('ldate', ldate)
			this.setData({
				birth: chooseBirth
			})
		}
	},
	// cancel: function () { // 关闭日期
	// 	this.setData({
	// 		stopscroll: false,
	// 		isFixed: ''
	// 	})
	// },
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
		let that = this
		let y = parseInt(this.data.birth.split('.')[0])
		let m = parseInt(this.data.birth.split('.')[1])
		let d = parseInt(this.data.birth.split('.')[2])
		let ajaxData = {
			"Name": that.data.name || '',
			"CalendarType": datetype,
			"userID": "",
			"DeviceID": wx.getStorageSync('unionid') || 'test',
			"ParterID": sys.ParterID || "wnl",
			"ClientType": sys.ClientType || 'Youloft_IOS',
			"Channel": sys.Channel || 'iOS',
			"APPVersion": sys.APPVersion || '1.0.1',
			"GoodsID": sys.GoodsID || "775F426CC9C245E4AEDF4DCFF68E817C",
			"Birthday": ldate ? ldate : that.data.birth.split('.').join('-'),
			"GLBirthDay": sdate ? sdate : that.data.birth.split('.').join('-'),
			"orderID": orderid || ''
		}
		// console.log(JSON.stringify(ajaxData))
		// console.log(ajaxData.GLBirthDay)
		// console.log(new Date(y, m, d))
		if (that.data.name.length <= 0) {
			wx.hideLoading()
			that.toast('请输入姓名')
		}
		else if (new Date(y, m - 1, d).getTime() > new Date().getTime()) {
			wx.hideLoading()
			that.toast('请选择正确的出生日期')
		}
		else {
			wx.showLoading({
				title: '信息提交中...',
			})
			wx.request({
				url: ajaxUrl.pro.update,
				method: 'post',
				ContentType: 'application/json',
				data: ajaxData,
				success: res => {
					// console.log(res.data)
					let updateData = {
						"Name": encodeURIComponent(that.data.name),
						"CalendarType": datetype, // 1:公历  0：农历
						"DeviceID": wx.getStorageSync('unionid'),
						"ParterID": sys.ParterID || "wnl",
						"ClientType": sys.ClientType || 'Youloft_IOS',
						"Channel": sys.Channel || 'iOS',
						"APPVersion": sys.APPVersion || '1.0.1',
						"GoodsID": sys.GoodsID || "775F426CC9C245E4AEDF4DCFF68E817C",
						// "LsDetail": [
						// 	{
						// 		"Date": "2018-5-1"
						// 	}
						// ],
						"Birthday": ldate ? ldate : (that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10)),
						"GLBirthDay": sdate ? sdate : (that.data.birth.slice(0, 4) + '-' + that.data.birth.slice(5, 7) + '-' + that.data.birth.slice(8, 10))
					}
					console.log(updateData)
					if (res.statusCode === 200) {
						wx.hideLoading()
						if (res.data.status === 0) {
							this.toast('修改成功')
							wx.request({
								url: ajaxUrl.pro.buy,
								method: 'post',
								ContentType: 'application/json',
								data: updateData,
								success: (res) => {
									// console.log(res.data.data.data.orderID)
									// let orderid = res.data.data.data.orderID
									let data = {
										DeviceID: wx.getStorageSync('unionid') || 'test',
										// name: that.data.name || '',
										// orderid: orderid || '',
										// GLBirthDay: sdate ? sdate : that.data.birth.split('.').join('-'),
										name: that.data.name,
										glBirthDay: that.data.birth.split('.').join('-')
									}
									getCurrentPages()[0].onLoad(data)
									setTimeout(() => {
										wx.navigateBack({
											delta: 5
										})
									}, 400)
									// console.log(getCurrentPages())
								}
							})
						}
						// else {
						// 	this.toast(res.data.msg)
						// }
					}
					else {
						wx.hideLoading()
						this.toast('修改失败')
					}
				},
				fail: () => {
					wx.hideLoading()
					this.toast('修改失败')
				}
			})
		}
		// wx.navigateBack({
		// 	delta: 1
		// })
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options)
		this.setData({
			name: options.name,
			birth: options.birth
		})
		orderid = options.orderid
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