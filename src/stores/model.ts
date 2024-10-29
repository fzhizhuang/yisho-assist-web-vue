import { defineStore } from 'pinia';
import type { Model } from '@/types';

export const useModelStore = defineStore('model', {
  state: () => {
    return {
      // 当前选中对话模型
      selectChatModel: null as Model | null
    };
  },
  actions: {
    // 更新当前选中对话模型
    updateSelectChatModel(newChatModel: Model) {
      this.selectChatModel = newChatModel;
    }
  },
  persist: {
    enabled: true
  }
});
