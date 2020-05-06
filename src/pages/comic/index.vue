<template>
  <div>
    <nav-operates  @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes"
    ></nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange" style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="动漫名称"></el-table-column>
      <el-table-column prop="year" label="动漫年代"></el-table-column>
      <el-table-column prop="state" label="动漫状态">
        <template slot-scope="scope">
          {{ getComicState(scope) }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="作者"></el-table-column>
      <el-table-column prop="createtime" label="发布时间"></el-table-column>
      <el-table-column prop="setting" width="350" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="openEditDialog(scope.row, 2)">编辑</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="$remove(api, scope.row[primaryKey])">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <edit  v-if="showEditDialog" :show-edit-dialog="showEditDialog" @closeDialog="closeDialog" :edit-data="editData" :edit-type="editType"></edit>
  </div>
</template>

<script>
import { mixinIndex } from '@mixin';
import { navOperates, pagination } from '@is';
import { getSelfChildrenCode } from '@api/dic';
import edit from './edit.vue';

export default {
  name: 'anime-comic',
  data() {
    return {
      api: 'comic',
      primaryKey: 'id',
      comicStates:[]
    };
  },
  components: {
    navOperates,
    pagination,
    edit
  },
  mixins: [mixinIndex],
  created() {
    this.getComicStates();
  },
  methods: {
    getComicStates(){
      getSelfChildrenCode('COMIC_STATE',true).then(resp =>{
        this.comicStates = resp.data;
      });
    },
    getComicState(scope){
      let item = this.comicStates.find(i => i.dicVal === scope.row.state);
      if (item && Object.keys(item) && Object.keys(item).length > 0) {
        return item.dicName;
      }
    }
  }
};
</script>
