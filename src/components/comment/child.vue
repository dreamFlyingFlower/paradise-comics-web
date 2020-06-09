<template>
  <div :style="children ? 'margin-left:90px' : ''">
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
    </el-col>
  </div>
</template>

<script>
export default {
  props: ["comments", "children", "parent"],
  methods: {
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
