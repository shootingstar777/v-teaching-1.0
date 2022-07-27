<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>随机练习</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图区 -->
    <el-card style="position: relative" v-loading="loading">
      <el-button type="danger" round>随机练习</el-button>
      <el-button type="info" round
        >题目共有{{ index + 1 }}/{{ questionData.length }}</el-button
      >
      <el-card class="pageShowing">
        <el-carousel
          indicator-position="none"
          :autoplay="false"
          arrow="never"
          ref="carousel"
          :loop="false"
        >
          <el-carousel-item
            v-for="(item, index) in questionData"
            :key="item.id"
          >
            <el-tag class="optionName">单选</el-tag>

            <el-tag
              type="warning"
              class="collect"
              @click="collectBtnClick(item, index)"
              >收藏</el-tag
            >

            <h1 :class="questionName">{{ index + 1 }}.{{ item.question }}</h1>
            <div>
              <el-radio-group v-model="choice" @change="makeChoice">
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
            <p class="answer" @click="showAnswerAndExplanation()">答案与解析</p>
          </template>
          <h1>本题的答案为:{{ answer }}</h1>
          <p>解析：{{ explanation }}</p>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:"",
      choice: "",
      data: "",
      index: 0,
      activeName: "",
      questionData: "",
      questionName: "",
      answer: "",
      explanation: "",
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
            this.type = "success";
          },
          (err) => {
            this.$message.error(err.message);
          }
        );
    },

    load() {
      this.loading=true
      this.$http.post("question/module", { module: 1 }).then(
        (res) => {
          this.questionData = res.data;
          this.loading=false
        },
        (err) => {
          console.log(err);
        }
      );
    },
    forceUpDate() {
      this.$forceUpdate();
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
    showAnswerAndExplanation() {
      this.answer = this.questionData[this.index].answer;
      this.explanation = this.questionData[this.index].explanation;
    },
    makeChoice(choice) {
      if (choice == this.questionData[this.index].answer) {
        this.questionName = "right";
      } else {
        this.questionName = "wrong";
      }
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