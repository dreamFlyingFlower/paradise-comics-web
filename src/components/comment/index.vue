<template>
  <div :style="children ? 'margin-left:70px' : ''">
    <el-row style="margin-left:0;margin-right:0;">
      <el-col v-for="item in comments" :key="item.commentId">
        <img
          :src="item.avatar ? item.avatar : item.user.sex ? (item.user.sex === 2 ? 'static/images/girl.jpg' : 'static/images/boy.jpg') : 'static/images/boy.jpg'"
          alt="loading"
          :class="children ? 'detail-comment-img-children' : 'detail-comment-img'"
        />
        <div :class="children ? 'detail-comment-content-children' : 'detail-comment-content'">
          <h5 v-text="item.user.nickname ? item.user.nickname : item.user.username"></h5>
          <p v-text="item.content"></p>
          <div class="bottom clearfix detail-comment-info">
            <time class="time">{{ item.createtime }}</time>
            <div class="detail-comment-vote" @click="handleVote(1, item)">
              <svg-icon slot="prefix" icon-class="agree" />
              <span v-text="item.approve"></span>
            </div>
            <div class="detail-comment-vote" @click="handleVote(0, item)">
              <svg-icon slot="prefix" icon-class="agree" style="transform: scale(1,-1);" />
              <span v-text="item.against"></span>
            </div>
            <span class="detail-comment-reply" @click="reply">回复</span>
          </div>
        </div>
        <comment v-if="item.children && item.children.length > 0" :comments="item.children" :children="true"></comment>
        <el-col v-if="!children && showReply" class="detail-comment-reply-content">
          <img src="static/images/boy.jpg" alt="loading" class="detail-comment-img-children" />
          <div class="detail-comment-reply-cover"><el-input type="textarea" v-model="formData.content" :disabled="!showReply"></el-input></div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleVote } from "@api/comment";
export default {
  name: "comment",
  props: ["comments", "children"],
  data() {
    return {
      // 是否显示评论
      showReply: false,
      formData: {
        commenId: null,
        arguedId: null,
        type: 1,
        creater: this.$store.getters.user.userId,
        subject: null,
        content: null
      }
    };
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
    // 点击回复
    reply() {
      this.showReply = !this.showReply;
    },
    // 提交评论
    handleData() {}
  }
};
</script>

<style lang="scss">
@import "./_index.scss";
</style>
