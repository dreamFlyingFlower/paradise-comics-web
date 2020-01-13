<template>
  <el-container>
    <el-header style="color:#bbb">友情链接</el-header>
    <el-container>
      <el-main>
        <el-row :gutter="10">
          <el-col :span="8" v-for="item in friendLinks" :key="item.friendLinkId">
            <a href="item.linkSrc">{{item.linkName}}</a>
          </el-col>
        </el-row>
      </el-main>
      <el-aside width="300px">
        <ul style="font-size:16px;">
          <li>您可以下载我们的移动客户端</li>
          <li>也欢迎您关注我们的微博和微信<img :src="API_ROOT+'/photo/index/title_logo.png'" width="50"
                                 height="35"></img></li>
        </ul>
      </el-aside>
    </el-container>
  </el-container>
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

<style scoped>
  .el-header, .el-footer {
    color: #333;
    line-height: 60px;
    text-align: center;
  }

  .el-aside {
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
