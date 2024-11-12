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
  email: string

  /*验证码模板 1-AUTH 2-MODIFY_EMAIL 3-RESET_PASSWORD */
  codeTemplate: number
}

/**
 * 验证码模板
 */
export enum CodeTemplate {
  AUTH = 1,
  MODIFY_EMAIL = 2,
  RESET_PASSWORD = 3
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
