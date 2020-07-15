<template>
  <div>
    <!-- 头部大图 -->
    <img v-if="showCarouset" class="header-bgimg" :src="carouset ?  carouset.src : ''" alt="loading" />

    <!-- 头部菜单 -->
    <el-row class="header-navbar" type="flex">
      <!-- 用户菜单 -->
      <el-col style="min-width: 600px">
        <el-menu :default-active="'0'" mode="horizontal" style="display: inline-block" @select="handlerSelect">
          <el-menu-item index="0" style="color:#f36c60; font-size:28px;"><a href="/">动漫百科</a></el-menu-item>
          <el-menu-item index="'1'" style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">主站</a>
          </el-menu-item>
          <el-menu-item v-for="item in userMenus" :index="item.menuId + ''" :key="item.menuId">
            <router-link :to="{ path: item.menuPath }" v-text="item.menuName" />
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- 搜索 -->
      <el-col style="margin: auto;min-width: 400px;">
        <el-input v-model="searchKey" placeholder="请输入关键字" style="width: 85%;display: inline-block;"
          @keyup.enter.native="search"></el-input>
        <el-button type="info" icon="el-icon-search" style="margin-left: -5px;" @click="search"></el-button>
      </el-col>

      <!-- 用户信息 -->
      <el-col style="margin: auto;min-width:200px;" class="navbar-user">
        <template v-if="!$store.getters.user.token">
          <el-dropdown class="navbar-login">
            <span class="el-dropdown-link">
              登录/注册
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{ path: '/login',query:{redirect:$route.path} }">用户登录</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="{ path: '/register' }">注册账号</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ $store.getters.user.username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{ path: '/detail' }">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span style="display:block;" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-col>
    </el-row>

    <el-row style="position: relative;text-align: center;">
      <el-col style="min-width: 400px">
        <el-menu :default-active="'0'" mode="horizontal" style="display: inline-block;" @select="handlerSelect">
          <el-menu-item index="'1'" style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">首页</a>
          </el-menu-item>
          <el-menu-item v-for="item in userBottomMenus" :index="item.menuId + ''" :key="item.menuId">
            <router-link :to="{ path: item.menuPath }" v-text="item.menuName" />
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserMenus } from "../../api/menu";
import user from "../../api/user";
import cookie from "@utils/cookie";

export default {
  name: "navbar",
  props: ["showCarouset", "checkLogin"],
  data () {
    return {
      // 首页大图
      carouset: "",
      // 用户大图顶部菜单
      userMenus: [],
      // 用户大图底部菜单
      userBottomMenus: [],
      // 搜索关键字
      searchKey: ""
    };
  },
  created () {
    this.getCarousets();
    this.checkUserLogin();
    this.getUserMenus();
    this.getUserBottomMenus();
  },
  methods: {
    handlerSelect (key, keyPath) {
    },
    // 获得首页大图
    getCarousets () {
      if (!this.showCarouset) {
        return;
      }
      this.$getEntitys("carouset", { type: 2 }).then(resp => {
        this.carouset = resp && resp.data.length > 0 ? resp.data[0] : "";
      });
    },
    // 检查页面跳转是否需要登录
    checkUserLogin () {
      if (this.checkLogin && !this.$store.getters.token) {
        this.$router.push("/");
      }
    },
    // 获得用户菜单
    getUserMenus () {
      getUserMenus().then(resp => {
        this.userMenus = resp.data;
      });
    },
    // 获得用户大图底部菜单
    getUserBottomMenus () {
      getUserMenus(2).then(resp => {
        this.userBottomMenus = resp.data;
      })
    },
    // 全局搜索,搜索关键词,每次点击时,即使关键字没有变也要重新查
    search () {
      this.$store.commit("SEARCH_KEY", this.searchKey);
      this.$store.commit("SEARCH_STATE", !this.$store.getters.searchState);
      if (this.$route.path !== "/comic/list") {
        this.$router.push({ path: "/comic/list" });
      }
    },
    // 退出登录
    logout () {
      user.logout(this.$store.getters.user.token);
      cookie.removeUser();
      cookie.removeToken();
      this.$store.commit("USER", null);
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "_index.scss";
</style>
