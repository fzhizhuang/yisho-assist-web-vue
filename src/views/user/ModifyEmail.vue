<script setup lang="ts">
import { reactive } from 'vue';
import { useCounter } from '@/utils/counter';
import { sendCode } from '@/api/auth';
import { MailTemplate } from '@/types';
import { Message } from '@arco-design/web-vue';
import { bindEmail } from '@/api/user';
import { UserRegx } from '@/types/user';

// 修改邮箱表单
const modifyEmailForm = reactive({
  email: '',
  code: ''
});

// 重置表单
const resetModifyEmailForm = () => {
  modifyEmailForm.email = '';
  modifyEmailForm.code = '';
};

const { text, isSend, handleCounter } = useCounter();

// 处理发送验证码
const handleCode = () => {
  // 倒计时
  handleCounter();
  // 校验邮箱
  if (!modifyEmailForm.email.match(UserRegx.email) || !modifyEmailForm.email) {
    return;
  }
  // 发送验证码
  sendCode({
    mail: modifyEmailForm.email,
    template: MailTemplate.modifyMail
  }).then(() => {
    Message.success('发送成功');
  });
};

// 提交表单
const handleModifyEmailSubmit = ({ values }: any) => {
  const { email, code } = values;
  // 校验邮箱
  if (!email || !email.match(UserRegx.email)) {
    return;
  }
  // 校验验证码
  if (!code || !code.match(UserRegx.code)) {
    return;
  }
  bindEmail({
    code: code,
    email: email
  }).then(() => {
    resetModifyEmailForm();
    Message.success('修改成功');
  });
};
</script>

<template>
  <!-- 修改邮箱 -->
  <div class="modify-email-box">
    <div class="title">换绑邮箱</div>
    <div class="modify-email-form">
      <a-form :model="modifyEmailForm" layout="vertical" size="large" @submit="handleModifyEmailSubmit">
        <a-form-item
          field="email"
          label="邮箱"
          :validate-trigger="['change', 'input', 'blur']"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { match: UserRegx.email, message: UserRegx.emailError }
          ]"
        >
          <a-input v-model="modifyEmailForm.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item
          field="code"
          label="验证码"
          :validate-trigger="['change', 'input', 'blur']"
          :rules="[
            { required: true, message: '请输入验证码' },
            { match: UserRegx.code, message: UserRegx.codeError }
          ]"
        >
          <a-input v-model="modifyEmailForm.code" placeholder="请输入验证码" />
          <a-button :disabled="isSend" @click="handleCode" style="width: 200px; margin-left: 10px">
            {{ text }}
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" long> 提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modify-email-box {
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

  .modify-email-form {
    width: 400px;
    padding: 20px; /* 增加内边距以提高表单的可读性和美观性 */
    border-radius: 8px; /* 圆角边框，使表单看起来更柔和 */
  }
}
</style>
