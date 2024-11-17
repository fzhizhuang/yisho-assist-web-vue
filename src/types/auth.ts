/**
 * 密码认证参数
 */
export interface PasswordAuthRequest {
  /*邮箱 */
  email: string
  /*密码 */
  password: string
}

/**
 * 邮箱认证参数
 */
export interface MailAuthRequest {
  /*邮箱 */
  email: string
  /*验证码 */
  code: string
}

/**
 * 发送验证码参数
 */
export interface SendCodeRequest{
  /*邮箱 */
  email: string
  /*验证码模板 1-AUTH 2-MODIFY_EMAIL 3-RESET_PASSWORD */
  codeTemplate: number
}


// 微信认证参数
export interface WxAuthRequest {
  /*ticket */
  ticket: string
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


export const Regx = {
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/,
  passwordError: '密码必须包含字母和数字,4-12位',
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  emailError: '非法邮箱',
  code: /^[0-9]{4}$/,
  codeError: '验证码必须为4位数字'
}
