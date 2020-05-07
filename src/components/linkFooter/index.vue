<template>
  <div class="footer">
    <div class="footer-link-a">
      <span>动漫百科</span>
      <ul>
        <li>关于我们</li>
        <li>加入我们</li>
        <li>联系我们</li>
        <li>友情链接</li>
      </ul>
    </div>
    <div class="footer-link-b">
      <ul>
        <li>
          <img class="footer-qrcode" src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
          <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
          <span>官方微信</span>
        </li>
        <li>
          <img class="footer-qrcode" src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
          <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
          <span>公众号</span>
        </li>
        <li>
          <img class="footer-qrcode" src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
          <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">
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
      }
    },
    created() {
      this.getFriendLinks();
    },
    methods: {
      // 获得所有的友情链接
      getFriendLinks() {
        this.$getEntitys('friendLink').then((resp) => {
          this.friendLinks = resp.data;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./index";
</style>
