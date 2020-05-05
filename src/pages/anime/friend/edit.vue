<template>
  <el-dialog :title="title" center :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" class="demo-ruleForm" label-width="100px">
      <el-form-item label="名称" prop="linkName">
        <el-input v-model="formData.linkName" auto-complete="off" placeholder="请输入友联名称"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="linkSrc">
        <el-input
          v-model="formData.linkSrc"
          auto-complete="off"
          placeholder="请输入链接地址"
          @keyup.enter.native="handlerData"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog(false)">取 消</el-button>
      <el-button type="primary" @click="handlerData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import mixinEdit from '@mixin/mixinEdit';

export default {
  name: 'edit',
  props: ['showEditDialog', 'editData', 'editType', 'treeData'],
  data() {
    return {
      api: 'friendLink',
      formData: {
        friendLinkId: null,
        linkName: null,
        linkSrc: null
      },
      rules: {
        linkName: [{ required: true, message: '友联名称不能为空', trigger: 'blur' }],
        linkSrc: [{ required: true, message: '链接地址不能为空', trigger: 'blur' }]
      }
    };
  },
  // 通用属性和方法
  mixins: [mixinEdit]
};
</script>
