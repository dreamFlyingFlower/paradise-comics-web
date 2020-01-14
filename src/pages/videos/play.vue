<template>
  <video :src="src" ></video>
</template>

<script>
  export default {
    name: "play",
    data() {
      return {
        src: ""
      }
    },
    created() {
      this.src = this.$route.params.src
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>

</style>
