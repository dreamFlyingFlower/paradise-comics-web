<template>
  <div class="login">
    <el-form :model="logindata" :rules="rules" ref="logindata" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="logindata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="logindata.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default{
    data() {
      return {
      }
    },
    created() {
      
    },
    methods: {
      register() {
        
      }
    },
  }
</script>

<style>
</style>
