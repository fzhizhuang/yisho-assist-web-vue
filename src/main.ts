import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/style/main.scss'
import '@arco-design/web-vue/dist/arco.css';
import '//at.alicdn.com/t/c/font_4725243_t57om8m46q.js'
import { Message } from '@arco-design/web-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 配置全局消息组件
Message._context = app._context

// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// router
app.use(router)

app.mount('#app')
