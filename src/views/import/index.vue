<template>
  <UploadExcel :on-success="handleSuccess" />
</template>

<script>
import { batchAddEmployeeAPI } from '@/api/employees'

export default {
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  computed: {
    type() {
      return this.$route.query.type
    }
  },

  methods: {
    async handleSuccess({ results }) {
      if (this.type === 'employee') {
        this.batchAddEmployee(results)
      }
    },
    // 批量上传员工
    async batchAddEmployee(results) {
      // header中, results中的数据是中文的, 但是提交给后台的要是英文的
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const list = []
      results.forEach(item => {
        const newObj = {}
        for (const key in item) {
          const englishKey = userRelations[key]
          let value = ''
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            value = this.formatExcelDate(item[key])
          } else {
            value = item[key]
          }
          newObj[englishKey] = value
        }
        list.push(newObj)
      })
      await batchAddEmployeeAPI(list)
      this.$message.success('批量上传成功!')
      this.$router.go(-1)
    },
    // 把excel中时间戳转换成正常日期
    // excel时间戳 是从1900年往后推天数
    formatExcelDate(numb, format) {
      const time = new Date((numb) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
