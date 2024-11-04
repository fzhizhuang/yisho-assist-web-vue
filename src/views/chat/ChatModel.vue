<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { Model } from '@/types'
import { useModelStore } from '@/stores/model'
import { storeToRefs } from 'pinia'

// 定义props
defineProps<{
  modelList: Model[]
}>()

const modelStore = useModelStore()
const { selectChatModel } = storeToRefs(modelStore)

// 更新选中的模型
const updateSelectedModel = (item: Model) => {
  modelStore.updateSelectChatModel(item)
}
</script>

<template>
  <!-- 对话模型 -->
  <a-dropdown position="br" style="margin-top: 20px">
    <div class="model-header-title">
      <a-tooltip content="对话模型" position="left">
        <Icon icon-name="icon-chat-model" class="model-icon" />
        <span>{{ selectChatModel?.name }}</span>
      </a-tooltip>
    </div>
    <template #content>
      <div v-for="item in modelList" :key="item.mid" @click="updateSelectedModel(item)">
        <a-doption style="margin-top: 10px">
          <div class="dropdown-item">
            <div class="dropdown-item-model-wrapper">
              <Icon icon-name="icon-openai-violet" class="model-icon" v-if="item.price > 0" />
              <Icon icon-name="icon-openai-green" class="model-icon" v-else />
              <span class="dropdown-item-model">{{ item.name }}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 2px">
              <span>{{ item.price }}</span>
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
