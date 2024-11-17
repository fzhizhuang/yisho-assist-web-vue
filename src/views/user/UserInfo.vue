<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import Icon from '@/components/BaseIcon.vue'
import { IconEdit, IconCheck } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'
import ImageCropper from '@/components/ImageCropper.vue'
import { ref } from 'vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const router = useRouter()

// 修改用户昵称
const editName = ref(false)
const userName = ref(userStore?.userInfo?.user?.username)

// 更新昵称
const updateName = (value: string) => {
  userName.value = value
}

const updateEditName = (value: boolean) => {
  editName.value = value
}

// 更新修改昵称
const handleUpdateName = () => {
  const username = userName.value
  if (username === '' || username === undefined) {
    throw new Error('昵称为空')
  }
  // 修改用户昵称
  userStore.updateUsername(username)
  // 更新状态
  updateEditName(false)
}

// 更新显示修改头像弹窗
const openAvatarDialog = () => {
  userStore.updateShowCropper(true)
}

/**
 * 路由跳转
 * @param path 路径
 */
const goToTargetPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="user-box">
    <div class="user-box-header-info">
      <a-avatar :size="100" :image-url="userInfo?.user?.avatar" trigger-type="mask" @click="openAvatarDialog">
        <template #trigger-icon>
          <IconEdit />
        </template>
      </a-avatar>
      <div class="user-box-header-name">
        <div class="user-box-header-name-text" style="display: flex; align-items: center; gap: 10px" v-if="editName">
          <a-input :default-value="userName" @input="(value) => updateName(value)" />
          <IconCheck style="padding-left: 10px; cursor: pointer" @click="handleUpdateName" />
        </div>
        <div class="user-box-header-name-text" v-else>
          {{ userInfo?.user?.username }}
          <IconEdit style="padding-left: 10px; cursor: pointer" @click="() => updateEditName(true)" />
        </div>
        <div class="user-box-header-name-subtext">ID: {{ userInfo?.user?.userId }}</div>
      </div>
    </div>
    <div class="user-box-body">
      <div class="user-box-body-card" @click="goToTargetPage('/user/info')">
        <div class="user-box-body-card-icon">
          <Icon icon-name="icon-modifyUser" class="card-icon" />
        </div>
        <div class="user-box-body-card-text">查看个人资料</div>
      </div>
      <div class="user-box-body-card" @click="goToTargetPage('/modifyEmail')">
        <div class="user-box-body-card-icon">
          <Icon icon-name="icon-bandMail" class="card-icon" />
        </div>
        <div class="user-box-body-card-text">修改邮箱</div>
      </div>
      <div class="user-box-body-card" @click="goToTargetPage('/setPassword')">
        <div class="user-box-body-card-icon">
          <Icon icon-name="icon-setPassword" class="card-icon" />
        </div>
        <div class="user-box-body-card-text">设置密码</div>
      </div>
      <div class="user-box-body-card" @click="goToTargetPage('/modifyPassword')">
        <div class="user-box-body-card-icon">
          <Icon icon-name="icon-modifyPassword" class="card-icon" />
        </div>
        <div class="user-box-body-card-text">修改密码</div>
      </div>
    </div>
    <ImageCropper :title="'修改头像'" />
  </div>
</template>

<style scoped lang="scss">
.user-box {
  height: calc(100vh - 80px);

  .user-box-header-info {
    display: flex;
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

      .user-box-header-name-text {
        font-size: 18px;
        font-weight: bold;
      }

      .user-box-header-name-subtext {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .user-box-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 64px;

    .user-box-body-card {
      display: flex;
      width: 500px;
      height: 64px;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      border-radius: 12px;
      border: 1px solid #d6e4ff;
      cursor: pointer;

      &:hover {
        background-color: #f5f8ff;
      }

      .user-box-body-card-icon {
        padding-left: 20px;

        .card-icon {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
