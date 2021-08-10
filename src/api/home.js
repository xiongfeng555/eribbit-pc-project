import request from '@/utils/request'

export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

// 获取轮播图数据
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 获取信息好物
export const findNew = () => {
  return request('/home/new', 'get')
}

// 获取人气推荐
export const findHot = () => {
  return request('/home/hot', 'get')
}

// 获取首页产品展示
export const findProduct = () => {
  return request('/home/goods', 'get')
}
