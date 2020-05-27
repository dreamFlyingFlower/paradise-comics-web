<template>
  <div>
    <navbar :showCarouset="true" :showVideoTypes="true"/>
    <app-content/>
    <link-footer/>
  </div>
</template>

<script>
  import {navbar,appContent,linkFooter} from '../../components'
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
    computed: {
      ...mapState([
        'fixedHeader'
      ]),
    }
  }
</script>