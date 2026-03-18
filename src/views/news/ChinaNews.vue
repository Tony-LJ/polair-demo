<!-- src/views/news/ChinaNews.vue -->
<template>
  <div class="china-news-container">
    <!-- 顶部蓝色头部区域（铺满宽度） -->
    <header class="news-header">
      <!-- 返回首页按钮 -->
      <router-link to="/home" class="back-home-btn">
        <span class="back-icon">←</span>
        <span class="back-text">返回首页</span>
      </router-link>

      <!-- 内部内容容器（自适应居中） -->
      <div class="header-inner">
        <div class="header-top">
          <span class="site-title">iBaoTu新闻资讯</span>
        </div>
        <div class="header-date">2025年03月18日</div>
        <h1 class="news-title">今日资讯早报</h1>
        <p class="news-subtitle">TODAY MORNING POST</p>
        <p class="news-desc">每日为你摘取最重要的商业新闻</p>
      </div>

      <!-- 右侧手机插画（自适应隐藏/缩放） -->
      <div class="header-illustration">
        <div class="phone-hand">
          <div class="phone">
            <span class="phone-title">News</span>
            <div class="phone-list"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- 新闻列表区域（铺满宽度+自适应） -->
    <main class="news-content">
      <!-- 新闻项容器（自适应居中+响应式布局） -->
      <div class="news-list">
        <!-- 新闻项 01 -->
        <div class="news-item">
          <div class="news-item-header">
            <span class="news-number">01</span>
            <span class="news-item-title">微软将在明年停止支持IE浏览器</span>
          </div>
          <div class="news-item-body">
            <p class="news-item-text">
              微软将在2021年8月17日停止对其365个应用程序的IE11支持，用户将无法访问某些功能。微软将在2021年8月17日停止对其365个应用程序提供IE11支持，此后用户需升级至Edge浏览器以获得完整功能。
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
              TikTok设立了一个信息中心和Twitter账户，以实时澄清有关其社交媒体平台的错误信息和谣言。该举措旨在提升平台透明度，回应全球用户对数据安全和内容管理的关切。
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
              京东通知商家禁用申通发货。对此，京东回应称：京东开放平台暂停与申通的合作是因为双方的合同已经过期，且并未就续约条款达成一致，后续将根据商家需求评估合作可能性。
            </p>
            <div class="news-item-image">
              <img src="https://picsum.photos/id/42/300/200" alt="京东物流相关图片" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
/* 全局容器 - 铺满整个屏幕 */
.china-news-container {
  width: 100vw; /* 视口宽度100%，铺满屏幕 */
  min-height: 100vh;
  background: #f5f7fa;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  margin: 0;
  padding: 0;
}

/* 顶部蓝色头部 - 完全铺满宽度 + 自适应 */
.news-header {
  background: linear-gradient(135deg, #1677ff 0%, #4096ff 100%);
  color: white;
  padding: 20px 0 40px;
  width: 100vw; /* 铺满视口宽度 */
  position: relative;
  overflow: hidden;

  /* 返回首页按钮 - 自适应 */
  .back-home-btn {
    position: absolute;
    top: 20px;
    left: 2vw; /* 使用视口单位，自适应左右边距 */
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .back-icon {
      font-size: 18px;
      font-weight: 700;
    }

    /* 小屏适配：按钮缩小 */
    @media (max-width: 768px) {
      padding: 6px 12px;
      font-size: 14px;
      left: 1vw;

      .back-icon {
        font-size: 16px;
      }
    }
  }

  /* 内部内容容器 - 自适应居中 + 最大宽度限制 */
  .header-inner {
    max-width: 90vw; /* 大屏最大占90%视口宽度，避免拉伸 */
    width: 100%;     /* 小屏铺满宽度 */
    margin: 0 auto;
    padding: 0 2vw;  /* 视口单位留白，自适应 */
  }

  .header-top {
    text-align: center;
    font-size: clamp(18px, 3vw, 22px); /* 自适应字号：18px~22px */
    font-weight: 500;
    margin-bottom: 20px;
  }

  .header-date {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 16px;
    border-radius: 6px;
    font-size: clamp(16px, 2vw, 18px); /* 自适应字号 */
    margin-bottom: 16px;
  }

  .news-title {
    font-size: clamp(32px, 6vw, 48px); /* 自适应标题：32px~48px */
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .news-subtitle {
    font-size: clamp(16px, 2vw, 18px);
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
    font-size: clamp(14px, 2vw, 16px);
  }

  /* 右侧手机插画 - 自适应隐藏/缩放 */
  .header-illustration {
    position: absolute;
    right: 2vw;
    bottom: 0;
    width: clamp(150px, 20vw, 200px); /* 自适应宽度：150px~200px */
    height: auto;

    /* 小屏隐藏插画，节省空间 */
    @media (max-width: 768px) {
      display: none;
    }

    .phone-hand {
      position: relative;
      width: 100%;
      height: 100%;

      .phone {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60%;
        height: 100%;
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
          height: 70%;
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

/* 新闻内容区域 - 铺满宽度 + 自适应 */
.news-content {
  padding: 20px 0;
  width: 100vw; /* 铺满视口宽度 */

  /* 新闻列表容器 - 自适应居中 + 响应式 */
  .news-list {
    max-width: 95vw; /* 大屏最大95%宽度 */
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 自动列数，最小300px */
    gap: 20px;
    padding: 0 2vw;
  }

  /* 单个新闻项 - 自适应 */
  .news-item {
    background: white;
    border-radius: 12px;
    padding: clamp(12px, 2vw, 16px); /* 自适应内边距 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .news-item-header {
      display: flex;
      align-items: center;
      margin-bottom: clamp(8px, 1.5vw, 12px);
      gap: clamp(8px, 1.5vw, 12px);

      .news-number {
        display: inline-block;
        width: clamp(40px, 5vw, 50px); /* 自适应编号宽度 */
        height: clamp(30px, 4vw, 40px);
        background: #1677ff;
        color: white;
        font-size: clamp(18px, 2.5vw, 22px);
        font-weight: 700;
        text-align: center;
        line-height: clamp(30px, 4vw, 40px);
        border-radius: 6px;
      }

      .news-item-title {
        font-size: clamp(16px, 2.5vw, 20px);
        font-weight: 600;
        color: #1677ff;
      }
    }

    .news-item-body {
      display: flex;
      flex-direction: column; /* 小屏垂直排列 */
      gap: clamp(12px, 2vw, 16px);

      /* 大屏横向排列 */
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
      }

      .news-item-text {
        flex: 1;
        font-size: clamp(14px, 1.8vw, 16px);
        color: #333;
        line-height: 1.6;
      }

      .news-item-image {
        width: 100%; /* 小屏铺满宽度 */
        height: clamp(100px, 20vw, 120px);
        flex-shrink: 0;

        /* 大屏固定宽度 */
        @media (min-width: 768px) {
          width: clamp(100px, 15vw, 120px);
          height: clamp(100px, 15vw, 120px);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>