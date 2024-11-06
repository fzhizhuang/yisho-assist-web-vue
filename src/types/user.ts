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

// 绑定邮箱参数接口
export interface BindEmailParams {
  /*邮箱 */
  email: string

  /*验证码 */
  code: string
}

// 设置密码参数接口
export interface SetPasswordParams {
  /*密码 */
  password: string

  /*确认密码 */
  confirmPassword: string
}

// 修改密码参数接口
export interface ModifyPasswordParams {
  /*旧密码 */
  oldPassword: string

  /*新密码 */
  newPassword: string

  /*确认密码 */
  confirmPassword: string
}

export const UserRegx = {
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/,
  passwordError: '密码必须包含字母和数字,4-12位',
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  emailError: '非法邮箱',
  code: /^\d{4}$/,
  codeError: '验证码4位数字'
}
