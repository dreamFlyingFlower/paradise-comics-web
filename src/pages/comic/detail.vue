<template>
  <div class="comic-detail-container">
    <el-container>
      <el-aside><img class="image-big" :src="comicData.cover ? comicData.cover : ''" alt="loading..." /></el-aside>
      <el-main class="comic-detail-main">
        <div class="detail-title">
          <template v-if="comicData.alias">
            <h1 v-text="comicData.name + '(' + comicData.alias + ')'"></h1>
          </template>
          <template v-else>
            <h1 v-text="comicData.name"></h1>
          </template>
          <h2 v-text="comicData.author"></h2>
        </div>
        <el-row>
          <!-- <el-col :span="12">
            评分:
            <el-rate style="display: inline-block;" v-model="comicData.score" :colors="colors"></el-rate>
          </el-col> -->
          <el-col>
            <i class="el-icon-collection-tag"></i>
            <span v-text="showLabel"></span>
          </el-col>
          <el-col>
            <i class="el-icon-date"></i>
            <span v-text="year"></span>
          </el-col>
          <el-col>
            <i class="el-icon-location-information"></i>
            <span v-text="region"></span>
          </el-col>
          <el-col>
            <article>{{ comicData.brief }}</article>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container class="detail-recommend">
      <el-main>
        <h2 class="recommend-title">相关推荐</h2>
        <el-row :gutter="12"><el-col :span="4"></el-col></el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "comic",
  data() {
    return {
      // 动漫编号
      id: 0,
      // 动漫数据
      comicData: {},
      // 动漫分类数据
      categorys: [],
      // 地区
      region: null,
      // 年代
      year: null,
      // 标签数组
      labels: [],
      // 标签展示
      showLabel: null,
      // 评分颜色
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
  },
  components: {},
  created() {
    this.id = this.$route.params.id;
    this.getComicDatas();
  },
  methods: {
    getComicDatas() {
      this.$getById("comic", this.id).then(resp => {
        this.comicData = resp.data;
        this.categorys = resp.data.categorys;
        if (this.categorys && this.categorys.length > 0) {
          for (let category of this.categorys) {
            if (category.categoryCode.includes("REGION")) {
              this.region = category.categoryName;
            }
            if (category.categoryCode.includes("YEAR")) {
              this.year = category.categoryName;
            }
            if (category.categoryCode.includes("LABEL")) {
              this.labels.push(category.categoryName);
            }
          }
          this.showLabel = this.labels.join(",");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./_index";
</style>
