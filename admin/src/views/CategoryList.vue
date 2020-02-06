<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="$router.push(`/categories/edit/${scope.row._id}`)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");

      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`/categories/${row._id}`);
          this.$message({
            type: 'success',
            message: '删除成功!'
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
