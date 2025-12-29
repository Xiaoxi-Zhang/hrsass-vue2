<template>
  <el-dialog title="新增员工" :visible="showDialog" top="8vh" @close="closeDialog" @click.native="hideTreeDialog">
    <!-- 表单 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @click.native.stop="getDepartmentList"
        />
        <el-tree
          v-show="showTree"
          v-loading="isLoading"
          :data="list"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartmentListAPI } from '@/api/departments'
import { transListToTreeData } from '@/utils'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户名长度在1-4个字符之间', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'change' }
        ]
      },
      list: [],
      defaultProps: {
        label: 'name'
      },
      showTree: false, // 控制el-tree组件的显示与隐藏
      isLoading: false
    }
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
      if (data.children.length > 0) {
        return
      }
      this.formData.departmentName = data.name
      this.showTree = false
    },
    hideTreeDialog() {
      // console.log('dialog点击了')
      this.showTree = false
    },
    // 获取部门列表
    async getDepartmentList() {
      this.showTree = !this.showTree
      if (!this.showTree) {
        return
      }
      this.isLoading = true
      const res = await getDepartmentListAPI()
      // console.log(res)
      this.list = transListToTreeData(res.data.depts, '')
      // console.log(this.list)
      this.isLoading = false
    },
    // 关闭弹框
    closeDialog() {
      //  注意：update和showDialog之间不能有空格，否则无法修改父组件的数据
      this.$emit('update:showDialog', false)
      console.log('点击了关闭弹窗')
    }
  }
}
</script>

<style></style>
