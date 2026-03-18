<!--
@descr 国内新闻
-->
<!-- src/views/news/ChinaNews.vue -->
<template>
  <div class="china-news-container">
    <!-- 顶部蓝色头部区域 -->
    <header class="news-header">
      <div class="header-top">
        <span class="site-title">iBaoTu新闻资讯</span>
      </div>
      <div class="header-date">2025年03月18日</div>
      <h1 class="news-title">今日资讯早报</h1>
      <p class="news-subtitle">TODAY MORNING POST</p>
      <p class="news-desc">每日为你摘取最重要的商业新闻</p>
      <div class="header-illustration">
        <div class="phone-hand">
          <div class="phone">
            <span class="phone-title">News</span>
            <div class="phone-list"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- 新闻列表区域 -->
    <main class="news-content">
      <!-- 新闻项 01 -->
      <div class="news-item">
        <div class="news-item-header">
          <span class="news-number">01</span>
          <span class="news-item-title">微软将在明年停止支持IE浏览器</span>
        </div>
        <div class="news-item-body">
          <p class="news-item-text">
            微软将在2021年8月17日停止对其365个应用程序的IE11支持，用户将无法访问某些功能。微软将在2021年8月17日停止对其365个应用程序...
          </p>
          <div class="news-item-image">
            <img src="https://picsum.photos/id/1025/300/200" alt="IE浏览器相关图片" />
          </div>
        </div>
      </div>

      <!-- 新闻项 02 -->
      <div class="news-item">
        <div class="news-item-header">
          <span class="news-number">02</span>
          <span class="news-item-title">TikTok开通Twitter账户</span>
        </div>
        <div class="news-item-body">
          <p class="news-item-text">
            TikTok设立了一个信息中心和Twitter账户，以实时澄清有关其社交媒体平台的错误信息和谣言。TikTok设立了一个信息中心和Twitter账户...
          </p>
          <div class="news-item-image">
            <img src="https://picsum.photos/id/0/300/200" alt="TikTok相关图片" />
          </div>
        </div>
      </div>

      <!-- 新闻项 03 -->
      <div class="news-item">
        <div class="news-item-header">
          <span class="news-number">03</span>
          <span class="news-item-title">京东回应“平台停用申通发货”</span>
        </div>
        <div class="news-item-body">
          <p class="news-item-text">
            京东通知商家禁用申通发货。对此，京东回应称：京东开放平台暂停与申通的合作是因为双方的合同已经过期，且并未就续约...
          </p>
          <div class="news-item-image">
            <img src="https://picsum.photos/id/42/300/200" alt="京东物流相关图片" />
          </div>
        </div>
      </div>

      <!-- 可继续添加更多新闻项 -->
    </main>
  </div>
</template>

<script setup lang="ts">
// 仅需基础结构，无需额外逻辑
</script>

<style scoped>
/* 全局容器 */
.china-news-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f7fa;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 顶部蓝色头部 */
.news-header {
  background: linear-gradient(135deg, #1677ff 0%, #4096ff 100%);
  color: white;
  padding: 20px 24px 40px;
  position: relative;
  overflow: hidden;

  .header-top {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .header-date {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .news-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .news-subtitle {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .news-desc {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 16px;
  }

  /* 右侧手机插画（简化版） */
  .header-illustration {
    position: absolute;
    right: 20px;
    bottom: 0;
    width: 200px;
    height: 200px;

    .phone-hand {
      position: relative;
      width: 100%;
      height: 100%;

      .phone {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 120px;
        height: 200px;
        background: #333;
        border-radius: 12px;
        padding: 10px;
        color: white;

        .phone-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .phone-list {
          width: 100%;
          height: 140px;
          background: white;
          border-radius: 4px;
          background-image: linear-gradient(white 20px, transparent 20px),
          linear-gradient(white 20px, transparent 20px),
          linear-gradient(white 20px, transparent 20px),
          linear-gradient(white 20px, transparent 20px);
          background-size: 100% 20px;
          background-position: 0 0, 0 25px, 0 50px, 0 75px;
        }
      }
    }
  }
}

/* 新闻内容区域 */
.news-content {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

/* 单个新闻项 */
.news-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .news-item-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;

    .news-number {
      display: inline-block;
      width: 50px;
      height: 40px;
      background: #1677ff;
      color: white;
      font-size: 22px;
      font-weight: 700;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
    }

    .news-item-title {
      font-size: 20px;
      font-weight: 600;
      color: #1677ff;
    }
  }

  .news-item-body {
    display: flex;
    gap: 16px;
    align-items: flex-start;

    .news-item-text {
      flex: 1;
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }

    .news-item-image {
      width: 120px;
      height: 120px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }
  }
}
</style>