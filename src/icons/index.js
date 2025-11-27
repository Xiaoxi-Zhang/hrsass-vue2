import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

// webpack提供的语法（了解）
// require.context()  读取某个文件夹下的文件
// 1. 要读取的文件夹的路径
// 2. 是否读取该文件夹下的子文件夹
// 3. 读取哪些类型的文件
const req = require.context('./svg', false, /\.svg$/)
// 批量导入的 .svg图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
