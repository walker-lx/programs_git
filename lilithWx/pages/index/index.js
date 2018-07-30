var Charts = require('../utils/wxcharts.js');
var app = getApp()

//获取星期
function getWeekday() {
  var a = new Date()
  var myxingqi = a.getDay()
  var b = new Array()
  b[0] = "Sunday";
  b[1] = "Monday";
  b[2] = "Tuesday";
  b[3] = "Wednesday";
  b[4] = "Thursday";
  b[5] = "Friday";
  b[6] = "Saturday";
  return b[myxingqi]
}

//获取当前的小时
function gethour() {
  let date = new Date();
  let hour = date.getHours();
  let str = '';
  if(hour > 5 && hour < 13) {
    str = '上午好'
  } else if (hour < 18 && hour >= 13) {
    str = '下午好'
  } else {
    str = '晚上好'
  };
  return str;
}

//获取当前日期及后面指定天数的日期
function getday(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期  
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份
  var d = dd.getDate();//获取当前几号 
  if (d == '1') {
    return m + '月' + d + '日'
  } else {
    return d + '日'
  }
}

//获取当前日期
function getdate() {
  var dd = new Date();
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份
  var d = dd.getDate();//获取当前几号 
  if(m < 10) {
    m = '0' + m
  }
  if(d < 10) {
    d = '0' + d
  }
  return m + '.' + d + '.' + y
}

//获取年月日
function getymd(AddDayCount) {
  var dd = new Date();
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份
  var d = dd.getDate();//获取当前几号 
  return y + '年' + m + '月' + d + '日'
}

function getdata() {
  var loveshow = '',cfshow = '',workshow = '',lucknone = '';
  return {
    loveshow: true,
    cfshow: true,
    workshow: true,
    lucknone: false
  }
}

