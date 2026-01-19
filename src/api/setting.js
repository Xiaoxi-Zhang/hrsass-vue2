import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} page 当前页码
 * @param {*} pagesize 当前页容量
 * @returns
 */
export const getRoleListAPI = (page, pagesize) => {
  return request({
    url: '/sys/role',
    params: { page, pagesize }
  })
}

/**
 * 删除角色
 * @param {*} id 角色id
 * @returns
 */
export const delRoleAPI = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加角色
 * @param {*} data  参数
 * @returns
 */
export const addRoleAPI = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 获取角色详情
 * @param {*} id 角色id
 * @returns
 */
export const getRoleDetailAPI = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 编辑角色
 * @param {*} data 参数
 * @returns
 */
export const editRoleAPI = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 分配权限
 * @param {*} data
 * @returns
 */
export const assignPermissionAPI = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
