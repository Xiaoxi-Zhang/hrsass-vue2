import request from '@/utils/request'

/**
 * 获取城市列表
 * @returns
 */
export const getCityList = () => {
  return request({
    url: '/sys/city'
  })
}
