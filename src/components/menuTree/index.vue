<template>
  <div style="height: available">
    <el-menu :default-active="activeIndex" class="el-menu-vertical" mode="vertical"
             menu-trigger="click" @select="handleSelect">
      <menu-item v-for="item in menus" :treeData="item" :key="item.treeId"></menu-item>
    </el-menu>
  </div>
</template>

<script>
  import menuItem from './menuItem'
  export default {
    name: "menuTree",
    props:["type"],
    data(){
      return {
        activeIndex:'3',
        menus:[]
      }
    },
    components:{
      menuItem
    },
    created() {
      this.getMenus();
    },
    methods:{
      getMenus(){
        this.$getTree('menu',{id:this.$store.getters.user.userId,type:this.type ? this.type : 1}).then(resp=>{
          this.menus = resp.data;
        });
      },
      handleSelect(){

      }
    }
  }
</script>

<style scoped>

</style>
