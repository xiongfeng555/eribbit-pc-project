
import request from '@/utils/request'

export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

// 获取购物车sku数据

export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
