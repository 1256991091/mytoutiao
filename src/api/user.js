// 用户相关的请求模块

import request from '../utils/request.js'

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
