import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base 配置为 GitHub Pages 子路径（仓库名 nexus-gear）
export default defineConfig({
  base: '/nexus-gear/',
  plugins: [vue()],
})
