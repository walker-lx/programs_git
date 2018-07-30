import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Choose from '@/page/choose'
import Slide from '@/page/slide'
// import Make from '@/page/make'
import Result from '@/page/result'
import Share from '@/page/share'
import Save from '@/page/save'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // {
    //   path: '/slide/:role',
    //   name: 'Slide',
    //   component: Slide
    // },
    {
      path: '/choose',
      name: 'Choose',
      component: Choose
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/save',
      name: 'Save',
      component: Save
    },
    {
      path: '/share/:shareSrc',
      name: 'Share',
      component: Share
    }
  ]
})
