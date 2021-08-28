// 购物车模块

import { getNewCartGoods } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  getters: {
    // 获取有效列表
    validList (state) {
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 计算购物车总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 计算购物车商品总价数
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count * c.nowPrice, 0)
    }
  },
  mutations: {
    // 添加购物车
    addCart (state, payload) {
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(payload)
    },
    // 更新购物车数据
    updateCart (state, goods) {
      const updateGood = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGood[key] = goods[key]
        }
      }
    },
    // 删除购物车项
    deleteCart (state, goods) {
      const index = state.list.findIndex(item => item.skuId === goods.skuId)
      state.list.splice(index.Promise, 1)
    }
  },
  actions: {
    addCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {

        } else {
          ctx.commit('addCart', payload)
          resolve()
        }
      })
    },
    findNewGoods (ctx) {
      return new Promise((resolve, reject) => {
        const promiseArr = ctx.state.list.map(item => {
          return getNewCartGoods(item.skuId)
        })
        Promise.all(promiseArr).then(results => {
          results.forEach((goods, i) => {
            ctx.commit('updateCart', { ...goods.result, skuId: ctx.state.list[i].skuId })
          })
          resolve()
        })
      })
    },
    deleteCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {

        } else {
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    }
  }
}
