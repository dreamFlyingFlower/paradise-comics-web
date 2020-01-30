<template>
  <div>
    <nav-operates @openEditDialog="openEditDialog" :multipleSelection="multipleSelection" @deletes="deletes">
    </nav-operates>
    <el-table :data="tableDatas" stripe @selection-change="handleSelectionChange"
              style="width: 100%;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-row>
              <el-col :span="8">
                <el-form-item label="真实姓名"><span>{{props.row.userinfo ? props.row.userinfo.realname :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄"><span>{{props.row.userinfo ? props.row.userinfo.age :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号"><span>{{props.row.userinfo ? props.row.userinfo.idcard :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生日"><span>{{props.row.userinfo ? props.row.userinfo.birthday :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="家庭住址"><span>{{props.row.userinfo ? props.row.userinfo.address :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="教育程度"><span>{{props.row.userinfo ? props.row.userinfo.education :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="毕业学校"><span>{{props.row.userinfo ? props.row.userinfo.school :null}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="兴趣爱好"><span>{{props.row.userinfo ? props.row.userinfo.interest :null}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" labe l="手机号"></el-table-column>
      <el-table-column prop="state" label="类型">
        <template slot-scope="scope">
          {{getUserType(scope)}}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          {{getUserState(scope)}}
        </template>
      </el-table-column>
      <el-table-column prop="setting" width="350" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="assignRole(scope.row)">角色分配
          </el-button>
          <el-button type="text" size="small" icon="el-icon-edit" @click="resetPwd(scope.row)">重置密码
          </el-button>
          <el-button type="text" size="small" icon="el-icon-edit" @click="openEditDialog(scope.row,2)">编辑
          </el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="$remove(api,scope.row[primaryKey])">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination></pagination>
    <edit v-if="showEditDialog" :show-edit-dialog="showEditDialog" @closeDialog="closeDialog"
          :edit-data="editData" :edit-type="editType"></edit>
  </div>
</template>


<script>
  import {mixinIndex} from "@mixin";
  import {navOperates, pagination} from "@is";
  import edit from './edit'
  import {getSelfChildrenCode} from '@api/dic'

  export default {
    name: "system-user",
    data() {
      return {
        api: "user",
        primaryKey: "userId",
        // 用户类型
        userTypes: [],
        // 用户状态
        userStates: []
      }
    },
    components: {
      navOperates,
      pagination,
      edit
    },
    mixins: [mixinIndex],
    created() {
      this.getUserTypes();
      this.getUserStates();
    },
    methods: {
      getUserTypes() {
        getSelfChildrenCode("USER_TYPE").then(resp => {
          this.userTypes = resp.data;
        });
      },
      getUserStates() {
        getSelfChildrenCode("USER_STATE").then(resp => {
          this.userStates = resp.data;
        });
      },
      getUserType(scope) {
        let item = this.userTypes.find(i => i.dicVal === scope.row.type);
        if (item && Object.keys(item) && Object.keys(item).length > 0) {
          return item.dicName;
        }
      },
      getUserState(scope) {
        let item = this.userStates.find(i => i.dicVal === scope.row.state);
        if (item && Object.keys(item) && Object.keys(item).length > 0) {
          return item.dicName;
        }
      },
      // 分配角色
      assignRole(){

      },
      // 重置密码
      resetPwd(scope) {

      }
    }
  }
</script>
