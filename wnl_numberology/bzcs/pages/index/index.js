//index.js
//获取应用实例
let util = require('../../utils/util');
let calendar = require('../../utils/calendar');
let datePicker = require('../../modules/datePicker/datePicker');


const selectedActiveSrc = 'http://mobile.51wnl.com/numberology/bzcs/img/bzcs/cs-yhzl-select-active@3x.Png';
const selectedNormalSrc = 'http://mobile.51wnl.com/numberology/bzcs/img/bzcs/cs-yhzl-wxz@3x.Png';

let yourName;
let yourBirth;
let youSex;
let sexNum;
let userId;
let deviceId;
let clientType;
// const goodsId = '41DBA1789A644753A408CD78DAF79B00';
const goodsId = '138E59D3769F43628D83DBB0B8A38164';
let orderId;
let feedBackNum; //测算人数
let birthTime;
let birthDay;
let nowYear;
let birthTimeList = ['不清楚出生时间', '00:00-00:59', '01:00-01:59', '02:00-02:59', '03:00-03:59', '04:00-04:59', '05:00-05:59', '06:00-06:59', '07:00-07:59', '08:00-08:59', '09:00-09:59', '10:00-10:59', '11:00-11:59', '12:00-12:59', '13:00-13:59', '14:00-14:59', '15:00-15:59', '16:00-16:59', '17:00-17:59', '18:00-18:59', '19:00-19:59', '20:00-20:59', '21:00-21:59', '22:00-22:59', '23:00-23:59'];
let userInfoBirthDay;

let _windowWidth;
let px2rpx;
let toastInfo;
let dateNow = new Date();
let scrollHeight = -498;

let miniProgramProcess;

