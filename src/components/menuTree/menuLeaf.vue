<template>
  <div>
    <el-submenu v-if="treeData.children && treeData.children.length > 0" :index="treeData.treeId+''">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{treeData.treeName}}</span>
      </template>
      <menuLeaf v-for="item in treeData.children" :tree-data="item" :key="item.treeId"></menuLeaf>
    </el-submenu>
    <template v-else>
      <router-link :to="{path:treeData.menuUrl}">
        <el-menu-item :index="treeData.treeId+''">
          <i class="el-icon-menu"></i>
          <span slot="title">{{treeData.treeName}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
  export default {
    name: "menuLeaf",
    props: ["treeData"]
  }
</script>
