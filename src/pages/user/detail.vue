<template>
  <div>
    <div class="user-detail-avatar">
      <el-upload action="" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <el-avatar class="block" :size="100" :src="avatarUrl" @click="uploadAvatar"></el-avatar>
      </el-upload>
      <h2>{{$store.getters.user.username}}</h2>
      <h6>{{$store.getters.user.introduce ? $store.getters.user.introduce : $store.getters.config.USER_INTRODUCE}}</h6>
    </div>
    <!-- 主体内容 [[ -->
    <el-container class="user-detail-main">
      <el-header>
        <span> 个人信息</span>
      </el-header>
      <el-main>
        <el-form label-width="120px" :model="formData">
          <el-form-item label="用户名:"><input v-model="formData.username"></el-form-item>
          <el-form-item label="个性签名:"><input v-model="formData.introduce"></el-form-item>
          <el-form-item label="昵称:"><input v-model="formData.nickname" /></el-form-item>
          <el-form-item label="邮箱地址:"><input v-model="formData.email" /></el-form-item>
          <el-form-item label="手机号:"><input v-model="formData.mobile" /></el-form-item>
          <el-form-item label="性别:"><input v-model="formData.sex"></el-form-item>
          <el-form-item label="真实姓名:"><input v-model="formData.userinfo.realname"></el-form-item>
          <el-form-item label="年龄:"><input v-model="formData.userinfo.age"></el-form-item>
          <el-form-item label="住址:"><input v-model="formData.userinfo.address"></el-form-item>
          <el-form-item label="生日:"><input v-model="formData.userinfo.birthday"></el-form-item>
          <el-form-item label="教育程度:"><input v-model="formData.userinfo.education"></el-form-item>
          <el-form-item label="毕业学校:"><input v-model="formData.userinfo.school"></el-form-item>
          <el-form-item label="兴趣爱好:"><input v-model="formData.userinfo.interest"></el-form-item>
          <el-form-item label="备注:"><input v-model="formData.userinfo.remark"></el-form-item>
          <el-form-item label="注册时间:">{{formData.createtime}}</el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleData">修改</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        // 用户头像地址
        avatarUrl: null,
        // 用户信息
        formData: {
          userId: this.$store.getters.user.userId,
          username: this.$store.getters.user.username,
          nickname: this.$store.getters.user.nickname,
          introduce: this.$store.getters.user.introduce,
          email: this.$store.getters.user.email,
          mobile: this.$store.getters.user.mobile,
          createtime: this.$store.getters.user.createtime,
          userinfo: {
            // realname: this.$store.getters.user.userinfo.realname,
            // age: this.$store.getters.user.userinfo.age,
            // address: this.$store.getters.user.userinfo.address,
            // birthday: this.$store.getters.user.userinfo.birthday,
            // education: this.$store.getters.user.userinfo.education,
            // school: this.$store.getters.user.userinfo.school,
            // interest: this.$store.getters.user.userinfo.interest,
            // remark: this.$store.getters.user.userinfo.remark
          }
        }
      }
    },
    created() {
      this.handleAvatarUrl();
    },
    methods: {
      // 处理用户头像
      handleAvatarUrl() {
        if (this.$store.getters.user.avatar) {
          this.avatarUrl = this.$store.getters.user.avatar;
        } else {
          if (this.$store.getters.user.sex === 2) {
            this.avatarUrl = 'static/images/girl.jpg';
          } else {
            this.avatarUrl = 'static/images/boy.jpg';
          }
        }
      },
      // 上传成功事件
      handleSuccess() {

      },
      // 上传之前事件
      beforeUpload() {

      },
      // 上传个人头像
      uploadAvatar() {

      },
      // 信息修改
      handleData() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/user.scss";
</style>