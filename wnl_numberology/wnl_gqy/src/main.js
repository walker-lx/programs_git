// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import device from './util/device'
import store from './store'
import axios from 'axios'
import { clientCallback } from './util/clientcallback'
import { LoadingPlugin } from 'vux'
import shareRedPackage from './util/wnl_redpackage'
import wnlui from './util/wnlui'
/**
 * 1.1.0
 */
Vue.use(LoadingPlugin);

Vue.config.productionTip = false
/**
 * 获取客户端sdk回调
 */
// if (device.wnl) {
//     location.href = 'protocol://getlocalsdksupport#localsdksupportcallback';
// }
/**
 * 获取客户端用户信息
 */
if (device.wnl) {
    location.href = 'protocol://getuserinfo#userinfocallback';
}
if (!device.wnl && !device.wexin) {
    var that = this;
    if (localStorage.getItem('wnl_tlp_guid')) {
        var userId = localStorage.getItem('wnl_tlp_guid');
        console.log('wnl_tlp_guid', userId);
        store.commit('setUserId', userId);
    } else {
        $.ajax({
            url: 'http://coco70.51wnl.com/numberologynew/UniqueID/NewGuid',
            type: "get",
            success: function (result) {
                var userId = result.toString();
                var deviceId = result.toString();
                localStorage.setItem('wnl_tlp_guid', userId);
                store.commit('setUserId', userId);
            }
        })
    }
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
// $.ajax({
//     url: "http://c.cqyouloft.com/interface/API/weixinhandler.ashx",
//     type: "get",
//     data: {
//         requesturl: location.href
//     },
//     success: function (result) {
//         result = JSON.parse(result);
//         wx.config({
//             debug: false,
//             appId: 'wx347ab26567c5465f', // 必填，公众号的唯一标识
//             timestamp: result.timestamp, // 必填，生成签名的时间戳
//             nonceStr: result.nonceStr, // 必填，生成签名的随机串
//             signature: result.signature, // 必填，签名，见附录1
//             jsApiList: [
//                 'onMenuShareTimeline',
//                 'onMenuShareAppMessage',
//                 'onMenuShareQQ',
//                 'onMenuShareWeibo'
//             ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//         });
//     }
// });
