<script setup lang="ts">
import { History } from '@/types'
import HistoryItem from '@/components/HistoryItem.vue'
// 定义props
defineProps<{
  historyList: History[]
}>()
</script>

<template>
  <!-- 历史记录列表 -->
  <div class="history-list">
    <div class="history-item" v-for="history in historyList" :key="history.chatId">
      <HistoryItem :history="history" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.history-list {
  height: calc(100vh - 180px);
  overflow-y: scroll;
}
</style>
