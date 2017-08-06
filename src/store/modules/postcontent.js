import * as types from './postcontent-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  postdata: {
    id: '',
    author_id: '',
    tab: 'all',
    content: '',
    title: '',
    last_reply_at: '',
    good: true,
    top: false,
    reply_count: 0,
    visit_count: 0,
    create_at: '',
    author: {
      loginname: '',
      avatar_url: ''
    },
    replies: [],
    is_collect: false
  },
  loadingstatus: false
}
const getters = {
  postData: (state) => state.postdata,
  loadingPostStatus: (state) => state.loadingstatus,
  isCollection: (state) => state.postdata.is_collect
}
const mutations = {
  [types.GET_POST_DATA] (state, val) {
    val.data['create_at'] = moment(val.data['create_at']).startOf('mm').fromNow() // 时间格式化为距离发帖时间多少
    val.data['last_reply_at'] = moment(val.data['last_reply_at']).startOf('mm').fromNow()
    val.data.replies.forEach((item) => {
      item['create_at'] = moment(item['create_at']).startOf('mm').fromNow()
    })
    state.postdata = val.data
    state.postdata.upsstatus = ''
    state.loadingstatus = false
  },
  [types.LOADING_POST_CHANGE] (state, val) {
    state.loadingstatus = true
  },
  [types.ADD_COLLECT] (state, val) {
    state.postdata.is_collect = true
  },
  [types.CANCEL_COLLECT] (state, val) {
    state.postdata.is_collect = false
  },
  [types.TO_UPS] (state, val) {
    if (val.ups === 'down') {
      state.postdata.replies[val.index].is_uped = false
      state.postdata.replies[val.index].ups.splice(0, 1)
      alert('取消点赞成功')
    } else {
      state.postdata.replies[val.index].is_uped = true
      state.postdata.replies[val.index].ups.splice(-1, 1, 1)
      alert('点赞成功')
    }
  }
}
const actions = {
  getPostData ({ commit }, val) {
    axios.get(`https://cnodejs.org/api/v1/topic/${val.postid}?accesstoken=${val.token}`) // Promise请求数据
      .then((res) => {
        val.data = res.data.data
        commit(types.GET_POST_DATA, val)
      }).catch((err) => { console.log(err) })
  },
  loadingPost ({ commit }, val) {
    commit(types.LOADING_POST_CHANGE, val)
  },
  postReply ({ commit }, val) { // 回复功能
    if (val.replyId) {
      axios.post(`https://cnodejs.org/api/v1/topic/${val.postId}/replies`, {
        accesstoken: val.token,
        content: val.replyName + val.content,
        reply_id: val.replyId
      }).then(() => {
        alert('回复成功')
        axios.get(`https://cnodejs.org/api/v1/topic/${val.postId}?accesstoken=${val.token}`) // Promise请求数据
          .then((res) => {
            val.data = res.data.data
            commit(types.GET_POST_DATA, val)
          }).catch((err) => { console.log(err) })
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
    } else {
      axios.post(`https://cnodejs.org/api/v1/topic/${val.postId}/replies`, {
        accesstoken: val.token,
        content: val.content
      }).then(() => {
        alert('回复成功')
        axios.get(`https://cnodejs.org/api/v1/topic/${val.postId}?accesstoken=${val.token}`) // Promise请求数据
          .then((res) => {
            val.data = res.data.data
            commit(types.GET_POST_DATA, val)
          }).catch((err) => { console.log(err) })
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
    }
  },
  postCollection ({commit}, val) { // 收藏功能
    if (val.collect) {
      axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
        'accesstoken': val.token,
        'topic_id': val.postid
      }).then(() => {
        commit(types.CANCEL_COLLECT, val)
        alert('取消收藏该主题')
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
    } else {
      axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
        'accesstoken': val.token,
        'topic_id': val.postid
      }).then(() => {
        commit(types.ADD_COLLECT, val)
        alert('收藏主题成功')
      }).catch((err) => {
        alert(err.response.data['error_msg'])
      })
    }
  },
  postUps ({commit}, val) {
    axios.post(`https://cnodejs.org/api/v1/reply/${val.replyId}/ups`, {
      'accesstoken': val.token
    }).then((res) => {
      val.ups = res.data.action
      commit(types.TO_UPS, val)
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
