<template>
  <el-dialog :title="title" :visible.sync="showEditDialog" width="50%" :before-close="beforeClose">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="资源类型" prop="animeType">
        <el-select v-model="formData.animeType" filterable placeholder="请选择资源类型" style="width: 100%;">
          <el-option v-for="item in animeTypes" :key="item.dicId" :label="item.dicName" :value="item.dicVal"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="animeId">
        <el-select v-model="formData.animeId" placeholder="请选择资源" style="width: 100%;">
          <el-option v-for="item in animes" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="formData.subject" auto-complete="off" placeholder="请输入主题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="formData.content" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="动漫状态" prop="state">
        <el-select v-model="formData.state" placeholder="请选择评论状态" style="width: 100%;">
          <el-option v-for="item in commentStates" :key="item.dicId" :label="item.dicName" :value="item.dicVal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论人" prop="userId">
        <el-select v-model="formData.userId" filterable placeholder="请选择评论人" style="width: 100%;">
          <el-option v-for="item in users" :key="item.userId" :label="item.username" :value="item.userId"></el-option>
        </el-select>
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
  import {getSelfChildrenCode} from '@api/dic';

  export default {
    name: "edit",
    props: ["showEditDialog", "editData", 'editType'],
    data() {
      return {
        api: 'comment',
        formData: {
          commentId: null,
          animeType:null,
          animeId: null,
          subject: null,
          content: null,
          state: null,
          userId:null
        },
        rules: {
          animeType: [{required: true, message: "资源类型不能为空", trigger: "blur"}],
          animeId: [{required: true, message: "评论资源不能为空", trigger: "blur"}],
          subject: [{required: true, message: "主题不能为空", trigger: "blur"}],
          content: [{required: true, message: "内容不能为空", trigger: "blur"}],
          state: [{required: true, message: "评论状态不能为空", trigger: "blur"}],
          userId: [{required: true, message: "评论人不能为空", trigger: "blur"}]
        },
        // 资源类型
        animeTypes:[],
        // 需要进行评论的资源
        animes:[],
        // 评论状态
        commentStates: [],
        // 可选评论人列表
        users:[]
      }
    },
    watch:{
      "formData.animeType":function(newVal){
        this.getAnimes(newVal);
      }
    },
    // 通用属性和方法
    mixins: [mixinEdit],
    created() {
      this.getCommentStates();
      this.getAnimeTypes();
      this.getUsers();
    },
    methods: {
      // 获得评论状态列表
      getCommentStates() {
        getSelfChildrenCode("COMMENT_STATE", true).then(resp => {
          this.commentStates = resp.data;
        });
      },
      // 获得资源类型列表,暂时只能评论动漫
      getAnimeTypes(){
        getSelfChildrenCode("ANIME_TYPE",true).then(resp=>{
          this.animeTypes = resp.data;
        });
      },
      // 根据类型获得资源列表
      getAnimes(type){
        if (!type && type !== 0){
          return;
        }
        this.$getEntitys('comic').then(resp=>{
          this.animes = resp.data;
        });
      },
      // 获得用户列表
      getUsers(){
        this.$getEntitys('user').then(resp=>{
          this.users = resp.data;
        });
      }
    }
  }
</script>
