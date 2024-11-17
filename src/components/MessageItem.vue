<script setup lang="ts">
import { IconCopy, IconDelete } from '@arco-design/web-vue/es/icon'
import useClipboard from 'vue-clipboard3'
import { Message } from '@arco-design/web-vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import { MessageType, type MessageVO } from '@/types/openai'
import { useOpenaiStore } from '@/stores/openai'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const { toClipboard } = useClipboard()
const openaiStore = useOpenaiStore()
const userStore = useUserStore()
const { selectedHistory, selectedMessage } = storeToRefs(openaiStore)
const { userInfo } = storeToRefs(userStore)

const messages = ref<MessageVO[] | null>(null)

// 复制
async function handleCopy(content: string) {
  try {
    await toClipboard(content)
    Message.success('复制成功')
  } catch (e) {
    console.error(e)
    Message.error('复制失败')
  }
}

// 删除消息
function handleDeleteMessage(messageId: string) {
  openaiStore.deleteMessage(messageId)
}
</script>

<template>
  <!-- 对话消息item -->
  <div class="chat-message-item" v-for="message in selectedMessage" :key="message.messageId">
    <div class="chat-message-item-user" v-if="message && message.role === 'USER'">
      <div class="chat-message-item-header" style="flex-direction: row-reverse">
        <a-avatar shape="circle" :image-url="userInfo?.user?.avatar" />
        <span class="chat-message-item-header-name">{{ userInfo?.user?.username }}</span>
      </div>
      <div class="chat-message-item-content" style="display: flex; justify-content: end" v-if="message.content">
        <MarkdownPreview
          :markdownContent="message.content"
          v-if="message.type === MessageType.TEXT"
          style="background: #cccccc; width: fit-content"
        />
        <a-image :src="message?.content" width="256px" height="256px" :preview="false" v-else />
      </div>
      <div
        class="chat-message-item-foot"
        style="display: flex; justify-content: end; flex-direction: row-reverse"
        v-if="message.content"
      >
        <!-- 复制 -->
        <a-tooltip content="复制" position="bottom">
          <IconCopy @click="handleCopy(message.content)" :size="20" />
        </a-tooltip>
        <!-- 删除 -->
        <a-tooltip content="删除" position="bottom" v-if="message.messageId">
          <IconDelete @click="handleDeleteMessage(message.messageId)" :size="20" />
        </a-tooltip>
        <!-- 日期 -->
        <span class="chat-message-item-foot-time">{{ message.sendTime }}</span>
      </div>
    </div>
    <div class="chat-message-item-user" v-else>
      <div class="chat-message-item-header">
        <a-avatar shape="circle" :image-url="selectedHistory?.avatar" />
        <span class="chat-message-item-header-name">{{ selectedHistory?.assistName }}</span>
      </div>
      <div class="chat-message-item-content" v-if="message.content">
        <MarkdownPreview
          :markdownContent="message.content"
          v-if="message.type === MessageType.TEXT"
          style="background: #f0f0f0; width: fit-content"
        />
        <a-image :src="message?.content" width="256px" height="256px" :preview="false" v-else />
      </div>
      <div class="chat-message-item-foot" v-if="message.content">
        <!-- 复制 -->
        <a-tooltip content="复制" position="bottom">
          <IconCopy @click="handleCopy(message.content)" :size="20" />
        </a-tooltip>
        <!-- 删除 -->
        <a-tooltip content="删除" position="bottom" v-if="message.messageId">
          <IconDelete @click="handleDeleteMessage(message.messageId)" :size="20" />
        </a-tooltip>
        <!-- 日期 -->
        <span class="chat-message-item-foot-time">{{ message.sendTime }}</span>
      </div>
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
    margin: 5px;

    .chat-message-item-foot-time {
      color: #999;
      padding-left: 10px;
    }
  }
}
</style>
