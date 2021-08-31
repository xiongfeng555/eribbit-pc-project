
import request from '@/utils/request'

export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

// 获取购物车sku数据

export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 *
 * @param {Array<Object>} carList - 购物车信息列表
 */
export const mergeCart = (carList) => {
  return request('/member/cart/merge', 'post', carList)
}

// 获取购物车列表
export const findCart = () => {
  return request('/member/cart', 'get')
}

// 加入购物车
export const addCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

// 删除购物车
/**
 * @param {Array<String>} ids -skuid数组
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

// 修改购物车状态
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}
