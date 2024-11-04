<script setup lang="ts">
import ChatHistory from '@/views/chat/ChatHistory.vue'
import ChatMessage from '@/views/chat/ChatMessage.vue'
</script>

<template>
  <div class="chat-box">
    <div class="chat-history-box">
      <ChatHistory />
    </div>
    <a-divider direction="vertical" />
    <div class="chat-message-box">
      <ChatMessage />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-box {
  height: calc(100vh - 80px);
  display: flex;

  // 对话历史
  .chat-history-box {
    width: 250px;
    padding: 10px;
  }

  .chat-message-box {
    flex: 1;
    padding: 10px;
  }
}
</style>
