/**
 * axios 封装：请求拦截、响应拦截、错误处理、请求取消、基础配置等
 * 适配 Vue3 + TS + Vite 环境变量
 */
// src/utils/request.ts
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'

// 从环境变量读取配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
    baseURL: API_BASE_URL, // 接口前缀（Mock/真实接口统一）
    timeout: 10000, // 请求超时
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器：添加 token、处理请求前逻辑
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从本地存储获取 token（登录后存储）
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        // Mock 模式下打印请求信息（方便调试）
        if (USE_MOCK) {
            console.log(`【Mock 请求】${config.method?.toUpperCase()} ${config.url}`, config.data)
        }
        return config
    },
    (error: AxiosError) => {
        console.error('【请求拦截器错误】', error)
        return Promise.reject(error)
    }
)

// 响应拦截器：统一处理响应、错误
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        // Mock 模式下打印响应信息
        if (USE_MOCK) {
            console.log(`【Mock 响应】${response.config.url}`, res)
        }

        // 统一响应格式：code=200 为成功
        if (res.code !== 200) {
            // 错误提示
            alert(res.message || '操作失败')
            // 登录失效（code=401）：清除 token 并跳回登录页
            if (res.code === 401) {
                localStorage.removeItem('token')
                sessionStorage.removeItem('token')
                window.location.href = '/login'
            }
            return Promise.reject(res)
        }

        // 成功：返回响应数据（业务层直接用 res.data）
        return res
    },
    (error: AxiosError) => {
        // 统一错误提示
        const errMsg = {
            'ERR_BAD_RESPONSE': USE_MOCK ? '❌ Mock 接口响应异常' : '❌ 后端接口响应异常',
            'ERR_NETWORK': '❌ 网络异常，请检查连接',
            'ERR_TIMEOUT': '❌ 请求超时，请稍后重试',
            'ECONNREFUSED': '❌ 后端服务未启动，请检查服务地址'
        }[error.code || ''] || `❌ 请求失败：${error.message}`

        alert(errMsg)
        console.error('【响应拦截器错误】', {
            url: error.config?.url,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data
        })
        return Promise.reject(error)
    }
)

// 封装通用请求方法（业务层调用）
/**
 * POST 请求
 * @param url 接口路径（如 /login/account）
 * @param data 请求参数
 * @param config 额外配置
 */
export const post = <T>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {}
): Promise<T> => {
    return service.post(url, data, config)
}

/**
 * GET 请求
 * @param url 接口路径
 * @param params 请求参数
 * @param config 额外配置
 */
export const get = <T>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
): Promise<T> => {
    return service.get(url, { params, ...config })
}

// 导出 Axios 实例（特殊场景使用）
export default service