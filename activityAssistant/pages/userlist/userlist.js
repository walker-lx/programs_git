// pages/userlist/userlist.js
let acid
Page({
  data: {
    // 初始化数据
  },
  onLoad: function (options) {
    // let userinfo = JSON.parse(options.userinfo)
    let that = this
    let uid = options.uid
    let tkn = options.tkn
    let acstop = options.acstop
    acid = options.acid
    // console.log(acstop == 'false')
    if (acstop == 'false') {
      this.setData({
        acstop: false
      })
    }
    else {
      this.setData({
        acstop: true
      })
    }
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/GetActivityById?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.data)
        let acdata = res.data.data
        let usercount = acdata.joiners.length
        for (let i = 0, joinlen = acdata.joiners.length; i < joinlen; i++) {
          // acdata.joiners[i].joinerNickName = acdata.joiners[i].joinerNickName.slice(0,3) + '...'
          acdata.joiners[i].joinerNickName = acdata.joiners[i].joinerNickName.length > 3 ? acdata.joiners[i].joinerNickName.slice(0, 3) + '...' : acdata.joiners[i].joinerNickName
        }
        that.setData({
          count: usercount,
          acname: acdata.activityName,
          joiners: acdata.joiners
        })
      }
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      title: '活动聚会助手',
      path: 'pages/activityDetails/activityDetails?share=1&acid=' + acid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
