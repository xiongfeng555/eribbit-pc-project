// 创建一个新的axios实例
// 请求拦截器，携带token
// 响应拦截器，1.剥离无效数据 2. 处理token
// 返回创建的实例

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基本地址
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 创建请求拦截器
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

// 创建响应拦截器
instance.interceptors.response.use(res => res.data, err => {
  if (err.response && err.response.status === 401) {
    // 清空无效用户数据
    store.commit('user/setUser', {})
    // 携带路由跳转至用户登录页
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 导出工具函数

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
