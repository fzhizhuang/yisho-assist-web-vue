<script setup lang="ts">
import MessageItem from '@/components/MessageItem.vue'
import type { OpenaiMessage } from '@/types'

const messages: Array<OpenaiMessage> = [
  {
    messageId: '1',
    chatId: '1',
    nickname: '对话小助手',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content: "# Heading\n\n```javascript\nconsole.log('Hello, World!')",
    role: 'assistant',
    type: 'text',
    sendTime: '2024/10/21 12:00:27'
  },
  {
    messageId: '2',
    chatId: '1',
    nickname: '用户',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content: '你好',
    role: 'user',
    type: 'text',
    sendTime: '2024/10/21 12:00:27'
  },
  {
    messageId: '3',
    chatId: '1',
    nickname: '对话小助手',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content: '欢迎使用',
    role: 'assistant',
    type: 'text',
    sendTime: '2024/10/21 12:00:27'
  },
  {
    messageId: '4',
    chatId: '1',
    nickname: '用户',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content: '你好',
    role: 'user',
    type: 'text',
    sendTime: '2024/10/21 12:00:27'
  },
  {
    messageId: '5',
    chatId: '1',
    nickname: '对话小助手',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content: '你好',
    role: 'assistant',
    type: 'text',
    sendTime: '2024/10/21 12:00:27'
  },
  {
    messageId: '6',
    chatId: '1',
    nickname: '用户',
    avatar: 'https://avatars.githubusercontent.com/u/1065620?v=4',
    content:
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    role: 'user',
    type: 'image',
    sendTime: '2024/10/21 12:00:27'
  }
]
</script>

<template>
  <MessageItem :messages="messages" />
</template>
