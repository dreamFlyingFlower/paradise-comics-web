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
<!--  <el-container class="footer">-->
<!--    <el-container>-->
<!--      <el-header style="color:#bbb">动漫百科</el-header>-->
<!--      <el-main>-->
<!--        <el-row :gutter="10">-->
<!--          <el-col :span="5">关于我们</el-col>-->
<!--          <el-col :span="5">加入我们</el-col>-->
<!--          <el-col :span="5">联系我们</el-col>-->
<!--          <el-col :span="5">友情链接</el-col>-->
<!--        </el-row>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--    <el-aside style="width: 300px;">-->
<!--      <el-main>-->
<!--        <el-row :gutter="12">-->
<!--          <el-col :span="8">-->
<!--            <el-card class="box-card">-->
<!--              <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">-->
<!--              <div slot="header" class="clearfix">-->
<!--                <span>官方微信</span>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-card class="box-card">-->
<!--              <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">-->
<!--              <div slot="header" class="clearfix">-->
<!--                <span>公众号</span>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-card class="box-card">-->
<!--              <img src="http://localhost:12345/upload/20200203/2djof4o5h2ipdqabfuucjetitd_20200203.jpg" alt="loading">-->
<!--              <div slot="header" class="clearfix">-->
<!--                <span>QQ群</span>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-main>-->
<!--    </el-aside>-->
<!--  </el-container>-->
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
