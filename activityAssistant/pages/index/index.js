// index.js
const app = getApp()
let tab
let uid
let tkn
let date = {}
let avatar
let nickname
let firstinto
Page({
  data: {
    imglist: [],
    items: [
      { value: 0, name: '已报名', checked: true },
      { value: 1, name: '活动历史', checked: false },
      { value: 2, name: '浏览足迹', checked: false }
    ],
    itemValue: '已报名',
    firstinto: false
  },
  getinfo: function (res) {
	// console.log(res.detail.userInfo);
	let info = res.detail.userInfo;
	let avtar = info.avatarUrl;
	let nickname = info.nickname;
	// 获取用户资料
	wx.login({
		success: (res) => {
			console.log(res);
			let code = res.code
			// console.log('code:' + code)
			wx.request({
				url: 'https://service.51wnl.com/Api/WxProgram/WxProCodeLogin?Programe=ActivityAssist&code=' + code,
				method: 'GET',
				success: (respond) => {
					console.log(respond);
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
							// wx.showLoading({
							//   title: '加载中',
							// })
							that.getActivityList()
						},
						fail: () => {
							that.show('获取用户信息失败')
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
  onLoad: function () {
    new app.ToastPannel()
    let that = this
    // 判断用户是否第一次进入
    if (wx.getStorageSync('firstinto') !== 1) {
      wx.setStorageSync('firstinto', 1)
      this.setData({
        firstinto: true
      // showsponsor: false
      })
    }
    // 用户头像显示
    if (this.data.count <= 7) {
      this.setData({
        headclass: 'item1'
      })
    }
    else {
      this.setData({
        headclass: 'item'
      })
    }
    // 获取用户信息
    wx.getUserInfo({
      success: (res) => {
        // console.log(res.userInfo.nickName)
        avatar = res.userInfo.avatarUrl
        nickname = res.userInfo.nickName
        // 获取用户资料
        // wx.login({
        //   success: (res) => {
        //     let code = res.code
        //     console.log('code:' + code)
        //     wx.request({
        //       url: 'https://service.51wnl.com/Api/WxProgram/WxProCodeLogin?Programe=ActivityAssist&code=' + code,
        //       method: 'GET',
        //       success: (respond) => {	
        //         let openid = respond.data.data.openId
        //         console.log('openid:' + openid)
        //         // 获取微信用户信息
        //         wx.request({
        //           url: 'https://service.51wnl.com/Api/WxProgram/WxProLogin',
        //           method: 'POST',
        //           data: {
        //             Programe: 'ActivityAssist',
        //             OpenId: openid,
        //             AvatarUrl: avatar,
        //             NickName: nickname
        //           },
        //           success: (restext) => {
        //             uid = restext.data.data.userId
        //             tkn = restext.data.data.accessToken
        //             // wx.showLoading({
        //             //   title: '加载中',
        //             // })
        //             that.getActivityList()
        //           },
        //           fail: () => {
        //             that.show('获取用户信息失败')
        //           }
        //         })
        //       },
        //       fail: () => {
        //         that.show('获取登录信息失败')
        //       }
        //     })
        //   }
        // })
      },
      fail: () => {
        // 用户拒绝授权后的处理
        console.log('出错了')
        wx.showModal({
          title: '授权失败',
          content: '请重新打开小程序并允许授权以体验更多功能',
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
  },
  onShow: function () {
    let that = this
    if (uid || tkn) {
      this.getActivityList()
    }
  },
  // 发起活动
  sponsor: function () {
    wx.navigateTo({
      url: '../activityEdit/activityEdit?uid=' + uid + '&tkn=' + tkn + '&avatar=' + avatar + '&nickname=' + nickname
    })
  },
  closeguide: function () {
    this.setData({
      firstinto: false
    })
  },
  // 活动状态下拉选择
  choose: function () {
    this.setData({
      selectlist: true,
      fixed: 'fixed'
    })
  },
  closeselect: function () {
    this.setData({
      selectlist: false,
      fixed: ''
    })
  },
  // 首页顶部tab选择
  choice: function (e) {
    // console.log(e.currentTarget.dataset.value)
    let items = this.data.items
    for (let i = 0, len = items.length; i < len; i++) {
      if (items[i].value === e.currentTarget.dataset.value) {
        items[i].checked = true
        tab = items[i].value
        this.getActivityList()
        this.setData({
          'itemValue': items[i].name
        })
      }
      else {
        items[i].checked = false
      }
    }
    this.setData({
      items: items,
      selectlist: false,
      fixed: ''
    })
  // console.log(this.data.items)
  },
  // 获取活动列表信息
  getActivityList: function () {
    let that = this
    // 更新上次选择tab值
    for (let i = 0, len = this.data.items.length; i < len; i++) {
      if (parseInt(this.data.items[i].value) === parseInt(tab)) {
        this.data.items[i].checked = true
        this.setData({
          'itemValue': this.data.items[i].name
        })
      }
      else {
        this.data.items[i].checked = false
      }
    }
    this.setData({
      items: this.data.items
    })
    // 请求活动列表信息
    wx.request({
      url: 'https://service.51wnl.com/Api/WxProgram/GetActivity?page=1&pagesize=20&uid=' + uid + '&tab=' + tab,
      method: 'GET',
      success: (resdata) => {
        let activitydata = resdata.data.data
        let sweek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        let datalength = activitydata.length
        // 开始时间显示
        for (let i = 0; i < datalength; i++) {
          let syear = activitydata[i].startDate.slice(0, 4)
          let sdate = activitydata[i].startDate.slice(5, 7)
          let sday = activitydata[i].startDate.slice(8, 10)
          let shm = activitydata[i].startDate.slice(11, 16)
          let count = activitydata[i].joiners.length
          activitydata[i].createUserNickName = activitydata[i].createUserNickName
          // 修改信息标红
          // console.log(activitydata[i].updateFlag)
          if (activitydata[i].updateFlag !== '') {
            let length = 8 - activitydata[i].updateFlag.length
            activitydata[i].updateFlag = activitydata[i].updateFlag.toString()
            if (length > 0) {
              for (let j = 0; j < length; j++) {
                activitydata[i].updateFlag = '0' + activitydata[i].updateFlag
              }
            }
            else {
              activitydata[i].updateFlag = activitydata[i].updateFlag
            }
            if (activitydata[i].updateFlag.slice(0, 1) === '1') {
              activitydata[i].namecolor = 'red'
            }
            if (activitydata[i].updateFlag.slice(1, 2) === '1') {
              activitydata[i].timecolor = 'red'
            }
            if (activitydata[i].updateFlag.slice(3, 4) === '1') {
              activitydata[i].addrcolor = 'red'
            }
            if (activitydata[i].updateFlag.slice(5, 6) === '1' || activitydata[i].updateFlag.slice(6, 7) === '1') {
              activitydata[i].spendcolor = 'red'
            }
            if (activitydata[i].updateFlag.slice(7, 8) === '1') {
              activitydata[i].tipcolor = 'red'
            }
          // console.log(activitydata[0].namecolor)
          }
          activitydata[i].syear = syear !== new Date().getFullYear() ? syear : ''
          activitydata[i].sdate = sdate
          activitydata[i].sday = sday
          activitydata[i].shm = shm
          activitydata[i].sweekday = sweek[new Date(activitydata[i].startDate.split(' ')[0]).getDay()]
          activitydata[i].count = count
          activitydata[i].costvalue = activitydata[i].cost === 0 ? '' : (activitydata[i].cost / 100).toFixed(2)
          activitydata[i].createUserAvatarUrl = '' ? 'https://mobile.51wnl.com/activityAssistant/img/headimg.jpg' : activitydata[i].createUserAvatarUrl
          activitydata[i].createUserNickName = activitydata[i].createUserNickName.length > 3 ? activitydata[i].createUserNickName.slice(0, 3) + '...' : activitydata[i].createUserNickName
          activitydata[i].joiners.length = activitydata[i].joiners.length > 9 ? 9 : activitydata[i].joiners.length
          if (activitydata[i].activityPlat === 2) {
            activitydata[i].status = '官方活动'
            activitydata[i].createUserNickName = '官方活动'
            // activitydata[i].signstatus = 1
            activitydata[i].createUserAvatarUrl = 'https://mobile.51wnl.com/activityAssistant/img/icon.jpg'
            activitydata[i].showcrown = ''
          }
          else {
            activitydata[i].status = activitydata[i].tagText
            activitydata[i].showcrown = true
          }
          for (let j = 0, joinerlen = activitydata[i].joiners.length; j < joinerlen; j++) {
            activitydata[i].joiners[j].joinerAvatarUrl = activitydata[i].joiners[j].joinerAvatarUrl === '' ? 'https://mobile.51wnl.com/activityAssistant/img/headimg.jpg' : activitydata[i].joiners[j].joinerAvatarUrl;
          }
          // 跨年显示年份
          // if (activitydata[i].syear == new Date().getFullYear() + 1) {
          //   activitydata[i].showyear = true
          // }
          // 判断参与者报名状态（signstatus  0: 未报名  1: 已报名)
          // if (activitydata[i].joiners.length === 0) {
          //   activitydata[i].signstatus = 0
          // }
          // else {
          //   for (let j = 0; j < activitydata[i].joiners.length; j++) {
          //     if (activitydata[i].joiners[j].joinerId === uid) {
          //       activitydata[i].signstatus = 1;
          //       break;
          //     }
          //   }
          // }
        }
        that.setData({
          activitydata: activitydata
        })
        // console.log(activitydata)
        wx.hideLoading()
      }
    })
  },
  // 进入活动详情页
  todetail: function (e) {
    let acid = e.currentTarget.dataset.acid
    let index = e.currentTarget.dataset.index
    let acstatus = e.currentTarget.dataset.acstatus
    app.globalData.acid = acid
    app.globalData.uid = uid
    app.globalData.tkn = tkn
    // console.log(app.globalData.uid)
    wx.navigateTo({
      url: '../activityDetails/activityDetails?acid=' + acid + '&uid=' + uid + '&tkn=' + tkn + '&index=' + index + '&acstatus=' + acstatus + '&avatar=' + avatar + '&nickname=' + nickname
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // console.log(res.target)
    }
    return {
      title: '快来发起一个活动吧！',
      // title: sharetitle,
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
