import { loginApi, getUserProfileAPI } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
// import router from '@/router'

const state = {
  token: getToken() || '',
  userInfo: {}
}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}

const actions = {
  async login(store, data) {
    const res = await loginApi(data)
    // console.log(res.data.data)
    // vuex中存数据 取数据 （在vuex中 不适合写业务逻辑相关的代码）
    // if (res.data.success) {
    //   router.push('/')
    // } else {
    //   alert('用户名密码错误')
    // }
    store.commit('setToken', res.data)
    return res
  },
  async getUserInfo(store) {
    const res = await getUserProfileAPI()
    // console.log(res)
    store.commit('setUserInfo', res.data)
    console.log('state中的userInfo为：', state.userInfo)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
