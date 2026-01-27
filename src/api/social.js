import request from '@/utils/request'

/**
 * 获取社保列表
 * @param {*} data
 * @returns
 */
export const getSocialListAPI = (data) => {
  return request({
    url: '/social_securitys/list',
    method: 'POST',
    data
  })
}

/**
 * 获取社保设置
 * @param {*} data
 * @returns
 */
export const getSettingsAPI = (data) => {
  return request({
    url: '/social_securitys/settings',
    method: 'POST',
    data
  })
}
