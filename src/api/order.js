import request from '@/utils/request'

export const createOrder = () => {
  return request('/member/order/pre', 'get')
}
