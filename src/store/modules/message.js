import * as types from './message-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  noreaddata: [],
  readdata: []
}
const getters = {
  noReadData: (state) => state.noreaddata,
  readData: (state) => state.readdata,
  noReadCount: (state) => state.noreaddata.length,
  readCount: (state) => state.readdata.length
}
const mutations = {
  [types.GET_MY_MESSAGE] (state, val) {
    console.log(val)
    if (val.has_read_messages.length !== 0) {
      val.has_read_messages.forEach((item) => {
        item.reply.create_at = moment(item.reply.create_at).format('lll')
      })
      state.readdata = val.has_read_messages
    }
    if (val.hasnot_read_messages.length !== 0) {
      val.hasnot_read_messages.forEach((item) => {
        item.reply.create_at = moment(item.reply.create_at).format('lll')
      })
      state.noreaddata = val.hasnot_read_messages
    }
  }
}
const actions = {
  getMyMessage ({commit}, val) {
    axios.get(`https://cnodejs.org/api/v1/messages/?accesstoken=${val.token}&mdrender=false`)
      .then((res) => {
        commit(types.GET_MY_MESSAGE, res.data.data)
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
  },
  postMarkOne ({commit}, val) {
    axios.post(`https://cnodejs.org/api/v1/message/mark_one/${val.msgid}`, {accesstoken: val.token})
      .then(() => {
        axios.get(`https://cnodejs.org/api/v1/messages/?accesstoken=${val.token}&mdrender=false`)
          .then((res) => {
            commit(types.GET_MY_MESSAGE, res.data.data)
          }).catch((err) => {
            alert(err.response.data['error_msg'])
          })
      })
  },
  postMarkAll ({commit}, val) {
    axios.post(`https://cnodejs.org/api/v1/message/mark_all`, {accesstoken: val.token})
      .then(() => {
        axios.get(`https://cnodejs.org/api/v1/messages/?accesstoken=${val.token}&mdrender=false`)
          .then((res) => {
            commit(types.GET_MY_MESSAGE, res.data.data)
          }).catch((err) => {
            alert(err.response.data['error_msg'])
          })
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
