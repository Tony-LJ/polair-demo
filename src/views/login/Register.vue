<!--
@descr: 北极星账号注册页
@author: Tony
@date: 2025-12-07
-->
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'

// 路由实例
const router = useRouter()

// 注册表单数据
const registerForm = ref({
  country: '中国',        // 国家/地区
  countryCode: '+86',     // 国家码
  phone: '',              // 手机号
  code: '',               // 验证码
  agree: false            // 同意协议
})

// 状态管理
const loading = ref(false)          // 注册按钮加载状态
const sendCodeLoading = ref(false)  // 发送验证码加载状态
const codeCountdown = ref(0)        // 验证码倒计时
let countdownTimer: NodeJS.Timeout | null = null  // 倒计时定时器

// 表单验证
const validateForm = (): boolean => {
  // 手机号验证
  if (!registerForm.value.phone.trim()) {
    alert('请输入手机号')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(registerForm.value.phone)) {
    alert('请输入有效的中国大陆手机号')
    return false
  }

  // 验证码验证
  if (!registerForm.value.code.trim()) {
    alert('请输入验证码')
    return false
  }

  // 协议勾选验证
  if (!registerForm.value.agree) {
    alert('请阅读并同意北极星账号使用协议和隐私政策')
    return false
  }

  return true
}

// 发送验证码
const sendVerificationCode = async () => {
  // 手机号格式校验
  if (!/^1[3-9]\d{9}$/.test(registerForm.value.phone)) {
    alert('请输入有效的中国大陆手机号')
    return
  }

  // 倒计时中不重复发送
  if (codeCountdown.value > 0) return

  sendCodeLoading.value = true
  try {
    // 调用发送验证码接口
    await post('/api/send-code', {
      countryCode: registerForm.value.countryCode,
      phone: registerForm.value.phone
    })

    // 提示发送成功
    alert('验证码已发送，请注意查收')

    // 启动60秒倒计时
    codeCountdown.value = 60
    countdownTimer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0) {
        clearInterval(countdownTimer!)
        countdownTimer = null
      }
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败：', error)
    alert((error as any).msg || '验证码发送失败，请稍后重试')
  } finally {
    sendCodeLoading.value = false
  }
}

// 提交注册
const handleRegister = async () => {
  // 表单验证
  if (!validateForm()) return

  loading.value = true
  try {
    // 调用注册接口
    const res = await post('/api/register', {
      countryCode: registerForm.value.countryCode,
      phone: registerForm.value.phone,
      code: registerForm.value.code
    })

    // 注册成功提示并跳转到登录页
    alert('注册成功！即将为您跳转到登录页')
    router.push('/login')
  } catch (error) {
    console.error('注册失败：', error)
    alert((error as any).msg || '注册失败，请检查信息后重试')
  } finally {
    loading.value = false
  }
}

