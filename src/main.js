import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import Data from './data.js' 
import store from './store/index.js'


Vue.config.productionTip = false
/* Vue.prototype.$http = axios
Vue.prototype.$Data = Data */
Vue.prototype.$store = store.state
/* 配置请求的根路径 */
/* axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' */
/* 拦截器 */
/* axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}) */
 localStorage.clear()
localStorage.setItem('data',JSON.stringify(Data)) 
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
