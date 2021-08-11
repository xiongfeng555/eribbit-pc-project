// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

// 获取顶级分类
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

//
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
