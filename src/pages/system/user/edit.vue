<template>
  <el-dialog :title="title" center :visible.sync="showEditDialog" width="80%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" class="demo-ruleForm" label-width="100px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-show="editType===1">
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="formData.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formData.sex" auto-complete="off" placeholder="请选择性别" style="width:100%">
              <el-option v-for="item in sexs" :key="item.id" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户类型" prop="type">
            <el-select v-model="formData.type" auto-complete="off" placeholder="请选择用户类型" style="width:100%">
              <el-option v-for="item in userTypes" :key="item.dicId" :label="item.dicName"
                         :value="item.dicVal"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态" prop="state">
            <el-select v-model="formData.state" auto-complete="off" placeholder="请选择用户类型" style="width:100%">
              <el-option v-for="item in userStates" :key="item.dicId" :label="item.dicName"
                         :value="item.dicVal"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮件地址">
            <el-input v-model="formData.email" auto-complete="off" placeholder="请输入邮件地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input v-model="formData.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="头像">
            <el-input v-model="formData.avatar" auto-complete="off" placeholder="请输入头像"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="个性签名">
            <el-input v-model="formData.introduce" auto-complete="off" placeholder="请输入个性签名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input v-model="formData.userinfo.realname" auto-complete="off" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄">
            <el-input v-model="formData.userinfo.age" auto-complete="off" placeholder="请输入年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号">
            <el-input v-model="formData.userinfo.idcard" auto-complete="off" placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址">
            <el-input v-model="formData.userinfo.address" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生日">
            <el-input v-model="formData.userinfo.birthday" auto-complete="off" placeholder="请输入生日"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教育程度">
            <el-input v-model="formData.userinfo.education" auto-complete="off" placeholder="请输入教育程度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业学校">
            <el-input v-model="formData.userinfo.school" auto-complete="off" placeholder="请输入毕业学校"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="兴趣爱好">
            <el-input v-model="formData.userinfo.interest" auto-complete="off" placeholder="请输入兴趣爱好"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注">
            <el-input v-model="formData.userinfo.remark" auto-complete="off" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
        api: 'user',
        formData: {
          userId:null,
          username: null,
          pwd: "123456",
          sex: "男",
          email: null,
          mobile: null,
          avatar: null,
          introduce:this.$store.getters.config.USER_INTRODUCE,
          type: 2,
          state: 1,
          userinfo: {
            realname: null,
            age: null,
            idcard: null,
            address: null,
            birthday: null,
            education: null,
            school: null,
            interest: null,
            remark: null
          }
        },
        rules: {
          username: [{required: true, message: "用户名不能为空", trigger: "blur"},
            {max: 12, message: "最大长度不得超过12位", trigger: "blur"}],
          pwd: [{required: true, message: "密码不能为空", trigger: "blur"},
            {min: 6, message: "密码长度不得少于6个字符", trigger: "blur"},
            {max: 12, message: "密码长度不能超过12个字符串", trigger: "blur"}],
          sex: [{required: true, message: "性别不能为空", trigger: "change"}],
          type: [{required: true, message: "用户类型不能为空", trigger: "change"}],
          state: [{required: true, message: "用户状态不能为空", trigger: "change"}]
        },
        sexs: this.$store.getters.config.USER_SEX,
        userTypes: [],
        userStates: []
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    created() {
      this.getUserTypes();
      this.getUserStates();
    },
    methods: {
      getUserTypes() {
        getSelfChildrenCode("USER_TYPE", true).then(resp => {
          this.userTypes = resp.data;
        });
      },
      getUserStates() {
        getSelfChildrenCode("USER_STATE", true).then(resp => {
          this.userStates = resp.data;
        });
      },
      // 注册
      handlerData() {
        this.$refs['formData'].validate(valid => {
          if (!valid) {
            this.$message("校验失败,请检查参数");
            return false;
          } else {
            if (this.editType === 1) {
              this.formData.password = Crypto.AESEncode(this.formData.pwd + "_" + new Date().getTime());
              this.$create(this.api, this.formData);
              this.close();
            } else if (this.editType === 2) {
              this.$edit(this.api, this.formData);
              this.close();
            }
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
