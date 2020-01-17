<template>
  <div>
    <!-- 视频主体 [[ -->
    <el-row :gutter="5">
      <el-col :span="6" v-for="v in videos" :key="v.videoId">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="{name:'play',params:{videoId:v.videoId}}">
            <img :src="API_ROOT+v.cover" :alt="v.title" class="image">
            <div style="padding: 14px;">
              <span class="font-ellipsis" :title="v.name">{{v.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{v.createtime}}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "videos",
    data(){
      return {
        typeId:"",
        API_ROOT:process.env.API_ROOT,
        videos:[]
      }
    },
    created() {
      this.typeId = this.$route.params.typeId;
      this.getVideos();
    },
    methods:{
      getVideos(){
        this.$getEntitys('video',{videoClass:this.typeId}).then(resp=>{
          this.videos = resp.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.image{
  height: 15.625rem;
  border-radius: 0.625rem;
}
</style>
