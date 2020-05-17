<template>
  <div>
    <div>
      <div v-for="p in showCategoryDatas" :key="p.categoryId" v-show="p.children && p.children.length > 0">
        {{p.categoryName}} :
        <el-button type="text" plain v-for="c in p.children" :key="c.categoryId" v-text="c.categoryName"
                   @click="searchComics(c)"></el-button>
      </div>
    </div>
    <div>
      <!-- 搜索的动画展示 -->
      <img v-for="item in showComicDatas" :key="item.id" :src="item.cover" alt="loading...">
    </div>
  </div>
</template>

<script>
  import {navOperates, pagination} from '@is';

  export default {
    name: "category",
    data() {
      return {
        showCategoryDatas: [], // 分类数据展示
        showComicDatas:[], // 动漫数据展示
        params: []    // 参数
      }
    },
    components: {
      pagination,
      navOperates
    },
    created() {
      this.getTree();
      this.searchComics();
    },
    methods: {
      getTree() {
        this.$getTree('category', {id: 0}).then(resp => {
          this.showCategoryDatas = resp.data;
        });
      },
      // 点击选中或取消分类,每次点击都查询一次
      searchComics(c) {
        let ids = null;
        if (c) {
          let exist = this.params.find(item => item === c.categoryId);
          if (exist) {
            let index = this.params.findIndex(item => item === c.categoryId);
            this.params.splice(index, 1);
          } else {
            this.params.push(c.categoryId);
          }
          if (this.params.length !== 0){
            ids = this.params.join(",");
          }else{
            ids = null;
          }
        }
        this.$getPage('comic', {categories: ids}).then(resp=>{
          this.showComicDatas =  resp.data;
        });
      }
    }
  }
</script>
