import { defineStore } from 'pinia';
import type { Model } from '@/types';

export const useModelStore = defineStore('model', {
  state: () => {
    return {
      // 当前选中对话模型
      selectChatModel: null as Model | null,
      // 当前选中的绘画模型
      selectImageModel: null as Model | null
    };
  },
  actions: {
    // 更新当前选中对话模型
    updateSelectChatModel(newChatModel: Model) {
      this.selectChatModel = newChatModel;
    },
    // 更新当前选中的绘画模型
    updateSelectImageModel(newImageModel: Model) {
      this.selectImageModel = newImageModel;
    }
  },
  persist: {
    enabled: true
  }
});
