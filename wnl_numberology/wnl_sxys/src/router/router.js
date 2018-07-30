import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/result/:sx/:month',
      name: 'result',
      component: Result
    }
  ]
})
