import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import post from './modules/postcontent'
import login from './modules/login'
import newpost from './modules/newpost'
import collection from './modules/collection'
import userdetail from './modules/userdetail'
import message from './modules/message'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    index,
    post,
    login,
    newpost,
    collection,
    userdetail,
    message
  }
})
