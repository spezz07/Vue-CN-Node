import * as types from './index-mutation-types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
moment.locale('zh-cn')
Vue.use(VueAxios, axios)
const state = {
  indexdata: [],
  loadingstatus: true,
  loadingmorestatus: false,
  leavepagey: null
}
const getters = {
  indexData: (state) => state.indexdata,
  loadingIndexStatus: (state) => state.loadingstatus,
  loadingmoreStatus: (state) => state.loadingmorestatus,
  leavePagey: (state) => state.leavepagey
}
const mutations = {
  [types.GET_INDEX_DATA] (state, val) {
    val.data.forEach((item) => { item['create_at'] = moment(item.create_at).startOf('mm').fromNow() }) // 时间格式化为距离发帖时间多少
    state.indexdata = val.data
    state.loadingstatus = false
  },
  [types.GET_INDEX_MORE_DATA] (state, val) {
    val.data.forEach((item) => { item['create_at'] = moment(item['create_at']).startOf('mm').fromNow() })
    val.data.forEach((item) => { // 把触发无限下拉时请求的数据push到indexdata 内
      state.indexdata.push(item)
    })
    state.loadingmorestatus = false
  },
  [types.LEAVE_PAGEY] (state, val) {
    state.leavepagey = val
  },
  [types.LOADING_INDEX_CHANGE] (state, val) { // 切换页面loading显示
    state.loadingstatus = true
  },
  [types.LOADING_MORE_INDEX_CHANGE] (state, val) { // 无限下拉数据loading显示
    state.loadingmorestatus = true
  }
}
const actions = {
  getIndexData ({ commit }, val) {
    axios.get(`https://cnodejs.org/api/v1/topics/?tab=${val.activeTab}&page=1`) // 根据标签-Promise请求数据
      .then((res) => {
        commit(types.LOADING_INDEX_CHANGE, val)
        return res
      })
      .then((res) => {
        val.data = res.data.data
        commit(types.GET_INDEX_DATA, val)
      }).catch(() => { alert('网络错误') })
  },
  getIndexMoreData ({ commit }, val) {
    axios.get(`https://cnodejs.org/api/v1/topics/?tab=${val.activeTab}&page=${val.pageCount}`) // 无限下拉时根据标签和页面数-Promise请求数据
      .then((res) => {
        commit(types.LOADING_MORE_INDEX_CHANGE, val)
        return res
      })
      .then((res) => {
        val.data = res.data.data
        commit(types.GET_INDEX_MORE_DATA, val)
      }).catch(() => { alert('网络错误') })
  },
  setPagey ({ commit }, val) {
    commit(types.LEAVE_PAGEY, val)
  },
  loadingIndex ({ commit }, val) { // 切换页面loading显示
    commit(types.LOADING_INDEX_CHANGE, val)
  },
  loadingMoreIndex ({ commit }, val) { // 无限下拉数据loading显示
    commit(types.LOADING_MORE_INDEX_CHANGE, val)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
