// pages/shuffle/shuffle.js
Page({

  /**
   * 页面的初始数据
   */
	data: {
		animationData1: '',
		animationData2: ''
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		setTimeout(() => {
			var animation = wx.createAnimation({
				duration: 2400,
				timingFunction: 'ease-in-out',
			})
			this.animation = animation;

			animation.rotate(1440).step()

			this.setData({
				animationData1: animation.export()
			})
			setTimeout(() => {
				animation.rotate(-1440).step()
				this.setData({
					animationData2: animation.export()
				})
			}, 0)
			setTimeout(() => {
				wx.redirectTo({
					url: '../select/select',
				})
			}, 2800)
		}, 500);
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