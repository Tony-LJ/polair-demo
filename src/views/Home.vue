<!--
@descr: web系统首页
@author: Tony
@date: 2025-12-07
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfo = ref({
  username: '',
  nickname: ''
})

// 页面挂载时验证登录态并获取用户信息
onMounted(() => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  // 无 token 则跳回登录页
  if (!token) {
    router.push('/login')
    return
  }
  // 模拟从本地存储获取用户信息（实际项目可调用用户信息接口）
  userInfo.value = {
    username: 'admin',
    nickname: '系统管理员'
  }
})

// 退出登录
const handleLogout = () => {
  // 清除登录态
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  localStorage.removeItem('savedUsername')
  // 跳回登录页
  router.push('/login')
}
</script>

<template>
  <div class="home-container">
    <header class="home-header">
      <h1>首页</h1>
      <div class="user-info">
        <span>欢迎你，{{ userInfo.nickname }}</span>
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </div>
    </header>
    <main class="home-main">
      <div class="welcome-card">
        <h2>🎉 登录成功！</h2>
        <p>这是你的个性化首页，可根据需求自定义功能。</p>
        <p>当前登录账号：{{ userInfo.username }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.home-header h1 {
  font-size: 20px;
  color: #1d2129;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info span {
  font-size: 14px;
  color: #1d2129;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #f53f3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #e03636;
}

.home-main {
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 72px);
}

.welcome-card {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.welcome-card h2 {
  font-size: 28px;
  color: #1d2129;
  margin: 0 0 16px 0;
}

.welcome-card p {
  font-size: 16px;
  color: #86909c;
  margin: 8px 0;
}
</style>