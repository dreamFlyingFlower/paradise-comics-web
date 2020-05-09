<template>
  <div>
    <!-- 首页大图 -->
    <img v-if="showCarouset && carouset" class="carouset" :src="API_ROOT+carouset.src" :alt="carouset.title"/>

    <!-- 头部菜单 -->
    <el-row type="flex" class="header-navbar">

      <!-- 用户菜单 -->
      <el-col :span="12">
        <el-menu :default-active="'0'" mode="horizontal" style="display: inline-block"
                 @select="handlerSelect">
          <el-menu-item index="0" style="color:#f36c60; font-size:28px;"><a href="/">动漫百科</a></el-menu-item>
          <el-menu-item index="'1'" style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">首页</a>
          </el-menu-item>
          <el-menu-item v-for="item in userMenus" :index="item.menuId + ''" :key="item.menuId">
            <router-link :to="{ path:item.menuPath}" v-text="item.menuName"></router-link>
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- 搜索 -->
      <el-col :span="12" style="margin: auto;">
        <el-input v-model="searchKey" placeholder="请输入关键字"
                  style="width: 85%;display: inline-block;" @keyup.enter.native="search">
        </el-input>
        <el-button type="info" icon="el-icon-search" style="margin-left: -5px;" @click="search">
        </el-button>
      </el-col>

      <!-- 用户信息 -->
      <el-col :span="12">
        <el-menu :default-active="'8'" mode="horizontal" style="display: inline-block;float: right;"
                 @select="handlerSelect">
          <!--          <el-menu-item index="1"><a href="account-collect-show">收藏夹</a>-->
          <!--          </el-menu-item>-->
          <el-submenu index="8" v-if="!$store.getters.user.token">
            <template slot="title" style="float: right;">
              登录/注册
            </template>
            <el-menu-item index="2">
              <router-link :to="{ path: '/login' }">用户登录</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="{ path: '/register' }">注册账号</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="9" v-else>
            <template slot="title">
              {{ $store.getters.user.username }}
            </template>
            <el-menu-item index="5">
              <router-link :to="{path:'/detail'}">个人中心</router-link>
            </el-menu-item>
            <el-menu-item index="6">
              <router-link :to="{path:'/userinfo'}">修改资料</router-link>
            </el-menu-item>
            <el-menu-item index="7"><a href="account-exit-execute">退出登录</a></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getUserMenus} from "../../api/menu";

  export default {
    name: 'navbar',
    props: ["showCarouset", "showVideoTypes"],
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        carouset: '',     // 首页大图
        userMenus: [],    // 菜单类型
        searchKey: ""     // 搜索关键字
      };
    },
    created() {
      this.getCarousets();
      this.getUserMenus();
    },
    methods: {
      handlerSelect(key, keyPath) {
      },
      // 获得首页大图
      getCarousets() {
        if (!this.showCarouset) {
          return;
        }
        this.$getEntitys('carouset', {type: 2}).then(resp => {
          this.carouset = resp && resp.data.length > 0 ? resp.data[0] : '';
        });
      },
      // 获得用户菜单
      getUserMenus() {
        getUserMenus().then(resp => {
          this.userMenus = resp.data;
        });
      },
      search() {
        if (!this.$exist(this.searchKey)) {
          this.$message("请输入关键字或该关键字不可搜索");
          return;
        }
        this.$router.push({name: "comic", params: {key: this.searchKey}});
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "_index.scss";
</style>
