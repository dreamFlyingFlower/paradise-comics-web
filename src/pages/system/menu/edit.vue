<template xmlns="http://www.w3.org/1999/html">
  <el-dialog :title="title" :visible.sync="showEditDialog" width="30%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="formData.menuName" auto-complete="off" placeholder="请输入菜单名"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="formData.pid" placeholder="请选择上级菜单" style="width: 100%;">
          <el-option v-for="item in menus" :key="item.menuId" :label="item.menuName" :value="item.menuId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" prop="menuUrl">
        <el-input v-model="formData.menuUrl" auto-complete="off" placeholder="请输入菜单地址"></el-input>
      </el-form-item>
      <el-form-item label="菜单视图" prop="viewPath">
        <el-input v-model="formData.viewPath" auto-complete="off" placeholder="请输入菜单视图"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由名">
        <el-input v-model="formData.routerName" auto-complete="off" placeholder="请输入菜单视图"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="formData.icon" auto-complete="off" placeholder="请输入菜单图标"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="formData.sort" auto-complete="off" placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" auto-complete="false" placeholder="请输入备注"></el-input>
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
  import {getSelfChildren} from "@api/menu";

  export default {
    name: "edit",
    props: ["showEditDialog", "editData", 'editType'],
    data() {
      return {
        api: 'menu',
        formData: {
          menuId: null,
          menuName: null,
          pid: null,
          pname: null,
          menuUrl: null,
          viewPath: null,
          routerName: null,
          icon: null,
          redirect: null,
          sort: 0,
          type: 2,
          remark: null
        },
        rules: {
          menuName: [{required: true, validator: this.hasValue}],
          pid: [{required: true, message: "上级菜单不能为空"}],
          menuUrl: [{required: true, message: "菜单地址不能为空"}],
          viewPath: [{required: true, message: "菜单视图地址不能为空"}]
        },
        // 菜单树
        menus: []
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    watch: {
      "formData.pid": function () {
        console.log(this.formData.pname)
        if (this.menus && this.menus.length > 0) {
          let parent = this.menus.find(item => item.menuId === this.formData.pid);
          this.formData.pname = parent.menuName;
        }
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.getMenus();
      },
      getMenus() {
        let rootId = this.$store.getters.config.ROOT_MENU_ID;
        getSelfChildren(rootId ? rootId : 0).then(resp => {
          this.menus = resp.data;
          if (this.menus && this.menus.length > 0 && this.editType === 1) {
            this.formData.pid = this.menus[0].menuId;
            this.formData.pname = this.menus[0].pname;
          }
        })
      }
    }
  }
</script>
