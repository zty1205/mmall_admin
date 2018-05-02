import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['../view/login.vue'], resolve)
const home = resolve => require(['../view/home.vue'], resolve)
const index = resolve => require(['../components/index.vue'], resolve)
const product = resolve => require(['../components/product.vue'], resolve)
const category = resolve => require(['../components/category.vue'], resolve)
const order = resolve => require(['../components/order.vue'], resolve)
const product_save = resolve => require(['../components/product-save.vue'],resolve)
const store = resolve => require(['../components/store.vue'], resolve)
const performance = resolve => require(['../components/performance.vue'],resolve)
const mine = resolve => require(['../components/mine.vue'],resolve)
const category_save = resolve => require(['../components/category-save.vue'],resolve)

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
        redirect: '/home/index'
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
            path: 'product/save',
            name: 'product_save',
            meta:{
              title: '添加商品'
            },
            component: product_save
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
            path: 'category/save',
            name: 'category',
            meta:{
              title: '添加商品'
            },
            component: category_save
          },
          {
            path: 'order',
            name: 'order',
            meta:{
              title: '订单'
            },
            component: order
          },
          {
            path: 'performance',
            name: 'performance',
            component: performance,
          },
          {
            path: 'store',
            name: 'store',
            component: store,
          },
          {
            path: 'mine',
            name: 'mine',
            component: mine,
          }
        ]
      }
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

