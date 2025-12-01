import { loginApi } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = {
  token: getToken() || ''
}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
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
