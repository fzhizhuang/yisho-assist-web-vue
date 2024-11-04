/**
 * 密码认证参数
 */
export interface PasswordAuthParams {
  /*邮箱 */
  email?: string

  /*密码 */
  password?: string
}

/**
 * 邮箱认证参数
 */
export interface MailAuthParams {
  /*邮箱 */
  email?: string

  /*验证码 */
  code?: string
}

/**
 * 发送验证码参数
 */
export interface SendCodeParams {
  /*邮箱 */
  mail?: string

  /*模板 */
  template: string
}

/**
 * 微信二维码信息
 */
export interface WxQrCodeVO {
  /* ticket */
  ticket: string

  /* 二维码url */
  url: string
}

// 微信认证参数
export interface WxAuthParams {
  /*ticket */
  ticket: string
}
