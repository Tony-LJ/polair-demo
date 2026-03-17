/**
 * @descr: 前端路由管理器
 * @author: Tony
 * @date: 2025-12-07
 * */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Register from '@/views/login/Register.vue'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login' // 默认跳转到登录页
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true // 需要登录才能访问
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 路由守卫：验证登录态
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) {
            next()
        } else {
            next('/login') // 无 token 跳回登录页
        }
    } else {
        next()
    }
})

export default router


