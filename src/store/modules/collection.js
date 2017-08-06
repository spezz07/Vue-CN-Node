import * as types from './collection-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  collectdata: []
}
const getters = {
  collectData: (state) => state.collectdata
}
const mutations = {
  [types.GET_MY_COLLECTION] (state, val) {
    for (let k of val) {
      k['last_reply_at'] = moment(k['last_reply_at']).format('lll') // es6 for...of 语法 可以对对象进行循环
    }
    state.collectdata = val
  }
}
const actions = {
  getMyCollect ({commit}, val) {
    axios.get(`https://cnodejs.org/api/v1/topic_collect/${localStorage.getItem('username')}`)
      .then((res) => {
        commit(types.GET_MY_COLLECTION, res.data.data)
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
