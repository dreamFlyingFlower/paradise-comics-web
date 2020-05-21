<template>
  <div class="comic-container">
    <el-row :gutter="12" class="index-recommend" style="margin:20px;">
      <el-col :span="12" v-for="item in comics" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <router-link target="_blank" :to="{ name: 'comic', params: { id: item.id } }">
            <img :src="!item.cover ? '' : item.cover" :alt="item.name" class="image" style="height: 250px;" />
            <div class="name">
              <span class="font-ellipsis" :title="item.name" v-text="item.name"></span>
              <div class="bottom clearfix">
                <time class="time">{{ item.createtime }}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
    <pagination></pagination>

    <!-- <el-container>
      <el-aside><img :src="item.cover ? '' : item.cover" alt="loading..."></el-aside>
      <el-main>
        <h5 v-text="item.name"></h5>
        <h5>score</h5>
        别名:<h5 v-text="item.alias"></h5>
        上映:<h5></h5>
        地区:<h5></h5>
        类型:<h5></h5>
        标签:<h5></h5>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        动漫简介
        <article v-text="item.brief">
        </article>
      </el-main>
    </el-container> -->
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
  components:{
    pagination
  },
  computed: {
    ...mapGetters(["searchKey"])
  },
  watch: {
    searchKey: function() {
      let param = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchKey:this.searchKey
      };
      getAll(param).then(resp => {
        this.comics = resp.data;
        this.$store.commit('TOTAL', resp.total);
      });
    }
  },
  methods: {}
};
</script>
