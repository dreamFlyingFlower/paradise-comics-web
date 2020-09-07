<template>
  <div class="footer">
    <div class="footer-link-a">
      <h3 class="title">动漫百科</h3>
      <el-row :gutter="12">
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/about' }">关于我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/friendLinks' }">加入我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/about' }">联系我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/friendLinks' }">友情链接</router-link></el-link>
        </el-col>
      </el-row>
    </div>
    <div class="footer-link-b">
      <ul>
        <li>
          <img src="/web/static/images/links/weixin.jpg" alt="loading" />
          <span>官方微信</span>
        </li>
        <li>
          <img src="/web/static/images/links/gongzonghao.jpg" alt="loading" />
          <span>公众号</span>
        </li>
        <li>
          <img src="/web/static/images/links/qq.jpg" alt="loading" />
          <span>QQ群</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "link-footer",
  data() {
    return {
      API_ROOT: process.env.API_ROOT,
      friendLinks: []
    };
  },
  created() {
    this.getFriendLinks();
  },
  methods: {
    // 获得所有的友情链接
    getFriendLinks() {
      this.$getEntitys("friendLink").then(resp => {
        this.friendLinks = resp.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
