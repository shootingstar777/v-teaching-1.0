import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login/Login.vue'
import home from '../views/Home/Home.vue'
import welcome from '../views/Welcome/Welcome.vue'
import users from '../components/users.vue'
import comprehensiveQuality from '../components/comprehensiveQuality.vue'
import education from '../components/education.vue'
import randomPractice from '../components/RandomPractice.vue'
import tips from '../components/Tips.vue'
import collections from '../components/collections.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: welcome,
      },
      {
        path: '/users',
        component: users,
      },
      {
        path:'/comprehensiveQuality',
        component:comprehensiveQuality
      },{
        path:'/education',
        component:education
      },
      {
        path:'/randomPractice',
        component:randomPractice
      },{
        path:'/tips',
        component:tips
      },{
        path:'/collections',
        component:collections
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* 导航守卫，控制页面访问权限 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
