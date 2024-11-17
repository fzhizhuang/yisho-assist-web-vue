<script setup lang="ts">
import HistoryItem from '@/components/HistoryItem.vue'
import type { HistoryVO } from '@/types/openai'
// 定义props
defineProps<{
  historyList: HistoryVO[]
}>()
</script>

<template>
  <!-- 历史记录列表 -->
  <div class="history-list">
    <div class="history-item" v-for="history in historyList" :key="history.sessionId">
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
