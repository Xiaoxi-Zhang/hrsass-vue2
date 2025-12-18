<template>
  <!-- 放置弹层组件 -->
  <!-- @open="getDepartmentManagerList" dialog打开的时候触发回调 -->
  <el-dialog
    :title="title"
    :visible="showDialog"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <!-- 匿名插槽 -->
    <!-- el-form :model :rules-->
    <!-- el-form-item prop -->
    <!-- el-input v-model -->
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <template #footer>
      <div>
        <el-button type="primary" size="small" @click="confirmAdd">确定</el-button>
        <el-button size="small" @click="closeDialog">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentManagerListAPI, addDepartmentAPI, getDepartmentDetailAPI, editDepartmentAPI } from '@/api/departments'

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
      originForm: {},
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称长度在1-50个字符之间',
            trigger: 'blur'
          },
          { validator: this.validateDeptName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不可为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码长度在1-50个字符之间',
            trigger: 'blur'
          },
          { validator: this.vaildateDeptCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不可为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不可为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍长度在1-300个字符之间',
            trigger: 'blur'
          }
        ]
      },
      managerList: []
      // title: ''
    }
  },
  computed: {
    title() {
      if (this.form.id) {
        return '修改部门'
      } else {
        return '新增部门'
      }
    }
  },
  created() {
    // 在created中调用，弹框还没打开就调用了这个接口（visible的原因 display:none|block）
    // this.getDepartmentManagerList()
  },
  methods: {
    // 获取部门详情
    async getDepartmentDetail(id) {
      const res = await getDepartmentDetailAPI(id)
      // console.log(res)
      this.form = res.data
      this.originForm = { ...res.data }
    },
    // 确认新增
    confirmAdd() {
      this.$refs.form.validate(async flag => {
        if (!flag) return
        if (this.form.id) {
          // 修改状态
          await editDepartmentAPI(this.form)
          this.$message.success('修改部门成功')
        } else {
          // 新增状态
          this.form.pid = this.nodeData.id
          await addDepartmentAPI(this.form)
          this.$message.success('新增部门成功')
        }
        this.closeDialog()
        this.$emit('addSuccess')
      })
    },
    // 获取部门负责人
    async getDepartmentManagerList() {
      const res = await getDepartmentManagerListAPI()
      // console.log(res)
      this.managerList = res.data
    },
    // 部门编码校验
    vaildateDeptCode(rule, value, callback) {
      if (this.form.id && value === this.originForm.code) {
        // 修改状态
        // 你输入的值value
        // 原来的值
        callback()
        return
      }
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
      if (this.form.id) {
        // 修改
        // 当前你输入的内容和你的兄弟部门 名字不能重复
        // 当前输入的内容 value
        // 判断原来的值和当前输入的值是否一样，如果一样也得放行
        if (value === this.originForm.name) {
          callback()
          return
        } else {
          const arr = this.departsList.filter(item => item.pid === this.form.pid)
          // console.log(arr)
          const flag = arr.some(item => item.name === value)
          flag ? callback('部门名称不可重复') : callback()
        }
      } else {
        // // 确保 nodeData 和 children 存在,只有当 children 存在且为数组时才进行校验
        const children = this.nodeData.children || []
        // 只要有一个部门中的name和value一样 就校验不通过
        const flag = children.some(item => item.name === value)
        flag ? callback('部门名称不可重复') : callback()
      }
    },
    // 关闭弹框
    closeDialog() {
      // console.log('点击了关闭')
      // this.$emit('closeDialogFn')
      this.$emit('update:showDialog', false)
      // resetFields 只能清空绑定了prop的表单中的数据和校验
      this.form = {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      }
      this.$refs.form.resetFields()
    }
  }
}
</script>
