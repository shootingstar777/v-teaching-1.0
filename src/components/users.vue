<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="12"
          ><el-input placeholder="Type something" prefix-icon="el-icon-search"
        /></el-col>
        <el-col :span="4"
          ><el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 信息区 -->
      <el-table border stripe :data="userList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChanged(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total,sizes,prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 获取用户列表的参数 */
      queryInfo: {
        query: "",
        pageNum: 1 /* 当前页数 */,
        pageSize: 2 /* 当前每页显示多少条数据*/,
      },
      userList: [
        {
          username: "admin",
          email: "1111",
          phone: "123",
          status: true,
        },
        {
          username: "admin",
          email: "1111",
          phone: "123",
          status: false,
        },
        {
          username: "admin",
          email: "1111",
          phone: "123",
          status: true,
        },
        {
          username: "admin",
          email: "1111",
          phone: "123",
          status: false,
        },
        {
          username: "admin",
          email: "1111",
          phone: "123",
          status: true,
        },
      ],
      total: 5,
    };
  },
  created() {
    /* this.getUserList() */
  },
  methods: {
    /* 获取用户列表 */
    /* async getUserList(){
    const {data:res} =await this.$http.get('users',{
      params:this.queryInfo
    })
    if(res.meta.status!==200) {return this.$message.error('获取用户列表失败')}
    this.userList=res.data.users
    this.total=res.data.total
  } */
    /* 监听pagesize改变的事件 */
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      /* this.getUserList() */
    },
    /* 监听页码值改变的事件 */
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      /* this.getUserList() */
      },
    userStateChanged(userInfo){
      console.log(userInfo)
      this.$http.put(`users/${userInfo.phone}/state/${userInfo.status}`)
      
  },
}
}
</script>

<style>
</style>