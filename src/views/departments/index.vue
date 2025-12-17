<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <span>{{ company.name }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <!-- 两个内容 -->
              <el-col :span="12">负责人</el-col>
              <el-col :span="12">
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="addGradeOneDept">添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="departs" :default-expand-all="true">
          <template #default="{ data }">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
              <el-col :span="20">
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex">
                  <!-- 两个内容 -->
                  <el-col :span="12">{{ data.manager }}</el-col>
                  <el-col :span="12">
                    <!-- 下拉菜单 element -->
                    <el-dropdown @command="handleCommand">
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ type: 'add', data: data }">添加子部门</el-dropdown-item>
                        <el-dropdown-item :command="{ type: 'edit', id: data.id }">修改部门</el-dropdown-item>
                        <!-- @click.native 绑定事件 -->
                        <!-- <el-dropdown-item @click.native="del">删除部门</el-dropdown-item> -->
                        <el-dropdown-item :command="{ type: 'del', id: data.id }">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
      <!-- @closeDialogFn="closeDialog" -->
      <addDept
        ref="addDept"
        :show-dialog.sync="showDialog"
        :node-data="nodeData"
        :departs-list="departsList"
        @addSuccess="getDepartmentList"
      />
    </div>
  </div>
</template>

<script>
import { getDepartmentListAPI, delDepartmentAPI } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'

export default {
  name: 'Departments',
  components: { addDept },
  data() {
    return {
      company: {
        name: ''
      },
      departs: [],
      // 放组织架构中处理之前所有的数据
      departsList: [],
      showDialog: false,
      // 表示当前点击这一行的数据
      nodeData: {}
      // defaultProps: {
      //   children: 'child',
      //   label: 'name'
      // }
    }
  },

  created() {
    this.getDepartmentList()
  },

  methods: {
    // 添加一级部门
    addGradeOneDept() {
      this.showDialog = true
      this.nodeData = this.company
      this.$refs.addDept.getDepartmentManagerList()
    },
    handleCommand({ type, id, data }) {
      // console.log(command)
      if (type === 'add') {
        // console.log('点击了添加')
        this.openDialog(data)
      }
      if (type === 'edit') {
        // console.log('点击了编辑')
        this.editDepartment(id)
      }
      if (type === 'del') {
        this.delDepartment(id)
      }
    },
    // 修改部门
    editDepartment(id) {
      this.showDialog = true
      this.$refs.addDept.getDepartmentDetail(id)
    },
    // 添加部门
    openDialog(data) {
      this.showDialog = true
      // console.log(data)
      this.nodeData = data
      // 调用子组件中的方法
      console.log(this.$refs.addDept)
      this.$refs.addDept.getDepartmentManagerList()
    },
    // 关闭弹框
    closeDialog() {
      this.showDialog = false
    },
    // 删除部门
    delDepartment(id) {
      console.log(id)
      this.$confirm('确定要删除此数据吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 点击了确定
        const res = await delDepartmentAPI(id)
        console.log(res)
        this.$message.success('删除成功')
        this.getDepartmentList()
      }).catch(() => {
        // 点击了取消
      })
    },
    // 获取组织架构列表
    async getDepartmentList() {
      const res = await getDepartmentListAPI()
      this.departsList = res.data.depts
      this.departs = transListToTreeData(res.data.depts, '')
      console.log(this.departs)
      this.company.name = res.data.companyName
      this.company.children = this.departs
      this.company.id = ''
      // console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
.tree-card {
  padding: 30px 30px;
  font-size: 14px;
}

.el-tree {
  ::v-deep {

    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }

    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
