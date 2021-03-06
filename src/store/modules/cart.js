// 购物车模块

import { getNewCartGoods, mergeCart, findCart, addCart, deleteCart, updateCart, checkAllCart } from '@/api/cart'

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
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选中商品列表
    isSelectedList (state, getters) {
      return getters.validList.filter(goods => goods.selected)
    },
    // 已选中商品的数量
    selectedTotal (state, getters) {
      return getters.isSelectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.isSelectedList.reduce((p, c) => p + c.nowPrice * c.count * 100, 0) / 100
    },
    // 是否全选
    isSelectedAll (state, getters) {
      return getters.validList.length !== 0 && getters.isSelectedList.length === getters.validList.length
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
      state.list.splice(index, 1)
    },
    // 修改商品的数量
    changeCount (state, { skuId, newValue }) {
      const goods = state.list.find(item => item.skuId === skuId)
      goods.count = newValue
    },
    // 设置购物车
    setCart (state, payload) {
      state.list = payload
    }
  },
  actions: {
    // 合并购物车
    async mergeCart (ctx) {
      const carList = ctx.state.list.map((goods) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      // 发起合并请求
      await mergeCart(carList)
      // 清空购物车
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldGoods.skuId]).then(() => {
            return addCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          console.log(oldGoods)
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          ctx.commit('deleteCart', oldGoods)
          ctx.commit('addCart', newGoods)
        }
      })
    },
    // 修改商品数量
    changeCount (ctx, { skuId, newValue }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart({ skuId, count: newValue }).then(() => {
            ctx.commit('changeCount', { skuId, newValue })
            resolve()
          })
        } else {
          ctx.commit('changeCount', { skuId, newValue })
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters[isClear ? 'invalidList' : 'isSelectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          ctx.getters[isClear ? 'invalidList' : 'isSelectedList'].forEach(item => {
            ctx.commit('deleteCart', item)
            resolve()
          })
        }
      })
    },
    // 加入购物车
    addCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          addCart({ skuId: payload.skuId, count: payload.count }).then(() => {
            ctx.commit('addCart', payload)
            resolve()
          })
        } else {
          ctx.commit('addCart', payload)
          resolve()
        }
      })
    },
    // 获取新的购物车数据
    findNewGoods (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          findCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          const promiseArr = ctx.state.list.map(item => {
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr).then(results => {
            results.forEach((goods, i) => {
              ctx.commit('updateCart', { ...goods.result, skuId: ctx.state.list[i].skuId })
            })
            resolve()
          })
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          deleteCart([payload.skuId]).then(() => {
            ctx.commit('deleteCart', payload)
          })
        } else {
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 更改购物车状态
    updateCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart(payload).then(() => {
            ctx.commit('updateCart', payload)
          })
        } else {
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 全选
    clearAllSelected (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({ selected, ids }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
            resolve()
          })
        }
      })
    }
  }
}
