<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>专项训练</el-breadcrumb-item>
      <el-breadcrumb-item>教育知识与能力</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区 -->
     <el-card style="position: relative">
      <el-button type="danger" round>教育知识与能力</el-button>
      <el-card class="pageShowing">
        <el-carousel
          indicator-position="none"
          :autoplay="false"
          arrow="never"
          ref="carousel"
          :loop="false"
        >
          <el-carousel-item v-for="(item, index) in data" :key="item.id">
            <el-tag class="optionName">{{ item.optionName }}</el-tag>
            <el-tag
              v-if="item.collected == false"
              type="warning"
              class="collect"
              @click="collectBtnClick(item, index)"
              >收藏</el-tag
            >
            <el-tag
              v-else
              type="info"
              class="collect"
              @click="collectBtnClick(item, index)"
              >取消收藏</el-tag
            >
            <h1>{{ index + 1 }}.{{ item.state }}</h1>
            <div>
              <el-radio-group v-model="item.choice" v-if="item.option">
                <div v-for="i in item.option" :key="i">
                  <el-radio :label="i">{{ i }}</el-radio>
                </div>
              </el-radio-group>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <div class="btns">
        <el-button type="primary" @click="lastPage()">上一题</el-button>
        <el-button type="success" @click="nextPage()">下一题</el-button>
      </div>
      <el-collapse accordion>
        <el-collapse-item :name="index">
          <template #title>
            <p class="answer">答案与解析</p>
          </template>
          <h1>本题的答案为: {{ showAnswer() }}</h1>
          <p>解析：{{ explanation() }}</p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
 data() {
    return {
      data: "",
      index: 0,
      activeName: "",
    };
  },
  created() {
    this.load();
  },
  methods: {
    collectBtnClick(item, index) {
      let newData = JSON.parse(localStorage.getItem("data"));
      if (item.collected == false) {
        this.$message.success("收藏成功");
        newData[index].collected = true;
        item.collected = !item.collected;
      } else if (item.collected == true) {
        this.$message.info("取消收藏");
        newData[index].collected = false;
        item.collected = !item.collected;
      }
      localStorage.setItem("data", JSON.stringify(newData));
    },
    load() {
      this.data = JSON.parse(localStorage.getItem("data"));
    },
    forceUpDate() {
      this.$forceUpdate();
    },
    nextPage() {
      this.$refs.carousel.next();

      this.index = this.$refs.carousel.activeIndex;
    },
    lastPage() {
      this.$refs.carousel.prev();
      this.index = this.$refs.carousel.activeIndex;
    },
    showAnswer() {
      const temp = JSON.parse(localStorage.getItem("data"));
      return temp[this.index].answer;
    },
    explanation() {
      const temp = JSON.parse(localStorage.getItem("data"));
      return temp[this.index].explain;
    },
  },
}
</script>

<style>

</style>