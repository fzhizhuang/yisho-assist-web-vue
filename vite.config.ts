import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImportPlugin from '@opentiny/unplugin-tiny-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    autoImportPlugin('vite')
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      javascriptEnabled: true,
      scss: {
        additionalData: '@import "@/assets/style/variable.scss";'
      }
    }
  }
})
