/**
 * @descr 基于mockjs模拟用户数据
 * @author Tony
 * */
import Mock from 'mockjs'

function generateListData() {
    return Mock.mock({
        // 返回的数据
        'list|10': [{         // 列表包含10个数据
            'id|+1': 1, // id 每次递增 1，初始为1
            'name': '@cname', // 随机生成中文姓名
            'age|18-60': 1, // 年龄在 18 到 60 之间随机
            'email': '@email', // 随机生成邮箱
            'ip':'@ip',
            'avatar': "@image('200x200','red','#111','FJNU')",//生成图片,参数:size, background, foreground, text
            'date': "@date"
        }]
    })
}

// 导出数据生成函数
export { generateListData }