import type {Route} from '../index.type'
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/orderTable',
        meta: {icon: 'sfont system-menu'},
        children: [
            {
                path: 'orderTable',
                component: createNameComponent(() => import('@/views/main/orderTable/index.vue')),
                meta: {title: '订单查询', icon: 'sfont system-menu', hideClose: true}
            }
        ]
    }
]

export default route
