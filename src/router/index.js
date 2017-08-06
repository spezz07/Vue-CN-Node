import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import postcontent from '../components/post-content.vue'
import login from '../components/login.vue'
import newpost from '../components/newpost.vue'
import collection from '../components/collection.vue'
import userdetail from '../components/userdetail.vue'
import recent from '../components/recent-content.vue'
Vue.use(Router)
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/post/:postid',
      name: 'post',
      component: postcontent
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: newpost
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/userdetail/:username',
      name: 'userdetail',
      component: userdetail
      // children: [
      //   {
      //     path: 'recent',
      //     name: 'recent',
      //     component: recent
      //   }
      // ]
    },
    {
      path: '/userdetail/:username/recent',
      name: 'recent',
      component: recent
    }
  ]
})
