<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收藏</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区 -->
    <el-card v-loading="loading">
      <el-button type="danger" round>收藏</el-button>
      <el-button type="info" round
        >收藏共有{{ index + 1 }}/{{ data.length }}</el-button
      >
      <el-card class="pageShowing">
        <el-carousel
          indicator-position="none"
          :autoplay="false"
          arrow="never"
          ref="carousel"
          :loop="false"
        >
          <el-carousel-item v-for="(item, index) in data" :key="item.id">
            <el-tag class="optionName">单选</el-tag>
            <el-tag
              v-if="item.stared == false"
              :type="type"
              class="collect"
              @click="collectBtnClick(item, index)"
              >收藏</el-tag
            >
            <el-tag
              v-else
              :type="type"
              class="collect"
              @click="CancelCollectBtnClick(item, index)"
              >收藏</el-tag
            >
            <h1 :class="questionName">{{ index + 1 }}.{{ item.question }}</h1>

            <el-radio-group v-model="choice">
              <div>
                <el-radio :label="item.optionA">{{ item.optionA }}</el-radio>
              </div>
              <div>
                <el-radio :label="item.optionB">{{ item.optionB }}</el-radio>
              </div>
              <div>
                <el-radio :label="item.optionC">{{ item.optionC }}</el-radio>
              </div>
              <div>
                <el-radio :label="item.optionD">{{ item.optionD }}</el-radio>
              </div>
            </el-radio-group>
          </el-carousel-item>
        </el-carousel>
        <div class="btns" v-if="data != ''">
          <el-button type="primary" class="last" @click="lastPage()"
            >上一题</el-button
          >
          <el-button type="success" class="next" @click="nextPage()"
            >下一题</el-button
          >
        </div>
        <el-collapse accordion v-if="data != ''">
          <el-collapse-item :name="index">
            <template #title>
              <p class="answer">答案与解析</p>
            </template>
            <h1>本题的答案为:{{ showAnswer() }}</h1>
            <p>解析：{{ showExplain() }}</p>
          </el-collapse-item>
        </el-collapse>

        <el-empty v-else description="快去收藏一些习题吧~"></el-empty>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: "",
      index: 0,
      activeName: "",
      questionName: "",
      type: "",
      choice: "",
    };
  },
  created() {
    this.load();
  },
  methods: {
    collectBtnClick(item, index) {
      this.$http
        .post("collection/star", {
          questionId: item.id,
        })
        .then(
          (res) => {
            this.$message.success("收藏成功");
          },
          (err) => {
            console.log(err);
          }
        );
    },
    CancelCollectBtnClick(item, index) {
      this.$http
        .post("collection/deleteStar", {
          questionId: item.id,
        })
        .then(
          (res) => {
            this.$message.info("取消收藏");

          },
          (err) => {
            this.$message.error(err.message);
          }
        );
    },
    load() {
      this.loading = true;
      this.$http.get("collection/starQuestions").then(
        (res) => {
          this.data = res.data;
          this.loading = false;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    makeChoice(choice) {
      if (choice == this.data[this.index].answer) {
        this.questionName = "right";
      } else {
        this.questionName = "wrong";
      }
    },
    nextPage() {
      this.$refs.carousel.next();
      this.index = this.$refs.carousel.activeIndex;
      this.questionName = "";
    },
    lastPage() {
      this.$refs.carousel.prev();
      this.index = this.$refs.carousel.activeIndex;
      this.questionName = "";
    },
    /* 获取答案与解析 */
    showAnswer() {
      return this.data[this.index].answer;
    },
    showExplain() {
      return this.data[this.index].questionExplain;
    },
  },
};
</script>

<style>
.right {
  color: #67c23a;
}

.wrong {
  color: #f56c6c;
}
</style>