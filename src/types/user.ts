/**
 * 用户信息
 */
export interface UserInfoVO {
  /*用户 */
  user: {
    /*用户ID */
    userId: string
    /*用户昵称 */
    username: string
    /*用户邮箱 */
    email?: string
    /*微信ID */
    openid?: string
    /*用户头像 */
    avatar?: string
    /*用户角色,可用值:ADMIN,NORMAL,VIP */
    userRole: string
    /*用户状态,可用值:DISABLE,ENABLE */
    userStatus: string
  }
  /*可用额度 */
  quota: {
    /*总额度 */
    total: number
    /*剩余额度 */
    surplus: number
  }
}

// 绑定邮箱参数接口
export interface ModifyEmailRequest {
  /*邮箱 */
  email: string
  /*验证码 */
  code: string
}

// 设置密码参数接口
export interface SetPasswordRequest {
  /*密码 */
  password: string
  /*确认密码 */
  confirmPassword: string
}

// 修改密码参数接口
export interface ModifyPasswordRequest {
  /*旧密码 */
  oldPassword: string
  /*新密码 */
  newPassword: string
  /*确认密码 */
  confirmPassword: string
}
