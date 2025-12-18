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

/**
 * 添加部门列表
 * @param {*} data 参数
 * @returns
 */
export const addDepartmentAPI = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 获取部门详情
 * @param {*} id 部门id
 * @returns
 */
export const getDepartmentDetailAPI = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 修改部门
 * @param {*} data 参数
 * @returns
 */
export const editDepartmentAPI = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
