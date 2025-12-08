import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} loginForm 参数
 * @returns
 */
export const loginApi = (loginForm) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: loginForm
  })
}

/**
 *
 * @returns 获取用户信息
 */
export const getUserProfileAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户头像
 * @param {*} id
 * @returns
 */
export const getUserAvatarAPI = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
