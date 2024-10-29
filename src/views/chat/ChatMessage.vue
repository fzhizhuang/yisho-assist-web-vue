<script setup lang="ts">
import ChatModel from '@/views/chat/ChatModel.vue';
import { Model } from '@/types';
import { IconSend } from '@arco-design/web-vue/es/icon';
import ChatContent from '@/views/chat/ChatContent.vue';

const chatModelList: Array<Model> = [
  {
    code: 'gpt-3.5-turbo',
    description: 'GPT-3.5-Turbo',
    mid: 'gpt-3.5-turbo',
    name: 'GPT-3.5-Turbo',
    price: 0,
    type: 1
  },
  {
    code: 'gpt-4',
    description: 'GPT-4',
    mid: 'gpt-4',
    name: 'GPT-4',
    price: 1,
    type: 1
  },
  {
    code: 'gpt-4-32k',
    description: 'GPT-4-32k',
    mid: 'gpt-4-32k',
    name: 'GPT-4-32k',
    price: 10,
    type: 1
  }
];
</script>

<template>
  <!-- 对话消息 -->
  <div class="chat-message-box-main">
    <!-- header -->
    <div class="chat-message-box-header">
      <!-- 助手信息 -->
      <div class="chat-message-box-header-title">
        <a-avatar shape="square">助手</a-avatar>
        <div class="chat-message-box-header-title-assist">
          <span class="chat-message-box-header-title-assist-text">助手</span>
          <span class="chat-message-box-header-title-assist-desc">描述</span>
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
        <ChatContent />
      </div>
      <a-divider />
      <!-- 聊天内容 -->
      <div class="chat-message-box-content-text">
        <!-- 输入框 -->
        <div class="chat-message-box-content-text-input">
          <a-textarea placeholder="输入聊天内容..." :auto-size="{minRows:5,maxRows:5 }"
                      style="border: none;background: none" />
        </div>
        <div class="chat-message-box-content-text-button">
          <a-button shape="round" status="danger">
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
