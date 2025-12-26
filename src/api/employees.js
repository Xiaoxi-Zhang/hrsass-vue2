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

/**
 * 删除员工
 * @param {*} id 员工id
 * @returns
 */
export const delEmployeeAPI = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
