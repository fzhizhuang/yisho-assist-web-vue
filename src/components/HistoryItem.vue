<script setup lang="ts">
import { IconDelete } from '@arco-design/web-vue/es/icon'
import { storeToRefs } from 'pinia'
import type { HistoryVO } from '@/types/openai'
import { useOpenaiStore } from '@/stores/openai'
// 定义props
defineProps<{
  history: HistoryVO
}>()

// 删除历史记录
const deleteHistory = (sessionId: string) => {
  openaiStore.deleteChat(sessionId)
}

const openaiStore = useOpenaiStore()
const { selectedSession } = storeToRefs(openaiStore)
</script>

<template>
  <!-- 历史Item -->
  <div
    class="history-item"
    :class="selectedSession === history.sessionId ? 'selected' : ''"
    @click="openaiStore.updateSelectedSession(history.sessionId)"
  >
    <div class="history-item-img">
      <a-avatar shape="square" :image-url="history.avatar" />
    </div>
    <div class="history-item-msg">
      <div class="history-item-assist">{{ history.assistName }}</div>
      <div class="history-item-msg-title">
        {{ history.content }}
      </div>
      <div class="history-item-msg-time">{{ history.sendTime }}</div>
    </div>
    <div class="history-item-btn">
      <IconDelete @click="deleteHistory(history.sessionId)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.history-item {
  height: 72px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;

  &:hover {
    border-radius: 8px;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.1),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    background: rgba(207, 213, 225, 0.5) 100%;
  }

  .history-item-msg {
    display: flex;
    flex-direction: column;
    width: 150px;
    gap: 5px;

    .history-item-assist {
      font-size: 14px;
      font-weight: bold;
    }

    .history-item-msg-title {
      font-size: 12px;
    }

    .history-item-msg-time {
      font-size: 10px;
      color: gray;
    }
  }
}

.history-item .history-item-btn {
  display: none;
  margin-right: 5px;
}

.history-item:hover .history-item-btn {
  display: block;
}

.selected {
  border-radius: 8px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  background: rgba(70, 133, 180, 0.2) 50%;
}
</style>
