import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/home',
    component:()=>import('../views/Home.vue'),
    children:[
      {
        path:'roles',
        component:()=>import('../views/jurAdmin/RolesList.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
