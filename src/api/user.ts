import service from './index'

// 用户类型定义
export interface UserInfo {
    id: number
    name: string
    age: number
    email: string
}

// 响应类型
export interface UserListRes {
    list: UserInfo[]
    total: number
    code: number
    msg: string
}

export interface UserDetailRes extends UserInfo {
    code: number
    msg: string
}

// 获取用户列表
export const getUserList = () => {
    return service.get<UserListRes>('/api/user/list')
}

// 获取用户详情
export const getUserDetail = (id: number) => {
    return service.get<UserDetailRes>(`/api/user/detail/${id}`)
}