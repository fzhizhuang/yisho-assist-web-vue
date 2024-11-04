<script setup lang="ts">
import LoginBanner from '@/assets/image/login.svg'
import PasswordLogin from '@/views/login/PasswordLogin.vue'
import EmailLogin from '@/views/login/EmailLogin.vue'
import WxLogin from '@/views/login/WxLogin.vue'
import { ref } from 'vue'

const activeKey = ref('password')
const handleTabChange = (key: string) => {
  activeKey.value = key
}
</script>

<template>
  <div class="login-box">
    <div class="login-box-left">
      <a-image :src="LoginBanner" :preview="false" width="571px" height="571px" />
    </div>
    <div class="login-box-right">
      <div class="login-box-right-box">
        <a-tabs default-active-key="password" style="width: 400px" :animation="true" @change="handleTabChange">
          <a-tab-pane key="password" title="密码登录">
            <PasswordLogin />
          </a-tab-pane>
          <a-tab-pane key="mail" title="邮箱登录">
            <EmailLogin />
          </a-tab-pane>
          <a-tab-pane key="qrcode" title="扫码登录">
            <WxLogin :active-key="activeKey" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .login-box-left {
    width: 700px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #adc6ff;
  }

  .login-box-right {
    height: 100vh;
    flex: 1;
    // 水平居中 垂直居中
    display: flex;
    align-items: center;
    justify-content: center;

    .login-box-right-box {
      width: 520px;
      height: 592px;
      /* 自动布局 */
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
