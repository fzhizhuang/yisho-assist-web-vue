import { defineStore } from 'pinia'
import { getUserInfo, modifyUserInfo } from '@/api/user'
import type { UserInfoRes } from '@/types/user'

// 用户Store
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfoRes | null,
    showCropper: false
  }),
  actions: {
    async getUserInfo() {
      this.userInfo = await getUserInfo()
    },
    updateShowCropper(show: boolean) {
      this.showCropper = show
    },
    // 更新userinfo中的avatar
    updateAvatar(avatar: string) {
      this.userInfo!.user.avatar = avatar
    },
    // 更新用户昵称
    async updateUsername(username: string) {
      await modifyUserInfo(username)
      const userInfo = await getUserInfo()
      this.userInfo!.user.username = userInfo.user.username
    }
  },
  persist: true
})
