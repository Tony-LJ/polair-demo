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
  username: '',
  password: '',
  agree: false // 同意协议
})

// 密码显示/隐藏
const showPassword = ref(false)
// 登录加载状态
const loading = ref(false)
// 第三方登录加载状态
const thirdPartyLoading = ref('') // 存储当前加载的第三方类型：alipay/wechat/qq/weibo

// 表单验证
const validateAccountForm = (): boolean => {
  if (!accountForm.value.username.trim()) {
    alert('请输入邮箱/手机号码/北极星ID')
    return false
  }
  if (!accountForm.value.password.trim()) {
    alert('请输入密码')
    return false
  }
  if (!accountForm.value.agree) {
    alert('请阅读并同意Polar账号使用协议和隐私政策')
    return false
  }
  return true
}

// 账号密码登录
const handleAccountLogin = async () => {
  if (!validateAccountForm()) return

  loading.value = true
  try {
    // 调用 Mock 登录接口
    const res = await post<{
      token: string
      userInfo: { id: string; username: string }
    }>('/api/login/account', {
      username: accountForm.value.username,
      password: accountForm.value.password
    })

    // 存储登录态
    localStorage.setItem('token', res.token)
    router.push('/home')
  } catch (error) {
    console.error('登录失败：', error)
    alert((error as any).msg || '登录失败，请检查账号密码')
  } finally {
    loading.value = false
  }
}

// 第三方登录
const handleThirdPartyLogin = async (type: 'alipay' | 'wechat' | 'qq' | 'weibo') => {
  thirdPartyLoading.value = type
  try {
    const res = await post<{
      token: string
      userInfo: { id: string; username: string }
    }>('/api/login/thirdparty', { type })
    localStorage.setItem('token', res.token)
    router.push('/home')
  } catch (error) {
    console.error(`${type}登录失败：`, error)
    const typeName = {
      alipay: '支付宝',
      wechat: '微信',
      qq: 'QQ',
      weibo: '微博'
    }[type]
    alert(`${typeName}登录失败`)
  } finally {
    thirdPartyLoading.value = ''
  }
}

// 页面挂载时读取记住的账号（可选保留）
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
      <!-- 顶部标签栏 -->
      <div class="tab-bar">
        <div class="tab-item active">登录</div>
        <div class="tab-item">注册</div>
      </div>

      <!-- 用户名输入框 -->
      <div class="input-item">
        <input
            v-model="accountForm.username"
            type="text"
            placeholder="邮箱/手机号码/北极星ID"
            class="form-input"
            :disabled="loading"
        />
      </div>

      <!-- 密码输入框 -->
      <div class="input-item">
        <input
            v-model="accountForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="密码"
            class="form-input"
            :disabled="loading"
        />
        <span
            class="password-toggle"
            @click="showPassword = !showPassword"
            :disabled="loading"
        >
          {{ showPassword ? '👁️' : '🙈' }}
        </span>
      </div>

      <!-- 同意协议 -->
      <div class="agree-item">
        <input
            type="checkbox"
            v-model="accountForm.agree"
            :disabled="loading"
            id="agree"
        />
        <label for="agree">已阅读并同意</label>
        <a href="#" class="link">Polar账号使用协议</a>
        <span>和</span>
        <a href="#" class="link">Polar账号隐私政策</a>
      </div>

      <!-- 登录按钮 -->
      <button
          class="login-btn"
          @click="handleAccountLogin"
          :disabled="loading || !accountForm.agree"
      >
        <span v-if="loading">登录中...</span>
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

      <!-- 第三方登录按钮 -->
      <div class="third-party-login">
        <button
            class="third-party-btn alipay"
            @click="handleThirdPartyLogin('alipay')"
            :disabled="thirdPartyLoading === 'alipay'"
        >
          <span v-if="thirdPartyLoading === 'alipay'">加载中...</span>
          <span v-else>支</span>
        </button>
        <button
            class="third-party-btn wechat"
            @click="handleThirdPartyLogin('wechat')"
            :disabled="thirdPartyLoading === 'wechat'"
        >
          <span v-if="thirdPartyLoading === 'wechat'">加载中...</span>
          <span v-else>💬</span>
        </button>
        <button
            class="third-party-btn qq"
            @click="handleThirdPartyLogin('qq')"
            :disabled="thirdPartyLoading === 'qq'"
        >
          <span v-if="thirdPartyLoading === 'qq'">加载中...</span>
          <span v-else>🐧</span>
        </button>
        <button
            class="third-party-btn weibo"
            @click="handleThirdPartyLogin('weibo')"
            :disabled="thirdPartyLoading === 'weibo'"
        >
          <span v-if="thirdPartyLoading === 'weibo'">加载中...</span>
          <span v-else>📡</span>
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
  background-color: #fff;
  padding: 20px;
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 450px;
  background: #ffffff;
  padding: 40px 32px;
}

/* 顶部标签栏 */
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
  border-bottom: 2px solid #ff6700; /* 小米橙色 */
}

/* 输入框 */
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
.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
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
.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 同意协议 */
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

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 48px;
  background-color: #ffb88c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 24px;
}
.login-btn:hover {
  background-color: #ff9a5a;
}
.login-btn:disabled {
  background-color: #ffd2b3;
  cursor: not-allowed;
}

/* 辅助链接 */
.link-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.link.forgot {
  color: #ff6700;
  text-decoration: none;
  font-size: 14px;
}
.link.phone {
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
.third-party-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>