// 用户相关的请求模块
import request from '../utils/request.js'
// 手动引入store/index.js
// import store from '../store/index.js'

/**
  * 用户登录接口
  *
  * @params mobile 手机号
  * @params code 验证码
  */
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: data
})

/**
  * 发送手机验证
  *
  * @url mobile 手机号
  */
export const getSmsCode = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

/**
  * 获取指定用户信息
  *
  */
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
  // headers: {
  //   // 注意：一般项目中，除登录以外，大部分接口都需要TOKEN授权才可以访问
  //   // Bearer后面是有一个空格的
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/**
  * 获取用户频道列表
  *
  */
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

/**
  * 关注用户
  *
  * @params target 用户id
  */
export const addFollow = target => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: target
  }
})

/**
  * 取消关注用户
  *
  * @params target 用户id
  */
export const deleteFollow = target => request({
  url: `/v1_0/user/followings/${target}`,
  method: 'DELETE'
})

/**
  * 获取用户个人信息
  *
  */
export const getUserProfile = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

/**
  * 编辑用户个人信息
  *
  * @params name 昵称
  * @params photo 头像 base64编码处理过后的
  * @params gender 性别 0-男 1-女
  * @params birthday 生日 格式'2018-12-30'
  */
export const updateUserProfile = data => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data
})

/**
  * 更新用户头像资料
  *
  * @params photo 头像图片 file数据类型 - 一切文件传送都需要用FormData实例对象进行包装
  */
export const updateUserPhoto = data => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data
})
