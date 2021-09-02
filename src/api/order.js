import request from '@/utils/request'

// 创建订单
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址信息
 * @param {Object} address - 地址对象
 */
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

/**
 * 编辑收货地址信息
 * @param {Object} address - 地址对象
 */
export const editAddress = (address) => {
  return request(`/member/address/${address.id}`, 'put', address)
}
/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 */
export const submitOrder = (order) => {
  return request('/member/order', 'post', order)
}
