import { constantRoutes } from '@/router/index'

const state = {
  routes: []
}

const mutations = {
  // 筛选之后的动态路由
  setRoutes(state, otherRoutes) {
    state.routes = [
      ...constantRoutes,
      ...otherRoutes
    ]
  }
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
