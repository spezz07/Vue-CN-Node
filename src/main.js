import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import muse from 'muse-ui'
import store from './store/store.js'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(vuex)
Vue.use(muse)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
