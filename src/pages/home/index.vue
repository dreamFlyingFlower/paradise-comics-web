<template>
  <div>
    <!-- 视频分类导航栏 [[ -->
    <div class="container-fluid" style="background-color: white; color:red;">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
          <ul class="nav nav-tabs">
            <li role="presentation" style="border-bottom:1px solid #f36c60">
              <a href="/" style="color:#f36c60">首页</a>
            </li>
            <li class="hidden-xs" role="presentation" v-for="v in videoTypes">
              <a href="index-more-show?typeId=${sessionScope.videoTypes[0].id }">{{v.typeName}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 视频分类导航栏 ]] -->
    <br>
    <!-- 视频展示区 [[ -->
    <div class="container">
      <div class="row">
        <!-- 视频轮播图 [[ -->
        <!-- 大屏轮播图 -->
        <template>
        <div class="block" style="width: 500px;background-color: #00ee00">
            <!-- 轮播图 -->
          <el-carousel >
            <el-carousel-item v-for="o in carousets" :key="o.id">
              <a :href="o.videoSrc"><img :src="API_ROOT+'/'+o.src" :alt="o.title"></a>
              <h3 class="small" style="font-size: 14px;opacity: 0.75;line-height: 175px;margin: 0;">{{o.title}}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        </template>
        <!-- 视频轮播图 ]] -->
        <div class="col-lg-6 col-md-12 hidden-xs">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-for="o in indexVideos"><a
            :href="'index-play-show?id='+o.videos[0].videoId">
            <div class="topPhoto"
                 :style="'background-image: url('+API_ROOT+o.videos[0].cover+')'"></div>
          </a></div>
        </div>
      </div>
      <!-- 视频展示区 ]] -->

      <!-- 视频主体 [[ -->
      <template v-for="v in indexVideos">
        <div class="container" style="border-bottom:1px solid #dddddd">
          <h3 class="css76035d43b5489" style="color:#f36c60; font-weight: bold;"><img
            :src="API_ROOT+'/photo/index/title_logo.png'" width="50" height="35"></img>
            {{v.typeName}}</h3>
        </div>
        <br>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3" v-for="c in v.videos">
              <a href="index-play-show?id=${c.id }" class="thumbnail">
                <img :src="API_ROOT+'/'+c.cover">
                <div class="caption">
                  <p class="text-center">{{c.name}}</p>
                  <p class="text-center" style="color:grey; font-size: 2px;">
                    {{c.createtime}}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 友情链接部分 [[ -->
    <div class="container-fluid" style="background-color:rgb(236,236,236)" id="footer">
      <br>
      <div class="container">
        <h4 style="color:#bbb">友情链接</h4>
        <div class="row">
          <div class="col-lg-4 col-md-4">
            <ul style="list-style: none;" v-for="item in friendLinks">
              <li><a href="item.linkSrc">{{item.linkName}}</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-4" style="font-size:16px;">
            <ul>
              <li>您可以下载我们的移动客户端</li>
              <li>也欢迎您关注我们的微博和微信<img :src="API_ROOT+'/photo/index/title_logo.png'" width="50"
                                     height="35"></img></li>
            </ul>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import {getIndexVideo} from "../../api/video";
  import {formatDateTime} from '../../utils'

  export default {
    name: "index",
    data() {
      return {
        videos1: [{id: 1, name: "test", src: "http1"}, {id: 2, name: "test1", src: "http2"}],
        videos2: [{id: 1, name: "test", src: "http1"}, {id: 2, name: "test1", src: "http2"}],
        API_ROOT: process.env.API_ROOT,
        carousets: [],// 轮播图
        videoTypes: [],// 视频类型
        indexVideos: [],// 首页视频展示
        friendLinks: [] // 友情链接
      }
    },
    created() {
      // $('.carousel').carousel({
      //   interval: 3000
      // })
      this.getCarousets();
      this.getVideoTypes();
      this.getIndexVideo();
      this.getFriendLinks();
    },
    methods: {
      // 获得轮播图
      getCarousets() {
        this.$getEntitys('carouset').then((resp) => {
          this.carousets = resp.data;
        });
      },
      // 获得所有最上级类型的视频分类
      getVideoTypes() {
        this.$getEntitys('videoType', {pid: 1}).then((resp) => {
          this.videoTypes = resp.data;
        });
      },
      // 根据最上级视频分类查询最新的视频
      getIndexVideo() {
        getIndexVideo({pageSize: 8}).then((resp) => {
          this.indexVideos = resp.data;
        })
      },
      // 获得所有的友情链接
      getFriendLinks() {
        this.$getEntitys('friendLink').then((resp) => {
          this.friendLinks = resp.data;
        });
      }
    }
  }
</script>

<style scoped>

</style>
