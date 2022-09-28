import axios from 'axios'
const request = axios.create({
  baseURL: 'https://cyber-tea-platform.anrunlu.net/stu',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
})

request.interceptors.request.use((config) => {
  // 自定义header，可添加项目token
  config.headers.token = 'token'
  return config
})

request.interceptors.response.use((response) => {
  // 获取接口返回结果
  return response
})

export default request
