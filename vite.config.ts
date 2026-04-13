import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/museum-app/', // Replace 'museum-app' with your repository name
  plugins: [vue()],
})
