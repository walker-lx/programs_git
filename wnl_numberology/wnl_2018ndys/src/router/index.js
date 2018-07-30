import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DescriptionPage from '@/components/DescriptionPage'
import OrderPage from '@/components/OrderPage'
import ResultPage from '@/components/ResultPage'
import QuarterPage from '@/components/QuarterPage'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HomePage
    },
    {
      path: '/description',
      name: 'description',
      component: DescriptionPage
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
    },
    {
      path: '/result',
      name: 'result',
      component: ResultPage
    },
    {
      path: '/quarter/:id',
      name: 'quarter',
      component: QuarterPage
    },
  ]
})
