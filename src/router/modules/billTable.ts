import type {Route} from '../index.type'
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/billTable',
        meta: {icon: 'sfont system-page'},
        children: [
            {
                path: 'billTable',
                component: createNameComponent(() => import('@/views/main/billTable/index.vue')),
                meta: {title: '账单查询', icon: 'sfont system-page', hideClose: true}
            }
        ]
    }
]

export default route
