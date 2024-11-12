<script setup lang="ts">
import { watchEffect } from 'vue'
import MenuList from '@/layout/MenuList.vue'
import Icon from '@/components/Icon.vue'
import FooterBox from '@/layout/FooterBox.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { IconUser } from '@arco-design/web-vue/es/icon'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 获取用户信息
watchEffect(() => {
  userStore.getUserInfo()
})
</script>

<template>
  <div class="layout">
    <div class="side">
      <div class="logo">
        <div class="logo-box">
          <Icon iconName="icon-logo" class="logo-icon" />
          <span class="logo-text">YiSho助手</span>
        </div>
      </div>
      <div class="menu">
        <MenuList />
      </div>
      <div class="footer-container">
        <a-trigger position="top" auto-fit-position :unmount-on-close="false" trigger="click">
          <div class="footer">
            <div class="user">
              <div class="avatar">
                <a-avatar shape="circle" :image-url="userInfo?.user?.avatar" />
              </div>
              <span class="user-name">{{ userInfo?.user?.username }}</span>
            </div>
            <div class="quota">
              <a-tag color="gray" size="small" v-if="userInfo?.user?.userRole === 'ADMIN'">
                <template #icon>
                  <IconUser />
                </template>
                <span>管理员</span>
              </a-tag>
              <a-tag color="green" size="small" v-else-if="userInfo?.user?.userRole === 'NORMAL'">
                <template #icon>
                  <IconUser />
                </template>
                <span>普通用户</span>
              </a-tag>
              <a-tag color="orangered" size="small" v-else>
                <template #icon>
                  <IconUser />
                </template>
                <span>VIP</span>
              </a-tag>
              <a-tooltip content="剩余额度" position="right">
                <div class="quota-title">
                  <Icon icon-name="icon-bean" class="icon" />
                </div>
                <div class="quota-value">{{ userInfo?.quota?.surplus }}</div>
              </a-tooltip>
            </div>
          </div>
          <template #content>
            <FooterBox />
          </template>
        </a-trigger>
      </div>
    </div>
    <div class="content">
      <div style="padding: 10px">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  background: rgb(29, 33, 41);

  // 侧边栏
  .side {
    height: 100vh;
    width: 200px;

    // logo
    .logo {
      height: 60px;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo-box {
        display: flex;
        align-items: center;
        // logo图标
        .logo-icon {
          width: 48px;
          height: 48px;
        }

        // logo文字
        .logo-text {
          padding-left: 10px;
          font-size: 14px;
          color: #fff;
        }
      }
    }

    // 菜单
    .menu {
      height: 400px;
    }

    // 底部
    .footer {
      position: absolute;
      bottom: 20px;
      width: 180px;
      height: 88px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-radius: 10px;
      box-shadow: 0 20px 24px 0 rgba(0, 0, 0, 0.5);
      background: rgb(35, 38, 39);

      .user {
        display: flex;
        justify-content: left;
        align-items: center;
        padding-top: 5px;
        padding-left: 10px;
      }

      .quota {
        display: flex;
        justify-content: left;
        align-items: center;
        color: #ffffff;
        padding-left: 15px;
        gap: 5px;

        .icon {
          width: 24px;
          height: 24px;
        }
      }

      .avatar {
        padding-left: 10px;
      }

      .user-name {
        color: white;
        padding-left: 10px;
      }
    }
  }

  // 内容区
  .content {
    margin: 30px 10px;
    height: calc(100vh - 60px);
    flex: 1;
    background: #f8f8f8;
    border-radius: 20px;
  }
}
</style>
