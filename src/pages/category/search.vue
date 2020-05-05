<template>
  <div>
  	<div>
	  	<div v-for="p in showDatas" :key="p.categoryId" v-show="p.children && p.children.length > 0">
	  		{{p.categoryName}} : 
	  		<el-button type="text" plain v-for="c in p.children" v-text="c.categoryName" @click="searchComics"></el-button>
	  	</div>
  	</div>
  	<div>
  		<!-- 搜索的动画展示 -->
  	</div>
  </div>
</template>

<script>
  import mixinIndex from '@/mixin/mixinIndex';
  import {pagination, navOperates} from '@is';

  export default {
    name: "category-search",
    data() {
      return {
      	showDatas:[]
      }
    },
    components: {
      pagination,
      navOperates
    },
    mixins: [mixinIndex],
    created() {
      this.getTree();
    },
    methods: {
      getTree() {
        this.$getTree('category',0).then(resp => {
          this.showDatas = resp.data;
        });
      },
      searchComics(){

      }
    }
  }
</script>