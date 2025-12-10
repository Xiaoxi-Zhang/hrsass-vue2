<template>
  <div class="departments-container">
    <div class="app-container">
      <!-- <el-row>
        <el-col :span="12" style="background: red;">第一列</el-col>
        <el-col :span="12" style="background: blue;">第二列</el-col>
      </el-row> -->
      <el-tree :data="list" :props="defaultProps" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments',
  data() {
    return {
      list: [
        {
          name: '财务部',
          child: [
            { name: '财务报销部' },
            { name: '社保缴纳部' }
          ]
        },
        { name: '技术部' },
        { name: '人事部' }
      ],
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  }
}
</script>

<style></style>
