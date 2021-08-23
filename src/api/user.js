import request from '@/utils/request.js'

export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
