import request from '@/utils/request'

/**
 * 获取权限列表
 * @returns
 */
export const getPermissionListAPI = () => {
  return request({
    url: '/sys/permission'
  })
}

/**
 * 添加权限
 * @param {*} data
 * @returns
 */
export const addPermissionAPI = (data) => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 * 删除权限
 * @param {*} id
 * @returns
 */
export const delPermissionAPI = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取权限详情
 * @param {*} id
 * @returns
 */
export const getPermissionDetailAPI = (id) => {
  return request({
    url: `/sys/permission/${id}`
  })
}

/**
 * 编辑权限
 * @param {*} data
 * @returns
 */
export const editPermissionAPI = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
