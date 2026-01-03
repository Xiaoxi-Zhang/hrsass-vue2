<template>
  <UploadExcel :on-success="handleSuccess" />
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },

  methods: {
    handleSuccess({ results, header }) {
      // this.tableData = results
      // this.tableHeader = header
      console.log(results)
      console.log(header)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
