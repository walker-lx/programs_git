import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import store from './store/index';
import './utils/user.js';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { getQueryStringArgs } from './utils/parseurl';
import types from './store/types';
import './utils/clientcallback';
import device from './utils/device';

import 'swiper/dist/css/swiper.css'
import './css/rem.css';
import './css/normalize.css';
import './css/common.css';

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

console.log('初始化生肖运势');

window.onload = () => {
  if (device.wnl) {
    setTimeout(() => {
      location.href = 'protocol://getuserinfo#userinfocallback';
    }, 0);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

let clientInfo = getQueryStringArgs(window.location.href);
store.commit(types.SET_CLIENT_INFO, clientInfo);