//获取星座及对应时间
function getXz(n) {
  let xz = '',t = '',xzbg = '';
  let obj = {
    'xz': xz,
    't': t,
    'xzbg': xzbg
  }
  switch (n) {
    case 0:
      obj.xz = '';
      obj.t = '';
      obj.xzbg = ''
      break;
    case 1:
      obj.xz = '水瓶座'
      obj.t = '01.21-02.18'
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Aquarius@2x.png'            
      break;
    case 2:
      obj.xz = '双鱼座'
      obj.t = '02.19-03.20'
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Pisces@2x.png'      
      break;
    case 3:
      obj.xz = '白羊座'
      obj.t = '03.21-04.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Aries@2x.png'     
      break;
    case 4:
      obj.xz = '金牛座'
      obj.t = '04.21-05.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Taurus@2x.png'           
      break;
    case 5:
      obj.xz = '双子座'
      obj.t = '05.21-06.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Gemini@2x.png'                      
      break;
    case 6:
      obj.xz = '巨蟹座'
      obj.t = '06.21-07.20'
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Cancer@2x.png'                       
      break;
    case 7:
      obj.xz = '狮子座'
      obj.t = '07.21-08.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Leo@2x.png'                      
      break;
    case 8:
      obj.xz = '处女座'
      obj.t = '08.21-09.20'
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Virgo@2x.png'                       
      break;
    case 9:
      obj.xz = '天秤座'
      obj.t = '09.21-10.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Libra@2x.png'                      
      break;
    case 10:
      obj.xz = '天蝎座'
      obj.t = '10.21-11.20' 
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Scorpio@2x.png'                      
      break;
    case 11:
      obj.xz = '射手座'
      obj.t = '11.21-12.20'
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Sagittarius@2x.png'                 
      break;
    case 12:
      obj.xz = '摩羯座'
      obj.t = '12.21-01.20'      
      obj.xzbg = 'https://mobile.51wnl.com/lilith/lilithWx/pages/img/Capricorn@2x.png'                 
      break;
  }
  return obj;
}
var avg = [], love = [], cf = [], work = [], numavg = '', numwork = '', numlove = '', numcf = '';        
// console.log(getXz(1))
// console.log(getymd())
Page({
  data: {
    t: getdate(),
    tiptext:'您的完整运势如下',
    animation1: '',
    showcard: true,
    hidecard: false, 
    // show: true,
    cardsrc: '../img/tl_bg.jpg',
    showmon: false,
    monthhide: true,
    bgsrc1: wx.getStorageSync('bgimg'),
    array: [getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(),
      getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(),
      getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata(), getdata()
    ],
    hello: gethour(),
    week: getWeekday(),
    day3: getday(2),
    day4: getday(3),
    day5: getday(4),
    day6: getday(5),
    day7: getday(6),
    day8: getday(7),
    day9: getday(8),
    day10: getday(9),
    day11: getday(10),
    day12: getday(11),
    day13: getday(12),
    day14: getday(13),
    day15: getday(14),
    day16: getday(15),
    day17: getday(16),
    day18: getday(17),
    day19: getday(18),
    day20: getday(19),
    day21: getday(20),
    day22: getday(21),
    day23: getday(22),
    day24: getday(23),
    day25: getday(24),
    day26: getday(25),
    day27: getday(26),
    day28: getday(27),
    luckday4: getday(3),
    luckday5: getday(4),
    luckday6: getday(5),
    luckday7: getday(6),
    // getmore: 'getmore',
    getCard: 'getCard'
  },
  
  getmore: function() {
    let that = this
    wx.showModal({
      title: '请完善资料，获取准确运势信息',
      showCancel: true,
      cancelText: '不了',
      cancelColor: '#000',
      confirmText: '现在去',
      confirmColor: '#000',
      success: function(res) {
        if(res.confirm) {
          wx.switchTab({
            url: '../logs/logs',
          })
          that.setData({
            getmore: ''
          })
        } 
        else {
          that.setData({
            getmore: 'getmore'
          })
        }
        
      },
      fail: function(res) {
      },
      complete: function(res) {
      },
    })
  },
  getCard: function () {
    let that = this;
    // let explain,describe;
    wx.setStorageSync('today', getymd())
    console.log(wx.getStorageSync('today'))
    that.animation.rotateY(180).step();
    //请求塔罗牌数据
    wx.request({
      url: 'https://lilith.51wnl.com/GetTarots?cid=Youloft_Android&tkn=D0513B7CEF494E82AEAFDFF7B2183ECF',
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.image + '塔罗牌地址');
        
        wx.setStorageSync('tarot', res.data.data.image)
        wx.setStorageSync('tarotname', res.data.data.name)
        wx.setStorageSync('tarotkey', res.data.data.keys)
        wx.setStorageSync('tarotxz', res.data.data.signs)
        wx.setStorageSync('tarotys', res.data.data.element)
        wx.setStorageSync('tarotup', res.data.data.isUp)
        wx.setStorageSync('tarotexplain', res.data.data.explain)
        wx.setStorageSync('tarotpm', res.data.data.describe)
        that.setData
        // describe = res.data.data.describe
        // explain = res.data.data.explain
        that.setData({
          explain: res.data.data.explain,
          describe: res.data.data.describe
        })
        
        //更新塔罗牌数据
        setTimeout(function () {
          that.setData({
            showcard: false,
            hidecard: true,
            tarotkey: res.data.data.keys,
            tarotxz: res.data.data.signs,
            tarotys: res.data.data.element,
            tarotup: res.data.data.isUp,
            tarotname: res.data.data.name,
            cardsrc: res.data.data.image
          })
        },400)
      }
    })
  },
  getDesc: function () {
    wx.navigateTo({
      url: '../desc/desc?card=' + this.data.cardsrc +'&explain='+ this.data.explain +'&describe='+ this.data.describe,
    })
  },
  getmonth: function () {
    this.setData({
      showmon: true,
      monthhide: false,
      fix: 'fix'
    })
  },
  
  closed: function (e) {
    this.setData(
      {
        showmon: false,
        monthhide: true,
        fix: ''
      }
    );
  },

  //页面加载
  onLoad: function (options) {
    let that = this;
    let xbval,nickname,headimg,openid;
    // openid = app.getopenid()
    wx.getUserInfo({
      success: function (res) {
        // console.log(res.userInfo + '用户微信个人信息')
        if (res.userInfo.gender == 1) {
          xbval = 0
        } else {
          xbval = 1
        }
        nickname = res.userInfo.nickName
        headimg = res.userInfo.avatarUrl
        wx.setStorageSync('nickname', res.userInfo.nickName)
        wx.setStorageSync('sex', xbval)
        wx.setStorageSync('headimg', res.userInfo.avatarUrl)
        console.log(nickname)

        // that.setData({
        //   user_name: 'zj789',                                                                                           
        // })
        console.log(wx.getStorageSync('openid'))

        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res.code)
            wx.request({
              url: 'https://b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo?name=lls&code=' + res.code,
              method: 'GET',
              success: function (res) {
                console.log(res.data)
                wx.setStorageSync('openid', res.data.OpenID)
                console.log(res.data.OpenID)
                openid = res.data.OpenID
                console.log(openid)
                //请求莉莉丝登录接口，返回用户信息
                wx.request({
                  url: 'https://lilith.51wnl.com/OpenLogin?cid=Youloft_Android&tkn=D0513B7CEF494E82AEAFDFF7B2183ECF',
                  // header: {
                  //   "content-type": "application/x-www-form-urlencoded"
                  // },
                  method: "POST",
                  data: {
                    "NickName": nickname,
                    "platform": 0,
                    "headimgurl": headimg,
                    "did": openid,
                    "openId": openid,
                    "gender": xbval,
                    "av": "1.0"
                  },
                  success: function (res) {
                    // wx.showToast({
                    //   title: wx.getStorageSync('openid'),
                    //   duration:3000
                    // })
                    console.log(res.data)
                    wx.setStorageSync('uid', res.data.data.userInfo.id)
                    app.globalData.userid = res.data.data.userInfo.id
                    wx.setStorageSync('xzsigns', res.data.data.userInfo.signs)
                    wx.setStorageSync('username', res.data.data.userInfo.nickName)
                    wx.setStorageSync('userxb', res.data.data.userInfo.sex)
                    wx.setStorageSync('userheadbg', res.data.data.userInfo.headImg)
                    wx.setStorageSync('userbirthplace', res.data.data.userInfo.birthPlace)
                    wx.setStorageSync('userliveplace', res.data.data.userInfo.livePlace)

                    if (res.data.data.userInfo.nickName.length >= 7) {
                      that.setData({
                        user_name: res.data.data.userInfo.nickName.slice(0, 7) + '...',
                        getmore: ''
                      })
                    } else {
                      that.setData({
                        user_name: res.data.data.userInfo.nickName,
                        tiptext: '您的完整运势如下',
                        test: getXz(res.data.data.userInfo.signs).xz,
                        // test: getXz(6).xz,          
                        time: getXz(res.data.data.userInfo.signs).t,
                        xzdesc: '',
                        xzbg: getXz(res.data.data.userInfo.signs).xzbg,
                        getmore: 'getmore'
                      })
                    }
                    console.log(wx.getStorageSync('username'))
                    // if (res.data.data.userInfo.nickName) {
                    //   that.setData({
                    //     getmore: ''
                    //   })
                    // }

                    //存储用户生日信息
                    let birday = res.data.data.userInfo.birthDay
                    wx.setStorageSync('birdate', birday.slice(0, 10))
                    wx.setStorageSync('birtime', birday.slice(10, birday.length - 3))
                    // console.log(wx.getStorageSync('birdate'))
                    // console.log(wx.getStorageSync('birtime'))
                    var addr = res.data.data.userInfo.birthPlace.split('-')
                    var addr1 = res.data.data.userInfo.livePlace.split('-')
                    wx.setStorageSync('addr', addr)
                    wx.setStorageSync('addr1', addr1)
                    // console.log(addr[0])
                    console.log(wx.getStorageSync('addr'))
                    // console.log(res.data.data.userInfo.birthPlace)
                    // console.log(res.data.data.userInfo.signs) 
                    // if (wx.getStorageSync('user_name') !== '') {
                    //   that.setData({
                    //     getmore: ''
                    //   })
                    // } else {
                    //   that.setData({
                    //     getmore: 'getmore'
                    //   })
                    // }
                  }
                })
              }
            }) //获取用户资料
              }
            })
          }
        })
        
    
    //页面加载
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //监听有无网络
    wx.onNetworkStatusChange(function(res) {
      console.log(res.networkType)
      if(res.isConnected = false) {
        wx.showToast({
          title: '亲，没有网络哦~',
        })
      }
    })
  },
  onReady: function () {
    var that = this
    //塔罗牌动画
    that.animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear'
    });
    that.setData({
      animation1: that.animation.export(),
    })
    console.log(wx.getStorageSync('uid'))
    //每天点击翻牌（一次）
    if (wx.getStorageSync('today')) {
      if (getymd() == wx.getStorageSync('today')) {
        that.setData({
          // getCard: '',
          showcard: false,
          hidecard: true,
          tarotkey: wx.getStorageSync('tarotkey'),
          tarotxz: wx.getStorageSync('tarotxz'),
          tarotys: wx.getStorageSync('tarotys'),
          tarotup: wx.getStorageSync('tarotup'),
          tarotname: wx.getStorageSync('tarotname'),
          cardsrc: wx.getStorageSync('tarot')
        })
      }
    }
    console.log(wx.getStorageSync('tarot'))
    if (wx.getStorageSync('user_name') || wx.getStorageSync('username')) {
      that.setData({
        getmore: ''
      })
    } else {
      that.setData({
        getmore: 'getmore'
      })
    }
    //显示用户名
    // if (wx.getStorageSync('user_name')) {
    //   that.setData({
    //     getmore: ''
    //   })
    //   if (wx.getStorageSync('user_name').length >= 7) {
    //     that.setData({
    //       user_name: wx.getStorageSync('user_name').slice(0, 7) + '...'
    //     })
    //   }
    // }

    //用户生日数据
    if (wx.getStorageSync('birth_date')) {
      that.setData({
        birdt: wx.getStorageSync('birth_date')
      })
    } else if (wx.getStorageSync('birdate')) {
      birdt: wx.getStorageSync('birdate')
    } else {
      that.setData({
        birdt: '1998-03-28'
      })
    }
    console.log(that.data.birdt)
    if (wx.getStorageSync('username').length >= 7) {
      this.setData({
        user_name: wx.getStorageSync('username').slice(0,7) + '...'
      })
    } else {
      this.setData({
        user_name: wx.getStorageSync('username')
      })
    }
  },
 
  onShow: function() {
    let that = this
    console.log(wx.getStorageSync('birdate'))
    if (wx.getStorageSync('user_name') || wx.getStorageSync('username')) {
      that.setData({
        getmore: ''
      })
    } else {
      that.setData({
        getmore: 'getmore'
      })
    }
    var avg = [], love = [], cf = [], work = [], numavg = '', numwork = '', numlove = '', numcf = '';    
    if (wx.getStorageSync('user_name')) {
      if (wx.getStorageSync('user_name').length >= 7) {
        that.setData({
          user_name: wx.getStorageSync('user_name').slice(0, 7) + '...',
          user_name: wx.getStorageSync('user_name') ? wx.getStorageSync('user_name') : wx.getStorageSync('nickname'),
          test: getXz(wx.getStorageSync('xz_name')).xz ? getXz(wx.getStorageSync('xz_name')).xz : getXz(wx.getStorageSync('xzsigns')).xz,
          time: getXz(wx.getStorageSync('xz_name')).t ? getXz(wx.getStorageSync('xz_name')).t : getXz(wx.getStorageSync('xzsigns')).t,
          xzbg: getXz(wx.getStorageSync('xz_name')).t ? getXz(wx.getStorageSync('xz_name')).t : getXz(wx.getStorageSync('xzsigns')).xzbg
        })
      } else {
        that.setData({
          // getmore: '',
          user_name: wx.getStorageSync('user_name') ? wx.getStorageSync('user_name') : wx.getStorageSync('nickname'),
          test: getXz(wx.getStorageSync('xz_name')).xz ? getXz(wx.getStorageSync('xz_name')).xz : getXz(wx.getStorageSync('xzsigns')).xz,
          time: getXz(wx.getStorageSync('xz_name')).t ? getXz(wx.getStorageSync('xz_name')).t : getXz(wx.getStorageSync('xzsigns')).t,
          xzbg: getXz(wx.getStorageSync('xz_name')).t ? getXz(wx.getStorageSync('xz_name')).t : getXz(wx.getStorageSync('xzsigns')).xzbg
        })
      } 
    }
    
    console.log(wx.getStorageSync('birthdate'))
    
    // var timer1 = setInterval(function() {
    var bdt = wx.getStorageSync('birth_date') || wx.getStorageSync('birdate') || '1995-03-22'
    // var bdt = '1995-03-22'    
      wx.request({
        url: 'https://lilith.51wnl.com/GetPredicts?birdt='+bdt+'&day=28&cid=Youloft_Android&tkn=D0513B7CEF494E82AEAFDFF7B2183ECF',
        method: 'GET',
        // data: {
        //   birdt: wx.getStorageSync('birth_date') || wx.getStorageSync('birdate') || '1995-03-22',
        //   days: 28
        // },
        success: function (res) {
          
          let mes = res.data.data
          console.log(res.data)
          // wx.setStorageSync('msgavg', mes.msgAvg)
          // wx.setStorageSync('msglove', mes.msglove)
          // wx.setStorageSync('msgwealth', mes.msgwealth)
          // wx.setStorageSync('msgcareer', mes.msgcareer)
          wx.setStorageSync('bgimg', mes.bgImg)
          wx.setStorageSync('xzdesc', mes.msg)
          // console.log(mes.bgImg)
          if (mes.mshAvg == 'null') {
            that.setData({
              xzdesc: mes.msgAvg,
              luckavg: mes.msgAvg,
              luckgqy: mes.msglove,
              luckcfy: mes.msgwealth,
              luckgzy: mes.msgcareer,
              bgsrc1: mes.bgImg,
              test: getXz(mes.signs).xz,
              time: getXz(mes.signs).t,
              xzbg: getXz(mes.signs).xzbg,
            })
          } else {
            //存储运势数据
            that.setData({
              luckavg: mes.msgAvg,
              luckgqy: mes.msglove,
              luckcfy: mes.msgwealth,
              luckgzy: mes.msgcareer,
              bgsrc1: mes.bgImg,
              test: getXz(mes.signs).xz,
              time: getXz(mes.signs).t,
              xzbg: getXz(mes.signs).xzbg,
              xzdesc: ''
            })
            
          }
          console.log(mes)
          for (let i = 0; i < 28; i++) {
            wx.setStorageSync('avg' + i, mes.predicts[i].avg)
            wx.setStorageSync('love' + i, mes.predicts[i].ptlove)
            wx.setStorageSync('cf' + i, mes.predicts[i].ptwealth)
            wx.setStorageSync('work' + i, mes.predicts[i].ptcareer)
            var numavg = wx.getStorageSync('avg' + i);
            var numlove = wx.getStorageSync('love' + i);
            var numwork = wx.getStorageSync('work' + i);
            var numcf = wx.getStorageSync('cf' + i);
            avg.push(numavg)
            love.push(numlove)
            work.push(numwork)
            cf.push(numcf)
          }
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
          //存储运势数据
          for (let i = 0; i < 28; i++) {
            var numavg = wx.getStorageSync('avg' + i);
            var numlove = wx.getStorageSync('love' + i);
            var numwork = wx.getStorageSync('work' + i);
            var numcf = wx.getStorageSync('cf' + i);
            avg.push(numavg)
            love.push(numlove)
            work.push(numwork)
            cf.push(numcf)
            // lovedata.push('loveshow' + i)
            // cfdata.push('cfshow' + i)
            // workdata.push('workshow' + i)
          }
          //填充数据
          if (love[1] < 2) {
            that.setData({
              gq1: '2',
              gq2: '2',
              gq3: '2',
              gq4: '2',
              gq5: '2',
            })
          } else if (love[1] < 4) {
            that.setData({
              gq1: '',
              gq2: '2',
              gq3: '2',
              gq4: '2',
              gq5: '2',
            })
          } else if (love[1] < 6) {
            that.setData({
              gq1: '',
              gq2: '',
              gq3: '2',
              gq4: '2',
              gq5: '2',
            })
          } else if (love[1] < 8) {
            that.setData({
              gq1: '',
              gq2: '',
              gq3: '',
              gq4: '2',
              gq5: '2',
            })
          } else if (love[1] < 10) {
            that.setData({
              gq1: '',
              gq2: '',
              gq3: '',
              gq4: '',
              gq5: '2',
            })
          } else {
            that.setData({
              gq1: '',
              gq2: '',
              gq3: '',
              gq4: '',
              gq5: '',
            })
          }

          //财富图标值
          if (cf[1] < 2) {
            that.setData({
              cf1: '2',
              cf2: '2',
              cf3: '2',
              cf4: '2',
              cf5: '2',
            })
          } else if (cf[1] < 4) {
            that.setData({
              cf1: '',
              cf2: '2',
              cf3: '2',
              cf4: '2',
              cf5: '2',
            })
          } else if (cf[1] < 6) {
            that.setData({
              cf1: '',
              cf2: '',
              cf3: '2',
              cf4: '2',
              cf5: '2',
            })
          } else if (cf[1] < 8) {
            that.setData({
              cf1: '',
              cf2: '',
              cf3: '',
              cf4: '2',
              cf5: '2',
            })
          } else if (cf[1] < 10) {
            that.setData({
              cf1: '',
              cf2: '',
              cf3: '',
              cf4: '',
              cf5: '2',
            })
          } else {
            that.setData({
              cf1: '',
              cf2: '',
              cf3: '',
              cf4: '',
              cf5: '',
            })
          }

          //工作图标值
          if (work[1] < 2) {
            that.setData({
              gz1: '2',
              gz2: '2',
              gz3: '2',
              gz4: '2',
              gz5: '2',
            })
          } else if (work[1] < 4) {
            that.setData({
              gz1: '',
              gz2: '2',
              gz3: '2',
              gz4: '2',
              gz5: '2',
            })
          } else if (work[1] < 6) {
            that.setData({
              gz1: '',
              gz2: '',
              gz3: '2',
              gz4: '2',
              gz5: '2',
            })
          } else if (work[1] < 8) {
            that.setData({
              gz1: '',
              gz2: '',
              gz3: '',
              gz4: '2',
              gz5: '2',
            })
          } else if (work[1] < 10) {
            that.setData({
              gz1: '',
              gz2: '',
              gz3: '',
              gz4: '',
              gz5: '2',
            })
          } else {
            that.setData({
              gz1: '',
              gz2: '',
              gz3: '',
              gz4: '',
              gz5: '',
            })
          }

          // console.log(love)
          // console.log(work)
          // console.log(cf)    

          //填充月历数据
          if ((love[1] > 8) || (work[1] > 8) || (cf[1] > 8)) {
            that.setData({
              'array[0].lucknone': true,
            })
          }
          if ((love[2] > 8) || (work[2] > 8) || (cf[2] > 8)) {
            that.setData({
              'array[1].lucknone': true,
            })
          }
          if ((love[3] > 8) || (work[3] > 8) || (cf[3] > 8)) {
            that.setData({
              'array[2].lucknone': true,
            })
          }
          if ((love[4] > 8) || (work[4] > 8) || (cf[4] > 8)) {
            that.setData({
              'array[3].lucknone': true,
            })
          }
          if ((love[5] > 8) || (work[5] > 8) || (cf[5] > 8)) {
            that.setData({
              'array[4].lucknone': true,
            })
          }
          if ((love[6] > 8) || (work[6] > 8) || (cf[6] > 8)) {
            that.setData({
              'array[5].lucknone': true,
            })
          }
          if ((love[7] > 8) || (work[7] > 8) || (cf[7] > 8)) {
            that.setData({
              'array[6].lucknone': true,
            })
          }
          if ((love[8] > 8) || (work[8] > 8) || (cf[8] > 8)) {
            that.setData({
              'array[7].lucknone': true,
            })
          }
          if ((love[9] > 8) || (work[9] > 8) || (cf[9] > 8)) {
            that.setData({
              'array[8].lucknone': true,
            })
          }
          if ((love[10] > 8) || (work[10] > 8) || (cf[10] > 8)) {
            that.setData({
              'array[9].lucknone': true,
            })
          }
          if ((love[11] > 8) || (work[11] > 8) || (cf[11] > 8)) {
            that.setData({
              'array[10].lucknone': true,
            })
          }
          if ((love[12] > 8) || (work[12] > 8) || (cf[12] > 8)) {
            that.setData({
              'array[11].lucknone': true,
            })
          }
          if ((love[13] > 8) || (work[13] > 8) || (cf[13] > 8)) {
            that.setData({
              'array[12].lucknone': true,
            })
          }
          if ((love[14] > 8) || (work[14] > 8) || (cf[14] > 8)) {
            that.setData({
              'array[13].lucknone': true,
            })
          }
          if ((love[15] > 8) || (work[15] > 8) || (cf[15] > 8)) {
            that.setData({
              'array[14].lucknone': true,
            })
          }
          if ((love[16] > 8) || (work[16] > 8) || (cf[16] > 8)) {
            that.setData({
              'array[15].lucknone': true,
            })
          }
          if ((love[17] > 8) || (work[17] > 8) || (cf[17] > 8)) {
            that.setData({
              'array[16].lucknone': true,
            })
          }
          if ((love[18] > 8) || (work[18] > 8) || (cf[18] > 8)) {
            that.setData({
              'array[17].lucknone': true,
            })
          }
          if ((love[19] > 8) || (work[19] > 8) || (cf[19] > 8)) {
            that.setData({
              'array[18].lucknone': true,
            })
          }
          if ((love[20] > 8) || (work[20] > 8) || (cf[20] > 8)) {
            that.setData({
              'array[19].lucknone': true,
            })
          }
          if ((love[21] > 8) || (work[21] > 8) || (cf[21] > 8)) {
            that.setData({
              'array[20].lucknone': true,
            })
          }
          if ((love[22] > 8) || (work[22] > 8) || (cf[22] > 8)) {
            that.setData({
              'array[21].lucknone': true,
            })
          }
          if ((love[23] > 8) || (work[23] > 8) || (cf[23] > 8)) {
            that.setData({
              'array[22].lucknone': true,
            })
          }
          if ((love[24] > 8) || (work[24] > 8) || (cf[24] > 8)) {
            that.setData({
              'array[23].lucknone': true,
            })
          }
          if ((love[25] > 8) || (work[25] > 8) || (cf[25] > 8)) {
            that.setData({
              'array[24].lucknone': true,
            })
          }
          if ((love[26] > 8) || (work[26] > 8) || (cf[26] > 8)) {
            that.setData({
              'array[25].lucknone': true,
            })
          }
          if ((love[27] > 8) || (work[27] > 8) || (cf[27] > 8)) {
            that.setData({
              'array[26].lucknone': true,
            })
          }
          if ((love[28] > 8) || (work[28] > 8) || (cf[28] > 8)) {
            that.setData({
              'array[27].lucknone': true,
            })
          }


          //1
          if (love[1] > 8) {
            that.setData({
              'array[0].loveshow': false,
            })
          }
          if (work[1] > 8) {
            that.setData({
              'array[0].workshow': false,
            })
          }
          if (cf[1] > 8) {
            that.setData({
              'array[0].cfshow': false,
            })
          }
          //2
          if (love[2] > 8) {
            that.setData({
              'array[1].loveshow': false,
            })
          }
          if (work[2] > 8) {
            that.setData({
              'array[1].workshow': false,
            })
          }
          if (cf[2] > 8) {
            that.setData({
              'array[1].cfshow': false,
            })
          }
          //3
          if (love[3] > 8) {
            that.setData({
              'array[2].loveshow': false,
            })
          }
          if (work[3] > 8) {
            that.setData({
              'array[2].workshow': false,
            })
          }
          if (cf[3] > 8) {
            that.setData({
              'array[2].cfshow': false,
            })
          }
          //4
          if (love[4] > 8) {
            that.setData({
              'array[3].loveshow': false,
            })
          }
          if (work[4] > 8) {
            that.setData({
              'array[3].workshow': false,
            })
          }
          if (cf[4] > 8) {
            that.setData({
              'array[3].cfshow': false,
            })
          }
          //5
          if (love[5] > 8) {
            that.setData({
              'array[4].loveshow': false,
            })
          }
          if (work[5] > 8) {
            that.setData({
              'array[4].workshow': false,
            })
          }
          if (cf[5] > 8) {
            that.setData({
              'array[4].cfshow': false,
            })
          }
          //6
          if (love[6] > 8) {
            that.setData({
              'array[5].loveshow': false,
            })
          }
          if (work[6] > 8) {
            that.setData({
              'array[5].workshow': false,
            })
          }
          if (cf[6] > 8) {
            that.setData({
              'array[5].cfshow': false,
            })
          }
          //7
          if (love[7] > 8) {
            that.setData({
              'array[6].loveshow': false,
            })
          }
          if (work[7] > 8) {
            that.setData({
              'array[6].workshow': false,
            })
          }
          if (cf[7] > 8) {
            that.setData({
              'array[6].cfshow': false,
            })
          }
          //8
          if (love[8] > 8) {
            that.setData({
              'array[7].loveshow': false,
            })
          }
          if (work[8] > 8) {
            that.setData({
              'array[7].workshow': false,
            })
          }
          if (cf[8] > 8) {
            that.setData({
              'array[7].cfshow': false,
            })
          }
          //9
          if (love[9] > 8) {
            that.setData({
              'array[8].loveshow': false,
            })
          }
          if (work[9] > 8) {
            that.setData({
              'array[8].workshow': false,
            })
          }
          if (cf[9] > 8) {
            that.setData({
              'array[8].cfshow': false,
            })
          }
          //10
          if (love[10] > 8) {
            that.setData({
              'array[9].loveshow': false,
            })
          }
          if (work[10] > 8) {
            that.setData({
              'array[9].workshow': false,
            })
          }
          if (cf[10] > 8) {
            that.setData({
              'array[9].cfshow': false,
            })
          }
          //11
          if (love[11] > 8) {
            that.setData({
              'array[10].loveshow': false,
            })
          }
          if (work[11] > 8) {
            that.setData({
              'array[10].workshow': false,
            })
          }
          if (cf[11] > 8) {
            that.setData({
              'array[10].cfshow': false,
            })
          }
          //12
          if (love[12] > 8) {
            that.setData({
              'array[11].loveshow': false,
            })
          }
          if (work[12] > 8) {
            that.setData({
              'array[11].workshow': false,
            })
          }
          if (cf[12] > 8) {
            that.setData({
              'array[11].cfshow': false,
            })
          }
          //13
          if (love[13] > 8) {
            that.setData({
              'array[12].loveshow': false,
            })
          }
          if (work[13] > 8) {
            that.setData({
              'array[12].workshow': false,
            })
          }
          if (cf[13] > 8) {
            that.setData({
              'array[12].cfshow': false,
            })
          }
          //14
          if (love[14] > 8) {
            that.setData({
              'array[13].loveshow': false,
            })
          }
          if (work[14] > 8) {
            that.setData({
              'array[13].workshow': false,
            })
          }
          if (cf[14] > 8) {
            that.setData({
              'array[13].cfshow': false,
            })
          }
          //15
          if (love[15] > 8) {
            that.setData({
              'array[14].loveshow': false,
            })
          }
          if (work[15] > 8) {
            that.setData({
              'array[14].workshow': false,
            })
          }
          if (cf[15] > 8) {
            that.setData({
              'array[14].cfshow': false,
            })
          }
          //16
          if (love[16] > 8) {
            that.setData({
              'array[15].loveshow': false,
            })
          }
          if (work[16] > 8) {
            that.setData({
              'array[15].workshow': false,
            })
          }
          if (cf[16] > 8) {
            that.setData({
              'array[15].cfshow': false,
            })
          }
          //17
          if (love[17] > 8) {
            that.setData({
              'array[16].loveshow': false,
            })
          }
          if (work[17] > 8) {
            that.setData({
              'array[16].workshow': false,
            })
          }
          if (cf[17] > 8) {
            that.setData({
              'array[16].cfshow': false,
            })
          }
          //18
          if (love[18] > 8) {
            that.setData({
              'array[17].loveshow': false,
            })
          }
          if (work[18] > 8) {
            that.setData({
              'array[17].workshow': false,
            })
          }
          if (cf[18] > 8) {
            that.setData({
              'array[17].cfshow': false,
            })
          }
          //19
          if (love[19] > 8) {
            that.setData({
              'array[18].loveshow': false,
            })
          }
          if (work[19] > 8) {
            that.setData({
              'array[18].workshow': false,
            })
          }
          if (cf[19] > 8) {
            that.setData({
              'array[18].cfshow': false,
            })
          }
          //20
          if (love[20] > 8) {
            that.setData({
              'array[19].loveshow': false,
            })
          }
          if (work[20] > 8) {
            that.setData({
              'array[19].workshow': false,
            })
          }
          if (cf[20] > 8) {
            that.setData({
              'array[19].cfshow': false,
            })
          }
          //21
          if (love[21] > 8) {
            that.setData({
              'array[20].loveshow': false,
            })
          }
          if (work[21] > 8) {
            that.setData({
              'array[20].workshow': false,
            })
          }
          if (cf[21] > 8) {
            that.setData({
              'array[20].cfshow': false,
            })
          }
          //22
          if (love[22] > 8) {
            that.setData({
              'array[21].loveshow': false,
            })
          }
          if (work[22] > 8) {
            that.setData({
              'array[21].workshow': false,
            })
          }
          if (cf[22] > 8) {
            that.setData({
              'array[21].cfshow': false,
            })
          }
          //23
          if (love[23] > 8) {
            that.setData({
              'array[22].loveshow': false,
            })
          }
          if (work[23] > 8) {
            that.setData({
              'array[22].workshow': false,
            })
          }
          if (cf[23] > 8) {
            that.setData({
              'array[22].cfshow': false,
            })
          }
          //24
          if (love[24] > 8) {
            that.setData({
              'array[23].loveshow': false,
            })
          }
          if (work[24] > 8) {
            that.setData({
              'array[23].workshow': false,
            })
          }
          if (cf[24] > 8) {
            that.setData({
              'array[23].cfshow': false,
            })
          }
          //25
          if (love[25] > 8) {
            that.setData({
              'array[24].loveshow': false,
            })
          }
          if (work[25] > 8) {
            that.setData({
              'array[24].workshow': false,
            })
          }
          if (cf[25] > 8) {
            that.setData({
              'array[24].cfshow': false,
            })
          }
          //26
          if (love[26] > 8) {
            that.setData({
              'array[25].loveshow': false,
            })
          }
          if (work[26] > 8) {
            that.setData({
              'array[25].workshow': false,
            })
          }
          if (cf[26] > 8) {
            that.setData({
              'array[25].cfshow': false,
            })
          }
          //27
          if (love[27] > 8) {
            that.setData({
              'array[26].loveshow': false,
            })
          }
          if (work[27] > 8) {
            that.setData({
              'array[26].workshow': false,
            })
          }
          if (cf[27] > 8) {
            that.setData({
              'array[26].cfshow': false,
            })
          }
          //28
          if (love[28] > 8) {
            that.setData({
              'array[27].loveshow': false,
            })
          }
          if (work[28] > 8) {
            that.setData({
              'array[27].workshow': false,
            })
          }
          if (cf[28] > 8) {
            that.setData({
              'array[27].cfshow': false,
            })
          }

          let windowWidth = 360;
          try {
            let res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
          } catch (e) {
          }
          new Charts({
            canvasId: 'luckcanvas',
            type: 'area',
            dataLabel: false,
            categories: ['今天', '明天', getday(2), getday(3), getday(4), getday(5), getday(6)],
            series: [{
              data: [avg[0], avg[1], avg[2], avg[3], avg[4], avg[5], avg[6]],
              color: 'rgba(222,93,235,0.3)'
            }],
            xAxis: {
              fontColor: '#ffffff'
            },
            yAxis: {
              min: 0,
              max: 10,
              format: function (val) {
                return val;
              }
            },
            width: windowWidth - 10,
            height: 200
          });
          new Charts({
            canvasId: 'gqcanvas',
            type: 'area',
            dataLabel: false,
            categories: ['今天', '明天', getday(2), getday(3), getday(4), getday(5), getday(6)],
            series: [{
              data: [love[0], love[1], love[2], love[3], love[4], love[5], love[6]],
              color: 'rgba(255,97,97,0.3)'
            }],
            xAxis: {
              fontColor: '#ffffff'
            },
            yAxis: {
              min: 0,
              max: 10,
              format: function (val) {
                return val;
              }
            },
            width: windowWidth - 10,
            height: 200
          });
          new Charts({
            canvasId: 'cfcanvas',
            type: 'area',
            dataLabel: false,
            categories: ['今天', '明天', getday(2), getday(3), getday(4), getday(5), getday(6)],
            series: [{
              data: [cf[0], cf[1], cf[2], cf[3], cf[4], cf[5], cf[6]],
              color: 'rgba(255,183,74,0.3)'
            }],
            xAxis: {
              fontColor: '#ffffff'
            },
            yAxis: {
              min: 0,
              max: 10,
              format: function (val) {
                return val;
              }
            },
            width: windowWidth - 10,
            height: 200
          });
          new Charts({
            canvasId: 'gzcanvas',
            type: 'area',
            dataLabel: false,
            categories: ['今天', '明天', getday(2), getday(3), getday(4), getday(5), getday(6)],
            series: [{
              data: [work[0], work[1], work[2], work[3], work[4], work[5], work[6]],
              color: 'rgba(73,181,255,0.3)'
            }],
            xAxis: {
              fontColor: '#ffffff'
            },
            yAxis: {
              min: 0,
              max: 10,
              format: function (val) {
                return val;
              }
            },
            width: windowWidth - 10,
            height: 200
          });
        }
      })//运势信息
    // },10)
  },
  xzme: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  }
}) 


