import request from '@/utils/request'

/**
 * 获取组织架构列表
 * @returns
 */
export const getDepartmentListAPI = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id 部门id
 * @returns
 */
export const delDepartmentAPI = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取部门负责人列表
 * @returns
 */
export const getDepartmentManagerListAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}
