import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/main.scss'
import '//at.alicdn.com/t/c/font_4725243_p82gyv1fyu.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// pinia
app.use(createPinia())
// router
app.use(router)

app.mount('#app')
