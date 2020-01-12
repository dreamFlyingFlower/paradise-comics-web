<template>
  <div>
    <navbar/>
    <app-content/>
  </div>
</template>

<script>
  import {appContent, navbar} from '../../components'
  import {resize} from '@mixin'
  import {mapState} from 'vuex'

  export default {
    name: 'layout-index',
    components: {
      // 上方导航栏
      navbar,
      // 主体router-view
      appContent
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
