<!-- src/views/news/ChinaNews.vue -->
<template>
  <div class="china-news-container">
    <!-- 顶部蓝色头部 -->
    <header class="news-header">
      <router-link to="/home" class="back-home-btn">
        <span class="back-icon">←</span>
        <span class="back-text">返回首页</span>
      </router-link>
      <div class="header-content">
        <h1 class="site-title">国内新闻资讯</h1>
        <p class="header-date">2025-06-10</p>
      </div>
    </header>

    <!-- 今日资讯 - 跑马灯轮播 -->
    <section class="news-carousel-section">
      <h2 class="section-title">今日资讯</h2>
      <div class="carousel-wrapper" ref="carouselRef">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentOffset}px)` }">
          <div v-for="(item, idx) in todayNews" :key="idx" class="news-card">
            <div class="card-header">
              <span class="news-number">0{{ idx + 1 }}</span>
              <span class="news-title">{{ item.title }}</span>
            </div>
            <div class="card-body">
              <p class="news-item-text">{{ item.content }}</p>
              <div class="news-item-image">
                <img :src="item.image" alt="新闻图片" />
              </div>
            </div>
          </div>
          <!-- 复制一份用于无缝轮播 -->
          <div v-for="(item, idx) in todayNews" :key="`clone-${idx}`" class="news-card">
            <div class="card-header">
              <span class="news-number">0{{ idx + 1 }}</span>
              <span class="news-title">{{ item.title }}</span>
            </div>
            <div class="card-body">
              <p class="news-item-text">{{ item.content }}</p>
              <div class="news-item-image">
                <img :src="item.image" alt="新闻图片" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 重点资讯 - 列表滚动 -->
    <section class="focus-news-section">
      <h2 class="section-title">重点资讯</h2>
      <div class="scroll-list" ref="focusScrollListRef">
        <div v-for="(item, idx) in focusNews" :key="idx" class="list-item">
          <div class="list-image">
            <img :src="item.image" alt="重点资讯图片" />
          </div>
          <div class="list-content">
            <h3 class="list-title">{{ item.title }}</h3>
            <p class="list-desc">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要资讯列表 - 滚动展示 -->
    <section class="main-news-section">
      <h2 class="section-title">主要资讯列表</h2>
      <div class="scroll-list" ref="scrollListRef">
        <div v-for="(item, idx) in mainNews" :key="idx" class="list-item">
          <div class="list-image">
            <img :src="item.image" alt="资讯图片" />
          </div>
          <div class="list-content">
            <h3 class="list-title">{{ item.title }}</h3>
            <p class="list-desc">{{ item.desc }}</p>
          </div>
          <div class="list-actions" v-if="idx < 2">
            <button class="action-btn share">📤</button>
            <button class="action-btn collect">⭐</button>
            <button class="action-btn like">❤️</button>
            <button class="action-btn comment">💬</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 🔥 今日资讯：全部不重复内容
const todayNews = ref([
  {
    title: '我国成功发射可重复使用试验航天器',
    content: '2025年6月10日，我国在酒泉卫星发射中心使用长征二号F运载火箭，成功发射可重复使用试验航天器。该航天器将在轨开展一系列空间技术试验，为我国航天技术发展积累宝贵数据。',
    image: 'https://picsum.photos/id/103/300/200'
  },
  {
    title: '全国夏粮收购进展顺利 已收购超4000万吨',
    content: '国家粮食和物资储备局发布数据，截至6月上旬，2025年夏粮主产区累计收购新麦4260万吨，同比增加280万吨，收购进度快于去年同期，市场供应稳定。',
    image: 'https://picsum.photos/id/104/300/200'
  },
  {
    title: '长三角一体化发展示范区推出18项新举措',
    content: '长三角生态绿色一体化发展示范区发布18项改革创新举措，涵盖政务服务通办、生态环境共保、产业协同发展等领域，助力区域高质量发展。',
    image: 'https://picsum.photos/id/105/300/200'
  }
])

// 🔥 重点资讯：全部不重复内容
const focusNews = ref([
  {
    title: '2025年高考分数线公布 多地优化志愿填报服务',
    content: '各省陆续公布2025年高考录取控制分数线，教育部门推出“智能志愿填报”系统，结合考生分数、位次和院校招生计划，提供个性化填报建议，降低志愿填报风险。',
    image: 'https://picsum.photos/id/106/300/200'
  },
  {
    title: '我国首个海上二氧化碳封存项目累计封存超150万吨',
    content: '中海油宣布，我国首个海上二氧化碳封存项目累计封存二氧化碳突破150万吨，相当于种植超过8000万棵树，为实现“双碳”目标提供重要支撑。',
    image: 'https://picsum.photos/id/107/300/200'
  },
  {
    title: '全国铁路实行新列车运行图 多条新线开通',
    content: '7月1日起，全国铁路将实行新的列车运行图，贵南高铁、济郑高铁等多条新线开通运营，进一步完善区域铁路网，提升出行效率。',
    image: 'https://picsum.photos/id/108/300/200'
  }
])

// 🔥 主要资讯列表：全部不重复内容
const mainNews = ref([
  {
    title: '美丽中国 | 春拂新安江 碧水绕徽州',
    desc: '时下，安徽省黄山市歙县新安江畔油菜花绵延舒展，春意盎然。春风拂过，碧水蜿蜒，新安江如同一幅流动的山水画卷，缓缓展开。',
    image: 'https://picsum.photos/id/1036/300/200'
  },
  {
    title: '科技赋能 | 我国自主研发智能机器人亮相世界机器人大会',
    desc: '2025世界机器人大会在北京开幕，我国自主研发的工业级智能机器人、服务型机器人等多款产品集中展示，在精准操作、人机交互等领域达到国际先进水平。',
    image: 'https://picsum.photos/id/119/300/200'
  },
  {
    title: '文化传承 | 故宫博物院推出“数字故宫”全球巡展',
    desc: '故宫博物院联合多国博物馆推出“数字故宫”全球巡展，通过VR/AR技术让观众沉浸式体验故宫文物，推动中华优秀传统文化走向世界。',
    image: 'https://picsum.photos/id/160/300/200'
  }
])

// 今日资讯跑马灯逻辑
const carouselRef = ref<HTMLElement>()
const currentOffset = ref(0)
let speed = 1
let animationId: number

// 重点资讯列表滚动逻辑
const focusScrollListRef = ref<HTMLElement>()
// 主要资讯列表滚动逻辑
const scrollListRef = ref<HTMLElement>()

onMounted(() => {
  // 今日资讯跑马灯
  const animate = () => {
    if (!carouselRef.value) return
    const trackWidth = carouselRef.value.querySelector('.carousel-track')?.scrollWidth || 0
    currentOffset.value += speed
    if (currentOffset.value >= trackWidth / 2) {
      currentOffset.value = 0
    }
    animationId = requestAnimationFrame(animate)
  }
  animationId = requestAnimationFrame(animate)

  // 重点资讯列表自动滚动
  const focusScrollList = focusScrollListRef.value
  if (focusScrollList) {
    let focusScrollTop = 0
    setInterval(() => {
      focusScrollTop += 1
      if (focusScrollTop >= focusScrollList.scrollHeight - focusScrollList.clientHeight) {
        focusScrollTop = 0
      }
      focusScrollList.scrollTop = focusScrollTop
    }, 50)
  }

  // 主要资讯列表自动滚动
  const scrollList = scrollListRef.value
  if (scrollList) {
    let scrollTop = 0
    setInterval(() => {
      scrollTop += 1
      if (scrollTop >= scrollList.scrollHeight - scrollList.clientHeight) {
        scrollTop = 0
      }
      scrollList.scrollTop = scrollTop
    }, 50)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* 页面容器 */
.china-news-container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 顶部蓝色头部 */
.news-header {
  background: #4a90e2;
  color: #000;
  padding: 20px 0;
  text-align: center;
  position: relative;

  .back-home-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.3);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    .back-icon {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .header-content {
    .site-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .header-date {
      font-size: 20px;
      opacity: 0.9;
    }
  }
}

/* 今日资讯 - 跑马灯 */
.news-carousel-section {
  padding: 20px 0;
  width: 100%;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    padding-left: 20px;
  }

  .carousel-wrapper {
    width: 100%;
    overflow: hidden;
    padding: 0 20px;

    .carousel-track {
      display: flex;
      gap: 20px;
      transition: transform 0s linear;
    }

    .news-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      min-width: 360px;
      box-shadow: none;

      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        gap: 12px;

        .news-number {
          width: 50px;
          height: 40px;
          background: #4a90e2;
          color: white;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          line-height: 40px;
          border-radius: 6px;
        }

        .news-title {
          font-size: 20px;
          font-weight: 600;
          color: #4a90e2;
        }
      }

      .card-body {
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
  }
}

/* 重点资讯 - 列表滚动 */
.focus-news-section {
  padding: 20px 0;
  width: 100%;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    padding-left: 20px;
  }

  .scroll-list {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    padding: 0 20px;

    .list-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;

      .list-image {
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

      .list-content {
        flex: 1;

        .list-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .list-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      }
    }
  }
}

/* 主要资讯列表 */
.main-news-section {
  padding: 20px 0;
  width: 100%;

  .section-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    padding-left: 20px;
  }

  .scroll-list {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    padding: 0 20px;

    .list-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;

      .list-image {
        width: 200px;
        height: 120px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .list-content {
        flex: 1;

        .list-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .list-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }
      }

      .list-actions {
        display: flex;
        gap: 12px;

        .action-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;

          &:hover {
            background: #f5f5f5;
          }
        }
      }
    }
  }
}
</style>