<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes">
    </nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange" row-key="categoryId"
              :tree-props="{children:'children'}" style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="categoryId" label="编号"></el-table-column>
      <el-table-column prop="categoryName" label="名称"></el-table-column>
      <el-table-column prop="pid" label="上级编号"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="comicNum" label="动漫数"></el-table-column>
      <el-table-column prop="setting" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="openEditDialog(scope.row,2)">编辑
          </el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="$remove(api,scope.row[primaryKey])">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <edit v-if="showEditDialog" :show-edit-dialog="showEditDialog" @closeDialog="closeDialog"
          :edit-data="editData" :edit-type="editType"></edit>
  </div>
</template>

<script>
  import {mixinIndex} from "@mixin";
  import {navOperates, pagination} from "@is";
  import edit from './edit'
  import {getSelfChildrenCode} from '@api/dic'

  export default {
    name: "content-category",
    data() {
      return {
        api: "category",
        primaryKey: "categoryId"
      }
    },
    components: {
      navOperates,
      pagination,
      edit
    },
    mixins: [mixinIndex],
    created() {
    },
    methods: {
      getTableDatas() {
        let param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        };
        let categoryId = this.$store.getters.config.ROOT_CATETORY_ID;
        param.pid = categoryId ? categoryId : 0;
        this.$getEntitys('category', param).then(resp => {
          this.tableDatas = resp.data;
          this.$store.commit('TOTAL', resp.total);
        });
      }
    }
  }
</script>
