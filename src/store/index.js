import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  plugins: [createPersistedState({
    // 本地存储的名字
    key: 'erabbit-pc-project',
    // 缓存模块
    paths: ['user', 'cart']

  })]
})
