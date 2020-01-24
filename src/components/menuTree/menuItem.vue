<template>
  <div>
    <el-submenu v-if="treeData.children && treeData.children.length > 0" :index="treeData.treeId+''"
                popper-append-to-body>
        <span slot="title">
          <router-link :to="{path:treeData.menuUrl}">{{treeData.treeName}}</router-link>
        </span>
      <menu-item v-for="item in treeData.children" :tree-data="item" :key="item.treeId"></menu-item>
    </el-submenu>
    <template v-else>
      <el-menu-item  :index="treeData.treeId+''">
        <router-link :to="{path:treeData.menuUrl}">{{treeData.treeName}}</router-link>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name: "menuItem",
    props: ["treeData"],
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
