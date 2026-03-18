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
        <h1 class="site-title">国际新闻资讯</h1>
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

// 🔥 今日资讯：国际新闻（不重复）
const todayNews = ref([
  {
    title: '联合国发布2025年全球粮食安全报告',
    content: '联合国粮农组织6月9日发布报告称，2025年全球粮食不安全人口预计降至6.8亿，较2020年下降12%，但非洲萨赫勒地区、中东部分国家仍面临严重粮食危机，需国际社会加大援助。',
    image: 'https://picsum.photos/id/20/300/200'
  },
  {
    title: '欧盟推出新数字市场法案 规范科技巨头行为',
    content: '欧盟6月10日正式实施新版《数字市场法案》，要求谷歌、苹果、亚马逊等“守门人”企业开放平台接口，禁止滥用市场支配地位，违规企业最高可被处以全球营业额10%的罚款。',
    image: 'https://picsum.photos/id/21/300/200'
  },
  {
    title: '日本启动新一代磁悬浮高铁试验 时速达400公里',
    content: '日本JR东日本公司6月9日宣布，新一代超导磁悬浮高铁试验取得突破，最高运行时速达到400公里，计划2030年投入商业运营，连接东京与大阪，全程仅需1小时10分钟。',
    image: 'https://picsum.photos/id/22/300/200'
  }
])

// 🔥 重点资讯：国际新闻（不重复）
const focusNews = ref([
  {
    title: 'G7峰会聚焦人工智能治理 发布全球AI监管框架',
    content: '2025年G7峰会在日本广岛闭幕，成员国共同发布《全球人工智能治理框架》，提出AI技术研发需遵循“以人为本、安全可控”原则，建立跨国AI风险预警机制。',
    image: 'https://picsum.photos/id/23/300/200'
  },
  {
    title: '巴西宣布发现全球最大深海锂矿 储量超800万吨',
    content: '巴西矿业部6月8日公布，在大西洋深海区域发现全球最大锂矿带，已探明储量超800万吨，预计2028年实现商业化开采，将缓解全球锂电池原材料供应紧张问题。',
    image: 'https://picsum.photos/id/24/300/200'
  },
  {
    title: '世卫组织：全球猴痘疫情已得到有效控制',
    content: '世界卫生组织6月10日发布通报，全球猴痘确诊病例较峰值下降92%，疫情已得到有效控制，但仍需警惕非洲部分国家的局部传播风险，建议高风险人群接种疫苗。',
    image: 'https://picsum.photos/id/25/300/200'
  }
])

// 🔥 主要资讯列表：国际新闻（不重复）
const mainNews = ref([
  {
    title: 'NASA宣布2026年载人登陆火星计划细节',
    desc: '美国国家航空航天局（NASA）6月7日公布2026年载人登陆火星计划细节，将采用“猎户座”飞船+“火星着陆器”组合方案，宇航员将在火星表面开展为期30天的科学探测。',
    image: 'https://picsum.photos/id/26/300/200'
  },
  {
    title: '印度成为全球第一大人口国 推出新人口政策',
    desc: '印度统计局6月1日发布数据，印度总人口达14.286亿，正式超过中国成为全球第一大人口国。印度政府同步推出新人口政策，加大教育、就业投入，应对人口红利挑战。',
    image: 'https://picsum.photos/id/27/300/200'
  },
  {
    title: '卡塔尔世界杯遗产报告发布 经济效益超2000亿美元',
    desc: '卡塔尔财政部6月9日发布2022年世界杯遗产报告，赛事为卡塔尔带来超2000亿美元经济效益，推动旅游业、基础设施建设发展，新增就业岗位超15万个。',
    image: 'https://picsum.photos/id/28/300/200'
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