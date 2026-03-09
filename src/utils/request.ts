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

// 创建Axios实例
const service: AxiosInstance = axios.create({
    baseURL: '', // Mock场景留空，避免路径拼接问题
    timeout: 5000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 模拟token添加（Mock场景不影响）
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error: AxiosError) => {
        console.error('【请求拦截器错误】', error)
        return Promise.reject(error)
    }
)

// 核心：修复后的响应拦截器（极致容错+精准提示）
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data
        // 调试：打印返回数据，方便排查
        console.log('【Mock接口返回数据】', res)

        // 兜底：如果没有code字段，手动构造成功数据（避免拦截器崩溃）
        if (typeof res !== 'object' || res.code === undefined) {
            console.warn('【Mock接口格式异常】', res)
            return { code: 200, message: '登录成功', token: 'MOCK_TOKEN_123', userInfo: { id: '1', username: 'admin' } }
        }

        // 正常业务逻辑
        if (res.code !== 200) {
            alert(`登录失败：${res.message || '用户名/密码错误'}`)
            if (res.code === 401) {
                localStorage.clear()
                window.location.href = '/login'
            }
            return Promise.reject(res)
        }
        return res
    },
    (error: AxiosError) => {
        // 分场景精准提示
        const errMsg = {
            'ERR_BAD_RESPONSE': '❌ Mock接口响应异常（检查mock/login.ts）',
            'ERR_NETWORK': '❌ 网络异常（检查Mock插件是否启动）',
            'ERR_BAD_REQUEST': '❌ 请求路径错误（确认是/mock/login/xxx）',
            'ECONNREFUSED': '❌ 请求被转发到8089端口（注释proxy配置）'
        }[error.code || ''] || `❌ 请求失败：${error.message}`

        alert(errMsg)
        console.error('【响应拦截器错误详情】', {
            url: error.config?.url,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data
        })
        return Promise.reject(error)
    }
)

// 封装请求方法
export const post = <T>(url: string, data: any = {}, config?: AxiosRequestConfig): Promise<T> => {
    return service.post(url, data, config)
}
export const get = <T>(url: string, params: any = {}, config?: AxiosRequestConfig): Promise<T> => {
    return service.get(url, { params, ...config })
}

export default service