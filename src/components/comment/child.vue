<template>
  <div style="margin-left:90px;">
    <el-col v-for="item in comments" :key="item.commentId">
      <img
        :src="item.avatar ? item.avatar : item.create.sex ? (item.create.sex === 2 ? 'static/images/girl.jpg' : 'static/images/boy.jpg') : 'static/images/boy.jpg'"
        alt="loading" class="comment-img-children" />
      <div class="comment-content-children">
        <h5 v-text="item.create.nickname ? item.create.nickname : item.create.username" style="display:inline-block;"></h5>
        <h5 v-if="item.reply" v-text="'回复'+(item.reply.nickname ? item.reply.nickname : item.reply.username)"
        style="display:inline-block;"></h5>
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
  props: ["comments", "parent"],
  methods: {
    reply (item) {
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
