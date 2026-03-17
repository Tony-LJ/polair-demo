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
        <a href="#" class="home-nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">首页</span>
        </a>
        <!-- 新闻追踪（带下拉） -->
        <div class="nav-dropdown">
          <div class="home-nav-item dropdown-trigger">
            <span class="nav-icon">❤️</span>
            <span class="nav-text">新闻追踪</span>
          </div>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">国内新闻</a>
            <a href="#" class="dropdown-item">国际新闻</a>
            <a href="#" class="dropdown-item">新闻热点</a>
            <a href="#" class="dropdown-item">新闻专题</a>
          </div>
        </div>
        <!-- 专题研究（带下拉） -->
        <div class="nav-dropdown">
          <div class="home-nav-item dropdown-trigger">
            <span class="nav-icon">🔥</span>
            <span class="nav-text">专题研究</span>
          </div>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">科技研究</a>
            <a href="#" class="dropdown-item">经济金融</a>
            <a href="#" class="dropdown-item">身心健康</a>
            <a href="#" class="dropdown-item">学术研究</a>
          </div>
        </div>
        <!-- 产品服务（带下拉） -->
        <div class="nav-dropdown">
          <div class="home-nav-item dropdown-trigger">
            <span class="nav-icon">🌈</span>
            <span class="nav-text">产品服务</span>
          </div>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">数据平台</a>
            <a href="#" class="dropdown-item">业务咨询</a>
            <a href="#" class="dropdown-item">数据信息</a>
            <a href="#" class="dropdown-item">信息中介</a>
            <a href="#" class="dropdown-item">个人电商</a>
            <a href="#" class="dropdown-item">个人媒体</a>
          </div>
        </div>
        <!-- 个人空间（带下拉） -->
        <div class="nav-dropdown">
          <div class="home-nav-item dropdown-trigger">
            <span class="nav-icon">📘</span>
            <span class="nav-text">个人空间</span>
          </div>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">个人简历</a>
            <a href="#" class="dropdown-item">个人随笔</a>
            <a href="#" class="dropdown-item">时光记录</a>
            <a href="#" class="dropdown-item">相册</a>
          </div>
        </div>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">💬</span> 读者互动
        </a>
      </nav>
      <div class="header-right">
        <a href="/login" class="home-login-btn">登录</a>
      </div>
    </header>

    <!-- 主内容区：时钟 + 搜索框 -->
    <main class="home-main-content">
      <section class="home-hero-section">
        <h1 class="home-time">{{ currentTime }}</h1>
        <div class="home-date-info">
          <span>{{ amPm }}</span>
          <span>丙午年 正月廿九</span>
          <span>{{ currentDate }}</span>
        </div>

        <!-- 🔥 新增搜索框 -->
        <div class="search-box">
          <span class="search-icon-left">🐾</span>
          <input
              type="text"
              placeholder="搜点什么吧"
              class="search-input"
          />
          <span class="search-icon-right">🔍</span>
        </div>
      </section>
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