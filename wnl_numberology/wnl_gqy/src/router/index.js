import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/Entry'
import Select from '@/components/Select'
import Status from '@/components/Status'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Entry,

    }, {
        path: '/entry',
        name: 'Entry',
        component: Entry,

    }, {
        path: '/select',
        name: 'Select',
        component: Select
    }, {
        path: '/status',
        name: 'Status',
        component: Status
    }, {
        path: '/result',
        name: 'Result',
        component: Result
    }
    ]
})
