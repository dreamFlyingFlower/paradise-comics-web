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
            <!-- <h5>评分:{{ item.score }}</h5> -->
            <p>
              <span>别名:</span>
              {{ item.alias }}
            </p>
            <p>
              <span>作者:</span>
              {{ item.author }}
            </p>
            <p>
              <span>地区:</span>
              {{ item.region }}
            </p>
            <p>
              <span>标签:</span>
              {{ item.label }}
            </p>
            <p>
              <span>年代:</span>
              {{ item.year }}
            </p>
            <p class="font-ellipsis">
              <span>动漫简介:</span>
              {{ item.brief }}
            </p>
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
    ...mapGetters(["searchKey", "searchState","pageIndex", "pageSize", "total"])
  },
  watch: {
    searchState: function() {
      this.search();
    },
    'pageIndex': function (val) {
      this.$store.commit('PAGE_INDEX', val);
      if (this.pageIndexChange) {
        this.pageIndexChange = false;
        return false;
      }
      this.$nextTick(() => {
        this.search();
      });
    },
    'pageSize': function (val) {
      this.$store.commit('PAGE_SIZE', val);
      this.pageIndexChange = true;
      this.$store.commit('PAGE_INDEX', 1);
      this.$nextTick(() => {
        this.search();
      });
    },
    'total': function (val) {
      let quotient = val / this.pageSize;
      let flag = val % this.pageSize === 0;
      if (this.pageIndex > 1) {
        if (flag && (quotient < this.pageIndex)) {
          this.$store.commit('PAGE_INDEX', this.pageIndex - 1);
        }
      }
    },
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
@import "_index.scss";
</style>
