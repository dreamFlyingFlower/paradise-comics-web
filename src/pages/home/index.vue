<template>
  <div>
    <!-- 视频分类导航栏 [[ -->
    <div style="background-color: white; color:red;">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">首页</a></el-menu-item>
        <el-menu-item v-for="(v,pos) in videoTypes" index="pos" :key="pos">
          <router-link :to="{name:'videos',params:{typeId:v.typeId}}">{{v.typeName}}</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 轮播图 -->
    <div class="block" style="width: 500px;background-color: #00ee00">
      <el-carousel v-if="carousets && carousets.length > 0">
        <el-carousel-item v-for="o in carousets" :key="o.id">
          <a :href="o.videoSrc"><img :src="API_ROOT+'/'+o.src" :alt="o.title"></a>
          <h3 class="small" style="font-size: 14px;opacity: 0.75;line-height: 175px;margin: 0;">{{o.title}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 视频主体 [[ -->
    <el-row :gutter="2" v-for="o in indexVideos" :key="o.typeId">
      <h3 style="color:#f36c60; font-weight: bold;"><img
        :src="API_ROOT+'/photo/index/title_logo.png'" width="50" height="35"></img>
        {{o.typeName}}</h3>
      <el-col :span="6" v-for="v in o.videos" :key="v.videoId">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="API_ROOT+v.videoSrc">
            <img :src="API_ROOT+v.cover" :alt="v.title" class="image" style="height: 250px;">
            <div style="padding: 14px;">
              <span class="font-ellipsis" :title="v.name">{{v.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{v.createtime}}</time>
              </div>
            </div>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getIndexVideo} from "../../api/video";

  export default {
    name: "index",
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        carousets: [],// 轮播图
        videoTypes: [],// 视频类型
        indexVideos: []// 首页视频展示
      }
    },
    created() {
      this.getCarousets();
      this.getVideoTypes();
      this.getIndexVideo();
    },
    methods: {
      // 菜单点击事件
      handleSelect(key, keyPath) {

      },
      // 获得轮播图
      getCarousets() {
        this.$getEntitys('carouset',{type:1}).then((resp) => {
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
      }
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }
</style>
