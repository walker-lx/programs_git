// pages/activityspend/activityspend.js
const app = getApp()
let acid
let uid
let tkn
let id
let itemarr = []
let itemstr
let acstatus
let data
let totalcost
Page({
  data: {
    showedit: true,
    count: '输入人数后计算'
  },
  onLoad: function (options) {
    new app.ToastPannel()
    acid = options.acid
    uid = options.uid
    tkn = options.tkn
    acstatus = options.acstatus
    data = options.data
    totalcost = options.totalcost / 100
    this.getBills()
  },
  onShow: function () {
    uid = app.globalData.uid
    tkn = app.globalData.tkn
    if (acid) {
      this.getBills()
    }
  },
  del: function (e) {
    let index = e.currentTarget.dataset.index
    let costtotal = 0
    id = e.currentTarget.dataset.id
    itemarr.push(id)
    // console.log(this.data.bill)
    this.data.bill.splice(index - 1, 1)
    this.setData({
      bill: this.data.bill
    })
    for (let i = 0, billlen = this.data.bill.length; i < billlen; i++) {
      costtotal += this.data.bill[i].cost / 100
      this.setData({
        totalspend: costtotal.toFixed(2)
      })
    }
  },
  // 获取账单列表
  getBills: function () {
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/GetActivityById?uid=' + uid + '&ActivityId=' + acid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        let bills = res.data.data.bills
        let avgspend = res.data.data.actualAvg
        let totalspend = (res.data.data.dispalySumCost / 100).toFixed(2)
        if (bills.length === 0) {
          this.setData({
            nospend: true,
            hasspend: false
          })
        }
        else {
          // 支出人为空时显示
          for (let i = 0, billslen = bills.length; i < billslen; i++) {
            if (bills[i].spender === '') {
              bills[i].spender = '-'
            }
          }
          this.setData({
            nospend: false,
            hasspend: true,
            bill: bills,
            count: avgspend,
            totalspend: totalspend || totalcost
          })
        }
      }
    })
  },
  costinput: function (e) {
    let num = parseInt(e.detail.value)
    if (num === 0 || num === '') {
      this.show('人数不能为0或空')
    }
    else {
      this.setData({
        costvalue: num
      })
    }
  },
  // 点击按钮
  edit: function () {
    this.setData({
      editclick: true,
      showedit: false,
      orderleft: '2rpx',
      spendleft: '-10rpx'
    })
  },
  close: function () {
    this.setData({
      editclick: false,
      showedit: true,
      orderleft: '30rpx',
      spendleft: ''
    })
    this.getBills()
  },
  // 完成删除操作
  finish: function () {
    itemstr = itemarr.join(',')
    this.setData({
      editclick: false,
      showedit: true,
      orderleft: '30rpx',
      spendleft: ''
    })
    if (itemstr) {
      wx.showLoading({
        title: '删除中'
      })
      wx.request({
        url: 'https://service.51wnl.com/Api/WxProgram/DeleteBill?ActivityId=' + acid + '&BillIds=' + itemstr + '&uid=' + uid + '&tkn=' + tkn,
        method: 'GET',
        success: (restext) => {
          if (restext.data.status === 200) {
            // console.log(restext.data.status)
            wx.showToast({
              title: '删除成功'
            })
            itemstr = null
            this.getBills()
          }
          else {
            wx.showToast({
              title: '删除失败'
            })
          }
        },
        complete: () => {
          wx.hideLoading()
          itemstr = null
        }
      })
    }
    else {
      this.getBills()
    }
  },
  calc: function () {
    if (acstatus !== '4') {
      wx.showToast({
        title: '活动未结束'
      })
    }
    else {
      this.setData({
        showmask: true
      })
    }
  },
  // 马上结算(点击确定)
  calcspend: function (e) {
    let num = e.detail.value.countinput
    if (num === '' || parseInt(num) === 0) {
      wx.showToast({
        title: '人数不能为0'
      })
    }
    else {
      wx.showLoading({
        title: '计算中'
      })
      wx.request({
        url: 'https://service.51wnl.com/Api/WxProgram/SettleBill?ActivityId=' + acid + '&ActualNum=' + num + '&uid=' + uid + '&tkn=' + tkn,
        method: 'GET',
        success: (res) => {
          // console.log(res.data.status)
          if (res.data.status == 200) {
            this.setData({
              dis: true
            })
            this.getBills()
            wx.hideLoading()
            setTimeout(() => {
              wx.navigateTo({
                url: '../costshare/costshare?acid=' + acid + '&uid=' + uid + '&tkn=' + tkn + '&data=' + data
              })
            }, 1000)
          }
        },
        complete: () => {
          setTimeout(() => {
            this.setData({
              dis: false
            })
          }, 2200)
        }
      })
    }
  },
  closemask: function () {
    this.setData({
      showmask: false
    })
  },
  focus: function () {
    this.setData({
      borderstyle: '1rpx solid #ffc42f'
    })
  },
  blur: function () {
    this.setData({
      borderstyle: '1rpx solid #dadada',
      margintop: '274rpx'
    })
  },
  // 添加花费
  sponsor: function () {
    wx.navigateTo({
      url: '../addspend/addspend?uid=' + uid + '&acid=' + acid + '&tkn=' + tkn
    })
  }
})
