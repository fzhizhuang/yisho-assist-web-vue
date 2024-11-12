<script setup lang="ts">
import { reactive } from 'vue'
import { passwordAuth } from '@/api/auth'
import { setToken } from '@/http/token'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { Regx } from '@/types'

// 密码登录表单
const passwordForm = reactive({
  account: '',
  password: ''
})

// 定义表单校验规则
const passwordRules = {
  account: [
    {
      required: true,
      message: '账号必填'
    },
    {
      validator: (value: any, callback: any) => {
        if (!value.match(Regx.email)) {
          return callback(Regx.emailError)
        } else {
          return callback()
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
      validator: (value: any, callback: any) => {
        if (!value.match(Regx.password)) {
          return callback(Regx.passwordError)
        } else {
          return callback()
        }
      }
    }
  ]
}

// 重置密码
const resetPasswordForm = () => {
  passwordForm.password = ''
  passwordForm.account = ''
}

const router = useRouter()
// 处理密码登录
const handlePasswordLoginSubmit = async ({ values }: any) => {
  // 解析账号和密码
  const { account, password } = values
  console.log(account, password)
  await passwordAuth({
    email: account,
    password: password
  }).then((result) => {
    // 设置token
    setToken(result)
    // 提示
    Message.success('登录成功')
    // 跳转首页
    router.push('/chat')
    // 重置表单
    resetPasswordForm()
  })
}
</script>

<template>
  <!-- 密码登录 -->
  <div class="password-form">
    <a-form
      :model="passwordForm"
      :rules="passwordRules"
      layout="vertical"
      size="large"
      @submit="handlePasswordLoginSubmit"
    >
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

<style scoped lang="scss"></style>
