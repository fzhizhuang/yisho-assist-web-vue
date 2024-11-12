<script setup lang="ts">
import { reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import { modifyPassword } from '@/api/user'
import { Regx } from '@/types'
import { IconUndo } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

const modifyPasswordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const resetModifyPassword = () => {
  modifyPasswordForm.oldPassword = ''
  modifyPasswordForm.newPassword = ''
  modifyPasswordForm.confirmPassword = ''
}

// 提交表单
const handleModifyPasswordSubmit = ({ values }: any) => {
  const { oldPassword, newPassword, confirmPassword } = values
  // 校验旧密码
  if (!oldPassword || !oldPassword.match(Regx.password)) {
    return
  }
  // 校验新密码
  if (!newPassword || !newPassword.match(Regx.password) || oldPassword === newPassword) {
    return
  }
  // 校验确认密码
  if (!confirmPassword || !confirmPassword.match(Regx.password || newPassword !== confirmPassword)) {
    return
  }
  console.log(oldPassword, newPassword, confirmPassword)
  modifyPassword({
    confirmPassword: confirmPassword,
    newPassword: newPassword,
    oldPassword: oldPassword
  }).then(() => {
    resetModifyPassword()
    Message.success('修改成功')
  })
}

const router = useRouter()
// 返回
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="modify-password-box">
    <div class="title">修改密码</div>
    <div class="modify-password-form">
      <a-form :model="modifyPasswordForm" layout="vertical" size="large" @submit="handleModifyPasswordSubmit">
        <a-form-item
          field="oldPassword"
          label="旧密码"
          :validate-trigger="['change', 'input', 'blur']"
          :rules="[
            { required: true, message: '请输入旧密码' },
            { match: Regx.password, message: Regx.passwordError }
          ]"
        >
          <a-input-password v-model="modifyPasswordForm.oldPassword" placeholder="请输入旧密码" />
        </a-form-item>
        <a-form-item
          field="newPassword"
          label="新密码"
          :validate-trigger="['change', 'input']"
          :rules="[
            { required: true, message: '请输入新密码' },
            { match: Regx.password, message: Regx.passwordError },
            {
              validator: (value: string, callback: Function) => {
                if (value === modifyPasswordForm.oldPassword) {
                  return callback('新密码和原密码一致')
                }
                return callback()
              }
            }
          ]"
        >
          <a-input-password v-model="modifyPasswordForm.newPassword" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item
          field="confirmPassword"
          label="确认密码"
          :validate-trigger="['change', 'input']"
          :rules="[
            { required: true, message: '请输入确认密码' },
            { match: Regx.password, message: Regx.passwordError },
            {
              validator: (value: string, callback: Function) => {
                if (value !== modifyPasswordForm.newPassword) {
                  return callback('确认密码和新密码不一致')
                }
                return callback()
              }
            }
          ]"
        >
          <a-input-password v-model="modifyPasswordForm.confirmPassword" placeholder="请输入确认密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" long> 提交</a-button>
        </a-form-item>
        <a-button :type="'outline'" long style="margin-top: 20px" @click="goBack">
          <template #icon>
            <IconUndo />
          </template>
          返回
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modify-password-box {
  /* 垂直居中, 水平居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  gap: 10px;

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .modify-password-form {
    width: 400px;
    padding: 20px; /* 增加内边距以提高表单的可读性和美观性 */
    border-radius: 8px; /* 圆角边框，使表单看起来更柔和 */
  }
}
</style>
