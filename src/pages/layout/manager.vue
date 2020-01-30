<template>
  <div style="z-index: 1">
    <navbar/>
    <el-container>
      <i :class="showMenuTree ? 'el-icon-arrow-right show-menu' : 'el-icon-arrow-right hidden-menu'"
         @click="showMenuTree = !showMenuTree"></i>
      <el-aside v-if="showMenuTree" class="menu-aside" icon="el-icon-arrow-right">
        <menu-tree></menu-tree>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {navbar} from '../../components'
  import {mapState} from 'vuex'
  import {menuTree} from '../../components';

  export default {
    name: 'manager-home',
    data() {
      return {
        showMenuTree: true,
        collapse: false
      }
    },
    components: {
      navbar,
      menuTree
    },
    computed: {
      ...mapState([
        'fixedHeader'
      ]),
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .menu-aside {
    min-width: 250px;
    max-width: 250px;
    border-right: solid 1px #e6e6e6;
    position: relative;
  }

  .show-menu {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 250px;
  }

  .hidden-menu {
    position: absolute;
    z-index: 2;
    top: 50%;
  }
</style>
