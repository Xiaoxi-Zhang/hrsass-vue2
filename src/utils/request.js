import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL：基地址，接口中公有的地址配到baseURL
  // 请求接口时：会把api中配置的url和baseURL拼接到一起去请求
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 超过时间，超过5s 默认这次请求 失败
  timeout: 5000 // request timeout
})

export default service
