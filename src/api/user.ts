import type { UserInfoRes } from '@/types/user';
import request, { type Result } from '@/http/http';
import { getToken } from '@/http/token';

const baseUrl = import.meta.env.VITE_BASE_API;

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo(): Promise<UserInfoRes> {
  return request.get('/user/info');
}

/**
 * 上传头像
 * @param {object} file 文件
 * @returns 上传结果
 */
export async function uploadAvatar(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  return await fetch(baseUrl + '/user/uploadAvatar', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer ' + getToken()
    }
  }).then(res => {
    const response = res.json();
    return response as Promise<Result<any>>;
  });
}
