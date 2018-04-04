import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['../view/login.vue'], resolve)
const home = resolve => require(['../view/home.vue'], resolve)
const index = resolve => require(['../components/index.vue'], resolve)
const product = resolve => require(['../components/product.vue'], resolve)
const category = resolve => require(['../components/category.vue'], resolve)
const order = resolve => require(['../components/order.vue'], resolve)

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        name: 'login',
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
              component: index
            },
            {
              path: 'product',
              name: 'product',
              component: product
            },
            {
              path: 'category',
              name: 'category',
              component: category
            },
            {
              path: 'order',
              name: 'order',
              component: order
            }
          ]
      },
    ]
  })
