// pages/desc/desc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://lilith.51wnl.com/BGRand?number=0&cid=Youloft_Android&tkn=D0513B7CEF494E82AEAFDFF7B2183ECF',
      method: 'GET',
      // data: {
      //   number: 0,
      //   cid: 'Youloft_Android',
      //   tkn: 'D0513B7CEF494E82AEAFDFF7B2183ECF'
      // },
      success: function (res) {
        console.log(res.data.data);
        wx.setStorageSync('bgsrc', res.data.data)
        that.setData({
          bgsrc: res.data.data
        })
      },
    });
    this.setData({
      descsrc: options.card
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({
      descys: wx.getStorageSync('tarotys'),
      descname: wx.getStorageSync('tarotname'),
      descup: wx.getStorageSync('tarotup'),
      descxz: wx.getStorageSync('tarotxz'),
      descys: wx.getStorageSync('tarotys'),
      desckey: wx.getStorageSync('tarotkey'),
      explain: wx.getStorageSync('tarotexplain'),
      pm: wx.getStorageSync('tarotpm')
    })
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
  
  }
})