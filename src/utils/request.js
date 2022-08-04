// 封装axios请求模块
import axios from 'axios'
import store from '../store/index.js'

// 配置默认请求地址
// 通过 defaults.baseURL 创建默认请求地址的缺点 - 这个项目只能有一个默认请求地址了
// axios.defaults.baseURL = 'http://toutiao.itheima.net/'

// 通过axios的create方法，可以创建多个请求地址，当api需要使用时进行选择
const request = axios.create({
  // baseURL: 'http://toutiao.itheima.net/'
  baseURL: 'https://toutiao.itheima.net/' // 线上环境地址
})

// 请求拦截器 - 在该拦截器中可以统一处理前端发送的接口参数
request.interceptors.request.use(config => {
  /*
    config: 本次请求的配置对象 （headers, data, params, url, method）
  */
  // 通过满足已登录的状态（store里的user）来判断来给满足条件的接口请求添加headers
  // 大部分的后端接口,它们只关注当前接口得要的参数,如果在传入的过程中,有额外的参数传递给了后端,后端并不会在意你传的东西
  const { user } = store.state

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  // 如果请求出错了，抛出异常
  return Promise.reject(error)
})

export default request

// const request2 = axios.create({
//   baseURL: 'http://127.0.0.1/'
// })

// api文件
// 登录接口 - 'http://toutiao.itheima.net/'
// request({
//   method: 'get',
//   url: '/login'
// })

// // 查询接口
// request2({
//   method: 'get',
//   url: '/search'
// })
