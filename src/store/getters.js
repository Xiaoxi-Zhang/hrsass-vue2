const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  routes: state => state.routes.routes,
  roles: state => state.user.userInfo.roles,
  userInfo: state => state.user.userInfo
}
export default getters
