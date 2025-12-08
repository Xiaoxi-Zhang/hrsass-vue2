import Vue from 'vue'

// 类似于reset.css  重置样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// element-ui的语言包 目的：做多语言切换
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// 导入根组件
import App from './App'
// 导入vuex
import store from './store'
// 导入路由对象
import router from './router'

// 要执行 icons目录下的index.js
import '@/icons' // icon
import '@/permission' // permission control
import request from '@/utils/request'

// 目标：this.$request 在Vue的原型对象上（原型对象上的属性和方法可以被实例所访问）
Vue.prototype.$request = request

// 注册element-ui中的全局组件
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.directive('imgError', {
  // 使用该指令的DOM元素，插入到页面中会执行inserted
  // el: 使用该指令的DOM元素
  // binding: 是使用指令时传过来的数据(binding.value)
  inserted(el, binding) {
    // console.log(el)
    // console.log(binding)
    el.onerror = () => {
      el.src = binding.value
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
