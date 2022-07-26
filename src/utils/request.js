// ? 封装axios请求模块
import axios from 'axios'

// ? 配置默认请求地址
// ? 通过 defaults.baseURL 创建默认请求地址的缺点 - 这个项目只能有一个默认请求地址了
// ? axios.defaults.baseURL = 'http://toutiao.ithema.net/'

// ? 通过axios的create方法,可以创建多个请求地址,当api需要使用时进行选择
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// ? 请求拦截器 - 在该拦截器中可以统一处理前端发送的接口参数
request.interceptors.request.use(config => {
  /*
    ? config: 本次请求的配装对象 (headers, data, params, url, method)
  */
  // ? 通过满足已登录的状态 (store里的user) 来判断来给满足条件的接口请求添加headers
})

export default request
