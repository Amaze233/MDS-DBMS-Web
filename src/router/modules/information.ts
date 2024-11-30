import type {Route} from '../index.type'
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/information',
        meta: {icon: 'sfont system-home'},
        children: [
            {
                path: 'information',
                component: createNameComponent(() => import('@/views/main/information/index.vue')),
                meta: {title: '消息', icon: 'sfont system-xiaoxi', hideClose: true}
            }
        ]
    }
]

export default route
