<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination layout="prev, pager, next" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeListAPI } from '@/api/employees'

export default {
  name: 'Employees',
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      list: []
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { data: { rows, total }} = await getEmployeeListAPI(this.page, this.size)
      this.total = total
      this.list = rows
    }
  }
}
</script>

<style>

</style>
