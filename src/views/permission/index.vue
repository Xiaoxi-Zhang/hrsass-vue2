<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button v-if="row.type===1" size="small" type="text">添加权限点</el-button>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionListAPI } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'

export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
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
