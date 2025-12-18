<template>
  <div class="user-page">
    <div class="header">
      <h2>用户管理</h2>
      <button
          @click="userStore.fetchUserList"
          :disabled="userStore.loading"
          class="refresh-btn"
      >
        {{ userStore.loading ? '加载中...' : '刷新用户列表' }}
      </button>
      <button @click="userStore.resetUserState" class="reset-btn">重置数据</button>
    </div>

    <!-- 统计信息 -->
    <div class="stats">
      <p>总用户数：{{ userStore.total }}</p>
      <p>成年用户数：{{ userStore.adultUsers.length }}</p>
      <p>用户平均年龄：{{ userStore.avgAge }} 岁</p>
    </div>

    <!-- 用户列表 -->
    <div class="user-list" v-if="userStore.userList.length">
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in userStore.userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="goToDetail(user.id)" class="detail-btn">查看详情</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 空状态 -->
    <div class="empty" v-else-if="!userStore.loading">
      <p>暂无用户数据，请点击刷新按钮加载</p>
    </div>

    <!-- 加载状态 -->
    <div class="loading" v-if="userStore.loading">
      <p>正在加载用户数据...</p>
    </div>

    <!-- 嵌套路由：用户详情 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 跳转到用户详情
const goToDetail = (id: number) => {
  router.push({ name: 'UserDetail', params: { id } })
}

// 页面加载时自动获取用户列表
userStore.fetchUserList()
</script>

<style scoped>
.user-page {
  padding: 20px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.reset-btn {
  padding: 8px 16px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.user-list table {
  width: 100%;
  border-collapse: collapse;
}

.user-list th, .user-list td {
  padding: 12px;
  border: 1px solid #e6e6e6;
  text-align: left;
}

.user-list th {
  background-color: #f5f7fa;
}

.detail-btn {
  padding: 6px 12px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty, .loading {
  text-align: center;
  padding: 50px 0;
  color: #666;
}
</style>