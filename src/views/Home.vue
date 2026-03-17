<!-- src/views/Home.vue -->
<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="home-header">
<!--      <div class="header-left">
        <div class="home-logo">
          <span class="home-logo-ai">AI</span>
          <span class="home-logo-b">B</span>
        </div>
      </div>-->
      <nav class="home-header-nav">
        <a href="#" class="home-nav-item">首页</a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">❤️</span> 新闻追踪
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">🌈</span> 专题研究
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">🌈</span> 产品服务
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">📘</span> 个人空间
        </a>
        <a href="#" class="home-nav-item">读者互动
        </a>
<!--        <a href="#" class="home-nav-item">-->
<!--          <span class="home-nav-icon">📷</span> 相册-->
<!--        </a>-->
<!--        <a href="#" class="home-nav-item">-->
<!--          <span class="home-nav-icon">📦</span> 百宝箱-->
<!--        </a>-->
<!--        <a href="#" class="home-nav-item">-->
<!--          <span class="home-nav-icon">💬</span> 留言-->
<!--        </a>-->
<!--        <a href="#" class="home-nav-item">联系我-->
<!--        </a>-->
      </nav>
      <div class="header-right">
        <a href="/login" class="home-login-btn">登录</a>
      </div>
    </header>

    <!-- 核心内容：时钟 -->
    <main class="home-main-content">
      <div class="home-clock-section">
        <h1 class="home-time">{{ currentTime }}</h1>
        <div class="home-date-info">
          <span>{{ amPm }}</span>
          <span>丙午年 正月廿九</span>
          <span>{{ currentDate }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const amPm = ref('AM')
const currentDate = ref('')

const formatDateTime = () => {
  const now = new Date()
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  amPm.value = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  currentTime.value = `${hours}:${minutes}`

  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const week = weekArr[now.getDay()]
  currentDate.value = `${month}月${day}日 ${week}`
}

let timer: number
onMounted(() => {
  formatDateTime()
  timer = window.setInterval(formatDateTime, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
@import '@/styles/home.scss';

/* 重置默认边距，确保全屏无空白 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>