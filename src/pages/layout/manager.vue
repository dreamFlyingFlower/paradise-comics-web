<template>
  <div>
    <navbar :showCarouset="false" :showVideoTypes="false"/>
    <router-view/>
  </div>
</template>

<script>
  import {navbar} from '../../components'
  import {mapState} from 'vuex'

  export default {
    name: 'manager-home',
    components: {
      // 上方导航栏
      navbar
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
