<script setup lang="ts">
import { IconHistory, IconPlus } from '@arco-design/web-vue/es/icon';
import HistoryList from '@/components/HistoryList.vue';
import type { History } from '@/types';
import Icon from '@/components/Icon.vue';

const historyList: Array<History> = [
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '1',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '2',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '3',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '4',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '5',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '6',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '7',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '8',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '9',
    sendTime: '2023-05-05',
    title: '测试'
  },
  {
    assistant: 'assistant',
    avatar: 'https://avatars.githubusercontent.com/u/10656207?v=4',
    chatId: '10',
    sendTime: '2023-05-05',
    title: '测试'
  }
];
</script>

<template>
  <div class="image-history-box-wrapper">
    <div class="image-history-box-header">
      <div class="image-history-box-header-icon">
        <Icon icon-name="icon-image-history" style="width: 32px;height: 32px;" />
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
      <HistoryList :history-list="historyList" />
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
