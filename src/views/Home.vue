<!-- src/views/Home.vue -->
<template>
  <div class="home-container" :style="{ backgroundImage: `url(${currentBackgroundImage})` }">
    <!-- 导航栏、时钟、搜索框等结构保持不变 -->
    <header class="home-header">
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
<!--        <div class="nav-dropdown">
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
        </div>-->
        <!-- 专题研究（带下拉） -->
        <div class="nav-dropdown">
          <div class="home-nav-item dropdown-trigger">
            <span class="nav-icon">🔥</span>
            <span class="nav-text">专题研究</span>
          </div>
          <div class="dropdown-menu">
            <!-- 科技研究（去掉箭头 →） -->
            <div class="nav-dropdown dropdown-item-with-sub">
              <a href="#" class="dropdown-item">科技研究</a> <!-- 这里去掉了 → -->
              <div class="dropdown-submenu">
                <a href="#" class="dropdown-subitem">人工智能</a>
                <a href="#" class="dropdown-subitem">大数据</a>
                <a href="#" class="dropdown-subitem">云计算</a>
                <a href="#" class="dropdown-subitem">区块链</a>
              </div>
            </div>
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
            <a href="#" class="dropdown-item">IT兼职</a>
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
            <a href="#" class="dropdown-item">相册空间</a>
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
// 🔥 改用网络图片（无需本地文件，直接测试功能）
import bg1 from '@/assets/imgs/fOGZBxWPj.jpeg'
// import bg2 from '@/assets/imgs/32614289358464.jpg'
// import bg3 from '@/assets/imgs/fOGj90PQu.jpeg'

const backgroundImages = ref([
  // 替换为你自己的网络图片 URL
  bg1
])
const currentBackgroundIndex = ref(0)
const currentBackgroundImage = computed(() => {
  return backgroundImages.value[currentBackgroundIndex.value]
})

// 其余代码（时钟、切换逻辑）保持不变
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

const switchBackgroundImage = () => {
  currentBackgroundIndex.value = (currentBackgroundIndex.value + 1) % backgroundImages.value.length
}

let timer: number
let backgroundTimer: number
onMounted(() => {
  formatDateTime()
  timer = window.setInterval(formatDateTime, 60000)
  backgroundTimer = window.setInterval(switchBackgroundImage, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
  clearInterval(backgroundTimer)
})
</script>

<style scoped>
@import '@/styles/home.scss';

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