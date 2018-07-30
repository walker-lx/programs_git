import api from '../api';
import device from './device';
import store from '../store/index';
import types from '../store/types';

let userInfo = {};
if (device.weixin) {
  if (localStorage.getItem('wnl_tlp_local')) {
    var wnl_tlp_local = JSON.parse(localStorage.getItem('wnl_tlp_local'));
    userInfo.userId = wnl_tlp_local.wnlUserId;
    userInfo.deviceId = wnl_tlp_local.openid;
    store.commit(types.SET_USERINFO, userInfo);
  }
}

if (!device.wnl && !device.weixin) {
  if (localStorage.getItem('wnl_tlp_guid')) {
    var guid = localStorage.getItem('wnl_tlp_guid');
    console.log('local wnl_tlp_guid', guid);
    userInfo.userId = '';
    userInfo.deviceId = guid;
    store.commit(types.SET_USERINFO, userInfo);
  } else {
    api.createGUID().then(res => {
      var guid = res.data;
      console.log('new wnl_tlp_guid', guid);
      localStorage.setItem('wnl_tlp_guid', guid);
      userInfo.userId = '';
      userInfo.deviceId = guid;
      store.commit(types.SET_USERINFO, userInfo);
    });
  }
}
