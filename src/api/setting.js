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
