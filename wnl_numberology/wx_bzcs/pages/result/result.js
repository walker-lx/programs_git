// pages/result/result.js
//引入wxCharts
let Charts = require('../../lib/wxcharts');
let ChartsLine = require('../../lib/wxChartLine')

const parterId = 'NRLorder';
const orderName = '八字测算-十年运势';
//const goodsId = '41DBA1789A644753A408CD78DAF79B00';
const goodsId = '138E59D3769F43628D83DBB0B8A38164';
let userId;
let orderId;
let clientType;
let headerInfo = [];
let dayunYearList = [];
let wuxingxijiList = [];
let dayunYearsList;
let dayunTenList;
let wuXingLiLiangList;
let yunshiChartData;
let yunshiChartDataX = [];
let yunshiChartDataY = [];

let px2rpx;
let _windowWidth;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerInfo: headerInfo,
    dayunYearList: dayunYearList,
    locekedContentList: [
      { title: '命理星神', content: '从整体运势来看这个月的运势情况，注意事项' },
      { title: '年度总评', content: '是大吉之年？还是小凶之年？总体运势如何？遇到不良信息该如何规避？' },
      { title: '贵人帮扶', content: '年运不佳时，是否有贵人扶持，逢凶化吉？' },
      { title: '吉神', content: '是否有吉神庇佑？遇吉能锦上添花，遇凶可转危为安' },
      { title: '凶神', content: '流年凶神，即使在大运好时，凶神力量也会影响到整年运势，提前预知规避风险。' },
      { title: '开运秘诀', content: '独家开运秘诀，让你面对低谷时，提前准备，抢占先机！' }
    ],
    resultFreeHidden: true,
    resultPaidHidden: true,

    wuxingList: wuXingLiLiangList,
    wuxingxijiList: wuxingxijiList,

    dayunYearsList: '',
    dayunTenList: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorage();
    wx.clearStorageSync();

    //数据清空
    headerInfo = [];
    dayunYearList = [];
    wuxingxijiList = [];
    dayunYearsList;
    dayunTenList;
    wuXingLiLiangList;
    yunshiChartData;
    yunshiChartDataX = [];
    yunshiChartDataY = [];

    wx.getSystemInfo({
      success: function (res) {
        _windowWidth = res.windowWidth;
        px2rpx = _windowWidth / 750;
      }
    })

    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    // console.log(px2rpx);
    var _this = this;
    // console.log(options);
    orderId = options.orderId;
    userId = options.userId;
    clientType = options.clientType;
    //orderId = '9f02a2e612d6460eb7c8001ef03ddb1f'; //未支付
    //orderId = '646f2d0146cb43649a45c9f40d523cf2&PosId=B0A3'; //已支付
    // console.log('resultOrderID' + orderId);
    // console.log('clientType' + clientType);
    //获取订单详情
    wx.request({
      url: 'https://coco70.51wnl.com/NumberologyNew/NRLorder/GetOrderAnswer?orderid=' + orderId,
      method: 'GET',
      success: res => {
        wx.hideLoading();
        // console.log(res);
        if (!res.data.data.isPayed) {
          let resultData = res.data.data;
          headerInfo.push({
            'name': resultData.name,
            'sex': resultData.sex,
            'glYear': resultData.birth.split(' ')[0].split('-')[0],
            'glMonth': resultData.birth.split(' ')[0].split('-')[1],
            'glDay': resultData.birth.split(' ')[0].split('-')[2],
            'glHour': resultData.birth.split(' ')[1].substring(0, 2),
            'bzYear': resultData.baZi.split(' ')[0],
            'bzMonth': resultData.baZi.split(' ')[1],
            'bzDay': resultData.baZi.split(' ')[2],
            'bzHour': resultData.baZi.split(' ')[3],
            'xingQing': resultData.xingQing.substr(0, 100) + '...',
          });
          //yunshiChartLine
          //Charts-line
          yunshiChartData = resultData.liuNian;
          for (let [key, value] of yunshiChartData.entries()) {
            //yunshiChartDataX
            yunshiChartDataX.push(value.year.substr(0, 4));
            //yunshiChartDataY
            yunshiChartDataY.push(value.score);
          }
          // console.log(yunshiChartDataX, yunshiChartDataY);
          new ChartsLine({
            canvasId: 'ysChartLineFree',
            type: 'area',
            categories: yunshiChartDataX,
            series: [{
              data: yunshiChartDataY,
              color: '#F6E2D1',
            }],
            yAxis: {
              min: 0,
              max: 100,
              titleFontColor: '#f16300',
            },
            xAxis: {
              fontColor: '#333333',
            },
            legend: false,
            dataLabel: false,
            width: 640 * px2rpx,
            height: 320 * px2rpx
          });
          let dayun = resultData.daYun.split(';')
          for (let i = 0; i < dayun.length - 1; i++) {
            var index1 = dayun[i].indexOf("("),
              index2 = dayun[i].indexOf(")");
            var time = dayun[i].substr(0, index1),
              timeDesc = dayun[i].substring(index1 + 1, index2);
            timeDesc = timeDesc.substr(0, 4) + ' ~ ' + timeDesc.substr(5, 9);
            dayunYearList.push({
              'dayunTime': time,
              'dayunTimeDes': timeDesc
            })
          }
          _this.setData({
            headerInfo: headerInfo,
            dayunYearList: dayunYearList,
            resultFreeHidden: false
          })
        }
        if (res.data.data.isPayed) {
          // console.log(res.data.data);
          let resultData = res.data.data;
          headerInfo.push({
            'name': resultData.name,
            'sex': resultData.sex,
            //(Array(2).join(0) + nowDay).slice(-2)
            'glYear': resultData.birth.split(' ')[0].split('-')[0],
            'glMonth': resultData.birth.split(' ')[0].split('-')[1],
            'glDay': resultData.birth.split(' ')[0].split('-')[2],
            'glHour': resultData.birth.split(' ')[1].substring(0, 2),
            'bzYear': resultData.baZi.split(' ')[0],
            'bzMonth': resultData.baZi.split(' ')[1],
            'bzDay': resultData.baZi.split(' ')[2],
            'bzHour': resultData.baZi.split(' ')[3],
            'xingQing': resultData.xingQing,
          });

          //Charts-line
          yunshiChartData = resultData.liuNian;
          for (let [key, value] of yunshiChartData.entries()) {
            //yunshiChartDataX
            yunshiChartDataX.push(value.year.substr(0, 4));
            //yunshiChartDataY
            yunshiChartDataY.push(value.score);
          }
          // console.log(yunshiChartDataX, yunshiChartDataY);
          new ChartsLine({
            canvasId: 'ysChartLine',
            type: 'area',
            categories: yunshiChartDataX,
            series: [{
              data: yunshiChartDataY,
              color: '#F6E2D1',
            }],
            yAxis: {
              min: 0,
              max: 100,
              titleFontColor: '#f16300',
            },
            xAxis: {
              fontColor: '#333333',
            },
            legend: false,
            dataLabel: false,
            width: 640 * px2rpx,
            height: 320 * px2rpx
          });
          //Charts-pie
          wuXingLiLiangList = resultData.wuXingLiLiang.split(' ');
          for (let [key, value] of wuXingLiLiangList.entries()) {
            wuXingLiLiangList[key] = value.replace(':', ' ');
          }
          new Charts({
            canvasId: 'wxChartPie',
            type: 'pie',
            series: [{
              name: 'jin',
              data: parseInt(wuXingLiLiangList[0].replace(/[^0-9]/ig, "")),
              color: '#f9b90e',
            }, {
              name: 'mu',
              data: parseInt(wuXingLiLiangList[1].replace(/[^0-9]/ig, "")),
              color: '#529671',
            }, {
              name: 'shui',
              data: parseInt(wuXingLiLiangList[2].replace(/[^0-9]/ig, "")),
              color: '#2ea9df',
            }, {
              name: 'huo',
              data: parseInt(wuXingLiLiangList[3].replace(/[^0-9]/ig, "")),
              color: '#f16300',
            }, {
              name: 'tu',
              data: parseInt(wuXingLiLiangList[4].replace(/[^0-9]/ig, "")),
              color: '#e0bb87',
            }],
            width: 310 * px2rpx,
            height: 310 * px2rpx,
            legend: false,
            disablePieStroke: true,
            dataLabel: false
          });
          let dayun = resultData.daYunYear;
          for (let i = 0; i < dayun.length; i++) {
            var index1 = dayun[i].indexOf("("),
              index2 = dayun[i].indexOf(")");
            var time = dayun[i].substr(0, index1),
              timeDesc = dayun[i].substring(index1 + 1, index2);
            timeDesc = timeDesc.substr(0, 4) + ' ~ ' + timeDesc.substr(5, 9);
            dayunYearList.push({
              'dayunTime': time,
              'dayunTimeDes': timeDesc,
            })
          }
          wuxingxijiList.push(
            {
              'title': '最喜五行' + resultData.xiYong.split(' ')[0],
              'content': resultData.zuiXi
            },
            {
              'title': '次喜五行' + resultData.xiYong.split(' ')[1],
              'content': resultData.ciXi
            },
            {
              'title': '最忌五行' + resultData.xiYong.split(' ')[2],
              'content': resultData.zuiJi
            },
            {
              'title': '次忌五行' + resultData.xiYong.split(' ')[3],
              'content': resultData.ciJi
            },
            {
              'title': '平常五行' + resultData.xiYong.split(' ')[4],
              'content': resultData.ciJi
            }
          )
          dayunYearsList = resultData.daYun;
          dayunTenList = resultData.liuNian;
          //去除 /n
          for (let i = 0; i < dayunYearsList.length; i++) {
            dayunYearsList[i].chongHe = dayunYearsList[i].chongHe.replace(/\/n/g, '');
            dayunYearsList[i].qiLuo = dayunYearsList[i].qiLuo.replace(/\/n/g, '');
            dayunYearsList[i].shiShen = dayunYearsList[i].shiShen.replace(/\/n/g, '');
            dayunYearsList[i].text = dayunYearsList[i].text.replace(/\/n/g, '');
          }

          for (let i = 0; i < dayunTenList.length; i++) {
            dayunTenList[i].jiShen = dayunTenList[i].jiShen.replace(/\/n/g, '');
            dayunTenList[i].shiShenText = dayunTenList[i].shiShenText.replace(/\/n/g, '');
            dayunTenList[i].text = dayunTenList[i].text.replace(/\/n/g, '');
            dayunTenList[i].xiongShen = dayunTenList[i].xiongShen.replace(/\/n/g, '');
          }
          _this.setData({
            headerInfo: headerInfo,
            wuxingList: wuXingLiLiangList,
            dayunYearList: dayunYearList,
            wuxingxijiList: wuxingxijiList,
            dayunYearsList: dayunTenList,
            dayunTenList: dayunYearsList,
            resultPaidHidden: false,
            headerPanelBottomIsHidden: true,
          })
        }
      }
    })
  },

  /**
   * 事件绑定--支付
   */
  payForOrder: function () {
    // console.log('payInit');
    wx.showLoading({
      title: '加载中...',
    })

    //转到支付页面
    wx.navigateTo({
      url: '../pay/pay?parterId=' + parterId + '&goodsId=' + goodsId + '&orderId=' + orderId + '&orderName=' + orderName + '&clientType=' + clientType + '&userId=' + userId,
    })
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    if(res.from === 'button') {
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
  }
})