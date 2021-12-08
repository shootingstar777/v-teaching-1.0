<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>必备考点</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区 -->
    <el-card>
      <el-button type="danger" round>必备考点</el-button>

      <el-card class="tipsInfo">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <li v-for="i in tips" class="list-item" :key="i.id">
             <div>
               <h1>{{ i.title }}</h1>
              <p>{{ i.tip }}</p></div> 
            </li>
          </ul>
          <p v-if="loading" style="color: #409eff">拼命加载中...</p>
          <p v-if="noMore" style="color: #f56c6c">没有更多啦！</p>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
 import tips from '../tips.js';
export default {
 
  data() {
    return {
      count: 10,
      loading: false,
      tips,
    };
  },
  computed: {
    noMore() {
      return this.count >= this.tips.length;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  created(){


  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 1; //每次滚动加载10条数据
        this.loading = false;
      }, 2000);
     
    },
  },
};
</script>

<style>
.infinite-list-wrapper {
  height: 400px;
  text-align: center;
  margin-bottom: 30px;
}
.list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-item {
  display: flex;
  background: var(--el-color-danger-lighter);
  color: var(--el-color-danger);
  margin-top: 10px;
}
</style>