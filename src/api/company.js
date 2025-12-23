import request from '@/utils/request'

/**
 * 获取公司信息
 * @param {*} id 公司id
 * @returns
 */
export const getCompanyAPI = (id) => {
  return request({
    url: `/company/${id}`
  })
}
