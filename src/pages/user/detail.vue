<template>
  <div>
    <div class="user-detail-avatar">
      <el-upload :action="uploadUrl" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
        <el-avatar class="block" :size="100" :src="avatarUrl"></el-avatar>
      </el-upload>
      <h2>{{ $store.getters.user.nickname ? $store.getters.user.nickname : $store.getters.user.username }}</h2>
    </div>
    <!-- 主体内容 [[ -->
    <el-form label-width="120px" :model="formData" :rules="rules" ref="formData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名:" prop="username"><input v-model="formData.username" style="width:80%;" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称:"><input v-model="formData.nickname" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="个性签名:"><input v-model="formData.introduce" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱地址:"><input v-model="formData.email" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:"><input v-model="formData.mobile" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别:">
            <el-select v-model="formData.sex" style="width:80%;">
              <el-option v-for="item in sexs" :key="item.dicId" :value="item.dicVal" :label="item.dicName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="真实姓名:"><input v-model="formData.userinfo.realname" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄:"><input v-model="formData.userinfo.age" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="住址:"><input v-model="formData.userinfo.address" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日:">
            <el-date-picker v-model="formData.userinfo.birthday" type="date" style="width:80%;" format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="教育程度:">
            <el-select v-model="formData.userinfo.education" style="width:80%;">
              <el-option v-for="item in educations" :key="item.dicId" :value="item.dicId" :label="item.dicName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业学校:"><input v-model="formData.userinfo.school" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="兴趣爱好:"><input v-model="formData.userinfo.interest" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:"><input v-model="formData.userinfo.remark" style="width:80%;" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册时间:">{{ formData.createtime }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="user-detail-confirm">
      <el-button :type="buttonType" @click="handleData">修改</el-button>
    </div>
  </div>
</template>

<script>
import { getSelfChildrenCode } from "@api/dic";
import cookie from '@utils/cookie';

export default {
  name: "detail",
  data() {
    return {
      // 图片上传地址
      uploadUrl: process.env.API_ROOT + "user/uploadAvatar/"+this.$store.getters.user.userId,
      // 用户信息
      formData: {
        userId: this.$store.getters.user.userId,
        username: this.$store.getters.user.username,
        oriUsername: this.$store.getters.user.username,
        nickname: this.$store.getters.user.nickname,
        introduce: this.$store.getters.user.introduce ? this.$store.getters.user.introduce : this.$store.getters.config.USER_INTRODUCE,
        email: this.$store.getters.user.email,
        mobile: this.$store.getters.user.mobile,
        sex: this.$store.getters.user.sex,
        createtime: this.$store.getters.user.createtime,
        token: this.$store.getters.user.token,
        userinfo: {
          realname: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.realname : null,
          age: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.age : null,
          address: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.address : null,
          birthday: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.birthday : null,
          education: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.education : null,
          school: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.school : null,
          interest: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.interest : null,
          remark: this.$store.getters.user.userinfo ? this.$store.getters.user.userinfo.remark : null
        }
      },
      rules: {
        username: [{ required: true, validator: this.validUsername, trigger: "blur" }, { max: 12, message: "最大长度不得超过12位", trigger: "blur" }]
      },
      // 性别字典
      sexs: [],
      // 教育程度
      educations: [],
      // 用户头像地址
      avatarUrl: null,
      // 不可无限制提交修改,5秒才可以修改一次
      timeout: 5,
      // 按钮类型
      buttonType: "primary"
    };
  },
  created() {
    this.getSexs();
    this.getEducation();
    this.handleAvatarUrl();
  },
  methods: {
    // 获得性别字典
    getSexs() {
      getSelfChildrenCode("SEX", true).then(resp => {
        this.sexs = resp.data;
      });
    },
    // 获得教育程度字典
    getEducation() {
      getSelfChildrenCode("EDUCATION", true).then(resp => {
        this.educations = resp.data;
      });
    },
    // 处理用户头像
    handleAvatarUrl() {
      debugger
      if (this.$store.getters.user.avatar) {
        this.avatarUrl = this.$store.getters.user.avatar;
      } else {
        if (this.$store.getters.user.sex === 2) {
          this.avatarUrl = "static/images/girl.jpg";
        } else {
          this.avatarUrl = "static/images/boy.jpg";
        }
      }
    },
    // 用户名校验
    validUsername(rule, value, callback) {
      if (!this.$exist(value)) {
        callback(new Error("请输入用户名"));
        return;
      }
      if (this.formData.oriUsername === this.formData.username) {
        callback();
        return;
      }
      this.$hasValue("user", { username: value }).then(resp => {
        if (resp.data === 1) {
          callback(new Error("用户名已被使用,请重新输入"));
        } else {
          callback();
        }
      });
    },
    // 用户头像上传成功事件,修改内存和cookie中的avatar
    handleSuccess(response,file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
      this.$store.getters.user.avatar = response.data;
      cookie.setUser(this.$store.getters.user);
    },
    // 上传之前事件,图片大小不能超过2M
    beforeUpload(file) {
      let storeSize = file.size / 1024 / 1024 < 2;
      if (!storeSize) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return storeSize;
    },
    // 信息修改
    handleData() {
      if (this.timeout < 5) {
        this.$message("不可重复提交,请稍等");
        return;
      }
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$edit("user", this.formData, true).then(resp => {
            if (resp.code === 1) {
              this.$message.success("修改成功,");
              // 修改内存和cookie中的用户信息
              this.$store.commit("USER", this.formData);
              cookie.setUser(this.formData);
              this.loading = false;
              let that = this;
              let interval = window.setInterval(function () {
                if (that.timeout <= 0) {
                  that.timeout = 5;
                  that.buttonType = "primary";
                  window.clearInterval(interval);
                  return;
                }
                that.buttonType = "info";
                that.timeout--;
              }, 1000);
            }
          }, () => {
            this.loading = false;
            this.$message(resp.msg);
          });
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/user.scss";
</style>
