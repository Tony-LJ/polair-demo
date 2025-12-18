<template>
  <div class="home">
    <h1>Vue3 + TS + Pinia + Axios + Mock 演示项目</h1>
    <div class="desc">
      <p>基于Mock.js生成模拟用户数据，演示Pinia状态管理和Vue Router路由功能</p>
    </div>
    <button @click="goToUserPage" class="btn">进入用户管理页面</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goToUserPage = () => {
  router.push({ name: 'User' })
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 0;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.desc {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.btn {
  padding: 12px 30px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #66b1ff;
}
</style>