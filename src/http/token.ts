/**
 * 设置token
 * @param token token
 */
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

/**
 * 获取token
 */
export const getToken = () => {
  return localStorage.getItem('token')
}

/**
 * 清除token
 */
export const clearToken = () => {
  localStorage.removeItem('token')
}
