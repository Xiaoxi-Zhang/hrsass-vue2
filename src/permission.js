// 全局前置守卫做判断
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { asyncRoutes } from '@/router'

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
        const { roles: { menus }} = await store.dispatch('user/getUserInfo')
        // 获取用户信息 拿到用户的权限 将来做权限的判断使用
        // 1.筛选动态路由的位置，全局前置守卫
        // 2.用户所对应的权限标识
        console.log('权限判断使用：', menus)
        // 3.所有的动态路由
        console.log('所有的动态路由：', asyncRoutes)
        // 4.拿动态路由和权限标识进行筛选
        const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
        // console.log('otherRoutes是：', otherRoutes)

        // 5.拿到筛选后的动态路由添加到路由规则中
        // addRoutes在添加路由规则时，是一个异步的过程
        // 在执行next的时候，一定要确保路由规则添加完成
        router.addRoutes(otherRoutes)
        store.commit('routes/setRoutes', otherRoutes)
        // 下面这个方案就可以等待addRoutes异步执行完成之后再进行跳转
        // 可以理解成再重新进一次页面
        next({
          ...to,
          replace: true // 替换上一次的历史记录
        })
        return
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

