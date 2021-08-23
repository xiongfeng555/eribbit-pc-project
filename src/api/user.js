import request from '@/utils/request.js'

export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

// 发送验证码
export const userMobileLoginByCode = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

// 手机号登录
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}
