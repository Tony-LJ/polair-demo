/**
 * @descr: Mock服务器
 * @author: Tony
 * */
import Mock from 'mockjs';
import { generateListData } from 'user.js';

// 拦截 GET 请求 /api/user
Mock.mock('/api/user', 'get', () => {
    return generateListData();
});