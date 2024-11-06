<script setup lang="ts">
import { getQrCode, wxAuth } from '@/api/auth'
import { ref, watchEffect } from 'vue'
import { Message } from '@arco-design/web-vue'
import { setToken } from '@/http/token'
import { useRouter } from 'vue-router'

// 接收父组件传参
const props = defineProps<{
  activeKey: string
}>()

// 微信登录二维码url
const wxLoginQrcodeUrl = ref('')
const ticket = ref('')

// 获取微信登录二维码
const getWxLoginQrcode = async () => {
  await getQrCode().then((res) => {
    wxLoginQrcodeUrl.value = res.url
    ticket.value = res.ticket
  })
}

let interval: any
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

const router = useRouter()
// 轮询微信登录状态
const pollingWxLoginStatus = async () => {
  interval = setInterval(() => {
    wxAuth({
      ticket: ticket.value
    }).then((result) => {
      // 设置token
      setToken(result)
      // 提示
      Message.success('登录成功')
      // 跳转首页
      router.push('/chat')
    })
  }, 1000)
}
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
