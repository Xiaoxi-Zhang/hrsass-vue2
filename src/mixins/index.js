// mixins 的使用场景：当同一套逻辑散落在组件内部的各个配置项（data、computed、methods...）中时，就可以使用mixins来解决
// 1. 先声明一个mixins 文件
// 2. 在组件中先导入mixins文件，再混入mixins

// 使用mixins文件后
// 1.组件可以使用mixins文件中的任何数据、方法、生命周期钩子...
// 2.mixins中也可以访问组件中 任何数据、方法、生命周期钩子...

// mixins语法：
// 1.mixins文件中可以配置跟组件中一模一样的配置项

// 结论：
// 1.如果mixins中和组件中都声明了相同的周期钩子，不会产生覆盖，先执行mixins，再执行组件内的
// 2.如果mixins中和组件中有同名的属性、方法、计算属性...（ 对象类型的配置项包含data(){} ），会产生覆盖，以组件内的为准（除声明周期钩子外，其他都会产生覆盖）
export default {
  data() {
    return {}
  },
  computed: {},
  components: {},
  methods: {},
  created() {
    console.log('mixins中的created')
  },
  mounted() {}
}
