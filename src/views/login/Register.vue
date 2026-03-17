<!-- src/views/login/Register.vue -->
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request'

// 路由实例
const router = useRouter()

// 注册表单数据
const registerForm = ref({
  country: '中国',
  countryCode: '+86',
  phone: '',
  code: '',
  agree: false
})

// 状态管理
const loading = ref(false)
const sendCodeLoading = ref(false)
const codeCountdown = ref(0)
let countdownTimer: NodeJS.Timeout | null = null

// 国家/地区选择
const openCountrySelect = () => {
  alert('国家/地区选择功能暂未实现，当前默认选择：中国(+86)')
}

// 国家码选择
const openCountryCodeSelect = () => {
  alert('国家码选择功能暂未实现，当前默认选择：+86')
}

// 表单验证
const validateForm = (): boolean => {
  if (!registerForm.value.phone.trim()) {
    alert('请输入手机号')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(registerForm.value.phone)) {
    alert('请输入有效的中国大陆手机号')
    return false
  }
  if (!registerForm.value.code.trim()) {
    alert('请输入验证码')
    return false
  }
  if (!registerForm.value.agree) {
    alert('请阅读并同意北极星账号使用协议和隐私政策')
    return false
  }
  return true
}

// 发送验证码
const sendVerificationCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(registerForm.value.phone)) {
    alert('请输入有效的中国大陆手机号')
    return
  }
  if (codeCountdown.value > 0) return

  sendCodeLoading.value = true
  try {
    await post('/api/send-code', {
      countryCode: registerForm.value.countryCode,
      phone: registerForm.value.phone
    })
    alert('验证码已发送，请注意查收')

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
  if (!validateForm()) return

  loading.value = true
  try {
    await post('/api/register', {
      countryCode: registerForm.value.countryCode,
      phone: registerForm.value.phone,
      code: registerForm.value.code
    })
    alert('注册成功！即将为您跳转到登录页')
    router.push('/login')
  } catch (error) {
    console.error('注册失败：', error)
    alert((error as any).msg || '注册失败，请检查信息后重试')
  } finally {
    loading.value = false
  }
}

// 清除定时器
onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <!-- 注册表单内容（无外层容器，直接使用公共样式） -->
  <div class="register-form">
    <!-- 国家/地区选择 -->
    <div class="form-item country-select">
      <div class="label">国家/地区</div>
      <div class="select-wrapper" @click="openCountrySelect">
        <span>{{ registerForm.country }}</span>
        <span class="arrow-icon">▼</span>
      </div>
    </div>

    <!-- 国家码+手机号 -->
    <div class="form-item phone-row">
      <div class="country-code-wrapper">
        <div class="label">国家码</div>
        <div class="select-wrapper" @click="openCountryCodeSelect">
          <span>{{ registerForm.countryCode }}</span>
          <span class="arrow-icon">▼</span>
        </div>
      </div>
      <div class="phone-input-wrapper">
        <div class="label">&nbsp;</div>
        <input
            v-model="registerForm.phone"
            type="tel"
            placeholder="手机号"
            class="form-input"
            :disabled="loading || sendCodeLoading"
            maxlength="11"
        />
      </div>
    </div>

    <!-- 验证码 -->
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
        class="action-btn"
        @click="handleRegister"
        :disabled="loading || !registerForm.agree"
        style="margin-bottom: 16px;"
    >
      <span v-if="loading">注册中...</span>
      <span v-else>注册</span>
    </button>

    <!-- 辅助链接 -->
    <div class="helper-link">
      <a href="#" class="code-help">收不到验证码?</a>
    </div>
  </div>
</template>

<style scoped>
/* 引入公共样式 */
@import '@/styles/login-card-styles.scss';

/* 仅保留注册表单独有样式 */
.register-form {
  width: 100%;
}
</style>