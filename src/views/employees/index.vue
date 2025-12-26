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
          <el-button type="primary" size="small" @click="openAddDialog">新增员工</el-button>
        </template>
      </page-tools>
      <el-card v-loading="isLoading" style="margin-top: 10px">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" width="100" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formateText" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间">
            <template #default="{row}">
              {{ formateTime(row.timeOfEntry) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :page-size="size"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <addEmployee :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployeeListAPI, delEmployeeAPI } from '@/api/employees'
import EnumObj from '@/constant/employees'
import dayjs from 'dayjs'
import addEmployee from './components/add-employee.vue'
import components from '@/components'

export default {
  name: 'Employees',
  components: {
    addEmployee
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      list: [],
      isLoading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    openAddDialog() {
      this.showDialog = true
    },
    // 删除员工
    del(id) {
      // console.log(id)
      this.$confirm('确定要删除此数据吗？', '温馨提示', {
        closeOnClickModal: false
      }).then(async() => {
        await delEmployeeAPI(id)
        this.$message.success('删除成功')
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.getEmployeeList()
      }).catch(() => {})
    },
    formateTime(time) {
      return time ? dayjs(time).format('YYYY-MM-DD') : ''
    },
    formateText(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      const formOfEmployment = +cellValue
      // if (formOfEmployment === 1) {
      //   return '正式'
      // } else if (formOfEmployment === 2) {
      //   return '非正式'
      // }
      const hireType = EnumObj.hireType
      // find 筛选出符合条件的第一个元素 或者 undefined
      const result = hireType.find(item => item.id === formOfEmployment)
      return result ? result.value : '未知'
    },
    indexMethod(index) {
      return index + 1 + this.size * (this.page - 1)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getEmployeeList()
    },
    async getEmployeeList() {
      this.isLoading = true
      const { data: { rows, total }} = await getEmployeeListAPI(this.page, this.size)
      this.total = total
      this.list = rows
      this.isLoading = false
    }
  }
}
</script>

<style></style>
