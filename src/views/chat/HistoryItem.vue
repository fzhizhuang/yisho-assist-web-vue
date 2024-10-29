<script setup lang="ts">
import { IconDelete } from '@arco-design/web-vue/es/icon';
import { History } from '@/types';
import { useHistoryStore } from '@/stores/history';
import { storeToRefs } from 'pinia';
// 定义props
defineProps<{
  history: History
}>();
const historyStore = useHistoryStore();
const { chatId } = storeToRefs(historyStore);
const deleteHistory = (chatId: string) => {
  console.log(chatId);
};
</script>

<template>
  <!-- 对话历史Item -->
  <div class="chat-history-item" :class="chatId === history.chatId ? 'selected' : ''"
       @click="historyStore.updateChatId(history.chatId)">
    <div class="chat-history-item-img">
      <a-avatar shape="square">{{ history.avatar }}</a-avatar>
    </div>
    <div class="chat-history-item-msg">
      <div class="chat-history-item-assist">{{ history.assistant }}</div>
      <div class="chat-history-item-msg-title">
        {{ history.title }}
      </div>
      <div class="chat-history-item-msg-time">{{ history.sendTime }}</div>
    </div>
    <div class="chat-history-item-btn">
      <a-button>
        <template #icon>
          <IconDelete @click="deleteHistory(history.chatId)" />
        </template>
      </a-button>
    </div>
  </div>

</template>

<style scoped lang="scss">
.chat-history-item {
  height: 72px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;

  &:hover {
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    background: rgba(207, 213, 225, 0.5) 100%;
  }

  .chat-history-item-msg {
    display: flex;
    flex-direction: column;
    width: 150px;
    gap: 5px;

    .chat-history-item-assist {
      font-size: 14px;
      font-weight: bold;
    }

    .chat-history-item-msg-title {
      font-size: 12px;
    }

    .chat-history-item-msg-time {
      font-size: 10px;
      color: gray;
    }
  }
}


.chat-history-item .chat-history-item-btn {
  display: none;
  margin-right: 5px;
}

.chat-history-item:hover .chat-history-item-btn {
  display: block;
}

.selected {
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  background: rgba(70, 79, 111, 0.5) 100%;
}
</style>
