import * as types from './login-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  islogin: localStorage.getItem('islogin'),
  usertoken: localStorage.getItem('usertoken'),
  username: localStorage.getItem('username'),
  useravatar: localStorage.getItem('useravatar'),
  userid: localStorage.getItem('userid')
}
const getters = {
  isLogin: (state) => Boolean(state.islogin),
  userToken: (state) => state.usertoken,
  userName: (state) => state.username,
  userAvatar: (state) => state.useravatar,
  userId: (state) => state.userid
}
const mutations = {
  [types.USER_LOGIN] (state, val) {
    window.location.reload()
  },
  [types.USER_LOGIN_OUT] (state, val) {
    if (state.islogin) {
      localStorage.clear()
      window.location.reload()
    } else {
      alert('还没登录呢。。')
    }
  }
}
const actions = {
  userLogin ({commit}, val) {
    let token = val
    axios.post(`https://cnodejs.org/api/v1/accesstoken`, { accesstoken: val })
      .then((res) => {
        localStorage.setItem('islogin', true)
        localStorage.setItem('usertoken', token)
        localStorage.setItem('username', res.data.loginname)
        localStorage.setItem('useravatar', res.data.avatar_url)
        localStorage.setItem('userid', res.data.id)
        commit(types.USER_LOGIN, val)
        alert('登录成功')
        window.history.go(-1)
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
  },
  userLoginout ({commit}, val) {
    commit(types.USER_LOGIN_OUT, val)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
