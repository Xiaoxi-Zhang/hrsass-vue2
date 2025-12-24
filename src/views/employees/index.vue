<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <template #left>
          共有100条数据
        </template>
        <template #right>
          <el-button type="primary">excel导入</el-button>
          <el-button type="primary">excel导出</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employees'
}
</script>

<style>

</style>
