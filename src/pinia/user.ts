import { defineStore } from 'pinia'
import { getUserList, getUserDetail, UserInfo } from '@/api/user'

// Store状态类型
interface UserState {
    userList: UserInfo[]
    currentUser: (UserInfo & { phone?: string; address?: string }) | null
    total: number
    loading: boolean
}

// 创建User Store
export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userList: [],
        currentUser: null,
        total: 0,
        loading: false
    }),

    // 计算属性（Getters）
    getters: {
        // 筛选成年用户
        adultUsers: (state) => state.userList.filter(user => user.age >= 18),
        // 统计用户平均年龄
        avgAge: (state) => {
            if (state.userList.length === 0) return 0
            const sum = state.userList.reduce((acc, user) => acc + user.age, 0)
            return (sum / state.userList.length).toFixed(1)
        }
    },

    // 方法（Actions）
    actions: {
        // 获取用户列表
        async fetchUserList() {
            try {
                this.loading = true
                const res = await getUserList()
                this.userList = res.list
                this.total = res.total
            } catch (error) {
                console.error('获取用户列表失败:', error)
            } finally {
                this.loading = false
            }
        },

        // 获取用户详情
        async fetchUserDetail(id: number) {
            try {
                this.loading = true
                const res = await getUserDetail(id)
                this.currentUser = res
            } catch (error) {
                console.error('获取用户详情失败:', error)
            } finally {
                this.loading = false
            }
        },

        // 重置用户状态
        resetUserState() {
            this.userList = []
            this.currentUser = null
            this.total = 0
        }
    }
})