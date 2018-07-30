// pages/history/history.js
//获取应用实例
const app = getApp()
let userID = '';
let listsArr = [[], [], []];
let orderListNum;
Page({
  data: {
    userInfo: {},
    tabIndex: 0,
    hasUserInfo: false,
    pageIndex: [1, 1, 1],
    pageSize: 15,
    lists: listsArr,
    orderStatus: [-1, 0, 1],
    orderListNum: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    listsArr = [[], [], []]
    userID = options.userID
    console.log(options)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.userInfo === {}) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);

  },

  // tabs select
  tabFirst: function (e) {
    this.setData({
      tabIndex: 0
    })
    console.log(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex)
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);
  },
  tabSecond: function (e) {
    this.setData({
      tabIndex: 1
    })
    console.log(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex)
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);
  },
  tabThird: function (e) {
    console.log('teb3');
    this.setData({
      tabIndex: 2
    })
    console.log(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex)
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);
  },

  onPullDownRefresh: function () {
    this.setData({
      pageIndex: [1, 1, 1]
    })
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);
  },

  onReachBottom: function () {
    getUserOrderLists(this, this.data.pageIndex[this.data.tabIndex], this.data.pageSize, this.data.tabIndex);
    this.setData({
      pageIndex: this.data.pageIndex
    })
  },

  viewOrder: function (e) {
    console.log(e);
    let orderId = e.currentTarget.dataset.order;
    let url = e.currentTarget.dataset.url;
    let ordername = e.currentTarget.dataset.ordername;
    console.log(url,ordername);
    if (ordername=='八字测算') {
      wx.navigateTo({
        url: '../result/result?orderId=' + orderId + '&userId=' + userID,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '暂无法查看未付费订单，请重新下单',
        success: function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }
  }
})

// 获取订单列表
function getUserOrderLists(__this, pageIndex, pageSize, tabIndex) {
  if (pageIndex === 0) {
    return 0;
  }
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: 'https://order.51wnl.com/api/ordersync/GetSyncOrderList?deviceid=' + userID + '&pageindex=' + pageIndex + '&pagesize=' + pageSize + '&orderStatus=' + __this.data.orderStatus[tabIndex],
    dataType: 'json',
    method: 'GET',
    success: res => {
      console.log(res);
      //res = { "data": [], "status": 200, "msg": "操作成功" };
      let i = 0;
      if (res.data && res.data.data && res.data.data.length > 0) {
        if (res.data.data.length < pageSize) {
          __this.data.pageIndex[tabIndex] = 0;
        } 
        else {
          __this.data.pageIndex[tabIndex]++;
        }
        for (i = 0; i < res.data.data.length; i++) {
          listsArr[tabIndex].push(res.data.data[i])
        }
      } else {
        __this.data.pageIndex[tabIndex] = 0;
        listsArr[tabIndex].length = 0;
      }
      __this.setData({
        lists: listsArr,
        pageIndex: __this.data.pageIndex
      })
      console.log(__this.data.lists[2])
      wx.hideLoading();
    },
    error: res => {
      wx.hideLoading();
    }
  })
}