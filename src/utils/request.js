import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL：基地址，接口中公有的地址配到baseURL
  // 请求接口时：会把api中配置的url和baseURL拼接到一起去请求
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 超过时间，超过5s 默认这次请求 失败
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // 状态码为2xx时，就会执行第一个回调函数
  // console.log(response)
  if (!response.data.success) {
    Message.error(response.data.message)
    return Promise.reject(new Error(response.data.message))
  }
  return response.data
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
