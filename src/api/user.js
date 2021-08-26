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

// QQ登录
export const userQQLogin = (unionId, source = 1) => {
  return request('/login/social', 'post', { unionId, source })
}

// QQ绑定验证码
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

// QQ绑定信息提交
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

// 校验用户名是否重复
export const userLoginCheck = (account) => {
  return request('/register/check', 'get', { account })
}

// 用户完善信息发送验证码
export const userRegisterCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

// 完善信息提交
export const userQQPatchLogin = ({ unionId, account, password, mobile, code }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { account, password, mobile, code })
}
