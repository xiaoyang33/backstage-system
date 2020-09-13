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
        path:'/home',
        redirect:'users'
      },
      {
        path:'users',
        component:()=>import('../views/userAdmin/UserAdmin.vue')
      },
      {
        path:'roles',
        component:()=>import('../views/jurAdmin/RolesList.vue')
      },
      {
        path:'orders',
        component:()=>import('../views/orderAdmin/OrderAdmin.vue')
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
