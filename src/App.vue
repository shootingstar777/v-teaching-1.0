<template>
  <div id="app">
<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  created(){
window.addEventListener('beforeunload',()=>{
  this.$store.commit('reGetData',JSON.parse(localStorage.getItem('data')))
  console.log(JSON.parse(localStorage.getItem('data')));
 } )
},
computed:{
  
}
}
</script>

<style>

</style>