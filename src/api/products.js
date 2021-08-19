import request from '@/utils/request.js'

export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

// 请求推荐商品或猜你喜欢
export const findRelevantGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}

// 获取热销榜数据
export const findGoodsHot = (id, limit = 4, type = 1) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
