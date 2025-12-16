<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog" :close-on-click-modal="false" @close="closeDialog">
    <!-- 匿名插槽 -->
    <!-- el-form :model :rules-->
    <!-- el-form-item prop -->
    <!-- el-input v-model -->
    <el-form label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <template #footer>
      <div>
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small" @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  // 需要传入一个props变量来控制 显示或者隐藏
  props: {
    departsList: {
      type: Array,
      default: () => []
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      // required: true
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度在1-50个字符之间', trigger: 'blur' },
          { validator: this.validateDeptName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不可为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度在1-50个字符之间', trigger: 'blur' },
          { validator: this.vaildateDeptCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不可为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不可为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度在1-300个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    vaildateDeptCode(rule, value, callback) {
      const flag = this.departsList.some(item => item.code === value)
      flag ? callback('部门编码不可重复') : callback()
    },
    // rule 用不到
    // value 文本中输入的内容
    // callback 不管成功失败都要执行 callback() callback(错误提示信息)
    validateDeptName(rule, value, callback) {
      // value  可以拿到输入框中输入的内容
      // console.log(value)
      // 拿到点击这一行 对应的子级
      const children = this.nodeData.children
      // 只要有一个部门中的name和value一样 就校验不通过
      const flag = children.some(item => item.name === value)
      flag ? callback('部门名称不可重复') : callback()
    },
    closeDialog() {
      // console.log('点击了关闭')
      this.$emit('closeDialogFn')
    }
  }
}
</script>
