<template>
  <div class="comic-container">
    <template>
      <el-container>
        <el-aside><img :src="comicData.cover ? '' : comicData.cover" alt="loading..."></el-aside>
        <el-main>
          <h5 v-text="comicData.name"></h5>
          <h5>score</h5>
          别名:<h5 v-text="comicData.alias"></h5>
          上映:<h5 v-text="comicData.year"></h5>
          地区:<h5 v-text="comicData"></h5>
          类型:<h5 v-text="comicData.categorys"></h5>
          标签:<h5 v-text=""></h5>
        </el-main>
      </el-container>
      <el-container>
        <el-main>
          动漫简介
          <article v-text="comicData.brief">
          </article>
          关联动漫
          <div>
            1,23,3,5,
          </div>
        </el-main>
      </el-container>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'comic',
    data() {
      return {
        // 图片服务器地址
        API_ROOT: process.env.API_ROOT + "upload/20200203/",
        // 动漫编号
        id: 0,
        // 动漫数据
        comicData: {}
      };
    },
    components: {},
    created() {
      this.id = this.$route.params.id;
      this.getComicDatas();
    },
    methods: {
      getComicDatas() {
        this.$getById('comic', this.id).then(resp => {
          this.comicData = resp.data;
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "./_index"
</style>
