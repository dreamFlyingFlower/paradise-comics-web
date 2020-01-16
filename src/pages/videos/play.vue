<template>
  <div class="player">
    <h3 style="text-align: center">{{detail.name}}</h3>
    <!-- 视频播放 -->
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @play="playIt($event)"
                  @pause="pauseIt($event)"></video-player>
    <!-- 评论 -->
    <template >
      <el-row>
        <el-col :span="24" v-for="c in comments" :key="c.commentId" class="comment">{{c.content}}</el-col>
      </el-row>
    </template>
    <template v-if="!$store.state.user.username">
      登录之后才能评论,请
      <router-link :to="{path:'/login',params:{}}">登录</router-link>
    </template>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player'
  import 'videojs-contrib-hls'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'

  export default {
    name: "play",
    data() {
      return {
        detail:{},
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
          autoplay: true, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", //播放类型，如果为rtmp配置为rtmp/mp4
            // src: "http://localhost:12345/av/av75.mp4" //直播流地址
          }],
          poster: "poster.jpg", //你的封面地址
          // width: document.documentElement.clientWidth/2,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        },
        comments: []
      }
    },
    components: {
      videoPlayer
    },
    created() {
      this.getVideoById();
      this.getComments();
    },
    methods: {
      playIt() {

      },
      pauseIt() {

      },
      // 获得视频的详细信息
      getVideoById(){
        this.$getById('video',this.$route.params.videoId).then(resp=>{
          this.detail = resp.data;
          this.$set(this.playerOptions.sources[0],"src",process.env.API_ROOT+this.detail.videoSrc);
          this.$set(this.playerOptions,"poster",process.env.API_ROOT + this.detail.cover);
        })
      },
      // 获得该视频的评论,未登录不显示
      getComments() {
        if (!this.$store.state.user.username) {
          // return;
        }
        this.$getEntitys('comment').then(resp => {
          this.comments = resp.data;
        })
      }
    }
  }
</script>
<style lang="scss">
  .video-player {
    margin: 20px 5%;
    width: 90%;
  }
  .comment{
    text-align: center;
  }
</style>