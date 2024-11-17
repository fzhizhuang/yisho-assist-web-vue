<script setup lang="ts">
import ChatModel from '@/views/chat/ChatModel.vue'
import { IconSend } from '@arco-design/web-vue/es/icon'
import { ref, watchEffect } from 'vue'
import { useOpenaiStore } from '@/stores/openai'
import { storeToRefs } from 'pinia'
import { Role } from '@/types/openai'
import MessageItem from '@/components/MessageItem.vue'

const openaiStore = useOpenaiStore()
const { selectedHistory, historyList, selectedSession, chatModelList, selectChatModel } = storeToRefs(openaiStore)
const disabled = ref(true)
const inputMessage = ref('')
watchEffect(() => {
  if (historyList.value) {
    historyList.value.forEach((item) => {
      if (item.sessionId === selectedSession.value) {
        // 更新选中的聊天记录
        openaiStore.updateSelectedHistory(item)
      }
    })
  }
})
watchEffect(() => {
  openaiStore.queryMessageList(selectedSession?.value)
})
watchEffect(() => {
  openaiStore.queryChatModelList()
})
const updateInputMessage = (message: string) => {
  inputMessage.value = message
}
watchEffect(() => {
  disabled.value = inputMessage.value.length === 0
})
const sendMessage = () => {
  const message = inputMessage.value
  openaiStore.streamCompletion({
    sessionId: selectedSession?.value,
    assistId: selectedHistory?.value?.assistId,
    model: selectChatModel?.value?.modelCode,
    messages: [
      {
        role: Role.ASSISTANT,
        content: selectedHistory?.value?.prompt
      },
      {
        role: Role.USER,
        content: message
      }
    ]
  })
}
</script>

<template>
  <!-- 对话消息 -->
  <div class="chat-message-box-main">
    <!-- header -->
    <div class="chat-message-box-header">
      <!-- 助手信息 -->
      <div class="chat-message-box-header-title">
        <a-avatar shape="square" :image-url="selectedHistory?.avatar" />
        <div class="chat-message-box-header-title-assist">
          <span class="chat-message-box-header-title-assist-text">{{ selectedHistory?.assistName }}</span>
          <span class="chat-message-box-header-title-assist-desc">{{ selectedHistory?.assistDesc }}</span>
        </div>
      </div>
      <!-- 模型信息 -->
      <div class="chat-message-box-header-model">
        <ChatModel :model-list="chatModelList" />
      </div>
    </div>
    <a-divider />
    <div class="chat-message-box-content">
      <!-- 聊天记录 -->
      <div class="chat-message-box-content-history">
        <MessageItem />
      </div>
      <a-divider />
      <!-- 聊天内容 -->
      <div class="chat-message-box-content-text">
        <!-- 输入框 -->
        <div class="chat-message-box-content-text-input">
          <a-textarea
            placeholder="输入聊天内容..."
            :auto-size="{ minRows: 5, maxRows: 5 }"
            style="border: none; background: none"
            @input="updateInputMessage"
          />
        </div>
        <div class="chat-message-box-content-text-button">
          <a-button shape="round" status="danger" :disabled="disabled" @click="sendMessage">
            <template #icon>
              <IconSend />
            </template>
            <template #default>发送</template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-message-box-main {
  width: 100%;
  height: 100%;

  .chat-message-box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .chat-message-box-header-title {
      display: flex;
      align-items: center;
      gap: 10px;

      .chat-message-box-header-title-assist {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;

        .chat-message-box-header-title-assist-text {
          font-size: 14px;
          font-weight: bold;
        }

        .chat-message-box-header-title-assist-desc {
          font-size: 12px;
          color: gray;
        }
      }
    }
  }

  .chat-message-box-content {
    height: calc(100vh - 170px);
    display: flex;
    flex-direction: column;

    .chat-message-box-content-history {
      overflow-y: scroll;
      flex: 1;
    }

    .chat-message-box-content-text {
      height: 150px;
      display: flex;
      flex-direction: column;

      .chat-message-box-content-text-button {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
