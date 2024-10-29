import { defineStore } from 'pinia'
export const useHistoryStore = defineStore('history', {
  state: () => ({
    // 当前会话
    chatId: '1'
  }),
  actions: {
    // 更新当前会话
    updateChatId(newChatId: string) {
      this.chatId = newChatId;
    }
  },
  persist: {
    enabled: true
  }
});
