<template>
  <div class="welcome">
    <div class="box1">
      <img @click="box1Btn()" src="../../assets/在线教学平台.png" alt="" />
      <div class="title1">
        <h1>随机练习</h1>
      </div>
    </div>
    <div class="box2">
      <img @click="box2Btn()" src="../../assets//教学整改平台.png" alt="" />
      <div class="title2">
        <h1>错题收藏</h1>
      </div>
    </div>
    <div class="box3">
      <img @click="box3Btn()" src="../../assets/质量工程平台.png" alt="" />
      <div class="title3">
        <h1>必备考点</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    box1Btn() {
      this.$router.push("/randomPractice");
    },
    box2Btn() {
      this.$router.push("/collections");
    },
    box3Btn() {
      this.$router.push("/tips");
    },
  },
};
</script>

<style>
.welcome {
  background-size: contain;
  display: flex;
  justify-content: space-around;
}
.welcome img {
  cursor: pointer;
  width: 50%;
}
.welcome>div{
  text-align: center;
}
</style>