sexNum = 1; //默认为男生
userInfoBirthDay = '1990-01-01';
nowYear = new Date().getFullYear();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollAnimation: {},
    birthTimeList: birthTimeList,
    index: 0,
    birthDate: '1990-01-01',
    selectedActiveSrc: selectedActiveSrc,
    selectedNormalSrc: selectedNormalSrc,
    userId: userId,
    exportTeam: [
      { url: '../../img/cs-master-dyq@3x.png', name: '董易奇', desc: '国际易经民俗文化专家，“易奇八字”App创始人，世界易经大会学术顾问。18岁被东南亚易学会授予“易学奇才”称号，22岁成为登上人民大会堂演说周易文化的国际易学代表' },
      { url: '../../img/cs-master-zyh@3x.png', name: '曾绎华', desc: '八字命理、六爻、奇门预测专家。生于易学世家，自幼耳闻目睹，熟习传统命理理论，后师从多位港台名师，博取众家之长为己用。对命理学有近二十年的研究学习，实践累积了大量的实例，预测推算拥有极高的准确率' },
      { url: '../../img/cs-master-ljh@3x.png', name: '李俊辉', desc: '自幼失明，但盲于目而不盲于心。研究八字命理多年，现从事四柱命理五行研究，专研六爻、命理预测、八字合婚、择吉日等。李俊辉先生对易经命理、五行八字的独到见解，得到业内的广泛认同，被誉为“盲派六爻八字神算师。' },
    ],
    cesuanResultList: ['事业运势', '爱情运势', '财富运势', '健康运势', '人际关系', '性情分析', '喜神用神', '开运秘诀'],
    bottomBtnisShow: false,
    toastInfo: toastInfo,
    toastIsHideen: true,
    fixButtonShow: false,

    orderBtnIsHidden: '',


    yourName: '',
    birthDay: '1990-01-01',
    currentDateString: '',
    birthTime: '0',
    feedBackNum: '128475',
    // toastContent:0
    //scroll-view

  },

  /**
    * 监听普通picker选择器
    */
  listenerPickerSelected: function (e) {
    let _this = this;
    //改变index值，通过setData()方法重绘界面
    // console.log(e);
    _this.setData({
      birthTime: birthTimeList[e.detail.value],
      index: e.detail.value
    });
  },

  /**
   * 监听日期picker选择器
   */
  listenerDatePickerSelected: function (e) {
    let _this = this;
    _this.setData({
      birthDate: e.detail.value
    })
  },

  //获取用户名
  youNameInput: function (e) {
    this.setData({
      yourName: e.detail.value
    })
  },

  //事件处理函数
  //totast
  toastHide: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        toastIsHideen: true,
        //toastContent: 0
      })
    }, 1500)
  },

  btnMeasure: function (e) {
    let btnPosition; //测算按钮的位置

    btnPosition = e.currentTarget.dataset.position;
    // console.log(btnPosition);
    var _this = this;
    //输入校验
    yourName = _this.data.yourName;
    youSex = sexNum;
    if (_this.data.birthTime == '不清楚出生时间') { birthTime = '12:00:00'; }
    else { birthTime = _this.data.birthTime.split(':')[0] + ':30:00'; }
    yourBirth = birthTime + ' ' + userInfoBirthDay;
    //console.log(yourName, youSex, yourBirth);
    let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let youBirthYear = userInfoBirthDay.substring(0,4);
    if (yourName == '') {
      _this.setData({
        toastInfo: '请填写您的姓名',
        toastIsHideen: false,
        //toastContent: 1
      })
      _this.toastHide();
      setTimeout(function() {
        if (btnPosition == 1) {
          wx.pageScrollTo({
            scrollTop: 0,
          })
        }
      },1000);
      return false;
    }
    if (reg.test(yourName)) {
      _this.setData({
        toastInfo: '请填写正确的姓名',
        toastIsHideen: false
      })
      _this.toastHide();
      setTimeout(function () {
        if (btnPosition == 1) {
          wx.pageScrollTo({
            scrollTop: 0,
          })
        }
      }, 1000);
      return false;
    }
    if (yourName.match(/^[\u4e00-\u9fa5]+$/)) {
      if (yourName.length > 5) {
        _this.setData({
          toastInfo: '请填写正确的姓名',
          toastIsHideen: false
        })
        _this.toastHide();
        setTimeout(function () {
          if (btnPosition == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
            })
          }
        }, 1000);
        return false;
      }
    } else {
      if (yourName.length > 10) {
        _this.setData({
          toastInfo: '请填写正确的姓名',
          toastIsHideen: false
        })
        _this.toastHide();
        setTimeout(function () {
          if (btnPosition == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
            })
          }
        }, 1000);
        return false;
      }
    }

    if (nowYear - youBirthYear < 10 || youBirthYear > nowYear || nowYear - youBirthYear > 80) {
      _this.setData({
        toastInfo: '该出生年份无数据，请重新选择',
        toastIsHideen: false
      })
      _this.toastHide();
      setTimeout(function () {
        if (btnPosition == 1) {
          wx.pageScrollTo({
            scrollTop: 0,
          })
        }
      }, 1000);
      return false;
    }
    let data = JSON.stringify({
      name: yourName,
      birth: yourBirth,
      sex: youSex,
      deviceId: userId,
      userId: '',
      clientType: clientType,
      GoodsID: goodsId
    })
    _this.creatOrder(data);
    // console.log(data);
  },

  //创建订单
  creatOrder: function (data) {
    let _this = this;
    let creatOrderData = data;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    //获取orderId
    wx.request({
      url: 'https://coco70.51wnl.com/NumberologyNew/NRLorder/CreatejpOrder',
      method: 'POST',
      dataType: 'json',
      data: creatOrderData,
      success: res => {
        orderId = res.data.data;
        // console.log('index:' + orderId);
        wx.hideLoading();
        if (orderId) {
          if (miniProgramProcess == false) {
            wx.navigateTo({
              url: '../result/miniresult?orderId=' + orderId + '&userId=' + userId + '&clientType=' + clientType
            })
          } else {
            wx.navigateTo({
              url: '../result/result?orderId=' + orderId + '&userId=' + userId + '&clientType=' + clientType
            })
          }
          
        } else {
          _this.setData({
            toastInfo: '网络错误，请稍后重试',
            toastIsHideen: false
          })
          _this.toastHide();
          return false;
        }
      },
      complete: () => {

      }
    })
  },

  // 性别选择
  sexClick: function (e) {
    var _this = this;
    sexNum = e.currentTarget.dataset.sexnum;
    if (sexNum == 1) _this.setData({ selectedActiveSrc: selectedActiveSrc, selectedNormalSrc: selectedNormalSrc, });
    if (sexNum == 0) _this.setData({ selectedActiveSrc: selectedNormalSrc, selectedNormalSrc: selectedActiveSrc, });
  },

  //查看我的订单
  goHistory: function (e) {
    wx.navigateTo({
      url: '../history/history?userID=' + userId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.viewDate = new Date(1990, 0, 1);
    Object.assign(this, datePicker);
    _this.init();

    //orderList

    wx.request({
      url: 'https://coco70.51wnl.com/numberologynew/MiniProgram/Process?parterID=NRLorder',
      method: 'GET',
      success: res => {
        // console.log('=========='+res.data.data);
        miniProgramProcess = res.data.data
        //miniProgramProcess = true;
        _this.setData({
          orderBtnIsHidden: !miniProgramProcess,
        })
      }
    })
    wx.getUserInfo({
      success: res => {
        //console.log(res);
        wx.login({
          success: res => {
            // console.log(res);
            let code = res.code;
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: 'https://b.cqyouloft.com/atcapi/WeChat/GetMiniProgramUserInfo?name=mnbz&code=' + code,
              method: 'GET',
              success: res => {
                if (res.data.OpenID) {
                  deviceId = res.data.OpenID;
                  userId = res.data.OpenID;
                } else {
                  userId = 'test'
                }
                _this.setData({
                  userId: userId
                })
              },
              error: res => {
                userId = 'test'
                this.setData({
                  userId: userId
                })
              }
            })
          }
        })
      }
    })

    //获取测算人数
    wx.request({
      url: 'https://coco70.51wnl.com/numberologynew/NRLorder/GetUseCount?parterid=nrlorder',
      method: 'GET',
      success: res => {
        // console.log(res);
        feedBackNum = res.data.data;
        _this.setData({
          feedBackNum: feedBackNum
        })
      }
    })
  },
  /**
    * 监听屏幕滚动
    */
  onPageScroll: function (e) {
    let _this = this;
    let pageScrollTop = e.scrollTop;
    if (pageScrollTop > 480 * px2rpx * 2) {
      this.setData({
        bottomBtnisShow: true,
        fixButtonShow: true
      })
    } else {
      this.setData({
        bottomBtnisShow: false,
        fixButtonShow: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    //获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        clientType = (res.system.replace(/(\d+|\s+)/g, '')).replace('.', '').replace('.', '');
        _windowWidth = res.windowWidth;
        px2rpx = _windowWidth / 750;
      }
    })
    _this.setData({
      currentDateString: util.formatDate(this.viewDate, 'yyyy年M月d日')
    });


    var query = wx.createSelectorQuery()
    query.select('#comment1').boundingClientRect()
    query.select('#comment2').boundingClientRect()
    //query.select('#button').boundingClientRect()
    query.exec(function (res) {
      res[0].top       // #the-id节点的上边界坐标
      res[1].Top // 显示区域的竖直滚动位置
      scrollHeight = res[0].top - res[1].top
      // buttonBottom = res[2].bottom
    })

    //实例化一个动画
    let that = this;
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      transformOrigin: "50% 50%",
      delay: 0
    })
    this.animation = animation;

    animation.translate(0, scrollHeight).step({ duration: 25000 });
    // 更新数据
    that.setData({
      scrollAnimation: animation.export(),
    })
    setInterval(function () {
      animation.translate(0, 0).step({ duration: 0 });
      this.setData({
        // 导出动画示例
        scrollAnimation: animation.export(),
      });
      animation.translate(0, scrollHeight).step({ duration: 24950 });
      this.setData({
        // 导出动画示例
        scrollAnimation: animation.export(),
      })
    }.bind(this), 25000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '超准八字测算，未来运势详批',
      path: '/pages/index/index',
      imageUrl: '../../img/share.jpg',
      success: function (res) {
        // 转发成功
        wx.showModal({
          title: '提示',
          content: '转发成功！',
          success: function (res) {

          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //日期选择确认回调
  dateSelectCallback(year, month, day) {
    let _this = this;

    //this.swiperToMonth(year, month, day);
    _this.setData({
      currentDateString: '公历 ' + year + '年' + (month + 1) + '月' + day + '日',
      userInfoBirthDay: year + '-' + (month + 1) + '-' + day
    })
    userInfoBirthDay = year + '-' + (month + 1) + '-' + day;
  },
  //显示日期选择控件
  dateSelectTap: function () {
    let _this = this;
    _this.dateSelectShow(true, _this.viewDate);
  },
})
