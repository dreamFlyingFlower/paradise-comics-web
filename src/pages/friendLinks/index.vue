<template>
  <div>
    <h6>友情链接</h6>
    <hr>
    <el-row>
      <el-col v-for="item in friendLinks" :key="item.friendLinkId" >
        <el-link :underline="false" :href="item.url" v-text="item.linkName"></el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "friendLink",
    data(){
      return {
        friendLinks:[]
      }
    },
    created() {
      this.getFriendLinks();
    },
    methods:{
      getFriendLinks(){
        this.$getEntitys('friendLink').then(resp=>{
          this.friendLinks = resp.data;
        });
      }
    }
  }
</script>

<style scoped>

</style>
