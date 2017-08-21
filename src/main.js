// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import vueResource from 'vue-resource'
import iView from 'iview'
import App from './App'
import router from './router'
import store from './vuex'

import 'iview/dist/styles/iview.css'
import 'iview/dist/iview.min.js'

Vue.config.productionTip = false



Vue.use(iView)
Vue.use(vueResource)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
