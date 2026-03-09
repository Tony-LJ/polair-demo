<!--
@descr: 用户登录页
@author: Tony
@date: 2025-12-07
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'

// 路由实例
const router = useRouter()

// 表单数据
const accountForm = ref({
  username: 'admin',
  password: '123456',
  remember: true // 记住我默认勾选
})

// 密码显示/隐藏
const showPassword = ref(false)
// 登录加载状态
const loading = ref(false)
// 第三方登录加载状态
const thirdPartyLoading = ref('') // 存储当前加载的第三方类型：wechat/qq/github

// 表单验证
const validateAccountForm = (): boolean => {
  if (!accountForm.value.username.trim()) {
    alert('请输入用户名')
    return false
  }
  if (!accountForm.value.password.trim()) {
    alert('请输入密码')
    return false
  }
  return true
}

// 账号密码登录
const handleAccountLogin = async () => {
  if (!validateAccountForm()) return

  loading.value = true
  try {
    // 调用 Mock 登录接口（注意：路径前加 /api，和 Mock 配置一致）
    const res = await post<{
      token: string
      userInfo: { id: string; username: string }
    }>('/api/login/account', {
      username: accountForm.value.username,
      password: accountForm.value.password,
      remember: accountForm.value.remember
    })

    // 存储登录态
    if (accountForm.value.remember) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('savedUsername', accountForm.value.username)
    } else {
      sessionStorage.setItem('token', res.token)
    }

    // 跳转到首页
    router.push('/home')
  } catch (error) {
    console.error('登录失败：', error)
    alert((error as any).msg || '登录失败，请检查账号密码（模拟账号：admin/123456）')
  } finally {
    loading.value = false
  }
}

// 第三方登录
const handleThirdPartyLogin = async (type: 'wechat' | 'qq' | 'github') => {
  thirdPartyLoading.value = type
  try {
    // 调用第三方登录 Mock 接口
    const res = await post<{
      token: string
      userInfo: { id: string; username: string }
    }>('/api/login/thirdparty', { type })

    // 存储登录态
    localStorage.setItem('token', res.token)
    router.push('/home')
  } catch (error) {
    console.error(`${type}登录失败：`, error)
    alert(`${type === 'wechat' ? '微信' : type === 'qq' ? 'QQ' : 'GitHub'}登录失败`)
  } finally {
    thirdPartyLoading.value = ''
  }
}

// 页面挂载时读取记住的账号
onMounted(() => {
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    accountForm.value.username = savedUsername
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">欢迎回来</h1>
      <p class="login-subtitle">登录后继续你的检索增强对话。</p>

      <!-- 用户名输入框 -->
      <div class="form-item">
        <label class="form-label">用户名</label>
        <div class="input-wrapper">
          <span class="input-icon">👤</span>
          <input
              v-model="accountForm.username"
              type="text"
              placeholder="请输入用户名"
              class="form-input"
              :disabled="loading"
          />
        </div>
      </div>

      <!-- 密码输入框 -->
      <div class="form-item">
        <label class="form-label">密码</label>
        <div class="input-wrapper">
          <span class="input-icon">🔒</span>
          <input
              v-model="accountForm.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              class="form-input"
              :disabled="loading"
          />
          <span
              class="password-toggle"
              @click="showPassword = !showPassword"
              :disabled="loading"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
      </div>

      <!-- 记住我 & 提示文字 -->
      <div class="form-actions">
        <label class="remember-checkbox">
          <input
              type="checkbox"
              v-model="accountForm.remember"
              :disabled="loading"
          />
          <span class="checkmark"></span>
          记住我
        </label>
        <span class="helper-text">账号由管理员初始化</span>
      </div>

      <!-- 登录按钮 -->
      <button
          class="login-btn"
          @click="handleAccountLogin"
          :disabled="loading"
      >
        <span v-if="loading">登录中...</span>
        <span v-else>登录</span>
      </button>

      <!-- 分割线 -->
      <div class="divider">
        <span>其他登录方式</span>
      </div>

      <!-- 第三方登录按钮 -->
      <div class="third-party-login">
        <button
            class="third-party-btn wechat"
            @click="handleThirdPartyLogin('wechat')"
            :disabled="thirdPartyLoading === 'wechat'"
        >
          <span v-if="thirdPartyLoading === 'wechat'">微信登录中...</span>
          <span v-else>
            📱 微信登录
          </span>
        </button>
        <button
            class="third-party-btn qq"
            @click="handleThirdPartyLogin('qq')"
            :disabled="thirdPartyLoading === 'qq'"
        >
          <span v-if="thirdPartyLoading === 'qq'">QQ登录中...</span>
          <span v-else>
            🐧 QQ登录
          </span>
        </button>
        <button
            class="third-party-btn github"
            @click="handleThirdPartyLogin('github')"
            :disabled="thirdPartyLoading === 'github'"
        >
          <span v-if="thirdPartyLoading === 'github'">GitHub登录中...</span>
          <span v-else>
            🐙 GitHub登录
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局容器 */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* 标题样式 */
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #1d2129;
  margin: 0 0 8px 0;
}

.login-subtitle {
  font-size: 14px;
  color: #86909c;
  margin: 0 0 32px 0;
}

/* 表单项 */
.form-item {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #1d2129;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  color: #86909c;
  z-index: 1;
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 0 12px 0 40px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
  color: #1d2129;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #4c6fff;
}

.form-input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

/* 密码切换按钮 */
.password-toggle {
  position: absolute;
  right: 12px;
  font-size: 16px;
  cursor: pointer;
  color: #86909c;
  user-select: none;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 记住我 & 辅助文字 */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #1d2129;
  cursor: pointer;
  user-select: none;
}

.remember-checkbox input {
  display: none;
}

.checkmark {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: background-color 0.2s, border-color 0.2s;
}

.remember-checkbox input:checked + .checkmark {
  background-color: #4c6fff;
  border-color: #4c6fff;
}

.remember-checkbox input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.helper-text {
  font-size: 12px;
  color: #86909c;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 48px;
  background-color: #4c6fff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 24px;
}

.login-btn:hover {
  background-color: #3a5ef0;
}

.login-btn:disabled {
  background-color: #859cff;
  cursor: not-allowed;
}

/* 分割线 */
.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #86909c;
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #dcdfe6;
}

.divider span {
  padding: 0 16px;
}

/* 第三方登录按钮 */
.third-party-login {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.third-party-btn {
  flex: 1;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.third-party-btn.wechat {
  color: #07c160;
  border-color: #07c160;
}

.third-party-btn.wechat:hover {
  background-color: #f0f9f2;
}

.third-party-btn.qq {
  color: #12b7f5;
  border-color: #12b7f5;
}

.third-party-btn.qq:hover {
  background-color: #e8f7fc;
}

.third-party-btn.github {
  color: #333;
  border-color: #333;
}

.third-party-btn.github:hover {
  background-color: #f5f5f5;
}

.third-party-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>