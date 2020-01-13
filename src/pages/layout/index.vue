<template>
  <div>
    <navbar/>
    <app-content/>
    <link-footer/>
  </div>
</template>

<script>
  import {navbar,appContent,linkFooter} from '../../components'
  import {resize} from '@mixin'
  import {mapState} from 'vuex'

  export default {
    name: 'layout-index',
    components: {
      // 上方导航栏
      navbar,
      // 主体router-view
      appContent,
      // 下方友情连接
      linkFooter
    },
    mixins: [resize],
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
