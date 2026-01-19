<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button icon="el-icon-plus" size="small" type="primary" @click="openDialog">新增角色</el-button>
            <!-- 表格 -->
            <el-table v-loading="isLoading" :data="list">
              <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button size="small" type="success" @click="assignPermission(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- layout 分页的样式(功能)-->
            <!-- current当前的页码 -->
            <!-- page-sizes设置当前的页容量 第一个一般是和page-size页容量保持一致 -->
            <!-- page-size当前的页容量 -->
            <!-- total一共有多少条数据 -->
            <el-pagination
              :current-page="page"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- 警告信息 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="title" :visible="showDialog" :close-on-click-modal="false" @close="closeDialog">
        <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmAddRole">确认</el-button>
        </template>
      </el-dialog>
      <!-- 分配权限的弹层 -->
      <el-dialog
        title="分配权限"
        :visible="showAssignDialog"
        :close-on-click-modal="false"
        @close="closeAssignDialog"
        @open="getPermissionList"
      >
        <!-- show-checkbox 展示树状复选框
          :check-strictly 让父子不关联 -->
        <el-tree
          ref="tree"
          v-loading="treeLoading"
          show-checkbox
          :data="permissionList"
          :props="{ label: 'name' }"
          :check-strictly="true"
          default-expand-all
          node-key="id"
        />
        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeAssignDialog">取消</el-button>
            <el-button type="primary" @click="confirmAssign">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleListAPI, delRoleAPI, addRoleAPI, getRoleDetailAPI, editRoleAPI, assignPermissionAPI } from '@/api/setting'
import { getCompanyAPI } from '@/api/company'
import { getPermissionListAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'

export default {
  name: 'Setting',
  data() {
    return {
      page: 1,
      pagesize: 2,
      list: [],
      total: 0,
      isLoading: false,
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      companyInfo: {},
      // 控制分配权限的弹层的隐藏和展示
      showAssignDialog: false,
      // 点击时的角色id
      roleId: '',
      permissionList: [],
      // 树状结构的加载状态
      treeLoading: false
    }
  },
  computed: {
    title() {
      if (this.form.id) {
        return '修改角色'
      } else {
        return '新增角色'
      }
    }
  },
  created() {
    this.getRoleList()
    this.getCompany()
  },
  methods: {
    async confirmAssign() {
      const permIds = this.$refs.tree.getCheckedKeys()
      await assignPermissionAPI({ id: this.roleId, permIds: permIds })
      this.$message.success('分配权限成功')
      this.closeAssignDialog()
    },
    // 获取权限列表
    async getPermissionList() {
      this.treeLoading = true
      const { data } = await getPermissionListAPI()
      this.permissionList = transListToTreeData(data, '0')
      const { data: { permIds }} = await getRoleDetailAPI(this.roleId)
      // console.log(permIds)
      this.$refs.tree.setCheckedKeys(permIds)
      this.treeLoading = false
    },
    // 分配权限
    assignPermission(id) {
      this.showAssignDialog = true
      this.roleId = id
    },
    // 控制分配权限的弹层的隐藏
    closeAssignDialog() {
      this.showAssignDialog = false
    },
    async getCompany() {
      const companyId = this.$store.state.user.userInfo.companyId
      const res = await getCompanyAPI(companyId)
      // console.log(res)
      this.companyInfo = res.data
    },
    // 编辑角色
    async editRole(id) {
      this.openDialog()
      const res = await getRoleDetailAPI(id)
      // console.log(res)
      this.form = res.data
    },
    // 新增角色
    confirmAddRole() {
      this.$refs.roleForm.validate(async flag => {
        if (!flag) return
        if (this.form.id) {
          // 编辑状态
          await editRoleAPI(this.form)
          this.$message.success('修改角色成功')
        } else {
          // 新增状态
          await addRoleAPI(this.form)
          this.$message.success('新增角色成功!')
        }
        this.closeDialog()
        this.getRoleList()
      })
    },
    openDialog() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    delRole(id) {
      // console.log(id)
      this.$confirm('确定要删除此数据吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRoleAPI(id)
        this.$message.success('删除成功')
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.getRoleList()
      }).catch(() => {
        // 点击了取消
        this.$message.info('取消删除')
      })
    },
    indexMethod(row) {
      return row + 1 + this.pagesize * (this.page - 1)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 一旦切换页容量，就把当前页重置为1
      this.page = 1
      this.getRoleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getRoleList()
    },
    async getRoleList() {
      this.isLoading = true
      const res = await getRoleListAPI(this.page, this.pagesize)
      // console.log(res)
      this.list = res.data.rows
      this.total = res.data.total
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
