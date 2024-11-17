<script setup lang="ts">
import Icon from '@/components/BaseIcon.vue'
import { storeToRefs } from 'pinia'
import { useOpenaiStore } from '@/stores/openai'
import type { ModelVO } from '@/types/openai'

// 定义props
defineProps<{
  modelList: ModelVO[]
}>()

const openaiStore = useOpenaiStore()
const { selectChatModel } = storeToRefs(openaiStore)

// 更新选中的模型
function updateSelectedModel(item: ModelVO) {
  openaiStore.updateSelectChatModel(item)
}
</script>

<template>
  <!-- 对话模型 -->
  <a-dropdown position="br" style="margin-top: 20px">
    <div class="model-header-title">
      <a-tooltip content="对话模型" position="left">
        <Icon icon-name="icon-chat-model" class="model-icon" />
        <span>{{ selectChatModel?.modelName }}</span>
      </a-tooltip>
    </div>
    <template #content>
      <div v-for="item in modelList" :key="item.modelId" @click="updateSelectedModel(item)">
        <a-doption style="margin-top: 10px">
          <div class="dropdown-item">
            <div class="dropdown-item-model-wrapper">
              <Icon icon-name="icon-openai-violet" class="model-icon" v-if="item.modelQuota > 0" />
              <Icon icon-name="icon-openai-green" class="model-icon" v-else />
              <span class="dropdown-item-model">{{ item.modelName }}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 2px">
              <span>{{ item.modelQuota }}</span>
              <Icon icon-name="icon-bean" style="width: 24px; height: 24px" />
            </div>
          </div>
        </a-doption>
      </div>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">
.model-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
}

.dropdown-item {
  width: 200px;
  display: flex;
  justify-content: space-between;

  .dropdown-item-model-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.model-icon {
  width: 32px;
  height: 32px;
}
</style>
