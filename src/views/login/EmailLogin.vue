<script setup lang="ts">
import { reactive } from 'vue'
import { useCounter } from '@/utils/counter'
import { mailAuth, sendCode } from '@/api/auth'
import { Message } from '@arco-design/web-vue'
import { setToken } from '@/http/token'
import { useRouter } from 'vue-router'
import { Regx } from '@/types/auth'
import { CodeTemplate } from '@/types/auth'

const { text, isSend, handleCounter } = useCounter()
const router = useRouter()
// 密码登录表单
const emailForm = reactive({
  email: '',
  code: ''
})
// 定义表单校验规则
const emailFieldRules = [
  {
    required: true,
    message: '邮箱必填'
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
]
const codeFieldRules = [
  {
    required: true,
    message: '验证码必填'
  },
  {
    validator: (value: string, callback: any) => {
      if (!value.match(Regx.code)) {
        return callback(Regx.codeError)
      } else {
        return callback()
      }
    }
  }
]
const emailFormRules = {
  email: emailFieldRules,
  code: codeFieldRules
}

// 重置密码
function resetEmailForm() {
  emailForm.code = ''
  emailForm.email = ''
}

// 处理密码登录
async function handleEmailLoginSubmit({ values }: any) {
  // 解析账号和验证码
  const { email, code } = values
  const token = await mailAuth({
    email: email,
    code: code
  })
  // 设置token
  setToken(token)
  // 跳转首页
  await router.push('/chat')
  // 重置表单
  resetEmailForm()
}

// 处理发送验证码
function handleCode() {
  // 倒计时
  handleCounter()
  // 校验邮箱
  if (!emailForm.email.match(Regx.email) || emailForm.email === '') {
    return
  }
  // 发送验证码
  sendCode({
    email: emailForm.email,
    codeTemplate: CodeTemplate.AUTH
  }).then(() => {
    Message.success('发送成功')
  })
}
</script>

<template>
  <!-- 邮箱登录 -->
  <div class="password-form">
    <a-form :model="emailForm" :rules="emailFormRules" layout="vertical" size="large" @submit="handleEmailLoginSubmit">
      <a-form-item field="email" label="邮箱" :rules="emailFieldRules" :validate-trigger="['change', 'input']">
        <a-input v-model="emailForm.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item field="code" label="验证码" :rules="codeFieldRules" :validate-trigger="['change', 'input']">
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
