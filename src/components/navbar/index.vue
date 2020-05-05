<template>
  <div>
    <el-row type="flex" class="header-navbar">
      <el-col :span="12">
        <el-menu :default-active="'0'" class="el-menu-demo" mode="horizontal" style="display: inline-block"
                 @select="handlerSelect">
          <el-menu-item index="0" style="color:#f36c60; font-size:28px;"><a href="/">勇者部</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="'8'" mode="horizontal" style="display: inline-block;float: right;"
                 @select="handlerSelect">
          <el-menu-item index="1"><a v-if="$store.state.user.username" href="account-collect-show">收藏夹</a>
          </el-menu-item>
          <el-menu-item index="4"><input type="text" class="form-control" placeholder="来啊, 搜我呀~" name="search"
                                         action="index-search-execute"></el-menu-item>
          <el-submenu index="8" v-if="!$store.getters.user.token">
            <template slot="title" style="float: right">
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
            <el-menu-item index="6"><a href="account-myself-show">修改资料</a></el-menu-item>
            <el-menu-item index="7"><a href="account-exit-execute">退出登录</a></el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 首页大图-->
    <img v-if="showCarouset && carouset" class="carouset" :src="API_ROOT+carouset.src" :alt="carouset.title"/>
    <!-- 视频分类导航栏 [[ -->
    <div v-if="showVideoTypes" style="background-color: white; color:red;">
      <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handlerSelect">
        <el-menu-item index="'1'" style="border-bottom:1px solid #f36c60"><a href="/" style="color:#f36c60">首页</a>
        </el-menu-item>
        <el-menu-item v-for="(v, pos) in videoTypes" :index="v.typeId + ''" :key="pos">
          <router-link :to="{ name: 'videos', params: { typeId: v.typeId } }">{{ v.typeName }}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    props: ["showCarouset", "showVideoTypes"],
    data() {
      return {
        API_ROOT: process.env.API_ROOT,
        carouset: '', // 首页大图
        videoTypes: [] // 视频类型
      };
    },
    created() {
      this.getCarousets();
      this.getVideoTypes();
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
      // 获得所有最上级类型的视频分类
      getVideoTypes() {
        if (!this.showVideoTypes) {
          return;
        }
        this.$getEntitys('videoType', {pid: 1}).then(resp => {
          this.videoTypes = resp.data;
        });
      }
    }
  };
</script>
