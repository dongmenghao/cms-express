<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="文章">
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>用户管理
        </template>
        <el-menu-item index="/users/create">新建用户</el-menu-item>
        <el-menu-item index="/users/list">用户列表</el-menu-item>
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right;">
      <span class="user-name">{{ this.username }}</span>
      <el-dropdown>
        <el-avatar class="user-avatar" :icon="icon" shape="square" :src="avatarUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
    </el-header>
    
    <el-main>
      <router-view :key="$router.path"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      icon: 'el-icon-user-solid',
      avatarUrl: '',
      username: '123',
    }
  },
  methods: {
    logOut() {
      console.log('logOut')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('avatar')
      this.$router.push('/login')
    }
  },

  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }

    if (localStorage.avatar) {
      this.avatarUrl = localStorage.avatar;
    }
  },

}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  align-items: center;
}

.el-aside {
  color: #333;
}

.user-avatar {
  margin-top: 10px;
}

.user-name {
 margin-right: 10px;
 position: relative;
 bottom: 10px;
}

</style>