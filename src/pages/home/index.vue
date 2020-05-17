<template>
  <div>
    <!-- 番剧推荐 -->
    <el-row :gutter="12">
      <h3 style="color:#f36c60; font-weight: bold;">番剧推荐</h3>
      <el-col :span="6" v-for="item in dramas" :key="item.id">
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
    <!-- 热门作品 -->
    <el-row :gutter="12">
      <h3 style="color:#f36c60; font-weight: bold;">热门作品</h3>
      <el-col :span="6" v-for="item in hots" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <router-link target="_blank" :to="{name:'comic',params:{id:item.id}}">
            <img :src="item.cover" :alt="item.name" class="image" style="height: 250px;">
            <div style="padding: 14px;">
              <span class="font-ellipsis" :title="item.name" v-text="item.name"></span>
              <div class="bottom clearfix">
                <time class="time">{{item.createtime}}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
    <!-- 最新连载 -->
    <el-row :gutter="12">
      <h3 style="color:#f36c60; font-weight: bold;">最新连载</h3>
      <el-col :span="6" v-for="item in news" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <router-link target="_blank" :to="{name:'comic',params:{id:item.id}}">
            <img :src="item.cover" :alt="item.name" class="image" style="height: 250px;">
            <div style="padding: 14px;">
              <span class="font-ellipsis" :title="item.name" :text="item.name"></span>
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
import { getRecommends } from "../../api/comic";

export default {
  name: "index",
  data () {
    return {
      // 番剧
      dramas: [],
      // 热门
      hots: [],
      // 最新连载
      news: []
    }
  },
  created () {
    this.getRecommends();
  },
  methods: {
    // 获得番剧推荐
    getRecommends () {
      getRecommends().then(resp => {
        let result = resp.data;
        this.dramas = result.HOME_RECOMMEND1;
        this.hots = result.HOME_RECOMMEND2;
        this.news = result.HOME_RECOMMEND3;
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
