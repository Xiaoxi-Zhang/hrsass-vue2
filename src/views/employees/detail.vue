<template>
  <div class="employees-detail-container">
    <div class="app-container">
      <el-card>
        <!-- 放置表单 -->
        <el-form
          ref="userForm"
          label-width="120px"
          style="margin-left: 120px; margin-top: 30px"
          :model="userInfo"
          :rules="rules"
        >
          <el-form-item label="姓名:" prop="username">
            <el-input v-model="userInfo.username" style="width: 300px" />
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userInfo.mobile" style="width: 300px" disabled />
          </el-form-item>
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="userInfo.timeOfEntry"
              type="date"
              class="inputW"
            />
          </el-form-item>
          <el-form-item label="员工头像" />
          <el-form-item>
            <el-button type="primary" @click="editEmployee">更新</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserAvatarAPI } from '@/api/user'
import { editEmployeeAPI } from '@/api/employees'

export default {
  name: 'EmployeesDetail',
  data() {
    return {
      userInfo: {},
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getUserAvatar()
  },
  methods: {
    // 更新员工信息
    editEmployee() {
      this.$refs.userForm.validate(async flag => {
        if (!flag) return
        await editEmployeeAPI(this.userInfo)
        this.$message.success('更新员工信息成功')
      })
    },
    async getUserAvatar() {
      const res = await getUserAvatarAPI(this.id)
      // console.log(res)
      this.userInfo = res.data
    }
  }
}
</script>
