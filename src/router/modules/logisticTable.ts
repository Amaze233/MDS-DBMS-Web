import type {Route} from '../index.type'
import Layout from '@/layout/index.vue'
import {createNameComponent} from '../createNode'

const route: Route[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/logisticTable',
        meta: {icon: 'sfont system-zuixiaohua'},
        children: [
            {
                path: 'logisticTable',
                component: createNameComponent(() => import('@/views/main/logisticTable/index.vue')),
                meta: {title: '物流查询', icon: 'sfont system-zuixiaohua', hideClose: true}
            }
        ]
    }
]

export default route
