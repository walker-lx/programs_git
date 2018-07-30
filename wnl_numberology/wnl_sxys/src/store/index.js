import Vue from 'vue'
import Vuex from 'vuex'
import types from './types';
import device from '../utils/device';
import wnlShare from '../plugin/wnl_share';
import wxShare from '../plugin/wx_share';
let protocol = window.location.protocol;
Vue.use(Vuex)

const shareData = {
  title: '超准生肖运势，为你私人定制',
  text: '把握今年这几个月，别让好运气跑了！',
  imgUrl: `${protocol}//mobile.51wnl.com/numberology/sxys/img/share-200x200.jpg`,
  url: decodeURIComponent(window.location.href)
}
/* 设置微信分享 */
window.wxshare = {};
if (device.weixin) {
  window.wxshare = new wxShare({
    title: shareData.title,
    text: shareData.text,
    imgUrl: shareData.imgUrl,
    url: `${protocol}//mobile.51wnl.com/numberology/sxys/#/`
  });
}

/* 设置wnl分享 */
wnlShare.setShareData({
  title: shareData.title,
  text: shareData.text,
  image: `${protocol}//mobile.51wnl.com/numberology/sxys/img/share-200x200.jpg`,
  url: shareData.url
})

export default new Vuex.Store({
  state: {
    userInfo: {
      userId: '',
      deviceId: ''
    },
    clientInfo: {}
  },
  mutations: {
    [types.SET_USERINFO](state, userInfo) {
      if (userInfo.userId && userInfo.userId !== '') {
        state.userInfo.userId = userInfo.userId;
      }
      if (userInfo.deviceId && userInfo.deviceId !== '') {
        state.userInfo.deviceId = userInfo.deviceId;
      }
      console.log(userInfo)
    },
    [types.SET_CLIENT_INFO](state, clientInfo) {
      state.clientInfo = clientInfo;
    },
    [types.SET_SHARE](state, shareData) {
      if (device.weixin) {
        wxshare.setShareParams({
          title: '超准生肖运势，为你私人定制',
          text: '把握今年这几个月，别让好运气跑了！',
          imgUrl: `${protocol}//mobile.51wnl.com/numberology/sxys/img/share-200x200.jpg`,
          url: shareData.url
        })
      }
      /* 设置wnl分享 */
      wnlShare.setShareData({
        title: '超准生肖运势，为你私人定制',
        text: '把握今年这几个月，别让好运气跑了！',
        image: `${protocol}//mobile.51wnl.com/numberology/sxys/img/share-200x200.jpg`,
        url: shareData.url
      })
    }
  },
  actions: {

  }
})
