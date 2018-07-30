// pages/logs/logs.js
var tcity = require("../utils/citys.js");
var app = getApp();

Page({
  data: {
    xbrange: ['男', '女'],
    // headimg: wx.getStorageSync('headimg'),
    // name: wx.getStorageSync('name1') || wx.getStorageSync('username'),
    // birthdate: wx.getStorageSync('birdate') || wx.getStorageSync('birthdate1'),
    // birthtime: wx.getStorageSync('birtime') || wx.getStorageSync('birthtime1'),
    provinces: [],
    province: wx.getStorageSync('provincea'),
    citys: [],
    city: wx.getStorageSync('citya'),
    countys: [],
    county: wx.getStorageSync('countya'),
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,

    provinces1: [],
    province1: wx.getStorageSync('province1a'),
    citys1: [],
    city1: wx.getStorageSync('city1a'),
    countys1: [],
    county1: wx.getStorageSync('county1a'),
    value1: [0, 0, 0],
    values1: [0, 0, 0],
    condition1: false,
    save: false
  },

  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      wx.setStorageSync('provincea', this.data.province)      
      wx.setStorageSync('citya', this.data.city)      
      wx.setStorageSync('countya', this.data.county)  
      wx.setStorageSync('value', this.data.value)
      wx.setStorageSync('values', this.data.values)                  
      return           
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      wx.setStorageSync('citya', this.data.city)
      wx.setStorageSync('countya', this.data.county)
      wx.setStorageSync('value', this.data.value)
      wx.setStorageSync('values', this.data.values)                                    
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      wx.setStorageSync('countya', this.data.county)
      wx.setStorageSync('values', this.data.values)                                    
      return;
    }
  },
  open: function () {
    console.log(this.data.value[0] == 0)
    if (this.data.value[0] == 0 && this.data.value[1] == 0 && this.data.value[2] == 0 && this.data.values[0] == 0 && this.data.values[1] == 0 &&this.data.values[2] == 0) {
      this.setData({
        province: '北京',
        city: '北京市',
        county: '东城区'
      })
    }
    this.setData({
      condition: !this.data.condition,
      save: true,
      // value: wx.getStorageSync('value'),
      // values: wx.setStorageSync('values', this.data.values)
    })
  },

  bindChange1: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values1;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys1 = [];
      const countys1 = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys1.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys1.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province1: this.data.provinces1[val[0]],
        city1: cityData[val[0]].sub[0].name,
        citys1: citys1,
        county1: cityData[val[0]].sub[0].sub[0].name,
        countys1: countys1,
        values1: val,
        value1: [val[0], 0, 0]
      })
      wx.setStorageSync('province1a', this.data.province1)
      wx.setStorageSync('city1a', this.data.city1)
      wx.setStorageSync('county1a', this.data.county1)
      wx.setStorageSync('value1', this.data.value1)
      wx.setStorageSync('values1', this.data.values1)          
      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys1 = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys1.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city1: this.data.citys1[val[1]],
        county1: cityData[val[0]].sub[val[1]].sub[0].name,
        countys1: countys1,
        values1: val,
        value1: [val[0], val[1], 0]
      })
      wx.setStorageSync('city1a', this.data.city1)
      wx.setStorageSync('county1a', this.data.county1)
      wx.setStorageSync('value1', this.data.value1) 
      wx.setStorageSync('values1', this.data.values1)         
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county1: this.data.countys1[val[2]],
        values1: val
      })
      wx.setStorageSync('county1a', this.data.county1)
      wx.setStorageSync('values1', this.data.values1)      
      return;
    }
  },
  open1: function () {
    if (this.data.value1[0] == 0 && this.data.value1[1] == 0 && this.data.value1[2] == 0 && this.data.values1[0] == 0 && this.data.values1[1] == 0 && this.data.values1[2] == 0) {
      this.setData({
        province1: '北京',
        city1: '北京市',
        county1: '东城区'
      })
    }
    this.setData({
      condition1: !this.data.condition1,
      save: true,
      // value1: wx.getStorageSync('value1'),
      // values1: wx.setStorageSync('values1', this.data.values1)      
    })
  },
  hidebanner: function() {
    this.setData({
      condition: !this.data.condition
    })
  },
  hidebanner1: function () {
    this.setData({
      condition1: !this.data.condition1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //展现用户名
  },

  onReady: function () {
    let that = this
    that.setData({
      headimg: wx.getStorageSync('headimg')
    })
    //展现性别
    if (wx.getStorageSync('userxb') == 1) {
      this.setData({
        xbvalue: 1
      })
    } else {
      this.setData({
        xbvalue: 0
      })
    }
    //展示姓名
    if (wx.getStorageSync('user_name')) {
      if (wx.getStorageSync('user_name').length >= 7) {
        this.setData({
          name: wx.getStorageSync('user_name'),
          namere: wx.getStorageSync('user_name').slice(0, 7) + '...'
        })
      } else {
        this.setData({
          name: wx.getStorageSync('user_name'),
          namere: wx.getStorageSync('user_name')
        })
      }
    } else {
      if (wx.getStorageSync('username').length >= 7) {
        this.setData({
          namere: wx.getStorageSync('username').slice(0, 7) + '...',
          name: wx.getStorageSync('username'),
        })
      } else {
        this.setData({
          name: wx.getStorageSync('username'),
          namere: wx.getStorageSync('username')
        })
      }
    }
    console.log(wx.getStorageSync('uid'))
    
    //展示地点
    that.setData({
      province: wx.getStorageSync('provincea') || wx.getStorageSync('addr')[0] || '--',
      city: wx.getStorageSync('citya') || wx.getStorageSync('addr')[1] || '--',
      county: wx.getStorageSync('countya') || wx.getStorageSync('addr')[2] || '--',
      province1: wx.getStorageSync('province1a') || wx.getStorageSync('addr1')[0] || '--',
      city1: wx.getStorageSync('city1a') || wx.getStorageSync('addr1')[1] || '--',
      county1: wx.getStorageSync('county1a') || wx.getStorageSync('addr1')[2] || '--',
      birthdate: wx.getStorageSync('birthdate1') || wx.getStorageSync('birdate') || '--',
      birthtime: wx.getStorageSync('birthtime1') || wx.getStorageSync('birtime') || '--',
      // value: wx.getStorageSync('value') || that.data.value,
      // values: wx.getStorageSync('values') || that.data.values,
      // value1: wx.getStorageSync('value1') || that.data.value1,
      // values1: wx.getStorageSync('values1') || that.data.values1,      
    })
    
    console.log(wx.getStorageSync('user_name').slice(0,7))
    //地点信息初始化
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    const provinces1 = [];
    const citys1 = [];
    const countys1 = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
      provinces1.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
      citys1.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
      countys1.push(cityData[0].sub[0].sub[i].name)
    }
    console.log('更新前')    
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': wx.getStorageSync('provincea') || wx.getStorageSync('addr')[0] || cityData[0].name,
      'city': wx.getStorageSync('citya') || wx.getStorageSync('addr')[1] || cityData[0].sub[0].name,
      'county': wx.getStorageSync('countya') || wx.getStorageSync('addr')[2] || cityData[0].sub[0].sub[0].name,

      'provinces1': provinces1,
      'citys1': citys1,
      'countys1': countys1,
      'province1': wx.getStorageSync('province1a') || wx.getStorageSync('addr1')[0] || cityData[0].name,
      'city1': wx.getStorageSync('city1a') || wx.getStorageSync('addr1')[1] || cityData[0].sub[0].name,
      'county1': wx.getStorageSync('county1a') || wx.getStorageSync('addr1')[2] || cityData[0].sub[0].sub[0].name,
    })
    console.log(wx.getStorageSync('userxb'));
    console.log('更新中')
    //初始化地点信息
    // that.setData({
    //   // name: wx.getStorageSync('name1') || wx.getStorageSync('username'),
    //   birthdate: wx.getStorageSync('birthdate1') || wx.getStorageSync('birdate'),
    //   birthtime: wx.getStorageSync('birthtime1') || wx.getStorageSync('birtime'),
    //   // province: wx.getStorageSync('addr')[0],
    //   // city: wx.getStorageSync('addr')[1],
    //   // county: wx.getStorageSync('addr')[2],
    //   // province1: wx.getStorageSync('addr1')[0],
    //   // city1: wx.getStorageSync('addr1')[1],
    //   // county1: wx.getStorageSync('addr1')[2]
    //   // xbvalue: that.data.xbvalue      
    // })
    console.log(that.data.birthtime)
  },

  userinput: function (e) {
    let that = this
      that.setData({
        name: e.detail.value,
        namere: e.detail.value,        
        save: true
      })
    if(e.detail.value.length >= 7) {
      that.setData({
        name: e.detail.value,
        namere: e.detail.value.slice(0,7) + '...'        
      })
    }
    wx.setStorageSync('name1', this.data.name)
  },
  save: function () {
    let that = this
    wx.showLoading({
      title: '保存中',
      mask: true
    })
    // if(that.data.name == '') {
    //   wx.showToast({
    //     title: '请输入昵称',
    //     mask: true,
    //     duration: 1000
    //   })
    //   that.setData({
    //     save: true
    //   })
    // } else {
    //   save: false
    // }
    
    wx.request({
      url: 'https://lilith.51wnl.com/ChangeUserInfo?cid=Youloft_Android&tkn=D0513B7CEF494E82AEAFDFF7B2183ECF',
      method: 'POST',
      data: {
        NickName: that.data.name,
        Sex: that.data.xbvalue,
        BirthDay: that.data.birthdate + ' ' + that.data.birthtime + ':00',
        BirthPlace: that.data.province + '-' + that.data.city + '-' + that.data.county,
        LivePlace: that.data.province1 + '-' + that.data.city1 + '-' + that.data.county1,
        Uid: wx.getStorageSync('uid')
      },
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      success: function (res) {
        setTimeout(function() {
          wx.hideLoading()
          if (res.data.data.result == 0) {
            wx.showToast({
              title: '保存成功',
              mask: true,
              duration: 1000
            })
            that.setData({
              save: false
            })
            setTimeout(function() {
              wx.switchTab({
                url: '../index/index',
              })
            },900)
          } else if(res.data.data.result == 2) {
            wx.showToast({
              title: '昵称为空',
              mask: true,
              duration: 1000
            })
            that.setData({
              save: true
            })
          } else if (res.data.data.result == 3) {
            wx.showToast({
              title: '昵称已存在',
              mask: true,
              duration: 1000
            })
            that.setData({
              save: true
            })
          }else {
            wx.showToast({
              title: '保存失败，请查看网络',
              // title: res.data.data.result,            
              mask: true,
              duration: 1000
            })
            that.setData({
              save: true
            })
          }      
        },400)
        var userdata = res.data.data.userInfo
        console.log(res.data.data.userInfo)

        if(userdata.sex == 1) {
          that.setData({
            xbvalue: 1
          })
        } else {
          that.setData({
            xbvalue: 0
          })
        }
        //更新页面数据
        if(userdata.nickName.length >= 7) {
          that.setData({
            namere: userdata.nickName.slice(0, 7) + '...', 
            name: userdata.nickName,
            birthdate: userdata.birthDay.slice(0, 10) || that.data.birthdate,
            birthtime: userdata.birthDay.slice(10, userdata.birthDay.length - 3) || that.data.birthtime,
            province: that.data.province || wx.getStorageSync('provincea'),
            city: that.data.city || wx.getStorageSync('citya'),
            county: that.data.county || wx.getStorageSync('countya'),
            province1: that.data.province1 || wx.getStorageSync('province1a'),
            city1: that.data.city1 || wx.getStorageSync('city1a'),
            county1: that.data.county1 || wx.getStorageSync('county1a')
          })
        } else {
          console.log(userdata.nickName)
          that.setData({
            name: userdata.nickName,
            namere: userdata.nickName,
            birthdate: userdata.birthDay.slice(0, 10) || that.data.birthdate,
            birthtime: userdata.birthDay.slice(10, userdata.birthDay.length - 3) || that.data.birthtime,
            province: that.data.province || wx.getStorageSync('provincea'),
            city: that.data.city || wx.getStorageSync('citya'),
            county: that.data.county || wx.getStorageSync('countya'),
            province1: that.data.province1 || wx.getStorageSync('province1a'),
            city1: that.data.city1 || wx.getStorageSync('city1a'),
            county1: that.data.county1 || wx.getStorageSync('county1a')
          })
        }
        wx.setStorageSync('user_name', userdata.nickName)
        wx.setStorageSync('xz_name', userdata.signs)  
        wx.setStorageSync('birth_date', userdata.birthDay.slice(0,10))                      
        console.log(wx.getStorageSync('user_name'))
        console.log(wx.getStorageSync('birth_date'))        
        console.log(userdata.signs)
      },
      fail: function() {
        that.setData({
          save: true
        })
        wx.showToast({
          title: '保存失败，请检查输入',
          duration: 1000
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
    console.log(that.data.province)
  },
  xbchange: function (e) {
    console.log('选择的性别为', e.detail.value)
      this.setData({
        save: true,
        xbvalue: e.detail.value        
      })
  },
  datechange: function (e) {
    if (e.detail.value !== this.data.birthdate) {
      this.setData({
        save: true,
        birthdate: e.detail.value
      })
    } else {
      save: false
    }
    wx.setStorageSync('birthdate1', this.data.birthdate)
  },
  timechange: function (e) {
      this.setData({
        save: true,
        birthtime: e.detail.value
      })
    wx.setStorageSync('birthtime1', this.data.birthtime)    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
  //   that.setData({
  //     headimg: wx.getStorageSync('headimg')      
  //   })
  //   //展现性别
  //   if (wx.getStorageSync('userxb') == 1) {
  //     this.setData({
  //       xbvalue: 1
  //     })
  //   } else {
  //     this.setData({
  //       xbvalue: 0
  //     })
  //   }
  //   //展示姓名
  //   if (wx.getStorageSync('user_name')) {
  //     if (wx.getStorageSync('user_name').length >= 7) {
  //       this.setData({
  //         name: wx.getStorageSync('user_name'),
  //         namere: wx.getStorageSync('user_name').slice(0, 7) + '...'
  //       })
  //     } else {
  //       this.setData({
  //         name: wx.getStorageSync('user_name'),
  //         namere: wx.getStorageSync('user_name')
  //       })
  //     }
  //   } else {
  //     if (wx.getStorageSync('username').length >= 7) {
  //       this.setData({
  //         namere: wx.getStorageSync('username').slice(0, 7) + '...',
  //         name: wx.getStorageSync('username'),
  //       })
  //     } else {
  //       this.setData({
  //         name: wx.getStorageSync('username'),
  //         namere: wx.getStorageSync('username')
  //       })
  //     }
  //   }
  //   console.log(wx.getStorageSync('uid'))
  //   // if (wx.getStorageSync('usersex') == 1) {
  //   //   that.setData({
  //   //     xbvalue: 0
  //   //   })
  //   // } else if (wx.getStorageSync('usersex') == 2) {
  //   //   that.setData({
  //   //     xbvalue: 1
  //   //   })
  //   // }
  //   //展示地点
  //   that.setData({
  //     province: wx.getStorageSync('provincea') || wx.getStorageSync('addr')[0] || '--',
  //     city: wx.getStorageSync('citya') || wx.getStorageSync('addr')[1] || '--',
  //     county: wx.getStorageSync('countya') || wx.getStorageSync('addr')[2] || '--',
  //     province1: wx.getStorageSync('province1a') || wx.getStorageSync('addr1')[0] || '--',
  //     city1: wx.getStorageSync('city1a') || wx.getStorageSync('addr1')[1] || '--',
  //     county1: wx.getStorageSync('county1a') || wx.getStorageSync('addr1')[2] || '--',
  //     birthdate: wx.getStorageSync('birthdate1') || wx.getStorageSync('birdate') || '--',
  //     birthtime: wx.getStorageSync('birthtime1') || wx.getStorageSync('birtime') || '--',
  //     // value: wx.getStorageSync('value') || that.data.value,
  //     // values: wx.getStorageSync('values') || that.data.values,
  //     // value1: wx.getStorageSync('value1') || that.data.value1,
  //     // values1: wx.getStorageSync('values1') || that.data.values1,      
  //   })
  that.setData({
    namere: that.data.namere,
    name: that.data.name,
    xbvalue: that.data.xbvalue,
    birthdate: that.data.birthdate,
    birthtime: that.data.birthtime,
    headimg: that.data.headimg    
  })
    
  }

})