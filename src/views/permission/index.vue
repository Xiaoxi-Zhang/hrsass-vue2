<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="showDialogFn(1, '0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button v-if="row.type===1" size="small" type="text" @click="showDialogFn(2, row.id)">添加权限点</el-button>
              <el-button size="small" type="text" @click="editRole(row.id)">查看</el-button>
              <el-button size="small" type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 新增编辑的弹层 -->
      <el-dialog :visible="showDialog" :title="title" :close-on-click-modal="false" @close="closeDialog">
        <!-- 表单内容 -->
        <el-form ref="form" label-width="100px" :model="formData" :rules="rules">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="confirmAddPermission">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI, addPermissionAPI, delPermissionAPI, getPermissionDetailAPI, editPermissionAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'

export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      },
      rules: {
        name: [{ required: true, message: '权限名称不可为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不可为空', trigger: 'blur' }],
        description: [{ required: true, message: '权限描述不可为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      if (this.formData.id) {
        return '编辑权限'
      } else {
        return '添加权限'
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限
    async editRole(id) {
      this.showDialog = true
      const { data } = await getPermissionDetailAPI(id)
      this.formData = data
    },
    // 删除权限
    delPermission(id) {
      this.$confirm('确定要删除此数据吗？', '温馨提示').then(async() => {
        await delPermissionAPI(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      }).catch(() => {})
    },
    // 添加权限
    confirmAddPermission() {
      this.$refs.form.validate(async flag => {
        if (!flag) return
        if (this.formData.id) {
          // 编辑权限
          await this.editPermissionAPI(this.formData)
          this.$message.success('编辑权限成功')
        } else {
          // 添加权限
          await addPermissionAPI(this.formData)
          this.$message.success('添加权限成功')
        }
        this.getPermissionList()
        this.closeDialog()
      })
    },
    // 关闭弹层
    closeDialog() {
      this.showDialog = false
      // 清空表单数据
      this.formData = {
        enVisible: '0',
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      }
      // 清空表单校验
      this.$refs.form.resetFields()
    },
    // 打开弹层
    showDialogFn(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    // 获取权限列表
    async getPermissionList() {
      const { data } = await getPermissionListAPI()
      // console.log(res)
      this.list = transListToTreeData(data, '0')
      console.log(this.list)
    }
  }
}
</script>

<style>

</style>
