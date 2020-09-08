<template>
  <div>
    <div class="detail-avatar">
      <el-upload action="" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <el-avatar class="block" :size="100" :src="userAvatarSrc" @click="uploadAvatar"></el-avatar>
      </el-upload>
      <h2>{{$store.getters.user.username}}</h2>
      <h6>{{$store.getters.user.introduce ? $store.getters.user.introduce : $store.getters.config.USER_INTRODUCE}}</h6>
    </div>
    <!-- 主体内容 [[ -->
    <el-container>
      <el-aside class="detail-aside" style="width: 350px;">
        <el-header>
          <span> 个人信息</span>
        </el-header>
        <el-form label-width="120px" :model="formData">
          <el-form-item label="用户名:"><span v-text="$store.getters.user.username"></span>
          </el-form-item>
          <el-form-item label="个性签名:">
            <span
              v-text="$store.getters.user.introduce ? $store.getters.user.introduce : $store.getters.config.USER_INTRODUCE"></span>
          </el-form-item>
          <el-form-item label="昵称:"><input v-model="formData.nickname" /></el-form-item>
          <el-form-item label="邮箱地址:"><input v-model="formData.email"/></el-form-item>
          <el-form-item label="手机号:"><input v-model="formData.mobile" /></el-form-item>
          <el-form-item label="性别:"><input v-model="formData.sex"></el-form-item>
          <el-form-item label="注册时间:">{{formData.createtime}}</el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleData">修改</el-button>
          </el-form-item>
        </el-form>
      </el-aside>
<!--      <el-main class="detail-main">-->
<!--        <el-container>-->
<!--          <el-header><img src="static/images/common.png" width="50" height="35" />我最近收藏的视频</el-header>-->
<!--          <el-main>-->
<!--            <template v-if="userComic && userComic.comics">-->
<!--              <router-link v-for="item in userComic.comics" :to="{path:'/'}" :key="item.id">-->
<!--                <img :src="item.cover" alt="loading..." :title="item.name">-->
<!--              </router-link>-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              <span>暂时没有收藏</span>-->
<!--            </template>-->
<!--          </el-main>-->
<!--        </el-container>-->
<!--        <el-container>-->
<!--          <el-header><img src="static/images/common.png" width="50" height="35" />我最近评论</el-header>-->
<!--          <el-main>-->
<!--            <li v-for="item in comments" :key="item.commentId">-->
<!--              <span>-->
<!--                <router-link :to="{path:'/'}">{{item.anime ? item.anime.name : "未知动漫"}}</router-link>-->
<!--              </span>-->
<!--              <span>{{item.subject}}</span>-->
<!--              <span>{{item.createtime}}</span>-->
<!--            </li>-->
<!--          </el-main>-->
<!--        </el-container>-->
<!--      </el-main>-->
    </el-container>
  </div>
</template>

<script>
  // 收藏 FIXME
export default {
  name: "detail",
  data() {
    return {
      // 用户头像地址
      userAvatarSrc: null,
      // 用户最近的10条收藏
      userComic: null,
      // 用户最近的10条评论
      comments: [],
      showUploadDialog: false,
      // 用户信息
      formData:{
        userId:this.$store.getters.user.userId,
        username:this.$store.getters.user.username,
        nickname:this.$store.getters.user.nickname,
        email:this.$store.getters.user.email,
        mobile:this.$store.getters.user.mobile,
        createtime:this.$store.getters.user.createtime
      }
    }
  },
  created() {
    this.getUserAvatarSrc();
    this.getUserComic();
    this.getComments();
  },
  methods: {
    // 获得用户头像
    getUserAvatarSrc() {
      let avatarName = this.$store.getters.user.avatar;
      if (avatarName) {
        this.userAvatarSrc = avatarName.substring(avatarName.indexOf("_") + 1, avatarName.lastIndexOf(".")) + '/' + avatarName;
      } else {
        if (this.$store.getters.user.sex === '女') {
          this.userAvatarSrc = 'static/images/girl.jpg';
        } else {
          this.userAvatarSrc = 'static/images/boy.jpg';
        }
      }
    },
    // 获得用户收藏动漫
    getUserComic() {
      this.$getById('user', this.$store.getters.user.userId).then(resp => {
        this.userComic = resp.data;
      });
    },
    // 获得用户的评论列表
    getComments() {
      this.$getEntitys('comment', {
        pageIndex: 1,
        pageSize: 10,
        userId: this.$store.getters.user.userId
      }).then(resp => {
        this.comments = resp.data;
      });
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
    handleData(){

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/user.scss";
</style>
