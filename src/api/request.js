/**
 * @descr: axios请求封装
 * @author: Tony
 * */

// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus' // 按需引入UI框架提示组件

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量读取API地址
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在这里可以统一添加token等操作
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 这里根据后端返回的数据结构进行调整
        if (res.code !== 200) {
            ElMessage.error(res.message || 'Error')
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // 处理HTTP错误状态码
        let message = ''
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = '认证失败，请重新登录'
                    break
                case 403:
                    message = '当前操作没有权限'
                    break
                case 404:
                    message = '资源不存在'
                    break
                case 500:
                    message = '服务器错误'
                    break
                default:
                    message = error.message
            }
        }
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

// 封装通用请求方法
export function request(options) {
    return service(options)
}

// 封装GET请求
export function get(url, params, options = {}) {
    return service({
        url,
        method: 'get',
        params,
        ...options
    })
}

// 封装POST请求
export function post(url, data, options = {}) {
    return service({
        url,
        method: 'post',
        data,
        ...options
    })
}

// 其他请求方法同理可以继续封装...