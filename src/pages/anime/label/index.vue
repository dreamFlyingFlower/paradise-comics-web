<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" :ifDeletes="true">
    </nav-operates>
    <el-tag class="tag-custom" v-for="item in tableDatas" :key="item.labelId"
            :style="{'background-color':item.labelColor}"
            @click="openEditDialog(item,2)"
            @close="$remove('label',item.labelId)"
            closable>
      {{item.labelName}}
    </el-tag>
    <edit v-if="showEditDialog" :show-edit-dialog="showEditDialog" @closeDialog="closeDialog"
          :edit-data="editData" :edit-type="editType"></edit>
  </div>
</template>

<script>
  import {mixinIndex} from "@mixin";
  import {navOperates} from "@is";
  import {getSelfChildrenCode} from '@api/dic'
  import edit from './edit'

  export default {
    name: "system-user",
    data() {
      return {
        api: "label",
        primaryKey: "labelId"
      }
    },
    components: {
      navOperates,
      edit
    },
    mixins: [mixinIndex]
  }
</script>

<style scoped>
  @import "../../../assets/css/content.scss";
</style>
