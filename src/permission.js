// 全局前置守卫做判断
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 从store中获取token
  const token = store.getters.token
  if (token) {
    // token存在
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 如果有用户信息，就不请求最新用户信息
      const username = store.state.user.userInfo
      if (Object.keys(username).length === 0) {
        const res = await store.dispatch('user/getUserInfo')
        // 获取用户信息 拿到用户的权限 将来做权限的判断使用
        console.log(res)
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// beforeEach中重定向后，不会再走afterEach
router.afterEach((to, from) => {
  NProgress.done()
})

