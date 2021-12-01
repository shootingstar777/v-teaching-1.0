import Vue from 'vue'
import Vuex from 'vuex'
import data from '../data.js'
import tips from '../tips.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data,
    tips
  },
  mutations: {
    reGetData(state, upload) {
      this.data= upload
    },
   
   
  },
  actions: {},
  modules: {}
})

export default store