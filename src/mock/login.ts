/**
 * @descri 用户数据模拟
 * @author Tony
 * */

import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const mockUser = {
    username: 'admin',
    password: '123456',
    token: Mock.Random.string('upper', 32),
    userInfo: {
        id: Mock.Random.id(),
        username: 'admin',
        nickname: '系统管理员'
    }
}

export default [
    // 账号密码登录：路径改为 /mock/login/account
    {
        url: '/mock/login/account',
        method: 'post',
        response: ({ body }) => {
            const { username, password } = body
            if (username === mockUser.username && password === mockUser.password) {
                return {
                    code: 200,
                    message: '登录成功',
                    token: mockUser.token,
                    userInfo: mockUser.userInfo
                }
            } else {
                return {
                    code: 401,
                    message: '用户名或密码错误',
                    token: '',
                    userInfo: {}
                }
            }
        }
    },
    // 第三方登录：路径改为 /mock/login/thirdparty
    {
        url: '/mock/login/thirdparty',
        method: 'post',
        response: ({ body }) => {
            const { type } = body
            return {
                code: 200,
                message: `${type}登录成功`,
                token: mockUser.token,
                userInfo: mockUser.userInfo
            }
        }
    }
] as MockMethod[]