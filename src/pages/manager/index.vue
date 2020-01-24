<template>
  <div>
    <menu-tree :type="2"></menu-tree>
  </div>
</template>

<script>
  import {menuTree} from '../../components';
  // 管理页面首页
  export default {
    data() {
      return {
      }
    },
    components:{
      menuTree
    },
    created() {
    },
    methods: {
      beforeClose(){

      }
    }
  }
</script>
