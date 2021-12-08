import Vue from 'vue'
import Vuex from 'vuex'
import tips from '../tips.js'
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    questionData:"",
    tips,
    userName:""
  },
  mutations: {
    getQuestionData(state,upload){
    state.questionData = upload
    },
    renewUserName(state,upload){
      state.userName=upload
    }
  },
  actions: {},
  modules: {}
})

export default store