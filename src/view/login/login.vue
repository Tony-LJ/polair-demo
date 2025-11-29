<script setup lang="ts">
import { reactive } from 'vue';
import {login} from '@/api/login.ts'

const loginForm = reactive({
  username: '',
  password: ''
})

const Login = async () => {
  const data = await login(loginForm)
  console.log(data);
}

</script>

<template>
  <h1> 用户登录 </h1>
  <input v-model="loginForm.username" />
  <input v-model="loginForm.password" type="password" />
  <button @click="Login">登录</button>
</template>

<style scoped>

</style>