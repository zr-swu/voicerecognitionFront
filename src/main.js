// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'

import $ from 'jquery'

Vue.config.productionTip = false

// 引入 element-ui
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

 // 引入 axios
 import axios from 'axios'
 Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
