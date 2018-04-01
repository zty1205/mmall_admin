// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store/store'
import router from './router/index'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials = true

Vue.use(iview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
