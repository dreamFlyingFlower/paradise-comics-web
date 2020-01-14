<template>
  <div>
    <!-- 视频主体 [[ -->
    <el-row>
      <el-col :span="6" v-for="v in videos" :key="v.videoId">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="API_ROOT+v.videoSrc">
            <img :src="API_ROOT+v.cover" :alt="v.title" class="image" style="height: 250px;">
            <div style="padding: 14px;">
              <span class="font-ellipsis" :title="v.name">{{v.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{v.createtime}}</time>
              </div>
            </div>
          </a>
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

<style scoped>

</style>
