<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            <!-- 表格 -->
            <el-table v-loading="isLoading" :data="list">
              <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
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
            <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleListAPI, delRoleAPI } from '@/api/setting'

export default {
  name: 'Setting',
  data() {
    return {
      page: 1,
      pagesize: 2,
      list: [],
      total: 0,
      isLoading: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
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
