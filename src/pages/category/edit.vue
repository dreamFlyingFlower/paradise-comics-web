<template>
  <el-dialog :title="title" :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="formData.categoryName" placeholder="请输入分类名称" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属父类" prop="categoryName" >
        <el-select v-model="formData.pid" style="width: 100%;" placeholder="请选择父类">
          <el-option v-for="item in ancestors" :key="item.categoryId" :value="item.categoryId" :label="item.categoryName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="formData.sortIndex" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="分类备注">
        <el-input v-model="formData.remark" placeholder="请输入分类备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="handlerData">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {getAncestors} from '@api/category'
  import mixinEdit from '@mixin/mixinEdit';
  export default {
    name: 'edit',
    props: ['showEditDialog', 'editData', 'editType'],
    data() {
      return {
        api: 'category',
        formData: {
          categoryId: null,
          categoryName: null,
          pid:null,
          pname:null,
          sortIndex:0,
          remark: null
        },
        rules: {
          categoryName: { required: true, message: '分类名称不能为空', trigger: 'blur' },
          pid:{ required: true, message: '所属父类不能为空', trigger: 'blur' }
        },
        ancestors:[]
      };
    },
    mixins: [mixinEdit],
    watch:{
      "formData.pid":function(newVal){
        if (this.ancestors && this.ancestors.length > 0) {
          let that = this.ancestors.find(item=>item.categoryId === newVal);
          this.formData.pname = that.categoryName;
        }
      }
    },
    created(){
      this.getAncestors();
    },
    methods:{
      getAncestors(){
        getAncestors().then(resp=>{
          this.ancestors = resp.data;
        })
      }
    }
  };
</script>
