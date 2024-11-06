<script setup lang="ts">
import { reactive } from 'vue';
import { setPassword } from '@/api/user';
import { Message } from '@arco-design/web-vue';
import { UserRegx } from '@/types/user';

const setPasswordForm = reactive({
  password: '',
  confirmPassword: ''
});

const resetPasswordForm = () => {
  setPasswordForm.password = '';
  setPasswordForm.confirmPassword = '';
};

// 提交表单
const handleSetPasswordSubmit = ({ values }: any) => {
  const { password, confirmPassword } = values;
  // 校验密码
  if (!password || !password.match(UserRegx.password)) {
    return;
  }
  // 校验确认密码
  if (!confirmPassword || !confirmPassword.match(UserRegx.password || password !== confirmPassword)) {
    return;
  }
  console.log(password, confirmPassword);
  setPassword({
    confirmPassword: confirmPassword,
    password: password
  }).then(() => {
    resetPasswordForm();
    Message.success('设置成功');
  });
};
</script>

<template>
  <div class="set-password-box">
    <div class="title">
      设置密码
      <span style="font-size: 12px;color: #ffa39e">（首次登录，需设置密码）</span>
    </div>
    <div class="set-password-form">
      <a-form :model="setPasswordForm" layout="vertical" size="large" @submit="handleSetPasswordSubmit">
        <a-form-item
          field="password"
          label="密码"
          :validate-trigger="['change', 'input']"
          :rules="[
            { required: true, message: '请输入密码' },
            { match: UserRegx.password, message: UserRegx.passwordError }
          ]"
        >
          <a-input v-model="setPasswordForm.password" type="password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item
          field="confirmPassword"
          label="确认密码"
          :validate-trigger="['change', 'input']"
          :rules="[
            { required: true, message: '请输入确认密码' },
            {
              match: UserRegx.password,
              message: UserRegx.passwordError
            },
            {
              validator: (value: string, callback: Function) => {
                if (value !== setPasswordForm.password) {
                  return callback('两次密码不一致')
                }
                return callback()
              }
            }
          ]"
        >
          <a-input v-model="setPasswordForm.confirmPassword" type="password" placeholder="请输入确认密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" long> 提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.set-password-box {
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

  .set-password-form {
    width: 400px;
    padding: 20px; /* 增加内边距以提高表单的可读性和美观性 */
    border-radius: 8px; /* 圆角边框，使表单看起来更柔和 */
  }
}
</style>
