// 用户相关的请求模块

import request from '../utils/request.js'

// 手动引入store/index.js
// import store from '../store/index.js'
/* 用户登录接口 */
/*
  用户登录接口
  @params mobile 手机号
  @params code 验证码
*/
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: data
})

/*
  发送手机验证
  @url mobile 手机号
*/
export const getSmsCode = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

/*
  获取指定用户信息
  @url target 目标用户id
*/
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // headers: {
  //   // 注意: 一般项目中,除登录以外,大部分接口都需要TOKEN授权才可以访问
  //   // Bearer后面是有一个空格的
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/*
    获取用户频道列表
*/

export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})
