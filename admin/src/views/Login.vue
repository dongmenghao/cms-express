<template>
  <div class='login-container'>
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>后台管理-请登录</span>
      </div>
      <el-form @submit.native.prevent='login'>
        <el-form-item label='用户名'>
          <el-input v-model='model.username'></el-input>
        </el-form-item>
        <el-form-item label='密码'>
          <el-input type='password' v-model='model.password'></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type='primary' native-type='submit'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
   async login() {
    const res = await this.$http.post('/auth/login', this.model);
    console.log('dmh ', res);
    if (res.data.auth) {
      localStorage.token = res.data.token;
      localStorage.username = res.data.username;
      localStorage.avatar = res.data.avatar;
      this.$router.push('/');
      this.$message({
        type: 'success',
        message: '登录成功'
      });
    } else {
      this.$message({
        type: 'error',
        message: res.data.message
      })
    }
   }
  }
}
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
.text-center {
  text-align: center;
}
</style>
