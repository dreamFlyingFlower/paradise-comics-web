<template>
  <div :style="children ? 'margin-left:90px' : ''">
    <el-row style="margin-left:0;margin-right:0;">
      <el-col v-for="item in comments" :key="item.commentId">
        <img
          :src="item.avatar ? item.avatar : item.user.sex ? (item.user.sex === 2 ? 'static/images/girl.jpg' : 'static/images/boy.jpg') : 'static/images/boy.jpg'"
          alt="loading"
          :class="children ? 'comment-img-children' : 'comment-img'"
        />
        <div :class="children ? 'comment-content-children' : 'comment-content'">
          <h5 v-text="item.user.nickname ? item.user.nickname : item.user.username"></h5>
          <p v-text="item.content"></p>
          <div class="bottom clearfix comment-info">
            <time class="time">{{ item.createtime }}</time>
            <div class="comment-vote" @click="handleVote(1, item)">
              <svg-icon slot="prefix" icon-class="agree" />
              <span v-text="item.approve"></span>
            </div>
            <div class="comment-vote" @click="handleVote(0, item)">
              <svg-icon slot="prefix" icon-class="agree" style="transform: scale(1,-1);" />
              <span v-text="item.against"></span>
            </div>
            <span class="comment-reply" @click="reply(item)">回复</span>
          </div>
        </div>
        <!-- <comment v-if="item.children && item.children.length > 0" :comments="item.children" :children="true"></comment> -->
        <child v-if="item.children && item.children.length > 0"
        :comments="item.children"
        :children="true"
        :parent="item" @showParentReply="showParentReply">
        </child>
        <el-col v-if="showReply === item.commentId" class="comment-reply-content">
          <img src="static/images/boy.jpg" alt="loading" class="comment-img-children" />
          <div class="comment-reply-info">
            <div class="comment-reply-cover" v-if="!$store.getters.token">
              <span>
                请先
                <router-link :to="{ path: '/login', query: { redirect: $route.path } }">登录</router-link>
                后发表评论ლ(╹◡╹ლ)
              </span>
            </div>
            <div class="comment-textarea">
              <el-input class="comment-textarea-content" type="textarea" v-model="formData.content" :disabled="!$store.getters.token"></el-input>
              <button :class="$store.getters.token ? 'comment-publish-b' : 'comment-publish-a'" @click="handleData()">发表评论</button>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleVote } from "@api/comment";
import child from "./child.vue";
export default {
  name: "comment",
  props: ["comments", "children", "arguded"],
  data() {
    return {
      // 当前点击回复数据
      need: {},
      // 当前显示评论的编号
      showReply: 0,
      formData: {
        arguedId: null,
        type: 0,
        creater: this.$store.getters.user.userId,
        subject: null,
        content: null
      }
    };
  },
  components: {
    child
  },
  methods: {
    // 处理点赞或返回,type为1表示赞正,0表示反对
    handleVote(type, item) {
      if (this.$store.getters.token) {
        handleVote({ id: item.commentId, userId: this.$store.getters.user.userId, type: type }).then();
      } else {
        this.$message("请先登录");
      }
    },
    // 处理子级数据点击回复显示
    showParentReply(datas){
      let parent = datas.parent;
      let child = datas.child;
      if (this.showReply === parent.commentId) {
        this.showReply = 0;
      } else {
        this.showReply = parent.commentId;
        this.formData.arguedId = child.commentId;
      }
    },
    // 点击回复
    reply(comment) {
      if (this.showReply === comment.commentId) {
        this.showReply = 0;
      } else {
        this.showReply = comment.commentId;
        this.formData.arguedId = comment.commentId;
      }
    },
    // 提交评论
    handleData() {
      if (this.formData.content.trim()) {
        this.formData.creater = this.$store.getters.user.userId;
        this.formData.subject = this.arguded.name;
        this.$create("comment", this.formData, true).then(resp => {
          if (resp.code === 1) {
            this.$emit("freshData");
            this.showReply = 0;
            this.formData.subject = "";
            this.formData.content = "";
          }
        });
      } else {
        this.$message("评论内容为空");
      }
    }
  }
};
</script>

<style lang="scss">
@import "./_index.scss";
</style>
