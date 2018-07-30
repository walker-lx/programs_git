// pages/addspend/addspend.js
let uid
let tkn
let acid
let totalcost = 0
let app = getApp()
Page({
  data: {
    textvalue: '',
    uservalue: '',
    spendvalue: ''
  },
  onLoad: function (options) {
    new app.ToastPannel()
    uid = options.uid
    tkn = options.tkn
    acid = options.acid
  },
  textfocus: function (e) {
    this.setData({
      textborder: '1rpx solid #ffc42f',
      hastext: e.detail.value !== '' ? true : false
    })
  },
  userfocus: function (e) {
    this.setData({
      userborder: '1rpx solid #ffc42f',
      hasuser: e.detail.value !== '' ? true : false
    })
  },
  spendfocus: function (e) {
    this.setData({
      spendborder: '1rpx solid #ffc42f',
      hasspend: e.detail.value !== '' ? true : false
    })
  },
  textblur: function () {
    this.setData({
      textborder: '1rpx solid #dadada',
      hastext: false
    })
  },
  userblur: function () {
    this.setData({
      userborder: '1rpx solid #dadada',
      hasuser: false
    })
  },
  spendblur: function () {
    this.setData({
      spendborder: '1rpx solid #dadada',
      hasspend: false
    })
  },
  textinput: function (e) {
    this.setData({
      hastext: e.detail.value !== '' ? true : false,
      textvalue: e.detail.value
    })
  },
  cleartext: function (e) {
    this.setData({
      textvalue: ''
    })
  },
  userinput: function (e) {
    this.setData({
      hasuser: e.detail.value !== '' ? true : false,
      uservalue: e.detail.value.length > 10 ? e.detail.value.slice(0, 10) : e.detail.value
    })
  },
  clearuser: function (e) {
    this.setData({
      uservalue: ''
    })
  },
  spendinput: function (e) {
    this.setData({
      hasspend: e.detail.value !== '' ? true : false,
      spendvalue: e.detail.value
    })
  },
  clearspend: function (e) {
    this.setData({
      spendvalue: ''
    })
  },
  // 提交表单
  formSubmit: function (e) {
    let data = e.detail.value
    if (e.detail.value.text === '') {
      this.show('请填写事项')
    }
    else if (e.detail.value.cost === '') {
      this.show('请填写花费')
    }
    else if (e.detail.value.cost.slice(0, 1) === '.' || e.detail.value.cost.indexOf('.') !== e.detail.value.cost.lastIndexOf('.')) {
      this.show('请输入正确的花费')
    }
    else {
      totalcost += parseFloat(data.cost)
      this.setData({
        dis: 'disabled'
      })
      wx.request({
        url: 'https://service.51wnl.com/Api/WxProgram/CreateBill',
        method: 'POST',
        data: {
          'ActivityId': acid,
          'Spender': data.spendor,
          'SpendItem': data.text,
          'Cost': data.cost * 100,
          'uid': uid,
          'tkn': tkn
        },
        success: (res) => {
          // console.log(res.data.status)
          if (res.data.status == 200) {
            wx.showToast({
              title: '添加成功'
            })
            wx.navigateBack()
            this.setData({
              dis: ''
            })
          }
          else {
            this.show('添加失败！')
          }
        }
      })
    }
  },
  // 点击取消
  cancel: function () {
    wx.navigateBack({})
  }
})