// 页面卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<template>
  <div class="register-container">
    <!-- 宇宙星际背景层 -->
    <div class="cosmic-bg"></div>

    <!-- 注册卡片 -->
    <div class="register-card">
      <!-- 顶部标题 -->
      <div class="register-header">
        <h1 class="register-title">注册</h1>
        <p class="register-subtitle">创建你的北极星账号</p>
      </div>

      <!-- 国家/地区选择 -->
      <div class="form-item country-select">
        <div class="select-wrapper" @click="/* 可扩展下拉选择逻辑 */">
          <span>{{ registerForm.country }}</span>
          <span class="arrow-icon">▼</span>
        </div>
      </div>

      <!-- 手机号输入行 -->
      <div class="form-item phone-row">
        <div class="country-code">
          <span>{{ registerForm.countryCode }}</span>
        </div>
        <input
            v-model="registerForm.phone"
            type="tel"
            placeholder="请输入手机号"
            class="phone-input"
            :disabled="loading || sendCodeLoading"
            maxlength="11"
        />
      </div>

      <!-- 验证码输入行 -->
      <div class="form-item code-row">
        <input
            v-model="registerForm.code"
            type="text"
            placeholder="请输入验证码"
            class="code-input"
            :disabled="loading"
            maxlength="6"
        />
        <button
            class="get-code-btn"
            @click="sendVerificationCode"
            :disabled="sendCodeLoading || codeCountdown > 0 || loading"
        >
          <span v-if="sendCodeLoading">发送中...</span>
          <span v-else-if="codeCountdown > 0">{{ codeCountdown }}秒后重新发送</span>
          <span v-else>获取验证码</span>
        </button>
      </div>

      <!-- 协议勾选 -->
      <div class="form-item agree-item">
        <input
            type="checkbox"
            v-model="registerForm.agree"
            :disabled="loading"
            id="agree"
        />
        <label for="agree">
          已阅读并同意
          <a href="#" class="link">北极星账号使用协议</a>
          和
          <a href="#" class="link">北极星账号隐私政策</a>
        </label>
      </div>

      <!-- 注册按钮 -->
      <button
          class="register-btn"
          @click="handleRegister"
          :disabled="loading || !registerForm.agree"
      >
        <span v-if="loading">注册中...</span>
        <span v-else>注册</span>
      </button>

      <!-- 辅助链接 -->
      <div class="helper-link">
        <a href="#" class="code-help">收不到验证码?</a>
      </div>

      <!-- 底部登录链接 -->
      <div class="login-link">
        已有账号？<a href="/login" class="link">立即登录</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局容器 */
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 宇宙星际背景（炫酷渐变+动态光效） */
.cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 科幻渐变背景 + 半透明星空纹理 */
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  background-image:
      radial-gradient(circle at 20% 30%, rgba(66, 153, 225, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 20%);
  /* 动态光效动画 */
  animation: cosmicGlow 15s ease-in-out infinite alternate;
  z-index: -1;
}

/* 背景光效动画 */
@keyframes cosmicGlow {
  0% {
    background-position: 0% 0%;
    filter: brightness(0.9);
  }
  100% {
    background-position: 100% 100%;
    filter: brightness(1.1);
  }
}

/* 注册卡片 */
.register-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 顶部标题 */
.register-header {
  margin-bottom: 32px;
  text-align: center;
}
.register-title {
  font-size: 28px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 8px 0;
}
.register-subtitle {
  font-size: 14px;
  color: #86909c;
  margin: 0;
}

/* 表单项通用样式 */
.form-item {
  margin-bottom: 20px;
}

/* 国家/地区选择 */
.country-select .select-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #1d2129;
  padding: 0 8px;
  cursor: pointer;
}
.arrow-icon {
  font-size: 12px;
  color: #86909c;
}

/* 手机号行 */
.phone-row {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  overflow: hidden;
}
.country-code {
  padding: 0 16px;
  font-size: 16px;
  color: #1d2129;
  border-right: 1px solid #dcdfe6;
}
.phone-input {
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #1d2129;
  background: transparent;
}
.phone-input::placeholder {
  color: #86909c;
}

/* 验证码行 */
.code-row {
  display: flex;
  gap: 12px;
}
.code-input {
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: #1d2129;
}
.code-input::placeholder {
  color: #86909c;
}
.get-code-btn {
  width: 140px;
  height: 48px;
  background-color: #ff6700; /* 小米橙色 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.get-code-btn:hover {
  background-color: #ff9a5a;
}
.get-code-btn:disabled {
  background-color: #ffb88c;
  cursor: not-allowed;
}

/* 协议勾选 */
.agree-item {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: #4e5969;
}
.agree-item input {
  margin: 2px 8px 0 0;
  transform: scale(1.2);
}
.link {
  color: #ff6700;
  text-decoration: none;
  margin: 0 2px;
}
.link:hover {
  text-decoration: underline;
}

/* 注册按钮 */
.register-btn {
  width: 100%;
  height: 48px;
  background-color: #ff6700;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 16px;
}
.register-btn:hover {
  background-color: #ff9a5a;
}
.register-btn:disabled {
  background-color: #ffb88c;
  cursor: not-allowed;
}

/* 辅助链接 */
.helper-link {
  text-align: center;
  margin-bottom: 24px;
}
.code-help {
  font-size: 14px;
  color: #ff6700;
  text-decoration: none;
}
.code-help:hover {
  text-decoration: underline;
}

/* 底部登录链接 */
.login-link {
  text-align: center;
  font-size: 14px;
  color: #4e5969;
}
</style>