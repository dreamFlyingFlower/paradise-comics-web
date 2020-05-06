<template>
  <div>
    <el-dialog title="上传头像" :visible.sync="showUploadDialog" width="30%" :before-close="beforeClose" style="text-align: center">
      <el-upload
        class="avatar-uploader"
        :action="API_ROOT+'user/uploadAvatar/'+$store.getters.user.userId"
        ref="upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" alt="" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showUploadDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import cookie from '../../utils/cookie';
  export default {
    name: "upload",
    props: ["showUploadDialog"],
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        imageUrl: null,
        file: null,
        files: [],
        fileList: []
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        let user = cookie.getUser();
        user.avatar = res.data;
        cookie.setUser(user);
        this.$store.state.user.avatar = res.data;
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
      beforeClose() {
        this.closeDialog();
      },
      // 关闭弹框
      closeDialog() {
        this.$emit('closeDialog');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/user.scss";
</style>
