// pages/users.js
const ajaxUrl = {
	dev: {
		getOrderList: 'http://192.168.1.178:3000/mock/14/LifeNum/GetOrderList',
	},
	pro: {
		getOrderList: 'https://coco70.51wnl.com/numberologynew/LifeNum/GetOrderList',
		del: 'https://coco70.51wnl.com/numberologynew/LifeNum/Del',
		update: 'https://coco70.51wnl.com/numberologynew/LifeNum/AddOrModifyUser?tag=edit'
	}
}
let len
let sys = wx.getStorageSync('sys')
let datetype = 0, sdate, ldate
let userlen
let click = true
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		toasttext: '此用户已有订单不可删除',
		isactive: false,
		// isclick: false,
		userlist: [],
		nousershow: false
	},
	edit: function (e) { // 编辑用户
		let that = this
		let name = e.currentTarget.dataset.name
		let birth = e.currentTarget.dataset.birth
		let orderid = e.currentTarget.dataset.orderid
		// console.log(sys)
		let ajaxData = {
			"Name": encodeURIComponent(name) || '',
			"CalendarType": datetype,
			"userID": "",
			"DeviceID": wx.getStorageSync('unionid'),
			"ParterID": sys.ParterID,
			"ClientType": sys.ClientType || 'Youloft_IOS',
			"Channel": sys.Channel || 'iOS',
			"APPVersion": sys.APPVersion || '1.0.1',
			"GoodsID": sys.GoodsID || '775F426CC9C245E4AEDF4DCFF68E817C',
			"Birthday": ldate ? ldate : birth.split('.').join('-'),
			"GLBirthDay": sdate ? sdate : birth.split('.').join('-'),
			"orderID": orderid || ''
		}
		// console.log(JSON.stringify(ajaxData))
		if (click) {
			click = false													
			wx.request({
				url: ajaxUrl.pro.update,
				method: 'post',
				ContentType: 'application/json',
				data: ajaxData,
				success: res => {
					// console.log(res.data)
					if (res.statusCode === 200) {
						if (len >= 10) {
							this.toast('最多只能添加10个用户')
							setTimeout(() => {
								click = true
							}, 0)
						}
						// else if (res.data.status === 0) {
						// 	console.log('')
						// }
						else if (res.data.status !== 0) {
							this.toast(res.data.msg)
							setTimeout(() => {
								click = true
							}, 0)
						}
						else {
							wx.navigateTo({
								url: '../../pages/edit/edit?name=' + name + '&birth=' + birth + '&orderid=' + orderid,
							})
							setTimeout(() => {
								click = true
							}, 300)
						}
					}
					else {
						this.toast('修改失败')
						setTimeout(() => {
							click = true
						}, 0)
					}
				},
				fail: () => {
					this.toast('修改失败')
				}
			})
		}
	},
	add: function () { // 添加用户
		if (len >= 10) {
			this.toast('最多只能添加10个用户')
		}
		else {
			wx.navigateTo({
				url: '../../pages/add/add?userlen=' + userlen
			})
		}
	},
	toast: function (text) {
		this.setData({
			toasttext: text || '',
			isactive: true
		})
		setTimeout(() => {
			this.setData({
				isactive: false
			})
		}, 800)
	},
	del: function (e) { // 删除用户
		// this.toast()
		let that = this
		let openid = wx.getStorageSync('openid')
		let list = this.data.userlist
		wx.showModal({
			// title: '确定要删除该订单吗？',
			content: '确定要删除该订单吗？',
			success: (res) => {
				if (res.confirm) {
					wx.showLoading({
						title: '删除中...',
					})
					list.forEach((item, index) => {
						if (item.orderID === e.currentTarget.dataset.orderid) {
							// this.data.userlist.splice(index, 1)
							// console.log(openid)
							wx.request({
								url: ajaxUrl.pro.del,
								method: 'post',
								ContentType: 'application/x-www-form-urlencoded',
								data: {
									UserID: '',
									DeviceID: wx.getStorageSync('unionid'),
									orderID: e.currentTarget.dataset.orderid
								},
								success: (res) => {
									// console.log(res.data)
									if (res.data.status === 0) {
										wx.hideLoading()
										// if (res.data.data === 'success') {
										wx.showToast({
											title: '删除成功',
										})
										that.onLoad()
										// }
										// else {
										// wx.showToast({
										// 	title: '删除失败',
										// })
										// }
									}
									else {
										wx.hideLoading()
										that.toast('此用户已有订单不可删除')
									}
								},
								fail: () => {
									// console.log('失败')
									wx.hideLoading()
									wx.showToast({
										title: '删除失败',
									})
								}
							})
							return
						}
					})
				}
			}
		})
		// that.onLoad()		
		// this.setData({
		// 	userlist: list
		// })
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
	backIndex: function (e) {
		let clickid = e.currentTarget.dataset.id
		// console.log(e.currentTarget.dataset.id)
		let list = this.data.userlist
		list.forEach((item, index) => {
			if (item.id === clickid) {
				item.isclick = true
			}
			else {
				item.isclick = false
			}
		})
		this.setData({
			userlist: list
		})
		let _data = {
			name: e.currentTarget.dataset.name || '',
			glBirthDay: e.currentTarget.dataset.birth.split('.').join('-') || '',
		}
		// console.log(data, '数据')
		// getCurrentPages()[0].getDetail(_data, false, false)
		getCurrentPages()[0].onLoad(_data, false, false)
		// getCurrentPages()[0].setdata()
		setTimeout(() => {
			wx.navigateBack({
				delta: 1
			})
		}, 100)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function () {
		click = true
	},
	onLoad: function (options) {
		let that = this
		wx.request({
			url: ajaxUrl.pro.getOrderList,
			method: 'post',
			ContentType: 'application/json',
			data: {
				"DeviceID": wx.getStorageSync('unionid') || "test1"
			},
			success: (res) => {
				if (res.data.data.length > 0) {
					let data = [...res.data.data]
					userlen = [...res.data.data].length
					console.log(data)
					len = data.length
					data.forEach(item => {
						item.glBirthDay = item.glBirthDay.split('T')[0].split('-').join('.')
						item.isclick = false
						item.name = decodeURIComponent(item.name)
					})
					that.setData({
						nousershow: false,
						userlist: data
					})
				}
				else {
					userlen = 0
					that.setData({
						nousershow: true,
						userlist: []
					})
				}
				
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