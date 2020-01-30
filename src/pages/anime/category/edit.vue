<template>
  <el-dialog :title="title" center :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" class="demo-ruleForm" label-width="100px">
      <el-form-item label="名称" prop="categoryName">
        <el-input v-model="formData.categoryName" auto-complete="off" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="子分类" prop="content">
        <el-input v-model="formData.content" auto-complete="off" placeholder="请输入子分类"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="formData.sort" auto-complete="off" placeholder="请输入排序编号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog(false)">取 消</el-button>
      <el-button type="primary" @click="handlerData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import mixinEdit from "@mixin/mixinEdit";
  import {getSelfChildrenCode} from '@api/dic';
  import Crypto from "../../../utils/crypto";

  export default {
    name: "edit",
    props: ["showEditDialog", "editData", 'editType', 'treeData'],
    data() {
      return {
        api: 'category',
        formData: {
          categoryId: null,
          categoryName: null,
          content: null,
          sort: null,
        },
        rules: {
          categoryName: [{required: true, message: "名称不能为空", trigger: "blur"},
            {max: 12, message: "最大长度不得超过12位", trigger: "blur"}],
        }
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    created() {
    },
    methods: {}
  }
</script>

<style scoped>

</style>
