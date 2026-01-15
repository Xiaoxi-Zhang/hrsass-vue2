<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showRoleDialog"
    :close-on-click-modal="false"
    @close="closeRoleDialog"
    @open="openDialog"
  >
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small" @click="closeRoleDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleListAPI } from '@/api/setting'
import { getUserAvatarAPI } from '@/api/user'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: []
    }
  },
  methods: {
    openDialog() {
      this.getRoleList()
      this.getUserRole()
    },
    // 获取用户原本的角色信息
    async getUserRole() {
      const { data: { roleIds }} = await getUserAvatarAPI(this.userId)
      // 当roleIds为null的时候，默认让他是一个空数组[]
      this.roleIds = roleIds || []
    },
    // 获取所有的角色列表
    async getRoleList() {
      const { data: { rows }} = await getRoleListAPI(1, 99999)
      this.roleList = rows
    },
    // 关闭弹框
    closeRoleDialog() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
