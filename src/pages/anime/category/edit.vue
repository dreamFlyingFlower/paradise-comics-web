<template>
  <el-dialog :title="title" center :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" class="demo-ruleForm" label-width="100px">
      <el-form-item label="所属类别" prop="pid">
        <tree-category @curData="curData" @clickNode="clickNode"></tree-category>
      </el-form-item>
      <el-form-item label="名称" prop="categoryName">
        <el-input v-model="formData.categoryName" auto-complete="off" placeholder="请输入名称"></el-input>
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
  import { treeCategory } from "@is";
  import mixinEdit from "@mixin/mixinEdit";

  export default {
    name: "edit",
    props: ["showEditDialog", "editData", 'editType', 'treeData'],
    data() {
      return {
        api: 'category',
        formData: {
          categoryId: null,
          categoryName: null,
          pid:null,
          sort: null
        },
        rules: {
          pid: { required: true, message: "所属类型不能为空", trigger: "change" },
          categoryName: [{ required: true, message: "名称不能为空", trigger: "blur" },
            { max: 12, message: "最大长度不得超过12位", trigger: "blur" }
          ],
        }
      }
    },
    components: {
      treeCategory
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    created() {},
    methods: {
      // 分类树加载之后初次显示
      curData(treeData){
        this.formData.pid = treeData.categoryId;
      },
      // 点击分类树节点处理数据
      clickNode(node){
        this.formData.pid = node.categoryId;
      }
    }
  }
</script>