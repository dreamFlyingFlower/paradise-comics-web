<template>
  <el-dialog :title="title" :visible.sync="showEditDialog" width="50%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="动漫名称" prop="name">
        <el-input v-model="formData.name" auto-complete="off" placeholder="请输入动漫名称"></el-input>
      </el-form-item>
      <el-form-item label="动漫作者" prop="author">
        <el-input v-model="formData.author" auto-complete="off" placeholder="请输入动漫作者"></el-input>
      </el-form-item>
      <el-form-item label="动漫简介" prop="brief">
        <el-input type="textarea" v-model="formData.brief" auto-complete="off" placeholder="请输入动漫简介"></el-input>
      </el-form-item>
      <el-form-item label="动漫年代" prop="year">
        <!-- <el-input v-model="formData.year" auto-complete="off" placeholder="请选择动漫年代"></el-input> -->
        <el-date-picker v-model="formData.year" type="year" placeholder="请选择动漫年代" style="width: 100%;" value-format="yyyy"></el-date-picker>
      </el-form-item>
      <el-form-item label="动漫状态" prop="state">
        <el-select v-model="formData.state" placeholder="请选择动漫状态" style="width: 100%;">
          <el-option v-for="item in comicStates" :key="item.dicId" :label="item.dicName" :value="item.dicVal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input v-model="formData.cover" auto-complete="off" placeholder="请上传动漫封面"></el-input>
      </el-form-item>
      <el-form-item label="视频来源" prop="sourceType">
        <el-select v-model="formData.sourceType" placeholder="请选择视频来源" style="width: 100%;">
          <el-option v-for="item in sourceTypes" :key="item.id" :label="item.label" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.sourceType === 2" label="视频地址">
        <el-input type="textarea" v-model="formData.urls" placeholder="请输入视频地址"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.sourceType === 1" label="视频上传">
        <el-input v-model="formData.uploads" auto-complete="off" placeholder="请输入视频地址"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog(false)">取 消</el-button>
      <el-button type="primary" @click="handlerData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import mixinEdit from "@mixin/mixinEdit";
  import { getSelfChildrenCode } from '@api/dic';

  export default {
    name: "edit",
    props: ["showEditDialog", "editData", 'editType'],
    data() {
      return {
        api: 'comic',
        formData: {
          id: null,
          name: null,
          author: null,
          brief: null,
          year: null,
          publisher: this.$store.getters.user.userId,
          username: this.$store.getters.user.username,
          state: null,
          cover: null,
          sourceType: 2,
          urls: null,
          uploads: null
        },
        rules: {
          name: [{ required: true, message: "动漫名称不能为空", trigger: "blur" }],
          author: [{ required: true, message: "动漫作者不能为空", trigger: "blur" }],
          brief: [{ required: true, message: "动漫简介不能为空", trigger: "blur" }],
          year: [{ required: true, message: "动漫年代不能为空", trigger: "blur" }],
          state: [{ required: true, message: "动漫状态不能为空", trigger: "blur" }],
          cover: { required: true, message: "封面不能为空", trigger: "blur" },
          sourceType: { required: true, message: "视频来源不能为空", trigger: "blur" }
        },
        // 动漫状态
        comicStates: [],
        // 动漫来源
        sourceTypes: [{ id: 1, label: "上传" }, { id: 2, label: "其他网站" }]
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    created() {
      this.getComicStates();
    },
    methods: {
      getComicStates() {
        getSelfChildrenCode('COMIC_STATE', true).then(resp => {
          this.comicStates = resp.data;
        });
      },
    }
  }
</script>
