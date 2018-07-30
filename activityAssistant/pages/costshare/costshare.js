// pages/costshare/costshare.js
let sharedata
let uid
let tkn
let acid
Page({
  data: {
  },
  onLoad: function (options) {
    let data = JSON.parse(options.data)
    sharedata = options.data
    uid = options.uid
    acid = options.acid
    tkn = options.tkn
    // console.log(data)
    this.setData({
      sdate: data.sdate,
      sday: data.sday,
      shm: data.shm,
      acname: data.acname,
      acaddr: data.acaddr
    })
    // 请求活动花费信息
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/GetActivityById?uid=' + uid + '&ActivityId=' + acid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.data.bills)
        let bills = res.data.data.bills
        let avgspend = res.data.data.actualAvg / 100
        let totalspend = res.data.data.actualCost / 100
        this.setData({
          bill: bills,
          count: res.data.data.actualNum,
          totalspend: totalspend,
          avgspend: avgspend
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      path: 'pages/costshare/costshare?data=' + sharedata + '&acid=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
