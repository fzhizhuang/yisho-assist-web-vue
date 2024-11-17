<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import HistoryList from '@/components/HistoryList.vue'
import Icon from '@/components/BaseIcon.vue'
import { useOpenaiStore } from '@/stores/openai'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const openaiStore = useOpenaiStore()
const { historyList } = storeToRefs(openaiStore)

onMounted(() => {
  openaiStore.queryHistoryList()
})
</script>

<template>
  <div class="chat-history-box-wrapper">
    <div class="chat-history-box-header">
      <div class="chat-history-box-header-icon">
        <Icon icon-name="icon-chat-history" style="width: 32px; height: 32px" />
        <span>对话历史</span>
      </div>
      <div class="chat-history-box-header-btn">
        <a-button shape="round" type="primary" long @click="openaiStore.createNewChat">
          创建新对话
          <template #icon>
            <IconPlus />
          </template>
        </a-button>
      </div>
    </div>
    <div class="chat-history-box-list">
      <HistoryList :history-list="historyList" v-if="historyList" />
      <div v-else>
         <a-empty />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-history-box-wrapper {
  // 创建新对话
  .chat-history-box-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 80px;

    .chat-history-box-header-icon {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
