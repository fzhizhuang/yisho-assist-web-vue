<script setup lang="ts">
import wxLoginQrcode from '@/assets/image/qr.svg';
</script>

<template>
  <!-- 微信扫码登录 -->
  <div class="wx-login">
    <div class="wx-login-text">
      <span>请使用微信扫一扫登录</span>
    </div>
    <div class="wx-login-qrcode">
      <a-image :src="wxLoginQrcode" width="200px" height="200px" alt="微信扫码登录" :preview="false" />
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
