<template>
  <div>
    <!-- 轮播图 -->
    <div class="block" style="width: 500px;background-color: #00ee00">
      <el-carousel v-if="carousets && carousets.length > 0">
        <el-carousel-item v-for="o in carousets" :key="o.id">
          <router-link :to="{name:'play',params:{videoId:o.videoId}}">
            <img :src="API_ROOT+'/'+o.src" :alt="o.title">
          </router-link>
          <h3 class="small" style="font-size: 14px;opacity: 0.75;line-height: 175px;margin: 0;">{{o.title}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
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
        indexVideos: []// 首页视频展示
      }
    },
    created() {
      this.getCarousets();
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
