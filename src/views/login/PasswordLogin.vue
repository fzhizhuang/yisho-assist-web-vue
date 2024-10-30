<script setup lang="ts">
import { reactive } from 'vue';

const EMAIL_REGEX: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
// 密码正则表达式，密码格式必须是字母|数字|@%_$#&*组合,6-12位
const PASSWORD_REGEX: string = '^[a-zA-Z0-9@%_$#&*]{6,12}$';

// 密码登录表单
const passwordForm = reactive({
  account: '',
  password: ''
});

// 定义表单校验规则
const passwordRules = {
  account: [
    {
      required: true,
      message: '账号必填'
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
  password: [
    {
      required: true,
      message: '密码必填'
    },
    {
      validator: (value, callback) => {
        if (!value.match(PASSWORD_REGEX)) {
          return callback('密码格式必须是字母|数字|@%_$#&*组合,6-12位');
        } else {
          return callback();
        }
      }
    }
  ]
};

// 重置密码
const resetPasswordForm = () => {
  passwordForm.password = '';
  passwordForm.account = '';
};

// 处理密码登录
const handlePasswordLoginSubmit = ({ values, errors }) => {
  console.log('values:', values, '\nerrors:', errors);
  resetPasswordForm();
};
</script>

<template>
  <!-- 密码登录 -->
  <div class="password-form">
    <a-form :model="passwordForm" :rules="passwordRules" layout="vertical" size="large"
            @submit="handlePasswordLoginSubmit">
      <a-form-item field="account" label="账号">
        <a-input v-model="passwordForm.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input-password v-model="passwordForm.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button :long="true" html-type="submit" type="primary">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">

</style>
