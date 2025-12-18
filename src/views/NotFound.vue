<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <button @click="goHome" class="home-btn">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 0;
}

h1 {
  font-size: 80px;
  color: #e6a23c;
  margin-bottom: 20px;
}

p {
  font-size: 20px;
  color: #666;
  margin-bottom: 30px;
}

.home-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>