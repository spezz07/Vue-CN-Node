import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import router from '../../router'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {}
const getters = {}
const mutations = {}
const actions = {
  createNewPost: function ({commit}, val) {
    axios.post('https://cnodejs.org/api/v1/topics', {
      accesstoken: val.token, // val.token
      title: val.title,
      tab: val.tab, // val.tab
      content: val.content
    }).then((res) => {
      alert('发帖成功,3s后将跳转到帖子')
      setTimeout(function () {
        router.push({name: 'post', params: {postid: res.data.topic_id}})
      }, 3000)
    }).catch((err) => {
      alert(err.response.data['error_msg'])
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
