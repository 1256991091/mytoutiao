// ? 与文章相关的接口
import request from '../utils/request.js'

// 手动引入store/index.js
// import store from '../store/index.js'
/* 用户登录接口 */
/*
  用户登录接口
  @params channel_id 频道ID
  @params timestamp 当前时间戳
  @params with_top 是否包含
*/
export const getArticles = params => request({
  url: '/v1_0/articles',
  method: 'GET',
  params
})
