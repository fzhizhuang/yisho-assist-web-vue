<script setup lang="ts">
import ImageHistory from '@/views/image/ImageHistory.vue'
</script>

<template>
  <div class="image-box">
    <div class="image-history-box">
      <ImageHistory />
    </div>
    <a-divider direction="vertical" />
    <div class="image-message-box">

    </div>
  </div>
</template>

<style scoped lang="scss">
.image-box {
  height: calc(100vh - 80px);
  display: flex;

  // 对话历史
  .image-history-box {
    width: 250px;
    padding: 10px;
  }

  .image-message-box {
    flex: 1;
    padding: 10px;
  }
}
</style>
