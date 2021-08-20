import request from '@/utils/request.js'

export const findCommentInfo = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
// https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate

// 获取用户评价的数据
export const findCommentInfoDetail = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
