<template>
  <div>
    <h6 class="footer-title">友情链接</h6>
    <hr />
    <el-row class="friend" :gutter="12">
      <el-col :span="6" v-for="item in friendLinks" :key="item.friendLinkId"><el-link :underline="false" :href="item.url" v-text="item.linkName"></el-link></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "friendLink",
  data() {
    return {
      friendLinks: []
    };
  },
  created() {
    this.getFriendLinks();
  },
  methods: {
    getFriendLinks() {
      this.$getEntitys("friendLink").then(resp => {
        this.friendLinks = resp.data;
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>