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
        <el-date-picker v-model="formData.year" type="year" placeholder="请选择动漫年代" style="width: 100%;"
          value-format="yyyy"></el-date-picker>
      </el-form-item>
      <el-form-item label="动漫状态" prop="state">
        <el-select v-model="formData.state" placeholder="请选择动漫状态" style="width: 100%;">
          <el-option v-for="item in comicStates" :key="item.dicId" :label="item.dicName" :value="item.dicVal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="categoryIds">
        <el-select v-model="formData.categoryIds" multiple filterable clearable  placeholder="请选择视频来源" style="width: 100%;">
          <el-option v-for="item in categories" :key="item.categoryId" :label="item.categoryName"
            :value="item.categoryId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="labelIds">
        <el-select v-model="formData.labelIds" multiple filterable clearable placeholder="请选择视频来源" style="width: 100%;">
          <el-option v-for="item in labels" :key="item.labelId" :label="item.labelName" :value="item.labelId">
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
        <el-input type="textarea" :rows="5" v-model="formData.urls" placeholder="请输入视频地址"></el-input>
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
        categoryIds: [],
        labelIds: [],
        cover: null,
        sourceType: 2,
        urls: "",
        uploads: null
      },
      rules: {
        name: [{ required: true, message: "动漫名称不能为空", trigger: "blur" }],
        author: [{ required: true, message: "动漫作者不能为空", trigger: "blur" }],
        brief: [{ required: true, message: "动漫简介不能为空", trigger: "blur" }],
        year: [{ required: true, message: "动漫年代不能为空", trigger: "blur" }],
        state: [{ required: true, message: "动漫状态不能为空", trigger: "blur" }],
        cover: { required: true, message: "封面不能为空", trigger: "blur" },
        sourceType: { required: true, message: "视频来源不能为空", trigger: "blur" },
        categoryIds: { required: true, message: "分类不能为空", trigger: "change" },
        labelIds: { required: true, message: "标签不能为空", trigger: "change" }
      },
      // 动漫状态
      comicStates: [],
      // 动漫来源
      sourceTypes: [{ id: 1, label: "上传" }, { id: 2, label: "其他网站" }],
      // 分类
      categories: [],
      // 标签
      labels: []
    }
  },
  // 通用属性和方法
  mixins: [mixinEdit],
  created() {
    this.handlerExtrainfo();
    this.getComicStates();
    this.getCategories();
    this.getLabels();
  },
  methods: {
    // 处理附属信息
    handlerExtrainfo(){
      if (this.editType === 2){
        if(this.$exist(this.editData.categories)){
          for(let i of this.editData.categories){
            this.formData.categoryIds.push(i.categoryId);
          }
        }
        if (this.$exist(this.editData.labels)){
          for(let i of this.editData.labels){
            this.formData.labelIds.push(i.labelId);
          }
        }
        if (this.$exist(this.editData.comicinfos)){
          for (let i of this.editData.comicinfos){
            this.formData.urls+=(i.singleName+"$"+i.url+";");
          }
        }
      }
    },
    // 获得动漫状态字典
    getComicStates() {
      getSelfChildrenCode('COMIC_STATE', true).then(resp => {
        this.comicStates = resp.data;
      });
    },
    // 获得分类列表
    getCategories() {
      this.$getEntitys('category').then(resp => {
        this.categories = resp.data;
      })
    },
    // 获得标签列表
    getLabels() {
      this.$getEntitys('label').then(resp => {
        this.labels = resp.data;
      })
    }
  }
}
</script>
