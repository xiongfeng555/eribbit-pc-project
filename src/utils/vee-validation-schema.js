export default {
  // 用户名校验规则
  account (value) {
    if (!value) return '请输入账号'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  // 密码校验规则
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码格式为6-24个字符'
    return true
  },
  // 手机号校验
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9][1-9]{9}$/.test(value)) return '请输入正确格式的手机号'
    return true
  },
  code (value) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '请输入正确的验证码'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选用户协议'
    return true
  }
}
