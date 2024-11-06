import type { BindEmailParams, ModifyPasswordParams, SetPasswordParams, UserInfoRes } from '@/types/user'
import request, { type Result } from '@/http/http'
import { getToken } from '@/http/token'

const baseUrl = import.meta.env.VITE_BASE_API

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo(): Promise<UserInfoRes> {
  return request.get('/user/info')
}

/**
 * 绑定邮箱
 * @param {object} params 绑定邮箱command
 * @param {string} params.email 邮箱
 * @param {string} params.code 验证码
 * @returns
 */
export function bindEmail(params: BindEmailParams) {
  return request.post('/user/bindEmail', params)
}

/**
 * 设置密码
 * @param {object} params 设置密码command
 * @param {string} params.password 密码
 * @param {string} params.confirmPassword 确认密码
 * @returns
 */
export function setPassword(params: SetPasswordParams) {
  return request.post('/user/setPassword', params)
}

/**
 * 修改密码
 * @param {object} params 修改密码command
 * @param {string} params.oldPassword 旧密码
 * @param {string} params.newPassword 新密码
 * @param {string} params.confirmPassword 确认密码
 * @returns
 */
export function modifyPassword(params: ModifyPasswordParams) {
  return request.post('/user/modifyPassword', params)
}

/**
 * 上传头像
 * @param {object} file 文件
 * @returns 上传结果
 */
export async function uploadAvatar(file: any) {
  const formData = new FormData()
  formData.append('file', file)
  return await fetch(baseUrl + '/user/uploadAvatar', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  }).then((res) => {
    const response = res.json()
    return response as Promise<Result<any>>
  })
}
