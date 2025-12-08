// import Vue from 'vue'

// 第一种写法
// Vue.directive('imgError', {
//   // 使用该指令的DOM元素，插入到页面中会执行inserted
//   // el: 使用该指令的DOM元素
//   // binding: 是使用指令时传过来的数据(binding.value)
//   inserted(el, binding) {
//     // console.log(el)
//     // console.log(binding)
//     el.onerror = () => {
//       el.src = binding.value
//     }
//   }
// })

// 第二种写法
export const imgError = {
  inserted(el, binding) {
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
