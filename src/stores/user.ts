import { defineStore } from 'pinia'
import type { UserInfoVO } from '@/types/user'

interface UserState {
  userInfo: null | UserInfoVO
  showCropper: boolean
}

// 用户Store
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    showCropper: false
  }),
  getters: {
    getUserInfo(): UserInfoVO {
      return this.userInfo!
    }
  },
  actions: {
    updateShowCropper(show: boolean) {
      this.showCropper = show
    },
    // 更新userinfo中的avatar
    updateAvatar(avatar: string) {
      this.userInfo!.user.avatar = avatar
    },
    // 更新用户昵称
    async updateUsername(username: string) {
      this.userInfo!.user.username = username
    },
    // 设置用户信息
    setUserInfo(userInfo: UserInfoVO) {
      this.userInfo = userInfo
    }
  },
  persist: true
})
