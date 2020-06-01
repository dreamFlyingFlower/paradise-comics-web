<template>
  <div>
    <h2 class="footer-title">关于我们</h2>
    <hr>
    <article class="about-content" v-text="abouts.length > 0 ? abouts[0].content : ''"></article>
  </div>
</template>

<script>
export default {
  name: "about",
  data () {
    return {
      abouts: []
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.$getEntitys('about').then(resp => {
        this.abouts = resp.data;
      });
    }
  }
}
</script>

<style scoped>
@import url("./_index.scss");
</style>
