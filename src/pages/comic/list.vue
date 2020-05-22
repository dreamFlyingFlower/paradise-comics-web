<template>
  <div class="comic-container">
    <el-row :gutter="12" class="index-recommend" style="margin:20px;">
      <el-col :span="12" v-for="item in comics" :key="item.id">
        <el-card :body-style="{ padding: '0px', height: '300px', display: 'flex' }" style="margin: 10px 0;">
          <router-link target="_blank" :to="{ name: 'comic', params: { id: item.id } }" class="clearfix" style="display: inline-block;">
            <img :src="!item.cover ? '' : item.cover" :alt="item.name" class="comic-list-image" />
          </router-link>
          <div class="comic-list-detail">
            <h5 class="font-ellipsis" :title="item.name" v-text="item.name"></h5>
            <h5>评分:{{ item.score }}</h5>
            <h5>别名:{{ item.alias }}</h5>
            <h5>作者:{{ item.author }}</h5>
            <h5>地区:{{ item.region }}</h5>
            <h5>标签:{{ item.label }}</h5>
            <h5>年代:{{ item.year }}</h5>
            <article class="font-ellipsis">动漫简介:{{ item.brief }}</article>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <pagination></pagination>
  </div>
</template>

<script>
import { pagination } from "@is";
import { getAll } from "../../api/comic";
import { mapGetters } from "vuex";

export default {
  name: "comic-list",
  data() {
    return {
      // 搜索参数
      key: "",
      // 动漫数据
      comics: []
    };
  },
  components: {
    pagination
  },
  computed: {
    ...mapGetters(["searchKey", "searchState"])
  },
  watch: {
    searchState: function() {
      this.search();
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchKey: this.searchKey
      };
      getAll(param).then(resp => {
        this.comics = resp.data;
        this.$store.commit("TOTAL", resp.total);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./_index.scss";
</style>
