// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResourece from 'vue-resource'
// import touch from 'vue-directive-touch';
import '../static/js/flexible.js'
import util from "./plugin/util";
// import '../static/css/wnlui.css';
// import wnlui from '../static/js/wnlui.js';
import { toast, pageloading, wnlShare, wxShare } from './plugin/wnlui';
import store from './store/index'
// import './plugin/wnlHistoryPro-v2'

// Vue.use(touch);
Vue.use(vueResourece);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.shareCallback = function() {
  document.querySelector('.redpackage-mask').classList.add('hidden');
	_czc.push(['_trackEvent', 'Shengyucard_shared', 'share', 'ios']);
}
