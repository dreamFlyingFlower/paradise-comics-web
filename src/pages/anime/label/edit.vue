<template>
  <el-dialog :title="title" center :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" class="demo-ruleForm" label-width="100px">
      <el-form-item label="标签名" prop="labelName">
        <el-input v-model="formData.labelName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="标签简称" prop="simpleName">
        <el-input v-model="formData.simpleName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="标签颜色">
        <el-color-picker v-model="formData.labelColor"></el-color-picker>
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
        api: 'label',
        formData: {
          labelId: null,
          labelName: null,
          simpleName: null,
          labelColor: 'purple'
        },
        rules: {
          labelName: [{required: true, message: "标签名不能为空", trigger: "blur"},
            {max: 12, message: "最大长度不得超过12位", trigger: "blur"}],
          simpleName: [{required: true, message: "标签简称不能为空", trigger: "change"},
            {max: 12, message: "最大长度不得超过12位", trigger: "blur"}],
          labelColor: [{required: true, message: "标签颜色不能为空", trigger: "change"}]
        }
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit]
  }
</script>

<style >
  .el-dialog--center .el-dialog__body {
    padding-bottom: 0 ;
  }
</style>
