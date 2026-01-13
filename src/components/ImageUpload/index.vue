<template>
  <div class="image-upload" :class="{ disabled:fileList.length>=limit }">
    <!-- action: 要把图片上传到哪台服务器（图片服务器的地址）
     自己搭建服务器 一般使用action上传，不使用action时，要把action配置 #
    -->
    <!-- list-type: 上传组件样式的控制 -->
    <!-- on-preview 预览 -->
    <!-- limit 上传的最大文件数量 -->
    <!-- on-exceed: 超出限制文件数量时执行 -->
    <!-- on-remove: 删除时执行的钩子函数 -->
    <!-- :http-request 自定义上传 -->
    <!-- :on-change 文件状态改变，添加文件、上传成功、上传失败都会执行 -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :limit="limit"
      :on-exceed="onExceed"
      :on-remove="handleRemove"
      :http-request="httpRequest"
      :on-change="onChange"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览" :close-on-click-modal="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import cos from '@/utils/cos'

export default {
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  computed: {
    isAllUploadSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    // 文件状态改变时的钩子函数
    // file: 当前上传的文件
    // fileList: 当前页面结构中展示的文件列表
    onChange(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // 把上传之后的文件 同步给data中的fileList
      this.fileList = [...fileList]
    },
    httpRequest({ file }) {
      // console.log(file)
      const curFile = this.fileList.find(item => item.uid === file.uid)
      curFile.status = 'uploading'
      // 调用上传方法
      cos.uploadFile({
        Bucket: 'hrsass-vue2-1394877896', // 存储桶名称（必须）
        Region: 'ap-guangzhou', // 存储桶所在的地域
        Key: `upload/${Date.now()}-${file.name}`, // 上传到COS上的文件名称
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, // 触发分块上传的阈值
        onProgress: function(progressData) {
          // 上传的进度
          // console.log(JSON.stringify(progressData))
          curFile.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        // 上传之后的结果
        // err上传失败
        // data上传成功
        if (err) {
          this.$message.console.error('上传失败，请稍后再试')
        } else {
          // console.log('上传成功')
          // 延迟的目的，让进度条明显一点
          setTimeout(() => {
            curFile.status = 'success'
          }, 500)
          // '//' 会默认跟你网站的协议保持统一
          curFile.url = '//' + data.Location
        }
      })
    },
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
