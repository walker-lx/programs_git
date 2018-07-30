// window.alert('main.js');

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i from './utils/ichart.1.2.min.js'
import orderInfo from './utils/order'
import device from './utils/device';
import shareRedPackage from './utils/wnl_redpackage'
import getQueryStringArgs from './utils/parseurl'
import {
  getQueryString
} from './utils/parseurl'
import {
  setItem
} from './utils/utils';
import {
  getWnlUserInfo
} from './api/api'
import weChatShare from './utils/weChatShare'

Vue.config.productionTip = false
/* eslint-disable no-new */

// if (device.wnl) {
//   location.href = 'protocol://getuserinfo#userinfocallback';
// }
//网页
console.log('ready3333');
if (!device.wnl && !device.weixin) {
  var urlParams = getQueryStringArgs(window.location.href)
  for (var k in urlParams) {
    orderInfo[k] = urlParams[k];
  }
  console.log(orderInfo)
  var that = this;
  if (localStorage.getItem('wnl_tlp_guid')) {
    var userId = localStorage.getItem('wnl_tlp_guid');
    console.log('local wnl_tlp_guid', userId);
    orderInfo.userId = userId
  } else {
    $.ajax({
      url: 'http://coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
      type: "get",
      success: function (result) {
        var userId = result.toString();
        var deviceId = result.toString();
        console.log('new wnl_tlp_guid', userId);
        localStorage.setItem('wnl_tlp_guid', userId);
        orderInfo.userId = userId;
      }
    })
  }
}
//万年历
if (device.wnl && decodeURIComponent(window.location.href).indexOf('?') > -1) {
  console.log('ready2222222');
  var urlParams = getQueryStringArgs(window.location.href)
  for (var k in urlParams) {
    orderInfo[k] = urlParams[k];
  }
  console.log(orderInfo)
}
//微信
if (device.weixin) {
  // localStorage.clear();
  getOpenId();
}
// window.alert(device.weixin);
function getOpenId() {
  var urlParams = getQueryStringArgs(window.location.href.replace("?from=singlemessage", "").replace("?from=timeline", "").replace("?from=groupmessage", ""));

  for (var k in urlParams) {
    orderInfo[k] = urlParams[k];
  }
  var wnl_tlp_local = JSON.parse(localStorage.getItem('wnl_tlp_local'));
  // if (wnl_tlp_local && wnl_tlp_local.wnlUserId) {
  //   // console.log('wnl_tlp_local:', wnl_tlp_local);
  //   orderInfo.userId = wnl_tlp_local.wnlUserId;
  //   return false
  // } else 
  if (urlParams.openid) {
    // console.log(urlParams)
    var wnl_tlp_local = {}
    wnl_tlp_local.openid = urlParams.openid;
    wnl_tlp_local.unionid = urlParams.unionid;
    wnl_tlp_local.gender = urlParams.sex;
    wnl_tlp_local.openName = urlParams.nickname;
    getWnlUserInfo(wnl_tlp_local).then(res => {
      // console.log(res)
      wnl_tlp_local.wnlUserId = res.data.data.wnlUserId;
      orderInfo.userId = wnl_tlp_local.wnlUserId;
      // test
      localStorage.setItem('wnl_tlp_local', JSON.stringify(wnl_tlp_local));
    }).catch((e) => {
      // window.alert('error');
    })
    return false
  } else {
    // window.alert('href')
    // location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent(window.location.href+'&time='+(new Date()).getTime());
    location.href = '//b.cqyouloft.com/atcapi/WeChat/WxProcess?reurl=' + encodeURIComponent('https://mobile.51wnl.com/numberology/2018ndys/#/');
  }
  // var returl = decodeURIComponent(returl).replace("&from", "?from");
  // returl =  returl.replace("?from=singlemessage", "");
  // alert(returl);
  // console.log(returl);
  // console.log(encodeURIComponent(returl));
}
window.appCallback_share = function () {
  // let url = 'http://mobile.51wnl.com/numberology/2018ndys';
  let url = 'https://mobile.51wnl.com/numberology/2018ndys/#/?userID=[WNLUSERID]&deviceId=[OPENUDID]&pushToken=[PTOKEN]&PToken=[PTOKEN]&mac=[MAC]&imei=[IMEI]&boundid=[BUNDLE]&posId=[posId]&Idfa=[IDFA]&DONTURLENCODE=[DONTURLENCODE]';
  let title = '2018年年运';
  let text = '2018已过半，回顾你的上半年，揭秘下半年的关键点。';
  let imageURL = 'https://mobile.51wnl.com/numberology/2018ndys/static/img/icon.jpg';
  window.textObj = {
    title: title,
    text: text,
    image: '0',
    imageURL: imageURL,
    url: url,
    pureText: text,
    prefix: ''
  };
  window.textObj1 = {
    title: title,
    text: text,
    image: '0',
    imageURL: imageURL,
    targetUrl: url,
    perfix: ''
  };
  try {
    if (window.ylwindow) {
      ylwindow.reportHasShare(true);
      location.href = 'protocol://share:' + encodeURI(JSON.stringify(window.textObj1));
    } else {
      location.href = 'protocol://share#' + encodeURI(JSON.stringify(window.textObj));
    }
  } catch (e) {}
  return 1;
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
