<!-- src/views/login/Login.vue -->
<script setup lang="ts">
import { ref, onMounted ,computed} from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
// 导入Register组件
import Register from '@/views/login/Register.vue'
// 导入Home组件
import Home from '@/views/Home.vue'


// 路由实例
const router = useRouter()

// Tab切换状态
const activeTab = ref<'login' | 'register'>('login')

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  agree: false
})

// 状态管理
const showPassword = ref(false)
const loginLoading = ref(false)

// 🔥 改用网络图片（无需本地文件，直接测试功能）
import bg1 from '@/assets/imgs/fOGZBxWPj.jpeg'
// import bg2 from '@/assets/imgs/24635678570797.png'
const backgroundImages = ref([
  // 替换为你自己的网络图片 URL
  // 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/5a9b98911cd647bd85146bf72aa92757.png~tplv-a9rns2rl98-image.png',
  // bg1
])
// 当前背景图索引
const currentBgIndex = ref(0)
// 计算当前背景图URL
const currentBgImage = computed(() => {
  return backgroundImages.value[currentBgIndex.value]
})

// 🔥 2. 背景图定时切换函数
let bgTimer: number
const switchBgImage = () => {
  currentBgIndex.value = (currentBgIndex.value + 1) % backgroundImages.value.length
}

// 登录表单验证
const validateLoginForm = (): boolean => {
  if (!loginForm.value.username.trim()) {
    alert('请输入邮箱/手机号码/北极星ID')
    return false
  }
  if (!loginForm.value.password.trim()) {
    alert('请输入密码')
    return false
  }
  if (!loginForm.value.agree) {
    alert('请阅读并同意北极星账号使用协议和隐私政策')
    return false
  }
  return true
}

// 处理登录
const handleLogin = async () => {
  if (!validateLoginForm()) return

  loginLoading.value = true
  try {
    // const res = await post<{ token: string }>('/api/login/account', {
    //   username: loginForm.value.username,
    //   password: loginForm.value.password
    // })
    // 模拟登录成功 - 生成测试token
    const res = { token: 'test_token_' + Date.now() }
    // 存储token到本地
    localStorage.setItem('token', res.token)
    // 可选：记住用户名
    localStorage.setItem('savedUsername', loginForm.value.username)

    router.push('/home')
  } catch (error) {
    console.error('登录失败：', error)
    alert((error as any).msg || '登录失败，请检查账号密码')
  } finally {
    loginLoading.value = false
  }
}

// 页面挂载读取记住的账号
onMounted(() => {
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    loginForm.value.username = savedUsername
  }
})
</script>

<template>
  <div class="login-container">
    <!-- 宇宙星际背景 -->
    <!-- 🔥 替换原有背景：添加自适应背景图容器 -->
<!--    <div-->
<!--        class="login-bg"-->
<!--        :style="{ backgroundImage: `url(${currentBgImage})` }"-->
<!--    ></div>-->

    <!-- 登录/注册卡片（使用公共样式类） -->
    <div class="login-register-card">
      <!-- 顶部Tab切换栏 -->
      <div class="tab-bar">
        <div
            class="tab-item"
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
        >
          登录
        </div>
        <div
            class="tab-item"
            :class="{ active: activeTab === 'register' }"
            @click="activeTab = 'register'"
        >
          注册
        </div>
      </div>

      <!-- 登录表单区域 -->
      <div class="form-content" v-if="activeTab === 'login'">
        <!-- 用户名输入 -->
        <div class="form-item">
          <input
              v-model="loginForm.username"
              type="text"
              placeholder="邮箱/手机号码/北极星ID"
              class="form-input"
              :disabled="loginLoading"
          />
        </div>

        <!-- 密码输入 -->
        <div class="form-item" style="position: relative;">
          <input
              v-model="loginForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="密码"
              class="form-input"
              :disabled="loginLoading"
          />
          <span
              class="password-toggle"
              @click="showPassword = !showPassword"
              :disabled="loginLoading"
          >
            👁️‍🗨️
          </span>
        </div>

        <!-- 协议勾选 -->
        <div class="agree-item">
          <input
              type="checkbox"
              v-model="loginForm.agree"
              :disabled="loginLoading"
              id="login-agree"
          />
          <label for="login-agree">
            已阅读并同意
            <a href="#" class="link">北极星账号使用协议</a>
            和
            <a href="#" class="link">北极星账号隐私政策</a>
          </label>
        </div>

        <!-- 登录按钮 -->
        <button
            class="action-btn"
            @click="handleLogin"
            :disabled="loginLoading || !loginForm.agree"
        >
          <span v-if="loginLoading">登录中...</span>
          <span v-else>登录</span>
        </button>

        <!-- 辅助链接 -->
        <div class="link-group">
          <a href="#" class="link forgot">忘记密码?</a>
          <a href="#" class="link phone">手机号登录</a>
        </div>

        <!-- 分割线 -->
        <div class="divider">
          <span>其他方式登录</span>
        </div>

        <!-- 第三方登录 -->
        <div class="third-party-login">
          <button class="third-party-btn alipay">支</button>
          <button class="third-party-btn wechat">💬</button>
          <button class="third-party-btn qq">🐧</button>
          <button class="third-party-btn weibo">📡</button>
        </div>
      </div>

      <!-- 注册表单区域 -->
      <div class="form-content" v-if="activeTab === 'register'">
        <Register />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 引入公共样式（如果是css文件，改为@import '@/styles/card-styles.css';） */
@import '@/styles/login-card-styles.scss';

/* 仅保留页面独有样式（背景+容器） */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 宇宙星际背景 */
.cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #000428 0%, #004e92 50%, #000428 100%);
  background-image:
      radial-gradient(2px 2px at 20px 30px, #fff, transparent),
      radial-gradient(2px 2px at 40px 70px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: cosmicGradient 20s ease infinite, starTwinkle 8s linear infinite;
}

@keyframes cosmicGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes starTwinkle {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

/* 表单内容容器 */
.form-content {
  width: 100%;
}
</style>