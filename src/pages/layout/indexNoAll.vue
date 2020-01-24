<template>
  <div>
    <navbar :showCarouset="false" :showVideoTypes="false"/>
    <app-content/>
    <link-footer/>
  </div>
</template>

<script>
  import {navbar,appContent,linkFooter} from '../../components'
  import {mapState} from 'vuex'

  export default {
    name: 'layout-indexNoAll',
    components: {
      // 上方导航栏
      navbar,
      // 主体router-view
      appContent,
      // 下方友情连接
      linkFooter
    },
    computed: {
      ...mapState([
        'fixedHeader'
      ]),
    },
    methods: {}
  }
</script>

<style scoped>
</style>
