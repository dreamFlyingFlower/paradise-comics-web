<template>
  <div class="footer">
    <div class="footer-link-a">
      <h3 class="title">动漫百科</h3>
      <el-row :gutter="12">
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/about' }">关于我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/friendLinks' }">加入我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/about' }">联系我们</router-link></el-link>
        </el-col>
        <el-col :span="4">
          <el-link :underline="false"><router-link :to="{ path: '/friendLinks' }">友情链接</router-link></el-link>
        </el-col>
      </el-row>
    </div>
    <div class="footer-link-b">
      <ul>
        <li v-for="item in contacts" :key="item.contactId">
          <img :src="item.contactWay" alt="loading" />
          <span v-text="item.contactName"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-footer',
  data() {
    return {
      // 友链
      friendLinks: [],
      // 二维码联系方式
      contacts: []
    };
  },
  created() {
    this.getFriendLinks();
    this.getContacts();
  },
  methods: {
    // 获得所有的友情链接
    getFriendLinks() {
      this.$getEntitys('friendLink').then(resp => {
        this.friendLinks = resp.data;
      });
    },
    // 获得联系方式的二维码
    getContacts() {
      this.$getEntitys('contact', { type: 2 }).then(resp => {
        this.contacts = resp.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
