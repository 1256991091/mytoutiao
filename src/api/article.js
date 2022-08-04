// 与文章相关接口
import request from '../utils/request.js'

/**
  * 频道新闻推荐
  *
  * @params channel_id 频道ID
  * @params timestamp 当前时间戳
  */
export const getArticles = params => request({
  url: '/v1_0/articles',
  method: 'GET',
  params
})

/**
  * 获取文章详情
  *
  * @params article_id 文章id
  */
export const getArticleById = articleId => request({
  url: `/v1_0/articles/${articleId}`,
  method: 'GET'
})

/**
  * 收藏文章
  *
  * @params target 文章id
  */
export const addCollect = target => request({
  url: '/v1_0/article/collections',
  method: 'POST',
  data: {
    target: target
  }
})

/**
  * 取消收藏文章
  *
  * @params target 文章id
  */
export const deleteCollect = target => request({
  url: `/v1_0/article/collections/${target}`,
  method: 'DELETE'
})

/**
  * 文章点赞
  *
  * @params target 文章id
  */
export const addLike = target => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: target
  }
})

/**
  * 取消文章点赞
  *
  * @params target 文章id
  */
export const deleteLike = target => request({
  url: `/v1_0/article/likings/${target}`,
  method: 'DELETE'
})
