<template>
  <div>
    <el-menu :default-active="'1'" class="el-menu-demo" mode="vertical"
             menu-trigger="click" @select="handleSelect" :collapse="collapse">
      <menu-leaf v-for="item in menus" :treeData="item" :key="item.treeId"></menu-leaf>
    </el-menu>
  </div>
</template>

<script>
  import menuLeaf from "./menuLeaf";
  export default {
    name: "menuTree",
    data(){
      return {
        activeIndex:'3',
        collapse:false,
        menus:[]
      }
    },
    components:{
      menuLeaf
    },
    created() {
      this.getMenus();
    },
    methods:{
      getMenus(){
        this.$getTree('menu',{id:this.$store.getters.user.userId}).then(resp=>{
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
