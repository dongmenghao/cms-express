<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}用户</h1>
    <el-form :model="model" status-icon :rules="rules" ref="model" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="model.checkPass"></el-input>
      </el-form-item>
      <el-form-item label="头像上传" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('model')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.model.checkPass !== '') {
          this.$refs.model.validateField('checkPass');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.model.password) {
        callback(new Error('两次输入的密码不一致' + value + ' ' + this.model.password));
      } else {
        callback();
      }
    }
    return {
      model: {},
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]      
      }
    }
  },
  methods: {
   submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          console.log('error submit!');
          return false;
        }

        let res;
        console.log(this.model)
        if (this.id) {
          res = await this.$http.put(`/users/${this.id}`, this.model);
        } else {
          res = await this.$http.post('/users', this.model)
        }
        this.$router.push('/users/list');
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      });
      
    },
    afterUpload(res, file) {
      this.$set(this.model, 'avatar', res.url)
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`/users/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    this.id && this.fetch();
    console.log(this.$http.defaults.baseURL)
  },
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>