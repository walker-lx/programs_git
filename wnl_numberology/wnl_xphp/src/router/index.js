import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
/* import PageTransition from '@/components/PageTransition'; */
import Index from '@/components/Index';
import UserInfo from '@/components/UserInfo';
import WxShare from '@/components/WxShare';
import Result from '@/components/Result';
import StarHp from '@/components/StarHp';
import JzHp from '@/components/JzHp';
import UserCenter from '@/components/UserCenter';

Vue.use(Router);
Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};
export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/wxShare',
      name: 'Wxshare',
      component: WxShare
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/star-hp',
      name: 'StarHp',
      component: StarHp
    },
    {
      path: '/jz-hp',
      name: 'JzHp',
      component: JzHp
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
