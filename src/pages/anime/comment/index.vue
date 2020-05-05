<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes"
    ></nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange" style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="anime.name" label="名称"></el-table-column>
      <el-table-column prop="subject" label="主题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          {{getCommentState(scope)}}
        </template>
      </el-table-column>
      <el-table-column prop="user.username" label="评论人"></el-table-column>
      <el-table-column prop="createtime" label="评论时间"></el-table-column>
      <el-table-column prop="setting" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="openEditDialog(scope.row, 2)">编辑</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="$remove(api, scope.row[primaryKey])">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <edit v-if="showEditDialog" :show-edit-dialog="showEditDialog" @closeDialog="closeDialog" :edit-data="editData"
          :edit-type="editType"></edit>
  </div>
</template>

<script>
  import {mixinIndex} from '@mixin';
  import {navOperates, pagination} from '@is';
  import edit from './edit.vue';
  import {getSelfChildrenCode} from '@api/dic'

  export default {
    name: 'anime-comment',
    data() {
      return {
        api: 'comment',
        primaryKey: 'commentId',
        commentStates: []
      };
    },
    components: {
      navOperates,
      pagination,
      edit
    },
    mixins: [mixinIndex],
    created() {
      this.getCommentStates();
    },
    methods: {
      getCommentStates(){
        getSelfChildrenCode("COMMENT_STATE").then(resp => {
          this.commentStates = resp.data;
        });
      },
      getCommentState(scope){
        let item = this.commentStates.find(i => i.dicVal === scope.row.state);
        if (item && Object.keys(item) && Object.keys(item).length > 0) {
          return item.dicName;
        }
      }
    }
  };
</script>
