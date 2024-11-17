<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import HistoryList from '@/components/HistoryList.vue'
import Icon from '@/components/BaseIcon.vue'

</script>

<template>
  <div class="image-history-box-wrapper">
    <div class="image-history-box-header">
      <div class="image-history-box-header-icon">
        <Icon icon-name="icon-image-history" style="width: 32px; height: 32px" />
        <span>绘画历史</span>
      </div>
      <div class="image-history-box-header-btn">
        <a-button shape="round" type="primary" status="warning" long>
          创建新绘画
          <template #icon>
            <IconPlus />
          </template>
        </a-button>
      </div>
    </div>
    <div class="image-history-box-list">

    </div>
  </div>
</template>

<style scoped lang="scss">
.image-history-box-wrapper {
  // 创建新对话
  .image-history-box-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 80px;

    .image-history-box-header-icon {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
