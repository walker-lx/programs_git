// pages/createinfo/createinfo.js
let createid
Page({
  data: {
    //初始化
  },
  onLoad: function (options) {
    let sweek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let sweekday = sweek[new Date(options.sdate.split(' ')[0]).getDay()];
    let spendtype;
    createid = options.createid;
    // console.log(createid)
    this.setData({
      sdate: options.sdate.slice(5, 7),
      sday: options.sdate.slice(8, 10),
      sweekday: sweekday,
      shm: options.sdate.slice(11, 16),
      acname: options.name,
      acaddr: options.place,
      costtype: 0,
      cost: options.cost,
      actip: options.tip,
      avatar: options.avatar === '' ? 'https://mobile.51wnl.com/activityAssistant/img/headimg.jpg' : options.avatar,
      nickname: options.nickname
    })
  },
  //返回首页
  onUnload: function () {
    wx.navigateBack({
      delta: 10
    })
  },
  //分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '活动聚会助手',
      path: 'pages/activityDetails/activityDetails?share=1&acid=' + createid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})