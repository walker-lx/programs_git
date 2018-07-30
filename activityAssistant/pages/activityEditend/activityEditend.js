// pages/activityEditend/activityEditend.js
let sDate;
let eDate;
let name;
let uid;
let tkn;
let costtype;
let update;
let acid;
let avatar;
let nickname;
let createid;
let acaddr;
let actip;
let limit;
let cost;
const app = getApp();
Page({
  data: {
    placevalue: '',
    limitvalue: '',
    spendvalue: '',
    tipvalue: ''
  },
  onLoad: function (options) {
    new app.ToastPannel();
    sDate = options.syear + '-' + options.sdate.slice(0, 2) + '-' + options.sdate.slice(3, 5) + ' ' + options.shour + ':00';
    eDate = options.eyear + '-' + options.edate.slice(0, 2) + '-' + options.edate.slice(3, 5) + ' ' + options.ehour + ':00';    
    uid = options.uid;
    tkn = options.tkn;
    name = options.name;
    avatar = options.avatar;
    nickname = options.nickname;
    //修改活动
    if (options.acid) {
      update = 1;
      acid = options.acid;
      sDate = options.syear + '-' + options.sdate.slice(0, 2) + '-' + options.sdate.slice(3, 5) + ' ' + options.shour + ':00';
      eDate = options.eyear + '-' + options.edate.slice(0, 2) + '-' + options.edate.slice(3, 5) + ' ' + options.ehour + ':00';
      uid = options.uid;
      tkn = options.tkn;
      name = options.name;
      acaddr = options.acaddr;
      limit = options.limit;
      costtype = 0;
      cost = options.cost;
      actip = options.actip;
      this.setData({
        placevalue: options.acaddr,
        limitvalue: options.limit,
        spendtype: options.costtype,
        spendvalue: options.cost,
        tipvalue: options.actip
      })
    }
    else {
      update = 0;
    }
  },
  //进度条控制函数
  progressControl: function () {
    if (this.data.placevalue !== '' && this.data.limitvalue !== '' && this.data.spendvalue !== '' && this.data.tipvalue !== '') {
      this.setData({
        bg5_1: '#ffc42f',
        bg5_2: '#ffc42f',
        bg5_3: '#ffc42f',
        bg5_4: '#ffc42f'        
      })
    }
    else if ((this.data.placevalue !== '' && this.data.limitvalue !== '' && this.data.spendvalue !== '') || (this.data.placevalue !== '' && this.data.limitvalue !== '' && this.data.tipvalue !== '') || (this.data.tipvalue !== '' && this.data.limitvalue !== '' && this.data.spendvalue !== '') || (this.data.placevalue !== '' && this.data.tipvalue !== '' && this.data.spendvalue !== '')) {
      this.setData({
        bg5_1: '#ffc42f',
        bg5_2: '#ffc42f',
        bg5_3: '#ffc42f',
        bg5_4: '#dadada'
      })
    }
    else if ((this.data.placevalue !== '' && this.data.limitvalue !== '') || (this.data.placevalue !== '' && this.data.spendvalue !== '') || (this.data.placevalue !== '' && this.data.tipvalue !== '') || (this.data.spendvalue !== '' && this.data.limitvalue !== '') || (this.data.tipvalue !== '' && this.data.limitvalue !== '') || (this.data.spendvalue !== '' && this.data.tipvalue !== '')) {
      this.setData({
        bg5_1: '#ffc42f',
        bg5_2: '#ffc42f',
        bg5_3: '#dadada',
        bg5_4: '#dadada'
      })
    }
    else if (this.data.placevalue !== '' || this.data.limitvalue !== '' || this.data.spendvalue !== '' || this.data.tipvalue !== '') {
      this.setData({
        bg5_1: '#ffc42f',
        bg5_2: '#dadada',
        bg5_3: '#dadada',
        bg5_4: '#dadada'
      })
    }
    else {
      this.setData({
        bg5_1: '#dadada',
        bg5_2: '#dadada',
        bg5_3: '#dadada',
        bg5_4: '#dadada'
      })
    }
  },
  //输入框获取与失去焦点
  placefocus: function (e) {
    this.setData({
      placeborder: 'border:1rpx solid #ffc42f'
    })
    if (e.detail.value !== '') {
      this.setData({
        hasplace: true
      })
    }
  },
  placeblur: function (e) {
    this.setData({
      placeborder: 'border:1rpx solid #dadada',
      hasplace: false      
    })
    this.progressControl()
  },
  countfocus: function (e) {
    this.setData({
      countborder: 'border:1rpx solid #ffc42f'
    })
    if (e.detail.value !== '') {
      this.setData({
        haslimit: true
      })
    }
  },
  countblur: function (e) {
    this.setData({
      countborder: 'border:1rpx solid #dadada',
      haslimit: false
    })
    this.progressControl();
  },
  spendfocus: function (e) {
    this.setData({
      spendborder: 'border:1rpx solid #ffc42f',
      spendinput: false
    })
  },
  spendblur: function (e) {
    this.setData({
      spendborder: 'border:1rpx solid #dadada',
      spendinput: false      
    })
    this.progressControl()
  },
  tipfocus: function (e) {
    this.setData({
      tipborder: 'border:1rpx solid #ffc42f'
    })
  },
  tipblur: function (e) {
    this.setData({
      tipborder: 'border:1rpx solid #dadada'
    })
    this.progressControl()
  },
  placeinput: function (e) {
    this.setData({
      hasplace: e.detail.value !== '' ? true : false,
      placevalue: e.detail.value
    })
  },
  limitinput: function (e) {
    this.setData({
      haslimit: e.detail.value !== '' ? true : false,
      limitvalue: e.detail.value
    })
  },
  spendinput: function (e) {
    if (e.detail.value.indexOf('.') > 0) {
      let cost = e.detail.value.split('.')[1];
      if (cost.length > 2) {
        this.show('不能超过两位小数');
      }
      this.setData({
        spendvalue: e.detail.value.split('.')[0] + '.' + cost.slice(0, 2)
      })
    }
    else if (e.detail.value.indexOf('.') !== e.detail.value.lastIndexOf('.')) {
      this.show('请输入正确格式的数字')
    }
    else {
      this.setData({
        spendvalue: e.detail.value,
      })
    }
  },
  tipinput: function (e) {
    this.setData({
      tipvalue: e.detail.value
    })
  },
  clearplace: function () {
    this.setData({
      placevalue: ''
    })
  },
  clearlimit: function () {
    this.setData({
      limitvalue: ''
    })
  },
  formSubmit: function (e) {
    let acinfo = e.detail.value;
    let flag;
    //判断活动是否修改
    if (acaddr !== this.data.placevalue) { //活动名称修改
      app.globalData.addrxg = '1';
    }
    else {
      app.globalData.addrxg = '0';   
    }
    if (cost !== this.data.spendvalue) {
      app.globalData.spendxg = '1';
    }
    else {
      app.globalData.spendxg = '0';
    }
    if (costtype !== this.data.spendtype) {
      app.globalData.spendtypexz = '1';
    }
    else {
      app.globalData.spendtypexz = '0';
    }
    if (limit !== this.data.limitvalue) {
      app.globalData.limitxg = '1';
    }
    else {
      app.globalData.limitxg = '0';
    }
    if (actip !== this.data.tipvalue) {
      app.globalData.tipxg = '1';
    }
    else {
      app.globalData.tipxg = '0';
    }
    app.globalData.flag = app.globalData.namexg + app.globalData.sdatexg + app.globalData.edatexg + app.globalData.addrxg + app.globalData.limitxg + app.globalData.spendtypexg + app.globalData.spendxg + app.globalData.tipxg;
    // console.log(app.globalData.flag + ':flag')
    flag = app.globalData.flag;
    if (update === 1) { //修改活动
      //有修改的情况
      if (app.globalData.flag > 0) {
        if (acinfo.spendinput.slice(0, 1) == '.') {
          this.show('请输入以数字开头的花费')
        }
        else {
          console.log('有修改' + acinfo.spendinput);
          wx.request({
            url: 'https://service.51wnl.com/Api/WxProgram/UpdateActivity',
            method: 'POST',
            data: {
              "id": acid,
              "ActivityName": name,
              "StartDate": sDate,
              "EndDate": eDate,
              "Address": acinfo.placeinput,
              "LimitNum": acinfo.countinput,
              "CostType": 0,
              "Cost": parseInt(acinfo.spendinput * 100), 
              "Remark": acinfo.tipinput,
              "uid": uid,
              "tkn": tkn,
              "UpdateFlag": flag
            },
            success: (res) => {
              console.log(res.data.status)
              wx.hideLoading();
              if (res.data.status == 200) {
                this.show('活动修改成功');
                update = 0;
                app.globalData.update = 1;
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 2
                  })
                }, 1300)
              }
              else {
                this.show('数据出错！');
              }
            }
          })
        }
      }
      else {
        wx.navigateBack({
          delta: 2
        })
      }
    }
    else {   //创建活动
      if (acinfo.spendinput.slice(0, 1) === '.') {
        this.show('请输入以数字开头的花费')
      }
      else {
        wx.showLoading({
          title: '数据提交中'
        })
        this.setData({
          dis: true
        })
        wx.request({
          url: 'https://service.51wnl.com/Api/WxProgram/CreateActivity',
          method: 'POST',
          data: {
            "ActivityName": name,
            "StartDate": sDate,
            "EndDate": eDate,
            "Address": acinfo.placeinput,
            "LimitNum": acinfo.countinput,
            "CostType": 0,
            "Cost": parseInt(acinfo.spendinput * 100),
            "Remark": acinfo.tipinput,
            "uid": uid,
            "tkn": tkn,
            "formid": e.detail.formId
          },
          success: (res) => {
            createid = res.data.data;//获取创建的活动id
            // console.log(parseInt(parseFloat(acinfo.spendinput) * 100));
            wx.hideLoading();
            if (res.data.status == 200) {
              this.show('活动创建成功');
              setTimeout(() => {
                wx.navigateTo({
                  url: '../createinfo/createinfo?name=' + name + '&sdate=' + sDate + '&place=' + acinfo.placeinput + '&limit=' + acinfo.limitinput + '&costtype=' + costtype + '&cost=' + acinfo.spendinput + '&tip=' + acinfo.tipinput + '&avatar=' + avatar + '&nickname=' + nickname + '&createid=' + createid
                })
              }, 1300)
            }
            else {
              this.show('数据出错！');
            }
          },
          complete: () => {
            setTimeout(() => {
              this.setData({
                dis: false
              })
            }, 2500)
          }
        })
      }
    }
  } 
})