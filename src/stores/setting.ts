import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    // 当前菜单
    menu: '/chat'
  }),
  actions: {
    // 更新菜单
    updateMenu(newMenu: string) {
      this.menu = newMenu
    }
  },
  persist: true
})
