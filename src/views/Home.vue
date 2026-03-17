<!-- src/views/Home.vue -->
<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-ai">AI</span>
          <span class="logo-b">B</span>
        </div>
      </div>
      <nav class="header-nav">
        <a href="#" class="nav-item">首页</a>
        <a href="#" class="nav-item">
          <span class="icon">❤️</span> 家
        </a>
        <a href="#" class="nav-item">
          <span class="icon">🌈</span> 游记
        </a>
        <a href="#" class="nav-item">
          <span class="icon">📘</span> 随笔
        </a>
        <a href="#" class="nav-item">记录</a>
        <a href="#" class="nav-item">
          <span class="icon">📷</span> 相册
        </a>
        <a href="#" class="nav-item">
          <span class="icon">📦</span> 百宝箱
        </a>
        <a href="#" class="nav-item">
          <span class="icon">💬</span> 留言
        </a>
        <a href="#" class="nav-item">联系我</a>
      </nav>
      <div class="header-right">
        <a href="/login" class="login-btn">登录</a>
      </div>
    </header>

    <!-- 核心内容：时钟 + 搜索 + 快捷功能 -->
    <main class="main-content">
      <!-- 时钟区域 -->
      <div class="clock-section">
        <h1 class="time">10:37</h1>
        <div class="date-info">
          <span>AM</span>
          <span>丙午年 正月廿九</span>
          <span>3月17日 周二</span>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <span class="search-paw">🐾</span>
        <input type="text" placeholder="搜点什么吧" class="search-input" />
        <button class="search-search">🔍</button>
      </div>

      <!-- 快捷功能区 -->
      <div class="shortcut-grid">
        <a href="#" class="shortcut-item">
          <div class="shortcut-icon">🧱</div>
          <span class="shortcut-label">Gitee 仓库</span>
        </a>
        <a href="#" class="shortcut-item">
          <div class="shortcut-icon">🎨</div>
          <span class="shortcut-label">最美博客</span>
        </a>
        <a href="#" class="shortcut-item">
          <div class="shortcut-icon">✖️</div>
          <span class="shortcut-label">更多</span>
        </a>
      </div>
    </main>

    <!-- 底部备案信息 -->
    <footer class="footer">
      <p>本网站由 POETIZE 强力支持 豫ICP备2021034826号-1</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以保留实时时钟的JS逻辑，如需动态时间请告诉我
</script>

<style scoped>
/* 🔥 关键修复：100vh 全屏 + 相对定位 + 黑色背景 */
.home-container {
  width: 100%;
  height: 100vh; /* 强制占满整个视口高度 */
  background: #000000; /* 黑色背景兜底 */
  color: #ffffff;
  font-family: "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif;
  position: relative;
  box-sizing: border-box;
}

/* 🔥 关键修复：遮罩层覆盖全屏 */
.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 背景图：如果需要用原图，请替换为你的图片URL */
  background: url('https://p3-flow-imagex-sign.byteimg.com/tos-cn-a-8k3m4q9r7s/your-bg.jpg~tplv-dy-resize-walign-adapt-aq:1920:1080:q75.jpeg') no-repeat center center;
  background-size: cover;
  opacity: 0.7; /* 调整透明度 */
  z-index: 0;
}

/* 🔥 核心布局：使用 Flex 让内容垂直居中 */
.main-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(100vh - 120px); /* 扣除导航栏高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 垂直居中 */
  gap: 40px; /* 元素之间的间距 */
  box-sizing: border-box;
  padding: 20px;
}

/* 顶部导航栏 */
.header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-ai {
  background: #fff;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px 0 0 4px;
  font-weight: bold;
  font-size: 14px;
}

.logo-b {
  background: #ff6700;
  color: #fff;
  padding: 4px 8px;
  border-radius: 0 4px 4px 0;
  font-weight: bold;
  font-size: 14px;
}

.header-nav {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #ff9d6a;
}

.icon {
  font-size: 12px;
}

.login-btn {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  transition: all 0.3s;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ff9d6a;
}

/* 时钟样式 */
.clock-section {
  text-align: center;
}

.time {
  font-size: 96px;
  font-weight: 300;
  margin: 0;
  letter-spacing: 4px;
}

.date-info {
  margin-top: 10px;
  font-size: 18px;
  opacity: 0.9;
  display: flex;
  gap: 15px;
}

/* 搜索框 */
.search-box {
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-paw {
  font-size: 20px;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  padding: 8px 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-search {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

/* 快捷功能区 */
.shortcut-grid {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.shortcut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-decoration: none;
  gap: 8px;
}

.shortcut-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  backdrop-filter: blur(5px);
}

.shortcut-label {
  font-size: 14px;
  opacity: 0.9;
}

/* 底部 */
.footer {
  position: relative;
  z-index: 5;
  text-align: center;
  padding: 20px;
  font-size: 14px;
  opacity: 0.7;
}
</style>