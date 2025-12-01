import { loginApi } from '@/api/user'

const state = {
  token: ''
}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
  }
}

const actions = {
  async login(store, data) {
    const res = await loginApi(data)
    // console.log(res.data.data)
    store.commit('setToken', res.data.data)
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
