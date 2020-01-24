<template>
  <div class="user">
    <el-divider class="divider">登录</el-divider>
    <el-form class="login-form" :model="formData" :rules="rules" ref="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="passwordType" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="login"/>
        <span class="show-pwd" @click="showPwd"><!-- <svg-icon icon-class="eye"/> --></span>
      </el-form-item>
      <div class="login-rem">
        <el-checkbox label="记住我" v-model="rememberMe"></el-checkbox>
        <span class="login-notice">不是自己的电脑上不要勾选此项</span>
        <router-link class="tip-right" :to="{ path: '/forget' }">忘记密码?</router-link>
      </div>
      <el-form-item>
        <el-button style="width: 100%;" :loading="loading" type="primary" @click.native.prevent="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 管理页面登录
  export default {
    name: "manager-login",
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
          username: [{required: true, message: '用户名/邮箱/手机号不能为空', max: '16'}],
          password: [{required: true, message: '密码不能为空'}]
        }
      };
    },
    created() {
    },
    methods: {
      // 显示或隐藏密码
      showPwd() {
        this.passwordType = this.passwordType === 'password' ? '' : 'password';
      },
      // 登录
      login() {
        this.$refs.formData.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LOGIN', this.formData).then(
              resp => {
                if (resp === 1) {
                  this.$nextTick(() => {
                    this.$router.push('/manager');
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

<style scoped>

</style>
