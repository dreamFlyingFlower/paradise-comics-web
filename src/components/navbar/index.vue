<template>
  <div>
    <!-- 头部大图 -->
    <img v-if="showCarouset" class="header-bgimg" :src="carouset ? API_ROOT + carouset.src : ''" alt="loading" />

    <!-- 头部菜单 -->
    <el-row type="flex" class="header-navbar">
      <!-- 用户菜单 -->
      <el-col>
        <el-menu :default-active="'0'" mode="horizontal" style="display: inline-block" @select="handlerSelect">
          <el-menu-item index="0" style="color:#f36c60; font-size:28px;"><a href="/">动漫百科</a></el-menu-item>
          <el-menu-item index="'1'" style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">首页</a></el-menu-item>
          <el-menu-item v-for="item in userMenus" :index="item.menuId + ''" :key="item.menuId"><router-link :to="{ path: item.menuPath }" v-text="item.menuName" /></el-menu-item>
        </el-menu>
      </el-col>

      <!-- 搜索 -->
      <el-col style="margin: auto;">
        <el-input v-model="searchKey" placeholder="请输入关键字" style="width: 85%;display: inline-block;" @keyup.enter.native="search"></el-input>
        <el-button type="info" icon="el-icon-search" style="margin-left: -5px;" @click="search"></el-button>
      </el-col>

      <!-- 用户信息 -->
      <el-col>
        <el-menu :default-active="'8'" mode="horizontal" style="display: inline-block;float: right;" @select="handlerSelect">
          <el-submenu index="8" v-if="!$store.getters.user.token">
            <template slot="title">
              登录/注册
            </template>
            <el-menu-item index="2"><router-link :to="{ path: '/login' }">用户登录</router-link></el-menu-item>
            <el-menu-item index="3"><router-link :to="{ path: '/register' }">注册账号</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="9" v-else>
            <template slot="title">
              {{ $store.getters.user.username }}
            </template>
            <el-menu-item index="5"><router-link :to="{ path: '/detail' }">个人中心</router-link></el-menu-item>
            <el-menu-item index="6"><router-link :to="{ path: '/userinfo' }">修改资料</router-link></el-menu-item>
            <el-menu-item index="7">
              <span style="display:block;" @click="logout">{{ $t("navBar.logout") }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserMenus } from "../../api/menu";

export default {
  name: "navbar",
  props: ["showCarouset", "showVideoTypes"],
  data() {
    return {
      API_ROOT: process.env.API_ROOT,
      carouset: "", // 首页大图
      userMenus: [], // 菜单类型
      searchKey: "" // 搜索关键字
    };
  },
  created() {
    this.getCarousets();
    this.getUserMenus();
  },
  methods: {
    handlerSelect(key, keyPath) {},
    // 获得首页大图
    getCarousets() {
      if (!this.showCarouset) {
        return;
      }
      this.$getEntitys("carouset", { type: 2 }).then(resp => {
        this.carouset = resp && resp.data.length > 0 ? resp.data[0] : "";
      });
    },
    // 获得用户菜单
    getUserMenus() {
      getUserMenus().then(resp => {
        this.userMenus = resp.data;
      });
    },
    // 全局搜索,搜索关键词,每次点击时,即使关键字没有变也要重新查
    search() {
      this.$store.commit("SEARCH_KEY", this.searchKey);
      this.$store.commit("SEARCH_STATE", !this.$store.getters.searchState);
      if (this.$route.path !== "/comic/list") {
        this.$router.push({ path: "/comic/list" });
      }
    },
    // 退出登录
    logout() {}
  }
};
</script>
<style scoped lang="scss">
@import "_index.scss";
</style>
