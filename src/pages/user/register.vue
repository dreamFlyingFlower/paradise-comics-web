<template>
  <div class="user">
    <el-divider class="divider">注册</el-divider>
    <el-form class="login-form" :model="formData" :rules="rules" ref="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" v-model="formData.password2" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-button style="width: 100%;" :loading="loading" type="primary" @click.native.prevent="register">注册
      </el-button>
      <router-link class="tip-right" :to="{path:'/login'}">已有帐号,直接登录<i class="el-icon-arrow-right"></i></router-link>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        formData: {
          username: "",
          password: "",
          password2: ""
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: "blur"}, {
            max: 12,
            message: "用户名长度不能超过12个字符串",
            trigger: "blur"
          }],
          password: [{required: true, message: '请输入密码', trigger: "blur"}, {
            min: 6,
            message: "密码长度不得少于6个字符",
            trigger: "blur"
          }, {
            max: 12,
            message: "密码长度不能超过12个字符串",
            trigger: "blur"
          }],
          password2: [{required: true, validator: this.validPassword2, trigger: "blur"}]
        }
      }
    },
    created() {
    },
    methods: {
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
      // 注册
      register() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('REGISTER', this.formData).then(resp => {
                if (resp === 1) {
                  this.$nextTick(() => {
                    this.$router.push('/');
                    this.loading = false;
                  });
                } else {
                  this.$message(resp.msg);
                }
              },
              () => {
                this.loading = false;
              }
            );
          } else {
            this.loading = false;
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/user.scss";
</style>
