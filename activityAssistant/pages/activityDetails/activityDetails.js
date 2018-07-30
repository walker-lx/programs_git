// pages/activityDetails/activityDetails.js
import utils from '../../utils/util.js'
const app = getApp()
let acid
let uid
let tkn
let iscreate
let issign = 0
let edate
let eday
let ehm
let limit
let index
let acstatus
let totalcost
let avatar
let nickname
let syear
let eyear
let sharetitle
Page({
  data: {
    stopstatus: true,
    accancel: true,
    hasjoin: true,
    sign_0: false,
    sign_1: false,
    showcrown: true,
    notsign: false
  },
  onLoad: function (options) {
    new app.ToastPannel()
    let that = this
    acid = options.acid
    // console.log(acid)
    if (options.share) { // 分享之后打开
      // 获取用户信息
      acid = options.acid
      wx.getUserInfo({
        success: (res) => {
          // console.log(res.userInfo.nickName)
          let avatar = res.userInfo.avatarUrl
          let nickname = res.userInfo.nickName
          // 获取用户资料
          wx.login({
            success: (res) => {
              let code = res.code
              console.log('code:' + code)
              wx.request({
                url: 'https://service.51wnl.com/Api/WxProgram/WxProCodeLogin?Programe=ActivityAssist&code=' + code,
                method: 'GET',
                success: (respond) => {
                  let openid = respond.data.data.openId
                  console.log('openid:' + openid)
                  // 获取微信用户信息
                  wx.request({
                    url: 'https://service.51wnl.com/Api/WxProgram/WxProLogin',
                    method: 'POST',
                    data: {
                      Programe: 'ActivityAssist',
                      OpenId: openid,
                      AvatarUrl: avatar,
                      NickName: nickname
                    },
                    success: (restext) => {
                      uid = restext.data.data.userId
                      tkn = restext.data.data.accessToken
                      console.log('userid:' + uid)
                      // console.log('分享之后的uid' + uid)
                      wx.showLoading({
                        title: '加载中'
                      })
                      that.getActivityInfo()
                    },
                    fail: () => {
                      that.show('获取用户信息失败')
                    },
                    complete: () => {
                      wx.hideLoading()
                    }
                  })
                },
                fail: () => {
                  that.show('获取登录信息失败')
                }
              })
            }
          })
        },
        fail: () => {
          // 用户拒绝授权后
          console.log('出错了')
          wx.showModal({
            title: '授权失败',
            content: '请重新打开小程序并允许授权以获得更多功能',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    console.log(res.authSetting)
                  }
                })
              }
            }
          })
        }
      })
    }
    else {
      uid = options.uid
      tkn = options.tkn
      acid = options.acid
      index = options.index
      acstatus = options.acstatus
      avatar = options.avatar
      nickname = options.nickname
      this.getActivityInfo()
    }
  },
  onShow: function () {
    if (app.globalData.update === 1) {
      this.getActivityInfo()
      app.globalData.update = 0
    }
  // console.log(app.globalData.update)
  },
  // 获取活动详情
  getActivityInfo: function () {
    let that = this
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/GetActivityById?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        let acdata = JSON.parse(JSON.stringify(res.data.data))
        // let acdata = res.data.data 
        // console.log(acdata)   
        let sweek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        // 开始时间显示
        let sdate = acdata.startDate.slice(5, 7)
        let sday = acdata.startDate.slice(8, 10)
        let shm = acdata.startDate.slice(11, 16)
        let bmcount = acdata.joiners.length
        let nowtime = Date.parse(new Date()) / 1000
        let endtime = utils.strtotime(acdata.endDate.split(' ')[0], acdata.endDate.split(' ')[1])
        edate = acdata.endDate.slice(5, 7)
        eday = acdata.endDate.slice(8, 10)
        ehm = acdata.endDate.slice(11, 16)
        limit = acdata.limitNum
        syear = acdata.startDate.slice(0, 4)
        eyear = acdata.endDate.slice(0, 4)
        totalcost = acdata.dispalySumCost
        acstatus = acdata.activityStatus
        // 判断创建者和参与者（iscreate  0: 非创建者  1: 创建者）
        if (acdata.createUserId === uid) {
          iscreate = 1
        }
        else {
          iscreate = 0
        }
        // 参与者是否报名
        if (bmcount === 0) {
          issign = 0
        }
        else {
          // 判断参与者报名状态(issign  0: 未报名  1: 已报名)
          for (let j = 0; j < bmcount; j++) {
            if (acdata.joiners[j].joinerId === uid) {
              issign = 1
            }
            else {
              issign = 0
            }
            acdata.joiners[j].joinerAvatarUrl = acdata.joiners[j].joinerAvatarUrl === '' ? 'https://mobile.51wnl.com/activityAssistant/img/headimg.jpg' : acdata.joiners[j].joinerAvatarUrl;
            acdata.joiners[j].joinerNickName = acdata.joiners[j].joinerNickName.length > 3 ? acdata.joiners[j].joinerNickName.slice(0, 3) + '...' : acdata.joiners[j].joinerNickName;            
          }
        }
        // 取消报名与截止报名按钮显示
        if (acdata.activityStatus === 0) {
          this.setData({
            accancel: ''
          })
        }
        //设置分享标题
        if (acdata.activityStatus === 1) {
          sharetitle = '赶快来报名，就等你了！'
        }
        if (acdata.activityStatus === 2) {
          sharetitle = '这儿有个好活动~';
          this.setData({
              stopstatus: ''
          })
        }
        if (acdata.activityStatus === 0 || acdata.activityStatus === 3 || acdata.activityStatus === 4) {
          sharetitle = '赶快发起一个活动吧！'
        }
        // 判断活动阶段（区分创建者和参与者）
        if (iscreate === 1 && acdata.activityStatus === 1) { // 创建者（正在报名）
          this.setData({
            iscreate: true
          })
        }
        else if (iscreate === 1 && acdata.activityStatus === 0) { // 创建者（活动取消）
          this.setData({
            accancel: false
          })
        }
        else if (iscreate === 1 && acdata.activityStatus === 2) { // 创建者(截止报名)
          that.setData({
            iscreate: true,
            accancel: false
          })
        }
        else if (iscreate === 1 && acdata.activityStatus === 3) { // 创建者（活动开始）
          that.setData({
            isbegin: true,
            accancel: false
          })
        }
        else if (iscreate === 1 && acdata.activityStatus === 4) { // 创建者（活动结束）
          that.setData({
            isfinish: true,
            accancel: false
          })
        }
        else if (acdata.activityStatus === 1 && issign === 0) { // 正在报名(未参与者)
          that.setData({
            sign_0: true,
            notsign: false
          })
        }
        else if (acdata.activityStatus === 1 && issign === 1) { // 正在报名（参与者已报名）
          that.setData({
            sign_1: true
          })
        }
        else if (acdata.activityStatus === 2 && issign === 1) { // 截止报名（参与者已报名）
          that.setData({
            sign_1: true,
            accancel: false
          })
        }
        else if (acdata.activityStatus === 2 && issign === 0) { // 截止报名（未参与者）
          that.setData({
            hasjoin: false,
            notsign: true
          })
        }
        else if (acdata.activityStatus === 3 && issign === 0) { // 正在进行(未参与者)
          that.setData({
            hasjoin: false,
            notsign: true
          })
        }
        else if (acdata.activityStatus === 3 && issign === 1) { // 正在进行(参与者)
          that.setData({
            accancel: false
          })
        }
        else if (acdata.activityStatus === 4 && issign === 0) { // 活动结束(未参与者)
          that.setData({
            hasjoin: false,
            accancel: false,
            notsign: true
          })
        }
        else if (acdata.activityStatus === 4 && issign === 1) { // 活动结束(参与者)
          that.setData({
            hasjoin: true,
            accancel: false
          })
        }
        else if (acdata.activityStatus === 0 && issign === 0) { // 活动取消(未参与者)
          that.setData({
            hasjoin: false,
            accancel: false,
            notsign: true
          })
        }
        else {
          that.setData({
            notsign: false
          })
        }
        that.setData({
          acname: acdata.activityName,
          acaddr: acdata.address,
          actip: acdata.remark,
          joiners: acdata.joiners.slice(0, 9),
          sdate: sdate,
          sday: sday,
          shm: shm,
          sweekday: sweek[new Date(acdata.startDate.split(' ')[0]).getDay()],
          bmcount: bmcount,
          costtype: acdata.costtype,
          cost: acdata.cost === 0 ? '' : (parseFloat(acdata.cost) / 100).toFixed(2),
          status: acdata.tagText,
          bgimg: acdata.createUserAvatarUrl === '' ? 'https://mobile.51wnl.com/activityAssistant/img/headimg.jpg' : acdata.createUserAvatarUrl,
          bgname: acdata.createUserNickName.length > 3 ? acdata.createUserNickName.slice(0, 3) + '...' : acdata.createUserNickName,
          year: parseInt(acdata.startDate.slice(0, 4)) !== new Date().getFullYear() ? acdata.startDate.slice(0, 4) : ''
        })
        // 官方活动
        if (acdata.activityPlat === 2) {
          acdata.status = '官方活动'
          acdata.createUserNickName = '官方活动'
          acdata.createUserAvatarUrl = 'https://mobile.51wnl.com/activityAssistant/img/icon.jpg'
          this.setData({
            cost: '',
            showcrown: '',
            hasjoin: true,
            notsign: false,
            bgname: '官方活动'
          })
          if (issign === 1) {
            this.setData({
              sign_1: true
            })
          }
          else {
            this.setData({
              sign_1: false,
              sign_0: true
            })
          }
          // 官方活动结束后
          // console.log('当前' + nowtime)
          // console.log('结束' + endtime)
          if (nowtime > endtime) {
            this.setData({
              sign_1: false,
              sign_0: false,
              hasjoin: true
            })
          }
        }
        else {
          acdata.status = acdata.tagText
        }
      }
    })
  },
  // 点击活动账本
  spendclick: function () {
    let data = JSON.stringify({
      sdate: this.data.sdate,
      sday: this.data.sday,
      shm: this.data.shm,
      acname: this.data.acname,
      acaddr: this.data.acaddr,
      costtype: this.data.costtype,
      cost: this.data.cost,
      sweekday: this.data.sweekday
    })
    // console.log(data)
    wx.navigateTo({
      url: '../activityspend/activityspend?uid=' + uid + '&acid=' + acid + '&tkn=' + tkn + '&acstatus=' + acstatus + '&data=' + data + '&totalcost=' + totalcost
    })
  },
  // 点击活动管理
  acclick: function () {
    this.setData({
      maskshow: true,
      fixed: 'fixed'
    })
  },
  maskclick: function () {
    this.setData({
      maskshow: false,
      fixed: ''
    })
  },
  // 查看已报名人员
  lookusers: function () {
    wx.navigateTo({
      url: '../userlist/userlist?acid=' + acid + '&uid=' + uid + '&tkn=' + tkn + '&acstop=' + this.data.accancel
    })
  },
  // 报名
  sign: function (e) {
    wx.showLoading({
      title: '数据提交中'
    })
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/SignUpActivity?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn + '&formid=' + e.detail.formId,
      method: 'GET',
      success: (res) => {
        wx.hideLoading()
        // console.log(res.data.status)
        if (res.data.status == 200) {
          wx.showToast({
            title: '报名成功'
          })
          this.setData({
            sign_0: false,
            sign_1: true
          })
          this.getActivityInfo()
        }
        else {
          this.show(res.data.msg)
        }
      }
    })
  },
  // 取消报名
  cancelsign: function () {
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/CancelSignUpActivity?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        wx.hideLoading()
        if (res.data.status == 200) {
          wx.showToast({
            title: '取消报名成功'
          })
          this.setData({
            sign_1: false,
            sign_0: true
          })
          this.getActivityInfo()
        }
        else {
          this.show('操作失败!')
        }
      }
    })
  },
  // 创建者（活动正在进行)
  advance: function () { // 提前完成活动
    this.setData({
      maskshow: false,
      tqclick: true,
      fixed: 'fixed'
    })
  },
  closetqmask: function () {
    this.setData({
      maskshow: false,
      tqclick: false,
      fixed: ''
    })
  },
  tqcomfirm: function () {
    this.setData({
      maskshow: false,
      tqclick: false,
      fixed: ''
    })
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/EndActivity?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '操作成功'
          })
          this.getActivityInfo()
        }
        else {
          this.show('操作失败!')
        }
      },
      fail: () => {
        this.show('数据出错!')
      }
    })
  },
  // 截止报名
  stopsign: function () {
    this.setData({
      maskshow: false,
      stopclick: true,
      fixed: 'fixed'
    })
  },
  closestopmask: function () {
    this.setData({
      maskshow: false,
      stopclick: false,
      fixed: ''
    })
  },
  stopcomfirm: function () {
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/EndActivitySign?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.status)
        if (res.data.status == 200) {
          wx.showToast({
            title: '报名已截止'
          })
          this.getActivityInfo()
        }
        else {
          this.show('数据出错!')
        }
      },
      complete: () => {
        this.setData({
          maskshow: false,
          stopclick: false,
          fixed: ''
        })
      }
    })
  },
  // 修改活动
  updateinfo: function () {
    wx.navigateTo({
      url: '../activityEdit/activityEdit?acid=' + acid + '&sdate=' + this.data.sdate + '&sday=' + this.data.sday + '&sweekday=' + this.data.sweekday + '&shm=' + this.data.shm + '&acname=' + this.data.acname + '&acaddr=' + this.data.acaddr + '&actip=' + this.data.actip + '&cost=' + this.data.cost + '&costtype=' + this.data.costtype + '&edate=' + edate + '&eday=' + eday + '&ehm=' + ehm + '&limit=' + limit + '&tkn=' + tkn + '&uid=' + uid + '&avatar=' + avatar + '&nickname=' + nickname + '&syear=' + syear + '&eyear=' + eyear
    })
    this.setData({
      maskshow: false
    })
  },
  // 取消活动
  cancelactivity: function () {
    this.setData({
      maskshow: false,
      qxclick: true,
      fixed: ''
    })
  },
  closeqxmask: function () {
    this.setData({
      maskshow: false,
      qxclick: false,
      fixed: ''
    })
  },
  qxcomfirm: function () {
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/CancelActivity?ActivityId=' + acid + '&uid=' + uid + '&tkn=' + tkn,
      method: 'GET',
      success: (res) => {
        // console.log(res.data.status)
        if (res.data.status == 200) {
          wx.showToast({
            title: '已成功取消'
          })
          this.getActivityInfo()
          this.setData({
            iscreate: ''
          })
        }
        else {
          this.show('数据出错!')
        }
      },
      complete: () => {
        this.setData({
          maskshow: false,
          qxclick: false,
          fixed: ''
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
      // title: '赶快来报名！就等你了',
      title: sharetitle,
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
