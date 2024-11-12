<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { IconUndo } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()
// 返回
const goBack = () => {
  router.back()
}
</script>

<template>
  <!-- 修改用户信息-->
  <div class="user-box">
    <div class="user-title">个人信息</div>
    <div class="user-info">
      <a-avatar :size="100" :image-url="userInfo?.user?.avatar" />
      <div class="user-box-header-name">
        <div class="user-box-header-name-subtext">昵称: {{ userInfo?.user?.username }}</div>
        <div class="user-box-header-name-subtext">ID: {{ userInfo?.user?.userId }}</div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.user?.userRole">
          Role:
          <span v-if="userInfo?.user?.userRole === 'ADMIN'">管理员</span>
          <span v-else-if="userInfo?.user?.userRole === 'NORMAL'">普通用户</span>
          <span v-else>VIP</span>
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.user?.email">Email: {{ userInfo.user?.email }}</div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.user?.openid">
          OpenID: {{ userInfo.user?.openid }}
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.user?.userStatus">
          账户状态: {{ userInfo.user?.userStatus === 'ENABLE' ? '启用' : '封禁' }}
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.quota">
          <span>总额度: {{ userInfo.quota.total }}</span>
        </div>
        <div class="user-box-header-name-subtext" v-if="userInfo?.quota">
          <span>剩余额度: {{ userInfo.quota.surplus }}</span>
        </div>
      </div>
    </div>
    <a-button :type="'outline'" long style="margin-top: 40px; width: 200px" @click="goBack">
      <template #icon>
        <IconUndo />
      </template>
      返回
    </a-button>
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
    gap: 30px;

    .user-box-header-name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 20px;

      .user-box-header-name-subtext {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
