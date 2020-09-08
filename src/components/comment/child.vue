<template>
  <div style="margin-left:90px;">
    <el-col v-for="(item, index) in comments" :key="index" v-if="index < count">
      <img
        :src="item.avatar ? item.avatar : item.create.sex ? (item.create.sex === 2 ? '/web/static/images/girl.jpg' : '/web/static/images/boy.jpg') : '/web/static/images/boy.jpg'"
        alt="loading"
        class="comment-img-children"
      />
      <div class="comment-content-children">
        <h5 v-text="item.create.nickname ? item.create.nickname : item.create.username" style="display:inline-block;"></h5>
        <h5 v-if="item.reply" v-text="'回复' + (item.reply.nickname ? item.reply.nickname : item.reply.username)" style="display:inline-block;"></h5>
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
    </el-col>
    <div class="comment-btn-more">
      <span v-if="showAll" @click="count = 10000">
        共{{ comments.length }}条回复,
        <a>点击查看</a>
      </span>
    </div>
  </div>
</template>

<script>
import { handleVote } from "@api/comment";
export default {
  props: ["comments", "parent"],
  data() {
    return {
      count: 2
    };
  },
  created() {
    this.showAll = this.comments.length > 2;
  },
  methods: {
    // 处理点赞或返回,type为1表示赞正,0表示反对
    handleVote(type, item) {
      if (this.$store.getters.token) {
        handleVote({ id: item.commentId, userId: this.$store.getters.user.userId, type: type }).then(resp => {
          if (resp.code === 1) {
            item.approve = resp.data.approve;
            item.against = resp.data.against;
          }
        });
      } else {
        this.$message("请先登录");
      }
    },
    reply(item) {
      let params = {
        parent: this.parent,
        child: item
      };
      this.$emit("showParentReply", params);
    }
  }
};
</script>

<style lang="scss">
@import "./_index.scss";
</style>
