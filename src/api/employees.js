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

/**
 * 修改员工信息
 * @param {*} data 参数
 * @returns
 */
export const editEmployeeAPI = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 分配用户角色信息
 * @param {*} id
 * @param {*} roleIds
 * @returns
 */
export const assignRoleAPI = (id, roleIds) => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUt',
    data: { id, roleIds }
  })
}
