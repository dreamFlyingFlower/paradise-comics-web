<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection"
                  @deletes="deletes">
    </nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange"
              style="width: 100%;" :highlight-current-row="true">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="categoryId" label="分类编号" width="100px"></el-table-column>
      <el-table-column prop="categoryName" label="分类名称"></el-table-column>
      <el-table-column prop="pname" label="所属分类"></el-table-column>
      <el-table-column prop="remark" label="分类备注"></el-table-column>
      <el-table-column prop="setting" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="openEditDialog(scope.row,2)">编辑
          </el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="$remove(api,scope.row[primaryKey])">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <edit v-if="showEditDialog" :show-edit-dialog="showEditDialog" :edit-data="editData" :edit-type="editType"
          @closeDialog="closeDialog"></edit>
  </div>
</template>

<script>
  import mixinIndex from '@/mixin/mixinIndex';
  import edit from './edit';
  import {pagination, navOperates} from '@is';

  export default {
    name: "category",
    data() {
      return {
        api: 'category',
        primaryKey: 'categoryId'
      }
    },
    components: {
      pagination,
      navOperates,
      edit
    },
    mixins: [mixinIndex],
    created() {
    },
    methods: {
      refresh() {
        this.getTableDatas();
      },
      getTableDatas() {
        this.$getPage('category', {pageIndex: this.pageIndex, pageSize: this.pageSize}).then(resp => {
          this.tableDatas = resp.data;
          this.$store.commit('TOTAL', resp.total);
        });
      }
    }
  }
</script>