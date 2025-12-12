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
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="departs" :default-expand-all="true">
          <template #default="{data}">
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
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>修改部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/departments'

export default {
  name: 'Departments',
  data() {
    return {
      company: {
        name: ''
      },
      departs: []
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
    // 获取组织架构列表
    async getDepartmentList() {
      const res = await getDepartmentListAPI()
      this.departs = this.transListToTreeData(res.data.depts)
      console.log(this.departs)
      this.company.name = res.data.companyName
      // console.log(res)
    },
    transListToTreeData(list) {
      // console.log(list)
      // 先找一级
      const arr = list.filter(item => item.pid === '')
      console.log(arr)
      // 找到一级后找二级
      arr.forEach(item => {
        const children = list.filter(child => child.pid === item.id)
        item.children = children
      })
      return arr
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
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
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
