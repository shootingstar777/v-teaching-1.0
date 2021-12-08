import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import Data from './data.js' 
import store from './store/index.js'

Vue.config.productionTip = false
Vue.prototype.$Data = Data

axios.defaults.timeout=-1
axios.defaults.baseURL = "http://localhost:8080"
Vue.prototype.$http = axios

axios.interceptors.request.use(
  config => {
    const token=sessionStorage.getItem('token')
    if(token){
      config.headers.Authorization=token
    }
    return config
  },
  error => {
    return Promise.reject(error);
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
   
    //拦截响应，做统一处理
    if (response.data.code === 401) {
      sessionStorage.removeItem('Authorization')
      router.replace('/login')
    } else {
      if (response.data.success) {
        return response.data
      } else {
        throw response.data
      }
    }
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  }
  )

localStorage.setItem('data',JSON.stringify(Data))

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
