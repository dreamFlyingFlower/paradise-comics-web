<template>
  <div>
    <navbar :showCarouset="true" :checkLogin="true"/>
    <app-content/>
  </div>
</template>

<script>
  import {navbar,appContent,linkFooter} from '../../components'
  import {mapState} from 'vuex'

  export default {
    name: 'layout-login',
    components: {
      // 上方导航栏
      navbar,
      // 主体router-view
      appContent
    },
    computed: {
      ...mapState([
        'fixedHeader'
      ]),
    }
  }
</script>

<style scoped>
</style>
