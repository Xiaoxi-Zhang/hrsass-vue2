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

/**
 * 添加员工
 * @param {*} data 参数
 * @returns
 */
export const addEmployeeAPI = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

/**
 * 批量添加员工
 * @param {*} list 批量添加的员工列表
 * @returns
 */
export const batchAddEmployeeAPI = (list) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data: list
  })
}
