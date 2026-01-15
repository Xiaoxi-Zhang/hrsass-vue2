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
