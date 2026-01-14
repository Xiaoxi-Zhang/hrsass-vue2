<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" :close-on-click-modal="false" @close="closeRoleDialog">
    <!-- 这里准备复选框 -->
    ...

    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small" @click="closeRoleDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
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
  methods: {
    // 关闭弹框
    closeRoleDialog() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
