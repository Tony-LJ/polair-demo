/**
 * @descr: 前端路由管理器
 * @author: Tony
 * @date: 2025-12-07
 * */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

// 路由规则定义
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页 - Mock数据演示'
        }
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/User.vue'),
        meta: {
            title: '用户管理 - Mock数据演示'
        },
        children: [
            {
                path: 'detail/:id',
                name: 'UserDetail',
                component: () => import('@/views/user/UserDetail.vue'),
                meta: {
                    title: '用户详情 - Mock数据演示'
                },
                props: (route) => ({
                    id: Number(route.params.id)
                })
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: '404 - 页面不存在'
        }
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

// 全局前置守卫：设置页面标题
router.beforeEach((to, _, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    next()
})

export default router