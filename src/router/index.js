import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['../view/login.vue'], resolve)
const home = resolve => require(['../view/home.vue'], resolve)
const index = resolve => require(['../components/index.vue'], resolve)
const product = resolve => require(['../components/product.vue'], resolve)
const category = resolve => require(['../components/category.vue'], resolve)
const order = resolve => require(['../components/order.vue'], resolve)

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        name: 'login',
        meta:{
          title: '登录'
        },
        component: login
      },
      {
        path: '/home',
        name: 'home',
        component: home,
        children: [  //这里就是二级路由的配置
            {
              path: 'index',
              name: 'index',
              meta:{
                title: '首页'
              },
              component: index
            },
            {
              path: 'product',
              name: 'product',
              meta:{
                title: '商品'
              },
              component: product
            },
            {
              path: 'category',
              name: 'category',
              meta:{
                title: '种类'
              },
              component: category
            },
            {
              path: 'order',
              name: 'order',
              meta:{
                title: '订单'
              },
              component: order
            }
          ]
      },
    ]
  })

// 导航钩子
/*
  *to 即将要进入的目标的路由对象
  * 当前导航即将要离开的路由对象
  * 调用该方法后，才能进入下一个钩子
 */
// router.beforeEach((to,from,next)=>{
//   window.document.title = to.meta.title // 设置标题
// })

