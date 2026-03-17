<!-- src/views/Home.vue -->
<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="home-header">
      <div class="header-left">
        <div class="home-logo">
          <span class="home-logo-ai">AI</span>
          <span class="home-logo-b">B</span>
        </div>
      </div>
      <nav class="home-header-nav">
        <a href="#" class="home-nav-item">首页</a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">❤️</span> 家
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">🌈</span> 游记
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">📘</span> 随笔
        </a>
        <a href="#" class="home-nav-item">记录</a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">📷</span> 相册
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">📦</span> 百宝箱
        </a>
        <a href="#" class="home-nav-item">
          <span class="home-nav-icon">💬</span> 留言
        </a>
        <a href="#" class="home-nav-item">联系我</a>
      </nav>
      <div class="header-right">
        <a href="/login" class="home-login-btn">登录</a>
      </div>
    </header>

    <!-- 核心内容：实时时钟 + 搜索 + 快捷功能 -->
    <main class="home-main-content">
      <!-- 实时时钟区域 -->
      <div class="home-clock-section">
        <h1 class="home-time">{{ currentTime }}</h1>
        <div class="home-date-info">
          <span>{{ amPm }}</span>
          <span>丙午年 正月廿九</span>
          <span>{{ currentDate }}</span>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="home-search-box">
        <span class="home-search-paw">🐾</span>
        <input type="text" placeholder="搜点什么吧" class="home-search-input" />
        <button class="home-search-btn">🔍</button>
      </div>

      <!-- 快捷功能区 -->
      <div class="home-shortcut-grid">
        <a href="#" class="home-shortcut-item">
          <div class="home-shortcut-icon">🧱</div>
          <span class="home-shortcut-label">Gitee 仓库</span>
        </a>
        <a href="#" class="home-shortcut-item">
          <div class="home-shortcut-icon">🎨</div>
          <span class="home-shortcut-label">最美博客</span>
        </a>
        <a href="#" class="home-shortcut-item">
          <div class="home-shortcut-icon">✖️</div>
          <span class="home-shortcut-label">更多</span>
        </a>
      </div>
    </main>

    <!-- 底部备案信息 -->
    <footer class="home-footer">
      <p>本网站由 POETIZE 强力支持 豫ICP备2021034826号-1</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 实时时钟核心逻辑
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const currentTime = ref('')
const amPm = ref('AM')
const currentDate = ref('')

// 格式化日期和时间
const formatDateTime = () => {
  const now = new Date()

  // 处理12小时制时间
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  amPm.value = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // 0点转为12点
  currentTime.value = `${hours}:${minutes}`

  // 处理日期（例：3月17日 周二）
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const week = weekArr[now.getDay()]
  currentDate.value = `${month}月${day}日 ${week}`
}

// 定时器：每分钟更新一次时间
let timer: number
onMounted(() => {
  formatDateTime() // 初始化时间
  timer = window.setInterval(formatDateTime, 60000) // 60秒更新一次
})

// 组件卸载时清除定时器
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 引入抽离的SCSS公共样式文件 */
@import '@/styles/home.scss';

/* 重置默认样式，确保全屏无间隙 */
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