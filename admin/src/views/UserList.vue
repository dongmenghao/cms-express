<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" width="240" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/users/edit/${scope.row._id}`)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.row)" ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/users');
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除 “${row.username}”`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${row._id}`);
        this.$message({
          type: 'success',
          message: '删除成功！'
        });
        this.fetch();
      })
    }
  },
  created() {
    this.fetch();
  },
}
</script>