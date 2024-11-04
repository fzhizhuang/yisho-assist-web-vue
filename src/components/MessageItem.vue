<script setup lang="ts">
// 定义响应式数据，用于存储OpenAI生成的Markdown内容
import { IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'
import useClipboard from 'vue-clipboard3'
import { Message } from '@arco-design/web-vue'
import type { OpenaiMessage } from '@/types'
import MarkdownPreview from '@/components/MarkdownPreview.vue'

// 定义组件
defineProps<{
  messages: OpenaiMessage[]
}>()

const { toClipboard } = useClipboard()

// 复制
const handleCopy = async (content: string) => {
  try {
    await toClipboard(content)
    Message.success('复制成功')
  } catch (e) {
    console.error(e)
    Message.error('复制失败')
  }
}
// 删除消息
const handleDeleteMessage = (messageId: string) => {
  console.log(messageId)
}
</script>

<template>
  <!-- 对话消息item -->
  <div class="chat-message-item" v-for="message in messages" :key="message.messageId">
    <div class="chat-message-item-header">
      <a-avatar shape="circle" :image-url="message?.avatar" />
      <span class="chat-message-item-header-name">{{ message?.nickname }}</span>
    </div>
    <div class="chat-message-item-content">
      <MarkdownPreview :markdownContent="message?.content" v-if="message.type === 'text'" />
      <a-image :src="message?.content" width="256px" height="256px" :preview="false" v-else />
    </div>
    <div class="chat-message-item-foot">
      <!-- 复制 -->
      <a-tooltip content="复制" position="bottom">
        <a-button shape="circle" @click="handleCopy(message?.content)">
          <IconCopy />
        </a-button>
      </a-tooltip>
      <!-- 删除 -->
      <a-tooltip content="删除" position="bottom">
        <a-button shape="circle" @click="handleDeleteMessage(message?.messageId)">
          <IconDelete />
        </a-button>
      </a-tooltip>
      <!-- 日期 -->
      <span class="chat-message-item-foot-time">{{ message.sendTime }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-message-item {
  margin-top: 10px;

  .chat-message-item-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    .chat-message-item-header-name {
      font-weight: bold;
      color: #666;
    }
  }

  .chat-message-item-content {
    font-size: 10px;
    padding: 5px 48px;
  }

  .chat-message-item-foot {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 48px;
    gap: 10px;

    .chat-message-item-foot-time {
      color: #999;
      padding-left: 10px;
    }
  }
}
</style>
