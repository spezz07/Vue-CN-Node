import { createRouter, createWebHistory } from 'vue-router'
import index from '@/components/index'
import postcontent from '../components/post-content.vue'
import login from '../components/login.vue'
import newpost from '../components/newpost.vue'
import collection from '../components/collection.vue'
import userdetail from '../components/userdetail.vue'
import recent from '../components/recent-content.vue'
import message from '../components/message.vue'
import editpost from '../components/editpost.vue'

const routes = [
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
  },
  {
    path: '/userdetail/:username/recent',
    name: 'recent',
    component: recent
  },
  {
    path: '/mymessage',
    name: 'message',
    component: message
  },
  {
    path: '/post/:postid/edit',
    name: 'editpost',
    component: editpost
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由方法
router.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

export default router
