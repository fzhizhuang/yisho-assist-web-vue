<script setup lang="ts">
import { getQrCode, wxAuth } from '@/api/auth'
import { ref, watchEffect } from 'vue'
import { setToken } from '@/http/token'
import { useRouter } from 'vue-router'

// 接收父组件传参
const props = defineProps<{
  activeKey: string | number
}>()

const router = useRouter()

// 微信登录二维码url
const wxLoginQrcodeUrl = ref('')
const ticket = ref('')

let interval: any

// 获取微信登录二维码
async function getWxLoginQrcode() {
  await getQrCode().then((res) => {
    wxLoginQrcodeUrl.value = res.url
    ticket.value = res.ticket
  })
}

// 轮询微信登录状态
async function pollingWxLoginStatus() {
  interval = setInterval(async () => {
    const token = await wxAuth({
      ticket: ticket.value
    })
    // 设置token
    setToken(token)
    // 跳转首页
    await router.push('/chat')
  }, 3000)
}

// 监听激活状态
watchEffect(() => {
  if (props.activeKey === 'qrcode') {
    getWxLoginQrcode()
    pollingWxLoginStatus()
  } else {
    // 清除定时器，防止多次轮询
    clearInterval(interval)
  }
})
</script>

<template>
  <!-- 微信扫码登录 -->
  <div class="wx-login">
    <div class="wx-login-text">
      <span>请使用微信扫一扫登录</span>
    </div>
    <div class="wx-login-qrcode">
      <a-image :src="wxLoginQrcodeUrl" width="200px" height="200px" alt="微信扫码登录" :preview="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wx-login {
  .wx-login-text {
    margin-top: 10px;
    text-align: center;
  }

  .wx-login-qrcode {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }
}
</style>
