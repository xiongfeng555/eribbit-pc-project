// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      redirectURL: '/'
    }
  },
  mutations: {
    // 修改用户信息,payload是用户信息
    setUser (state, payload) {
      state.profile = payload
    },
    setRedirectURL (state, url) {
      state.redirectURL = url
    }
  }
}
