/**
 * descri: Axios 封装
 * author: Tony
 * date:2025-12-07
 * */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建axios实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API || '', // 基础路径
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 可添加token等请求头
        if (config.headers) {
            config.headers['Authorization'] = localStorage.getItem('token') || ''
        }
        return config
    },
    (error) => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        // 自定义响应码处理
        if (res.code !== 200) {
            console.error('请求失败:', res.msg)
            return Promise.reject(res)
        }
        return res
    },
    (error) => {
        console.error('响应错误:', error)
        return Promise.reject(error)
    }
)

export default service