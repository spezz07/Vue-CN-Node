import * as types from './userdetail-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  userdetaildata: {}
}
const getters = {
  userDetailData: (state) => state.userdetaildata,
  userUrl: (state) => `https://github.com/${state.userdetaildata['githubUsername']}`
}
const mutations = {
  [types.GET_USER_DETAIL] (state, val) {
    val.data.create_at = moment(val.data.create_at).format('lll')
    val.data['recent_topics'].forEach((i) => {
      i.last_reply_at = moment(i.last_reply_at).format('lll')
    })
    val.data['recent_replies'].forEach((i) => {
      i.last_reply_at = moment(i.last_reply_at).format('lll')
    })
    state.userdetaildata = val.data
  }
}
const actions = {
  getUserDetail ({commit}, val) {
    axios.get(`https://cnodejs.org/api/v1/user/${val.username}`)
      .then((res) => {
        res.data.data.id = val.id
        commit(types.GET_USER_DETAIL, res.data)
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
