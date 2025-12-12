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
