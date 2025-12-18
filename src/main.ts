/**
 * @descr: polaris-demo项目入口文件
 * @author: Tony
 * @date: 2025-11-26
 * */

import './assets/main.css'

import {createApp, ref} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/index.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

