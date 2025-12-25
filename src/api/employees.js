import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {*} page
 * @param {*} size
 * @returns
 */
export const getEmployeeListAPI = (page, size) => {
  return request({
    url: '/sys/user',
    params: { page, size }
  })
}
