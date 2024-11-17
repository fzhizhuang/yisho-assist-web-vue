<script setup lang="ts">
import { IconUser, IconExport, IconBookmark } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/stores/setting'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// 路由
const router = useRouter()
const userStore = useUserStore()
const settingStore = useSettingStore()
const { userInfo } = storeToRefs(userStore)

// 跳转到目标页面
function goToTargetPage(target: string) {
  settingStore.updateMenu(target)
  router.push(target)
}

// 注销登录
function logout() {
  console.log('注销登录')
}

</script>

<template>
  <div class="footer-box">
    <div class="footer-box-header">
      <!-- 头像 -->
      <a-avatar :image-url="userInfo?.user?.avatar" />
      <!-- 用户昵称-->
      <span class="footer-box-name">{{ userInfo?.user?.username }}</span>
    </div>
    <a-divider />
    <div class="footer-box-menu">
      <!-- 个人中心 -->
      <div class="footer-box-menu-item" @click="goToTargetPage('/user')">
        <!-- icon -->
        <IconUser />
        <!-- text -->
        <span class="footer-box-menu-text">个人中心</span>
      </div>
      <!-- 我的订单 -->
      <div class="footer-box-menu-item" @click="goToTargetPage('/order')">
        <!-- icon -->
        <IconBookmark />
        <!-- text -->
        <span class="footer-box-menu-text">我的订单</span>
      </div>
      <!-- 退出登录 -->
      <div class="footer-box-menu-item" @click="logout">
        <!-- icon -->
        <IconExport />
        <!-- text -->
        <span class="footer-box-menu-text">退出登录</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-box {
  margin: 2px 20px;
  box-sizing: border-box;
  padding: 20px 12px 12px 12px;
  border-radius: 16px;
  background-size: contain;
  box-shadow: 0 2px 20px 0 hsla(0, 6%, 64%, 0.06);
  background: #939ec5 url('@/assets/image/bg.png') no-repeat;

  .footer-box-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
  }

  // 用户名
  .footer-box-name {
    color: #ffffff;
  }

  // 菜单
  .footer-box-menu {
    display: flex;
    flex-direction: column;

    .footer-box-menu-item {
      width: 200px;
      height: 32px;
      display: flex;
      align-items: center;
      color: #ffffff;
      cursor: pointer;
      gap: 10px;
      padding-left: 10px;

      &:hover {
        border-radius: 8px;
        box-shadow:
          0 4px 8px 0 rgba(0, 0, 0, 0.1),
          inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        background: linear-gradient(270deg, rgb(50, 51, 55) 50%, rgba(70, 79, 111, 0.5) 100%);
      }
    }
  }
}
</style>
