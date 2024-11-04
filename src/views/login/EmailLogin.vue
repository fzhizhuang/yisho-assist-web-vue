<script setup lang="ts">
import { reactive } from 'vue';
import { useCounter } from '@/utils/counter';
import { mailAuth, sendCode } from '@/api/auth';
import { Message } from '@arco-design/web-vue';
import { MailTemplate } from '@/types';
import { setToken } from '@/http/token';
import { useRouter } from 'vue-router';

const EMAIL_REGEX: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

// 密码登录表单
const emailForm = reactive({
  email: '',
  code: ''
});

// 定义表单校验规则
const emailRules = {
  email: [
    {
      required: true,
      message: '邮箱必填'
    },
    {
      validator: (value, callback) => {
        if (!value.match(EMAIL_REGEX)) {
          return callback('请输入正确的邮箱');
        } else {
          return callback();
        }
      }
    }
  ],
  code: [
    {
      required: true,
      message: '验证码必填'
    }
  ]
};

// 重置密码
const resetEmailForm = () => {
  emailForm.code = '';

  emailForm.email = '';
};

const { text, isSend, handleCounter } = useCounter();
const router = useRouter();
// 处理密码登录
const handleEmailLoginSubmit = async ({ values }: any) => {
  // 解析账号和验证码
  const { email, code } = values;
  mailAuth({
    email: email,
    code: code
  }).then((result) => {
    // 设置token
    setToken(result);
    // 提示
    Message.success('登录成功');
    // 跳转首页
    router.push('/chat');
    // 重置表单
    resetEmailForm();
  });
};

// 处理发送验证码
const handleCode = () => {
  // 倒计时
  handleCounter();
  // 校验邮箱
  if (!emailForm.email.match(EMAIL_REGEX) || emailForm.email === '') {
    return;
  }
  // 发送验证码
  sendCode({
    mail: emailForm.email,
    template: MailTemplate.authentic
  }).then(() => {
    Message.success('发送成功');
  });
};
</script>

<template>
  <!-- 邮箱登录 -->
  <div class="password-form">
    <a-form :model="emailForm" :rules="emailRules" layout="vertical" size="large" @submit="handleEmailLoginSubmit">
      <a-form-item field="email" label="邮箱">
        <a-input v-model="emailForm.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item field="code" label="验证码">
        <a-input v-model="emailForm.code" placeholder="请输入验证码" />
        <a-button :disabled="isSend" @click="handleCode" type="primary" status="warning" style="width: 200px"
        >{{ text }}
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button :long="true" html-type="submit" type="primary">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
