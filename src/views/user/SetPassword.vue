<script setup lang="ts"></script>

<template>
  <!-- 设置密码 -->
  <div class="set-password">
    <div class="set-password-title">设置密码</div>
    <div class="set-password-content">
      <div class="set-password-content-title">请输入新密码</div>
      <div class="set-password-content-input">
        <input type="password" placeholder="请输入新密码" v-model="password" />
      </div>
      <div class="set-password-content-title">请再次输入新密码</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
