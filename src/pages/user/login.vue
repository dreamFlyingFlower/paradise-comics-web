<template>
  <div class="login">
    <div class="title"><span>登录</span></div>
    <el-form class="login-form" :model="formData" :rules="rules" ref="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="passwordType" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="login"/>
        <span class="show-pwd" @click="showPwd"><!-- <svg-icon icon-class="eye"/> --></span>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="记住我" v-model="rememberMe"></el-checkbox>
        <span class="login-rem">不是自己的电脑上不要勾选此项</span>
        <div class="login-pro">
          <!--          <router-link :to="{ path: '/validate' }">无法验证?</router-link>-->
          <router-link :to="{ path: '/forget' }">忘记密码?</router-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-button style="width: 100%;" :loading="loading" type="primary" @click.native.prevent="login">登录
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%;" :loading="loading" @click.native.prevent="login">
              <router-link :to="{ path: '/register' }">注册</router-link>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        passwordType: 'password', // 密码类型
        loading: false, // 是否加载遮罩层
        rememberMe: false, // 是否记住密码
        formData: {
          username: null,
          password: null
        },
        rules: {
          username: [{required: true, message: '请输入用户名/邮箱/手机号', max: '16'}],
          password: [{required: true, message: '请输入密码'}]
        }
      };
    },
    created() {
    },
    methods: {
      login() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LOGIN', this.formData).then(
              resp => {
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
      },
      showPwd() {
        this.passwordType = this.passwordType === 'password' ? '' : 'password';
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/css/user.scss";
</style>
