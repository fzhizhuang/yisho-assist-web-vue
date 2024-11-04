/**
 * 用户信息
 */
export interface UserInfoRes {
  /* 用户信息 */
  user: {
    /*用户ID */
    userId: string

    /*用户昵称 */
    username: string

    /*用户邮箱 */
    mail?: string

    /*微信ID */
    openid?: string

    /*用户头像 */
    avatar?: string

    /*用户角色, 1-管理员 2-普通用户 */
    role: number

    /*用户状态 0-禁用 1-启用 */
    active: number
  }

  /* openai额度 */
  quota: {
    /*总额度 */
    total?: number

    /*剩余额度 */
    surplus?: number
  }
}

/**
 * 上传头像参数
 */
export interface UploadAvatarParams {
  /* 文件 */
  file: object
}
