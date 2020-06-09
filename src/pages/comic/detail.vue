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
        <el-row :gutter="12" style="margin-left:0;margin-right:0">
          <el-col :span="4" v-for="item in recommends" :key="item.id">
            <el-card :body-style="{ padding: '0px', width: '150px', height: '300px', margin: 'auto' }">
              <router-link target="_blank" :to="{ name: 'comic', params: { id: item.id } }">
                <img :src="item.cover" :alt="item.name" class="image-small" />
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
      </el-main>
    </el-container>
    <el-container class="detail-recommend">
      <el-main>
        <h2 class="recommend-title">评论</h2>
        <el-row>
          <el-col class="comment-reply-content">
            <img src="static/images/boy.jpg" alt="loading" class="comment-img-children" />
            <div class="comment-reply-info">
              <div class="comment-reply-cover" v-if="!$store.getters.token">
                <span>
                  请先
                  <router-link :to="{ path: '/login', query: { redirect: $route.path } }">登录</router-link>
                  后发表评论ლ(╹◡╹ლ)
                </span>
              </div>
              <div class="comment-textarea">
                <el-input class="comment-textarea-content" type="textarea" v-model="formData.content" :disabled="!$store.getters.token"></el-input>
                <button :class="$store.getters.token ? 'comment-publish-b' : 'comment-publish-a'" @click="handleData(item)">发表评论</button>
              </div>
            </div>
          </el-col>
        </el-row>
        <comment :comments="comments" :arguded="comicData" @freshData="getComments"></comment>
        <pagination></pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getByCategoryIds } from "@api/comic";
import { getByArguedId } from "@api/comment";
import { comment, pagination } from "@is";
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
      // 分类编号
      categoryIds: [],
      // 标签展示
      showLabel: null,
      // 评分颜色
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      // 相关推荐
      recommends: [],
      // 评论
      comments: [],
      pageIndexChange: false,
      // 评论数据提交
      formData: {
        arguedId: null,
        type: 1,
        creater: this.$store.getters.user.userId,
        subject: null,
        content: null
      }
    };
  },
  components: {
    comment,
    pagination
  },
  computed: {
    ...mapGetters(["pageIndex", "pageSize", "total"])
  },
  watch: {
    pageIndex: function(val) {
      this.$store.commit("PAGE_INDEX", val);
      // pageSize改变时会重置pageIndex,可能造成refresh方法双重调用
      if (this.pageIndexChange) {
        this.pageIndexChange = false;
        return false;
      }
      this.$nextTick(() => {
        this.comments();
      });
    },
    /**
     * 当pageSize改变时,会将pageIndex重置为1,若是pageIndex原先本来就为1,则不会调用refresh方法
     * 若是pageSize直接调用refresh方法,同时重置了pageIndex,若pageIndex原先不为1,
     * 则会调用2次refresh方法,此处将设置一个标志
     * @param val 改变后的新值
     */
    pageSize: function(val) {
      this.$store.commit("PAGE_SIZE", val);
      this.pageIndexChange = true;
      this.$store.commit("PAGE_INDEX", 1);
      this.$nextTick(() => {
        this.comments();
      });
    },
    /**
     * TODO
     * 页面删除时会改变total的值,删除了一整页的时候需要重新请求
     * total的值必须在每次请求refresh方法的时候设置.此时可能会出现重复请求
     */
    total: function(val) {
      let quotient = val / this.pageSize;
      let flag = val % this.pageSize === 0;
      if (this.pageIndex > 1) {
        if (flag && quotient < this.pageIndex) {
          this.$store.commit("PAGE_INDEX", this.pageIndex - 1);
        }
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getComicData();
    this.getComments();
  },
  methods: {
    // 获得动漫详情
    getComicData() {
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
              this.categoryIds.push(category.categoryId);
            }
          }
          this.showLabel = this.labels.join(",");
          this.getRecommends();
        }
      });
    },
    // 获得相关推荐
    getRecommends() {
      getByCategoryIds(this.categoryIds.join(","), 1, 6).then(resp => {
        this.recommends = resp.data;
      });
    },
    // 获得评论
    getComments() {
      getByArguedId(this.id, 1, this.pageIndex, this.pageSize).then(resp => {
        this.comments = resp.data;
        this.$store.commit("TOTAL", resp.total);
      });
    },
    // 提交评论
    handleData() {
      if (this.formData.content.trim()) {
        this.formData.creater = this.$store.getters.user.userId;
        this.formData.arguedId = this.id;
        this.formData.type = 1;
        this.formData.subject = this.comicData.name;
        this.$create("comment", this.formData, true).then(resp => {
          if (resp.code === 1) {
            this.getComments();
            this.formData.subject = "";
            this.formData.content = "";
          }
        });
      } else {
        this.$message("评论内容为空");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./_index";
@import "../../components/comment/_index";
</style>
