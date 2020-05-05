<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes">
    </nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange"
              style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="linkName" label="名称"></el-table-column>
      <el-table-column prop="linkSrc" label="链接地址"></el-table-column>
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

  export default {
    name: "anime-friendLink",
    data() {
      return {
        api: "friendLink",
        primaryKey: "friendLinkId",
      }
    },
    components: {
      navOperates,
      pagination,
      edit
    },
    mixins: [mixinIndex]
  }
</script>
