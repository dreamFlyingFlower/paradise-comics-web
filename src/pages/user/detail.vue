<template>
  <div>
    <img v-if="carouset" class="carouset" :src="API_ROOT+carouset.src" alt="loading..." :title="carouset.title"/>
    <div class="detail-avatar">
      <el-avatar class="block" :size="100" :src="userAvatarSrc"></el-avatar>
      <h2>{{$store.getters.user.username}}</h2>
      <h3>{{$store.getters.user.introduce}}</h3>
    </div>
    <!-- 主体内容 [[ -->
    <el-container>
      <el-aside class="detail-aside" style="width: 350px;">
        <el-header>
          个人介绍
        </el-header>
        <el-form label-width="120px">
          <el-form-item label="用户名:"><span :title="$store.getters.user.username">{{$store.getters.user.username}}</span>
          </el-form-item>
          <el-form-item label="个性签名:">
            <span :title="$store.getters.user.introduce">{{$store.getters.user.introduce}}</span>
          </el-form-item>
          <el-form-item label="邮箱地址:">{{$store.getters.user.email}}</el-form-item>
          <el-form-item label="手机号:">{{$store.getters.user.mobile}}</el-form-item>
          <el-form-item label="性别:">{{$store.getters.user.sex}}</el-form-item>
          <el-form-item label="注册时间:">{{$store.getters.user.createtime}}</el-form-item>
          <el-form-item label="视频收藏数:">{{userComic ? (userComic.comics ? userComic.comics.length : 0) : 0}}
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main class="detail-main">
        <el-container>
          <el-header><img src="static/images/common.png" width="50" height="35"/>我最近收藏的视频</el-header>
          <el-main>
            <template v-if="userComic && userComic.comics">
              <router-link v-for="item in userComic.comics" :to="{path:'/'}" :key="item.id">
                <img :src="item.cover" alt="loading..." :title="item.name">
              </router-link>
            </template>
            <template v-else>
              <span>暂时没有收藏</span>
            </template>
          </el-main>
        </el-container>
        <el-container>
          <el-header><img src="static/images/common.png" width="50" height="35"/>我最近评论</el-header>
          <el-main>
            <li v-for="item in comments" :key="item.commentId">
              <span><router-link :to="{path:'/'}">{{item.anime ? item.anime.name : "未知动漫"}}</router-link></span>
              <span>{{item.subject}}</span>
              <span>{{item.createtime}}</span>
            </li>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

    <upload></upload>
  </div>
</template>

<script>
  import upload from "./upload";

  export default {
    name: "detail",
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        carouset: null,
        // 用户头像地址
        userAvatarSrc: null,
        // 用户最近的10条收藏
        userComic: null,
        // 用户最近的10条评论
        comments: []
      }
    },
    components: {
      upload
    },
    created() {
      this.getCarousets();
      this.getUserAvatarSrc();
      this.getUserComic();
      this.getComments();
    },
    methods: {
      // 获得大图
      getCarousets() {
        this.$getEntitys('carouset', {type: 3}).then(resp => {
          this.carouset = resp && resp.data.length > 0 ? resp.data[0] : '';
        });
      },
      // 获得用户头像
      getUserAvatarSrc() {
        if (this.$store.getters.user.avatar) {
          this.userAvatarSrc = process.env.API_ROOT_IMAGE + this.$store.getters.user.avatar;
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/user.scss";

  /*.carouset {*/
  /*  width: 100%;*/
  /*  height: 180px;*/
  /*  background-size: cover;*/
  /*}*/
</style>
