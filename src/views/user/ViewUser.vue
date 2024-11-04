<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<template>
  <!-- 修改用户信息-->
  <div class="user-box">
    <div class="user-title">个人信息</div>
    <div class="user-info">
      <a-avatar :size="100" :image-url="userInfo.user?.avatar" />
      <div class="user-box-header-name">
        <div class="user-box-header-name-subtext">昵称: {{ userInfo.user?.username }}</div>
        <div class="user-box-header-name-subtext">ID: {{ userInfo.user?.userId }}</div>
        <div class="user-box-header-name-subtext" v-if="userInfo.user?.role">
          Role: {{ userInfo.user?.role === 1 ? '管理员' : '普通用户' }}
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo.user?.mail">Email: {{ userInfo.user?.mail }}</div>
        <div class="user-box-header-name-subtext" v-if="userInfo.user?.openid">OpenID: {{ userInfo.user?.openid }}</div>
        <div class="user-box-header-name-subtext" v-if="userInfo.user?.active">
          账户状态: {{ userInfo.user?.active === 1 ? '启用' : '禁用' }}
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.quota">
          <span>总额度: {{ userInfo.quota.total }}</span>
          <span style="padding-left: 30px">剩余额度: {{ userInfo.quota.surplus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-box {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .user-title {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;

    .user-box-header-name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;

      .user-box-header-name-subtext {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
