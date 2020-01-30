<template>
  <div>
    <tree-common style="width: 19%;" @getTreeData="getTreeData" :api="api" :params="params" ref="treeCommon"></tree-common>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes">
    </nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange"
              style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="dicId" label="字典编号"></el-table-column>
      <el-table-column prop="dicName" label="字典名称"></el-table-column>
      <el-table-column prop="dicCode" label="字典编号"></el-table-column>
      <el-table-column prop="pid" label="上级字典编号"></el-table-column>
      <el-table-column prop="dicVal" label="字典值"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="setting" width="150" label="操作">
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
          :edit-data="editData" :edit-type="editType" :tree-data="currentData"></edit>
  </div>
</template>

<script>
  import {mixinIndex} from "@mixin";
  import {navOperates, pagination, treeCommon} from "@is";
  import edit from './edit'
  import {getSelfChildren} from "@api/dic";

  export default {
    name: "system-dic",
    data() {
      return {
        api: "dic",
        primaryKey: "dicId",
        // 当前树选中的节点数据
        currentData: {},
        // 当前树选中节点的dicId
        dicId: null,
        // 最顶级的字典以及子字典列表
        dics: [],
        // 是否存在树形结构
        existTree: true,
        // 树形结构参数
        params:{
          id:1
        }
      }
    },
    components: {
      navOperates,
      pagination,
      treeCommon,
      edit
    },
    mixins: [mixinIndex],
    watch: {
      dicId: function () {
        this.refresh();
      }
    },
    created() {
      this.getDics()
    },
    methods: {
      refresh() {
        this.getTableDatas();
      },
      refreshTree() {
        this.$refs.treeCommon.init();
      },
      getTreeData(nodeData) {
        this.currentData = nodeData;
        this.dicId = nodeData.treeId;
      },
      getTableDatas() {
        if (!this.dicId) {
          return;
        }
        let param = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          pid: this.dicId
        };
        this.$getEntitys('dic', param).then(resp => {
          this.tableDatas = resp.data;
          this.$store.commit('TOTAL', resp.total);
        })
      },
      getDics() {
        getSelfChildren(1).then(resp => {
          this.dics = resp.data;
        });
      }
    }
  }
</script>
