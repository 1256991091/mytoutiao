import { login, getSmsCode, getUserInfo, getUserChannels, addFollow, deleteFollow, getUserProfile, updateUserProfile, updateUserPhoto } from './user.js'
import { getArticles, getArticleById, addCollect, deleteCollect, addLike, deleteLike } from './article.js'
import { getAllChannels, addUserChannel, deleteUserChannel } from './channel.js'
import { getSearchSuggestions, getSearchResult } from './search.js'
import { getComments, addCommentLike, deleteCommentLike, addComment } from './comment.js'

export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserChannelsAPI = getUserChannels
export const getArticlesAPI = getArticles
export const getAllChannelsAPI = getAllChannels
export const addUserChannelAPI = addUserChannel
export const deleteUserChannelAPI = deleteUserChannel
export const getSearchSuggestionsAPI = getSearchSuggestions
export const getSearchResultAPI = getSearchResult
export const getArticleByIdAPI = getArticleById
export const addFollowAPI = addFollow
export const deleteFollowAPI = deleteFollow
export const addCollectAPI = addCollect
export const deleteCollectAPI = deleteCollect
export const addLikeAPI = addLike
export const deleteLikeAPI = deleteLike
export const getCommentsAPI = getComments
export const addCommentLikeAPI = addCommentLike
export const deleteCommentLikeAPI = deleteCommentLike
export const addCommentAPI = addComment
export const getUserProfileAPI = getUserProfile
export const updateUserProfileAPI = updateUserProfile
export const updateUserPhotoAPI = updateUserPhoto
