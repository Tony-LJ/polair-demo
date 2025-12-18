/**
 * descri: 用户相关mock接口
 * author: Tony
 * date:2025-12-07
 * */

import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

// 生成用户列表
const generateUserList = () => {
    return Mock.mock({
        'list|10': [
            {
                'id|+1': 1,
                name: '@cname',
                age: '@integer(18, 60)',
                email: '@email'
            }
        ],
        total: 10,
        code: 200,
        msg: 'success'
    })
}

// 生成用户详情
const generateUserDetail = (id: number) => {
    return Mock.mock({
        id,
        name: '@cname',
        age: '@integer(18, 60)',
        email: '@email',
        phone: '@phone',
        address: '@city(true)',
        code: 200,
        msg: 'success'
    })
}

export default [
    {
        url: '/api/user/list',
        method: 'get',
        response: () => generateUserList()
    },
    {
        url: '/api/user/detail/:id',
        method: 'get',
        response: ({ params }) => generateUserDetail(Number(params.id))
    }
] as MockMethod[]