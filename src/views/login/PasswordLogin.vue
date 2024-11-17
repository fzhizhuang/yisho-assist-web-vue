<script setup lang="ts">
import { reactive } from 'vue'
import { passwordAuth } from '@/api/auth'
import { setToken } from '@/http/token'
import { useRouter } from 'vue-router'
import { Regx } from '@/types/auth'

// 路由
const router = useRouter()

// 密码登录表单
const passwordForm = reactive({
  account: '',
  password: ''
})

// 定义密码登录表单规则
const emailFieldRules = [
  { required: true, message: '请输入账号' },
  {
    validator: (value: string, callback: any) => {
      if (!value.match(Regx.email)) {
        return callback(Regx.emailError)
      } else {
        return callback()
      }
    }
  }
]
const passwordFieldRules = [
  { required: true, message: '请输入密码' },
  {
    validator: (value: string, callback: any) => {
      if (!value.match(Regx.password)) {
        return callback(Regx.passwordError)
      } else {
        return callback()
      }
    }
  }
]
const passwordFormRules = {
  account: emailFieldRules,
  password: passwordFieldRules
}

// 重置密码
function resetPasswordForm() {
  passwordForm.password = ''
  passwordForm.account = ''
}

// 处理密码登录
async function handlePasswordLogin({ values }: any) {
  const { account, password } = values

  const token = await passwordAuth({
    email: account,
    password: password
  })
  // 登录成功
  if (token) {
    // 设置token
    setToken(token)
    // 跳转首页
    await router.push('/chat')
    // 重置表单
    resetPasswordForm()
  }
}
</script>

<template>
  <!-- 密码登录 -->
  <div class="password-form">
    <a-form
      :model="passwordForm"
      layout="vertical"
      :rules="passwordFormRules"
      size="large"
      @submit="(values: Record<string, any>) => handlePasswordLogin(values)"
    >
      <a-form-item field="account" label="账号" :rules="emailFieldRules" :validate-trigger="['change', 'input']">
        <a-input v-model="passwordForm.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" label="密码" :rules="passwordFieldRules" :validate-trigger="['change', 'input']">
        <a-input-password v-model="passwordForm.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button :long="true" html-type="submit" type="primary">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
