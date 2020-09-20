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
    name:'首页',
    component:()=>import('../views/Home.vue'),
    children:[
      {
        path:'/',
        redirect:'users'
        // component:()=>import('../views/HomeChi.vue')
      },
      {
        path:'users',
        name:'用户列表',
        component:()=>import('../views/userAdmin/userAdmin.vue')
      },
      {
        path:'home',
        name:'主页',
        component:()=>import('../views/HomeChi.vue')
      },
      {
        path:'roles',
        name:'角色列表',
        component:()=>import('../views/jurAdmin/RolesList.vue')
      },
      {
        path:'orders',
        name:'订单管理',
        component:()=>import('../views/orderAdmin/OrderAdmin.vue')
      },
      {
        path:'rights',
        name:"权限列表",
        component:()=>import('../views/jurAdmin/RightsList.vue')
      },
      {
        path:'goods',
        name:'商品列表',
        component:()=>import('../views/goodsAdmin/Goods.vue'),
        children:[
          {
            path:'/',
            redirect:'main'
          },
          {
            path:'main',
            component:()=>import('../views/goodsAdmin/MainGoods.vue')
          },
          {
            path:'addgoods',
            component:()=>import('../views/goodsAdmin/AddGoods.vue')
          }
        ]
      },
      {
        path:'params',
        name:'分类参数',
        component:()=>import('../views/goodsAdmin/CategoryParams.vue')
      },
      {
        path:'categories',
        name:'商品分类',
        component:()=>import('../views/goodsAdmin/GoodsCategory.vue')
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
