<template>
  <div>
    <!-- 番剧推荐 -->
    <el-row :gutter="12" style="margin:0;" v-for="recommend in recommends" :key="recommend.labelKey">
      <h3 style="color:#f36c60; font-weight: bold;" v-text="recommend.labelName"></h3>
      <el-col :span="6" v-for="item in recommend[recommend.labelKey]" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <router-link target="_blank" :to="{name:'comic',params:{id:item.id}}">
            <img :src="item.cover" :alt="item.name" class="image" style="height: 250px;">
            <!-- <div style="padding: 14px;"> -->
            <div>
              <span class="font-ellipsis" :title="item.name" v-text="item.name"></span>
              <div class="bottom clearfix">
                <time class="time">{{item.createtime}}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getRecommends} from "../../api/comic";

  export default {
    name: "index",
    data() {
      return {
        // 番剧推荐
        recommends: []
      }
    },
    created() {
      this.getRecommends();
    },
    methods: {
      // 获得番剧推荐
      getRecommends() {
        getRecommends().then(resp => {
          this.recommends = resp.data;
        });
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
