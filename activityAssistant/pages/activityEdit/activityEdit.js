// pages/activityEdit/activityEdit.js
import utils from '../../utils/util.js'
const app = getApp()
let month = []
let day = []
let month1 = []
let day1 = []
let uid
let tkn
let acid
let acaddr
let limit
let costtype
let cost
let actip
let update
let avatar
let nickname
let sdate
let sday
let edate
let eday
let acname
let shm
let ehm
let date_i
let day_i
let hour_i
let min_i
Page({
  data: {
    animationData: {},
    begindate: '',
    enddate: '',
    namevalue: ''
  },
  onLoad: function (options) {
    let that = this
    new app.ToastPannel()
    let date = new Date()
    let beginaddhours = utils.formatDateTime(new Date(new Date().setHours(date.getHours() + 1)))
    let endaddhours = utils.formatDateTime(new Date(new Date().setHours(date.getHours() + 2)))   
    let y = beginaddhours.slice(0, 4)
    let currentDate = beginaddhours.slice(5, 7) + '月' + beginaddhours.slice(8, 10) + '日'
    let currentHour = beginaddhours.slice(11, 13)
    uid = options.uid
    tkn = options.tkn
    avatar = options.avatar
    nickname = options.nickname
    // if (parseInt(that.data.begindate.slice(3, 5)) == utils.getMonthDate(that.data.begindateyear, parseInt(that.data.begindate.slice(3, 5)))) {
    //   that.setData({
    //     enddateyear: that.data.begindateyear,
    //     enddate: (parseInt(that.data.begindate.slice(0, 2)) + 1) + '月1日',
    //     enddatehm: '00:' + that.data.begindatehm.slice(3, 5)
    //   })
    // }
    // if (that.data.enddatehm.slice(0, 2) === '24') {
    //   that.setData({
    //     enddateyear: that.data.begindateyear,
    //     enddate: (that.data.begindate.slice(0, 2)) + '月' + (parseInt(that.data.begindate.slice(3, 5)) + 1) + '日',
    //     enddatehm: '00:' + that.data.begindatehm.slice(3, 5)
    //   })
    // }
    // if (that.data.begindate.slice(0, 2) == '12') {
    //   that.setData({
    //     enddateyear: parseInt(that.data.begindateyear) + 1,
    //     enddate: '1月1日',
    //     enddatehm: '00:' + that.data.begindatehm.slice(3, 5)
    //   })
    // }
    if (options.acid) {
      acid = options.acid
      acaddr = options.acaddr
      limit = options.limit
      costtype = options.costtype
      cost = options.cost
      actip = options.actip
      uid = options.uid
      update = 1
      acname = options.acname
      sdate = options.sdate
      sday = options.sday
      shm = options.shm
      edate = options.edate
      eday = options.eday
      ehm = options.ehm
      this.setData({
        namevalue: acname,
        begindate: sdate + '月' + sday + '日',
        begindatehm: shm,
        enddate: edate + '月' + eday + '日',
        enddatehm: ehm,
        btnopacity: 1,
        begindateyear: options.syear,
        enddateyear: options.eyear
      })
    }
    else {
      this.setData({
        begindateyear: y,
        enddateyear: endaddhours.slice(0, 4),
        begindate: currentDate,
        enddate: endaddhours.slice(5, 7) + '月' + endaddhours.slice(8, 10) + '日',
        begindatehm: currentHour + ':00',
        enddatehm: endaddhours.slice(11, 13) + ':00'
      })
      update = 0
    }
  },
  onReady: function () {
    let hour = [];
    let hour1 = [];
    let minute = [];
    let minute1 = [];
    // 填充时间数据
    for (let i = 1; i < 13; i++) {
      month.push(utils.gethourtype(i) + '月')
      month1.push(utils.gethourtype(i) + '月')
    }
    for (let i = 1; i < 32; i++) {
      day.push(utils.gethourtype(i) + '日')
      day1.push(utils.gethourtype(i) + '日')
    }
    for (let i = 0; i < 24; i++) {
      hour.push(utils.gethourtype(i))
      hour1.push(utils.gethourtype(i))
    }
    for (let i = 0; i < 60; i++) {
      minute.push(utils.gethourtype(i))
      minute1.push(utils.gethourtype(i))
    }
    this.setData({
      'month': month,
      'day': day,
      'hour': hour,
      'minute': minute,
      'month1': month1,
      'day1': day1,
      'hour1': hour1,
      'minute1': minute1
    })
  },
  // 记录开始选择时间
  getdate_i: function () {
    for (let i = 0; i < 12; i++) {
      if (this.data.begindate.slice(0, 3) === this.data.month[i]) {
        date_i = i
      }
    }
    return date_i
  },
  getday_i: function () {
    for (let i = 0; i < 31; i++) {
      if (this.data.begindate.slice(3, 6) === this.data.day[i]) {
        day_i = i
      }
    }
    return day_i
  },
  gethour_i: function () {
    for (let i = 0; i < 24; i++) {
      if (this.data.begindatehm.slice(0, 2) === this.data.hour[i]) {
        hour_i = i
      }
    }
    return hour_i
  },
  getmin_i: function () {
    for (let i = 0; i < 60; i++) {
      if (this.data.begindatehm.slice(3, 5) === this.data.minute[i]) {
        min_i = i
      }
    }
    return min_i
  },
  // 记录结束选择时间
  getdate1_i: function () {
    for (let i = 0; i < 12; i++) {
      if (this.data.enddate.slice(0, 3) === this.data.month1[i]) {
        date_i = i
      }
    }
    return date_i
  },
  getday1_i: function () {
    for (let i = 0; i < 31; i++) {
      if (this.data.enddate.slice(3, 6) === this.data.day1[i]) {
        day_i = i
      }
    }
    return day_i
  },
  gethour1_i: function () {
    for (let i = 0; i < 24; i++) {
      if (this.data.enddatehm.slice(0, 2) === this.data.hour1[i]) {
        hour_i = i
      }
    }
    return hour_i
  },
  getmin1_i: function () {
    for (let i = 0; i < 60; i++) {
      if (this.data.enddatehm.slice(3, 5) === this.data.minute[i]) {
        min_i = i
      }
    }
    return min_i
  },
  // 输入框聚焦或者失去焦点
  namefocus: function (e) {
    this.setData({
      nameborder: 'border:1rpx solid #ffc42f'
    })
    // console.log(e.detail)
    if (e.detail.value !== '') {
      this.setData({
        valuenull: true
      })
    }
  },
  nameblur: function (e) {
    this.setData({
      nameborder: 'border:1rpx solid #dadada',
      valuenull: false
    })
    this.progressControl()
  },
  nameinput: function (e) {
    this.setData({
      valuenull: e.detail.value !== '' ? true : false,
      namevalue: e.detail.value
    })
    if (e.detail.value.length > 0) {
      this.setData({
        btnopacity: 1
      })
    }
    else {
      this.setData({
        btnopacity: 0.5
      })
    }
  },
  clearvalue: function (e) {
    this.setData({
      namevalue: ''
    })
  },
  // 提交表单
  formSubmit: function (e) {
    let that = this
    let value = e.detail.value.nameinput
    let selectdate = this.data.enddateyear + '-' + this.data.enddate.slice(0, 2) + '-' + this.data.enddate.slice(3, 5)
    let selecthour = this.data.enddatehm.slice(0, 2) + ':' + this.data.enddatehm.slice(3, 5) + ':00'
    let selectdate0 = this.data.begindateyear + '-' + this.data.begindate.slice(0, 2) + '-' + this.data.begindate.slice(3, 5)
    let selecthour0 = this.data.begindatehm.slice(0, 2) + ':' + this.data.begindatehm.slice(3, 5) + ':00'
    // 判断活动是否修改
    if (acname !== this.data.namevalue) {
      app.globalData.namexg = '1'
    }
    else {
      app.globalData.namexg = '0'
    }
    if ((sdate !== this.data.begindate.slice(0, 2)) || (sday !== this.data.begindate.slice(3, 5)) || (shm !== this.data.begindatehm)) {
      app.globalData.sdatexg = '1'
    }
    else {
      app.globalData.sdatexg = '0'
    }
    if ((edate !== this.data.enddate.slice(0, 2)) || (eday !== this.data.enddate.slice(3, 5)) || (ehm !== this.data.enddatehm)) {
      app.globalData.edatexg = '1'
    }
    else {
      app.globalData.edatexg = '0'
    }
    // 表单验证
    if (value === '') {
      that.show('请输入名称')
    }
    else if (utils.strtotime(selectdate, selecthour) < utils.strtotime(selectdate0, selecthour0)) {
      this.show('结束时间不能早于开始时间')
    }
    else if (update === 1) { // 修改活动
      wx.navigateTo({
        url: '../activityEditend/activityEditend?name=' + that.data.namevalue + '&syear=' + that.data.begindateyear + '&sdate=' + that.data.begindate + '&shour=' + that.data.begindatehm + '&eyear=' + that.data.enddateyear + '&edate=' + that.data.enddate + '&ehour=' + that.data.enddatehm + '&uid=' + uid + '&tkn=' + tkn + '&acid=' + acid + '&actip=' + actip + '&acaddr=' + acaddr + '&cost=' + cost + '&costtype' + costtype + '&limit=' + limit + '&uid=' + uid + '&avatar=' + avatar + '&nickname=' + nickname
      })
    // console.log(this.data.begindateyear + '修改年份')
    // console.log(this.data.namevalue + '名称')
    }
    else {
      wx.navigateTo({
        url: '../activityEditend/activityEditend?name=' + that.data.namevalue + '&syear=' + that.data.begindateyear + '&sdate=' + that.data.begindate + '&shour=' + that.data.begindatehm + '&eyear=' + that.data.enddateyear + '&edate=' + that.data.enddate + '&ehour=' + that.data.enddatehm + '&uid=' + uid + '&tkn=' + tkn + '&avatar=' + avatar + '&nickname=' + nickname
      })
    }
  },
  // 进度条控制函数
  progressControl: function () {
    if (this.data.namevalue !== '' && this.data.begindate !== '' && this.data.enddate !== '') {
      this.setData({
        bg3_1: '#ffc42f',
        bg3_2: '#ffc42f',
        bg3_3: '#ffc42f',
        btnopacity: 1
      })
    }
    else if ((this.data.namevalue !== '' && this.data.begindate !== '') || (this.data.namevalue !== '' && this.data.enddate !== '') || (this.data.enddate !== '' && this.data.begindate !== '')) {
      this.setData({
        bg3_1: '#ffc42f',
        bg3_2: '#ffc42f',
        bg3_3: '#dadada',
        btnopacity: 0.5
      })
    }
    else if (this.data.namevalue !== '' || this.data.begindate !== '' || this.data.enddate !== '') {
      this.setData({
        bg3_1: '#ffc42f',
        bg3_2: '#dadada',
        bg3_3: '#dadada',
        btnopacity: 0.5
      })
    }
    else {
      this.setData({
        bg3_1: '#dadada',
        bg3_2: '#dadada',
        bg3_3: '#dadada',
        btnopacity: 0.5
      })
    }
  },
  // 开始时间选择
  bindChange: function (e) {
    let that = this
    let currentMonth = parseInt(this.data.month[e.detail.value[0]].slice(0, 2))
    let currentMonthDay = utils.getMonthDate(that.data.begindateyear, currentMonth)
    // 判断月份对应的天数
    let currentDay = []
    for (let i = 0; i < currentMonthDay; i++) {
      currentDay.push(utils.gethourtype(i + 1) + '日')
    }
    // console.log(currentMonth)
    this.setData({
      day: currentDay
    })
    this.setData({
      'datevalue': this.data.month[e.detail.value[0]] + this.data.day[e.detail.value[1]],
      'hourvalue': this.data.hour[e.detail.value[2]] + ':' + this.data.minute[e.detail.value[4]]
    })
  // console.log(this.data.svalue)
  // if (this.data.hourvalue.slice(0,2) == '00') {
  //   this.setData({
  //     'hourvalue': '24:' + this.data.minute[e.detail.value[4]]
  //   })
  // }
  // if (this.data.hourvalue.slice(3, 5) == '00') {
  //   this.setData({
  //     'hourvalue': '24:' + this.data.minute[e.detail.value[4]]
  //   })
  // }
  },
  showselect: function () {
    let that = this
    let currentmonth = []
    let month1 = new Date().getMonth() + 1
    let currentMonth
    let currentMonthDay
    let currentDay = []
    for (let i = 0, len = 12 - parseInt(month1); i <= len; i++) {
      currentmonth.push(utils.gethourtype(month1 + i) + '月')
    }
    for (let i = 0, len = month1 - 1; i < len; i++) {
      currentmonth.push(utils.gethourtype(i + 1) + '月')
    }
    // currentMonth = parseInt(this.data.month[0].slice(0, 2))
    currentMonth = parseInt(this.data.begindate.slice(0, 2))   
    currentMonthDay = utils.getMonthDate(that.data.begindateyear, currentMonth)
    // 判断月份对应的天数
    for (let i = 0; i < currentMonthDay; i++) {
      currentDay.push(utils.gethourtype(i + 1) + '日')
    }
    this.setData({
      condition: true,
      month: currentmonth,
      day: currentDay
    })
    // 执行动画效果和默认值
    this.setData({
      // condition: true,
      value: [this.getdate_i(), this.getday_i(), this.gethour_i(), 0, this.getmin_i()]
    })
    // console.log(this.gethour_i() + 'value')
    this.setData({
      datevalue: this.data.month[this.data.value[0]] + this.data.day[this.data.value[1]],
      hourvalue: this.data.hour[this.data.value[2]] + ':00'
    })
    // console.log(this.data.datevalue + '时间')
    // 动画
    let animation = wx.createAnimation({
      duration: 550,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.bottom(0)
    animation.translate3d(0, 0, 0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  comfired: function () {
    let that = this
    let date = new Date()
    let selectdate = date.getFullYear() + '-' + this.data.begindate.slice(0, 2) + '-' + this.data.begindate.slice(3, 5)
    let selecthour = this.data.begindatehm.slice(0, 2) + ':' + this.data.begindatehm.slice(3, 5) + ':00'
    this.setData({
      condition: false,
      begindate: this.data.datevalue,
      begindatehm: this.data.hourvalue
    })
    this.progressControl()
    if (utils.strtotime(selectdate, selecthour) < Date.parse(new Date()) / 1000) {
      this.setData({
        begindateyear: date.getFullYear() + 1
      })
    }
    else {
      this.setData({
        begindateyear: date.getFullYear()
      })
    }
  // console.log(selectdate + 'select')
  // console.log(selecthour + 'selecthour')
  },
  close: function () {
    this.setData({
      condition: false
    })
  },
  // 结束时间选择
  bindChange1: function (e) {
    let that = this
    let currentMonth = parseInt(this.data.month1[e.detail.value[0]].slice(0, 2))
    let currentMonthDay = utils.getMonthDate(that.data.begindateyear, currentMonth)
    let currentDay = []
    // console.log(currentMonthDay)
    // 判断月份对应的天数
    for (let i = 0; i < currentMonthDay; i++) {
      currentDay.push(utils.gethourtype(i + 1) + '日')
    }
    this.setData({
      day1: currentDay
    })
    this.setData({
      'datevalue1': this.data.month1[e.detail.value[0]] + this.data.day1[e.detail.value[1]],
      'hourvalue1': this.data.hour1[e.detail.value[2]] + ':' + this.data.minute1[e.detail.value[4]]
    })
  },
  showselect1: function () {
    let that = this
    let currentmonth = []
    let month1 = new Date().getMonth() + 1
    let currentMonth
    let currentMonthDay
    let currentDay = []
    // console.log(currentMonth)
    for (let i = 0, len = 12 - month1; i <= len; i++) {
      currentmonth.push(utils.gethourtype(month1 + i) + '月')
    }
    for (let i = 0, len = month1 - 1; i < len; i++) {
      currentmonth.push(utils.gethourtype(i + 1) + '月')
    }
    // currentMonth = parseInt(this.data.month1[0].slice(0, 2))
    currentMonth = parseInt(this.data.enddate.slice(0, 2))
    currentMonthDay = utils.getMonthDate(that.data.enddateyear, currentMonth)
    // 判断月份对应的天数
    for (let i = 0; i < currentMonthDay; i++) {
      currentDay.push(utils.gethourtype(i + 1) + '日')
    }
    // console.log(currentMonth)
    this.setData({
      condition1: true,
      month1: currentmonth,
      day1: currentDay
    })
    // 执行动画效果
    this.setData({
      // condition1: true,
      value1: [this.getdate1_i(), this.getday1_i(), this.gethour1_i(), 0, this.getmin1_i()]
    })
    this.setData({
      datevalue1: this.data.month1[this.data.value1[0]] + this.data.day1[this.data.value1[1]],
      hourvalue1: this.data.hour1[this.data.value1[2]] + ':00'
    })
    let animation = wx.createAnimation({
      duration: 550,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.bottom(0)
    animation.translate3d(0, 0, 0).step()    
    this.setData({
      animationData: animation.export()
    })
  },
  comfired1: function () {
    let that = this
    let date = new Date()
    let selectdate = date.getFullYear() + '-' + this.data.enddate.slice(0, 2) + '-' + this.data.enddate.slice(3, 5)
    let selecthour = this.data.enddatehm.slice(0, 2) + ':' + this.data.enddatehm.slice(3, 5) + ':00'
    this.setData({
      condition1: false,
      enddate: this.data.datevalue1,
      enddatehm: this.data.hourvalue1
    })
    if (utils.strtotime(selectdate, selecthour) < Date.parse(new Date()) / 1000) {
      this.setData({
        enddateyear: date.getFullYear() + 1
      })
    }
    else {
      this.setData({
        enddateyear: date.getFullYear()
      })
    }
  },
  close1: function () {
    this.setData({
      condition1: false
    })
  }
})
