<template>
  <div class="user">
    <el-divider class="divider">注册</el-divider>
    <el-form class="login-form" :model="formData" :rules="rules" ref="formData">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input type="password" v-model="formData.password2" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-tab-pane label="用户名注册" name="1">
          <el-form-item prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱地址,用于密码找回"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="手机号注册" name="2">
          <el-form-item prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="validcode">
            <el-row>
              <el-col :span="18">
                <el-input v-model="formData.validcode" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="getValidCode">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-button style="width: 100%;" :loading="loading" type="primary" @click.native.prevent="register">注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import {validateEmail} from "../../utils/validate";

  export default {
    data() {
      return {
        loading: false,
        type: '1', // 注册类型
        formData: {
          username: "",
          password: "",
          password2: "",
          email: "",
          mobile: ""
        },
        rules: {
          username: [{required: true, message: '请输入用户名'}, {max: 12, message: "用户名长度不能超过12个字符串"}],
          password: [{required: true, message: '请输入密码'}, {min: 6, message: "密码长度不得少于6个字符"}, {
            max: 12,
            message: "密码长度不能超过12个字符串"
          }],
          password2: [{required: true, validator: this.validPassword2}],
          email: [{validator: this.validEmail, trigger: "blur"}],
          mobile: [{validator: this.validMobile, trigger: "blur"}],
          validcode: [{validator: this.validCode}]
        }
      }
    },
    created() {
    },
    methods: {
      // 切换注册方式
      handleClick(tab) {
        this.type = tab.name;
      },
      // 验证重复输入密码
      validPassword2(rule, value, callback) {
        if (this.type === "2") {
          callback();
          return;
        }
        // 用户名,邮箱注册
        if (!this.$exist(value)) {
          callback(new Error("请再次输入密码"));
        } else {
          if (value.length < 6) {
            callback(new Error("密码长度不得少于6个字符"));
          } else if (value.length > 12) {
            callback(new Error("密码长度不能超过12个字符串"));
          } else {
            if (this.formData.password === this.formData.password2) {
              callback();
            } else {
              callback(new Error("2次输入的密码不一样,请重新输入"));
            }
          }
        }
      },
      // 验证邮箱地址
      validEmail(rule, value, callback) {
        if (this.type === "2") {
          callback();
          return;
        }
        if (!this.$exist(value)) {
          callback(new Error("邮箱地址不能为空,请重新输入"));
        } else {
          let flag = validateEmail(value);
          if (flag) {
            callback();
          } else {
            callback(new Error("邮箱格式不合法,请重新输入"));
          }
        }
      },
      // 验证手机号
      validMobile(rule, value, callback) {
        if (this.type === "1") {
          callback();
          return;
        }
        if (!this.$exist(value)) {
          callback(new Error("手机号不能为空,请重新输入"));
        } else if (value.length !== 11) {
          callback(new Error("手机号长度错误,请重新输入"));
        } else {
          let match = /\d/g;
          if (!match.test(value)) {
            callback(new Error("手机号中存在非法字符,请重新输入"));
          } else {
            callback();
          }
        }
      },
      // 验证验证码
      validCode(rule, value, callback) {
        if (this.type === "1") {
          callback();
          return;
        }
        if (!this.$exist(value)) {
          callback(new Error("验证码不能为空"));
        }
      },
      // 手机获取验证码
      getValidCode() {

      },
      // 注册
      register() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.loading = true;
          } else {
            this.loading = false;
            return false;
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  @import "../../assets/css/user.scss";
</style>
