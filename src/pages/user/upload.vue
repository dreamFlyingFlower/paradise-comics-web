<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="API_ROOT"
      ref="upload"
      :show-file-list="false"
      :on-preview="handlePreview(file)"
      :on-remove="handleRemove(file, fileList)"
      :on-success="handleAvatarSuccess"
      :before-remove="beforeRemove(files, fileList)"
      :before-upload="beforeAvatarUpload"
      :auto-upload="false"
      :on-exceed="handleExceed(files, fileList)" multiple="">
      <img v-if="imageUrl" :src="imageUrl" alt="" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        imageUrl:null,
        file:null,
        files:[],
        fileList:[]
      }
    },
    methods: {
      handlePreview() {

      },
      handleRemove() {

      },
      handleAvatarSuccess(res,file){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      beforeRemove() {

      },
      handleExceed() {

      },
      submitUpload(){
        this.$refs.upload.submit();
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
