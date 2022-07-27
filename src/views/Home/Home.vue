<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <img src="../../assets/logo.png" style="width: 80%" alt="" />
      <span>在线练习系统</span>

      <el-button class="logout" type="danger" @click="logout"
        >退出登录</el-button
      >
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏部分 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#333744"
          default-active="activePath"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu index="specializedTraining">
            <template #title>
              <i class="el-icon-menu" />
              <span>专项训练</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/comprehensiveQuality"
                @click="saveNavState('/comprehensiveQuality')"
                ><i class="el-icon-orange" /><span>综合素质</span></el-menu-item
              >
              <el-menu-item
                index="/education"
                @click="saveNavState('/education')"
                ><i class="el-icon-orange" /><span
                  >教育知识与能力</span
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item
            index="/randomPractice"
            @click="saveNavState('/randomPractice')"
          >
            <i class="el-icon-menu" />
            <span>随机练习</span>
          </el-menu-item>

          <el-menu-item index="/tips" @click="saveNavState('/tips')">
            <i class="el-icon-menu" />
            <span>必备考点</span>
          </el-menu-item>
          <el-menu-item
            index="/collections"
            @click="saveNavState('/collection')"
          >
            <i class="el-icon-menu" />
            <span>收藏</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧页面部分 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: "" /* 激活的链接地址 */,
      user: "",
    };
  },
  computed: {},
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    this.user = this.$store.userName;
  },
  methods: {
    /* 退出登录 */
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    /* 获取所有的菜单 */
    getMenuList() {},
    /* 折叠菜单栏 */
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    /* 保存链接的激活状态 */
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header img {
  height: 40px;
  margin-left: 20px;
}
.el-header .el-button {
  margin-right: 20px;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: none;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5em;
  cursor: pointer;
}
</style>
