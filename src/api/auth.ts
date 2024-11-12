// 认证
import type { MailAuthParams, PasswordAuthParams, SendCodeParams, WxAuthParams, WxQrCodeVO } from '@/types/auth'
import request from '@/http/http'

/**
 * 密码认证
 * @param {object} params 密码认证command
 * @param {string} params.email 邮箱
 * @param {string} params.password 密码
 * @returns
 */
export function passwordAuth(params: PasswordAuthParams) {
  console.log(params)
  return request.post('/auth/password', params)
}

/**
 * 邮箱认证
 * @param {object} params 邮箱认证command
 * @param {string} params.email 邮箱
 * @param {string} params.code 验证码
 * @returns
 */
export function mailAuth(params: MailAuthParams) {
  return request.post('/auth/email', params)
}

/**
 * 发送验证码
 * @param {object} params 发送验证码command
 * @param {string} params.mail 邮箱
 * @param {string} params.template 模板
 * @returns
 */
export function sendCode(params: SendCodeParams) {
  return request.post('/sendCode', params)
}

/**
 * 获取微信二维码
 * @returns
 */
export function getQrCode(): Promise<WxQrCodeVO> {
  return request.get('/getQrcode')
}

/**
 * 微信认证
 * @param {object} params 微信认证command
 * @param {string} params.ticket ticket
 * @returns
 */
export function wxAuth(params: WxAuthParams) {
  return request.post('/auth/wx', params)
}
