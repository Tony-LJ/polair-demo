/**
 * @descr Vite 构建工具的核心配置文件（TypeScript 版本），用于自定义 Vite 的构建、开发、代理、插件等所有行为，替代了传统 Vue CLI 的 vue.config.js。
 *       它是前端项目（尤其是 Vue/React+TS）中控制 Vite 打包、开发服务器、依赖解析的关键文件
 * @author: Tony
 * @date: 2025-11-18
 * */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock', // 必须是项目根目录下的mock文件夹
      enable: true,     // 强制开启Mock
      logger: true,     // 显示Mock加载日志
      supportTs: true
    })
  ],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
    port: 3000,
    open: true,
    // 完全注释代理！避免转发冲突
    // proxy: { '/api': { target: 'http://127.0.0.1:8089', changeOrigin: true } }
  }
})