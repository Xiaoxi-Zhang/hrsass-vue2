<template>
  <div class="image-upload" :class="{ disabled:fileList.length>=3 }">
    <!-- action: 要把图片上传到哪台服务器（图片服务器的地址）
     自己搭建服务器 一般使用action上传，不使用action时，要把action配置 #
    -->
    <!-- list-type: 上传组件样式的控制 -->
    <!-- on-preview 预览 -->
    <!-- limit 上传的最大文件数量 -->
    <!-- on-exceed: 超出限制文件数量时执行 -->
    <!-- on-remove: 删除时执行的钩子函数 -->
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :limit="3"
      :on-exceed="onExceed"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览" :close-on-click-modal="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [
        { url: 'https://img.soogif.com/NyDk1lzDPJ9xyfgF046yfvWMsDaa3hNb.JPEG' },
        { url: 'https://img0.baidu.com/it/u=4208774388,2073055404&fm=253&app=138&f=JPEG?w=500&h=500' },
        { url: 'https://picx.zhimg.com/50/v2-7d8a340c514540128cde7fdce5a7e978_720w.webp?source=2c26e567' }
      ]
    }
  },
  methods: {
    // 超出限制自动执行这个函数
    onExceed() {
      // console.log('超出限制了')
      this.$message.warning('图片上传数量超出限制了')
    },
    // 删除时执行
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      // 通过拷贝的方式赋值给fileList  因为fileList是数组，不能直接赋值给fileList
      // this.fileList = [...fileList]
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none
    }
  }
}
</style>
