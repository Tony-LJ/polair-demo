<!-- src/views/login/Login.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'
// 导入 Register 组件，用于 Tab 切换渲染
import Register from '@/views/login/Register.vue'

// 路由实例
const router = useRouter()

// 页面状态：login / register（控制 Tab 切换）
const activeTab = ref<'login' | 'register'>('login')

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  agree: false
})

// 通用状态管理
const showPassword = ref(false)
const loginLoading = ref(false)        // 登录按钮加载状态

// ====================== 登录相关逻辑 ======================
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

// 处理登录提交
const handleLogin = async () => {
  if (!validateLoginForm()) return

  loginLoading.value = true
  try {
    const res = await post<{ token: string }>('/api/login/account', {
      username: loginForm.value.username,
      password: loginForm.value.password
    })

    localStorage.setItem('token', res.token)
    router.push('/home')
  } catch (error) {
    console.error('登录失败：', error)
    alert((error as any).msg || '登录失败，请检查账号密码')
  } finally {
    loginLoading.value = false
  }
}

// ====================== 生命周期 ======================
// 页面挂载时读取记住的账号
onMounted(() => {
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    loginForm.value.username = savedUsername
  }
})
</script>

<template>
  <div class="login-container">
    <!-- 宇宙星际炫酷背景层 -->
    <div class="cosmic-bg"></div>

    <!-- 登录/注册卡片（核心容器，还原小米样式） -->
    <div class="login-card">
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

      <!-- ========== 登录表单区域（完全还原图片样式） ========== -->
      <div class="form-content" v-if="activeTab === 'login'">
        <!-- 用户名/手机号输入框 -->
        <div class="input-item">
          <input
              v-model="loginForm.username"
              type="text"
              placeholder="邮箱/手机号码/北极星ID"
              class="form-input"
              :disabled="loginLoading"
          />
        </div>

        <!-- 密码输入框 -->
        <div class="input-item">
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
            class="action-btn login-btn"
            @click="handleLogin"
            :disabled="loginLoading || !loginForm.agree"
        >
          <span v-if="loginLoading">登录中...</span>
          <span v-else>登录</span>
        </button>

        <!-- 辅助链接：忘记密码 & 手机号登录 -->
        <div class="link-group">
          <a href="#" class="link forgot">忘记密码?</a>
          <a href="#" class="link phone">手机号登录</a>
        </div>

        <!-- 分割线 -->
        <div class="divider">
          <span>其他方式登录</span>
        </div>

        <!-- 第三方登录按钮（支付宝、微信、QQ、微博） -->
        <div class="third-party-login">
          <button class="third-party-btn alipay">
            <span>支</span>
          </button>
          <button class="third-party-btn wechat">
            <span>💬</span>
          </button>
          <button class="third-party-btn qq">
            <span>🐧</span>
          </button>
          <button class="third-party-btn weibo">
            <span>📡</span>
          </button>
        </div>
      </div>

      <!-- ========== 注册表单区域（直接渲染 Register 组件） ========== -->
      <div class="form-content" v-if="activeTab === 'register'">
        <Register />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局容器 - 宇宙背景承载 */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 宇宙星际炫酷背景（动态渐变+粒子光效） */
.cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* 深蓝科幻渐变底色 */
  background: linear-gradient(135deg, #000428 0%, #004e92 50%, #000428 100%);
  /* 星点粒子效果 */
  background-image:
      radial-gradient(2px 2px at 20px 30px, #fff, transparent),
      radial-gradient(2px 2px at 40px 70px, #fff, transparent),
      radial-gradient(2px 2px at 50px 160px, #fff, transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  /* 动态渐变+闪烁动画 */
  animation: cosmicGradient 20s ease infinite, starTwinkle 8s linear infinite;
}

/* 背景渐变动画 */
@keyframes cosmicGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 星星闪烁动画 */
@keyframes starTwinkle {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

/* 登录/注册卡片（还原小米白色卡片样式） */
.login-card {
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 顶部Tab栏（还原小米样式） */
.tab-bar {
  display: flex;
  margin-bottom: 32px;
}
.tab-item {
  font-size: 24px;
  font-weight: 500;
  color: #999;
  margin-right: 32px;
  padding-bottom: 8px;
  cursor: pointer;
}
.tab-item.active {
  color: #333;
  border-bottom: 2px solid #ff6700; /* 小米橙色（北极星主色） */
}

/* 表单内容通用样式 */
.form-content {
  width: 100%;
}

/* 输入项通用样式（登录表单） */
.input-item {
  position: relative;
  margin-bottom: 16px;
}
.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 16px;
  color: #333;
  outline: none;
  box-sizing: border-box;
}
.form-input::placeholder {
  color: #999;
}
.form-input:focus {
  border-color: #ff6700;
}

/* 密码切换按钮 */
.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  cursor: pointer;
  color: #999;
  user-select: none;
}

/* 协议勾选通用样式 */
.agree-item {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;
}
.agree-item input {
  margin-right: 8px;
  transform: scale(1.2);
}
.link {
  color: #ff6700;
  text-decoration: none;
  margin: 0 4px;
}

/* 操作按钮通用样式（登录/注册） */
.action-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  color: white;
}
.login-btn {
  background-color: #ffb88c;
  margin-bottom: 24px;
}
.login-btn:hover {
  background-color: #ff9a5a;
}
.login-btn:disabled {
  background-color: #ffd2b3;
  cursor: not-allowed;
}

/* 辅助链接组（忘记密码 & 手机号登录） */
.link-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.link.forgot, .link.phone {
  color: #ff6700;
  text-decoration: none;
  font-size: 14px;
}

/* 分割线 */
.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #999;
  font-size: 14px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #eee;
}
.divider span {
  padding: 0 16px;
}

/* 第三方登录按钮 */
.third-party-login {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.third-party-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.third-party-btn.alipay {
  background-color: #1677ff;
}
.third-party-btn.wechat {
  background-color: #07c160;
}
.third-party-btn.qq {
  background-color: #12b7f5;
}
.third-party-btn.weibo {
  background-color: #e6162d;
}
.third-party-btn:hover {
  opacity: 0.9;
}

/* 响应式适配 */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }
  .tab-bar {
    gap: 32px;
  }
  .tab-item {
    font-size: 20px;
  }
  .third-party-login {
    gap: 16px;
  }
  .third-party-btn {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}
</style>