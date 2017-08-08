<template>
  <div>
    <slide @slideopen="handleslideshow" :slidestatus="slideshow"></slide>
    <loading v-show="loadingIndexStatus"></loading>
    <mu-back-top :height="300" :bottom="30" :right="10" :duration="1000" >
      <mu-float-button icon="publish" mini  style="background-color: #2196f3"/>
    </mu-back-top>
     <div class="head" >
    <mu-appbar title="CN-Node社区">
       <mu-icon-button icon="menu" slot="left"  @click="handleslideshow"/>
        <mu-badge :content="noReadNum" class="icon-badge" circle secondary slot="right" >
        <mu-icon value="notifications" @click="toMyMessage"/>
      </mu-badge>
      <mu-icon-button icon="edit_mode" slot="right"  @click="toNewPost"/>
    </mu-appbar>
    <mu-tabs :value="activetab" @change="handleTabChange" lineClass="activeline" :zDepth = 8 >
    <mu-tab value="all"  title="全部" />
    <mu-tab value="good"  title="精华"/>
    <mu-tab value="share" title="分享"/>
    <mu-tab value="ask"  title="问答"/>
    <mu-tab value="job"  title="招聘"/>
    <mu-tab value="dev"  title="客户端"/>
    </mu-tabs>
  </div>
     <div class="content" >
       <div class="content-list" v-for="i in  indexData">
         <div class="content-list-item">
          <div class="avatar">
            <img :src='i.author.avatar_url' />
            <span class="avatar-name">{{i.author.loginname}}</span>
          </div>
          <div class="item-content">
            <div class="item-tips ">
              <span class="stick-top" v-if="i.top">置顶</span>
              <span class="good" v-if="i.good">精华</span>
              <span class="question" v-if="i.tab ==='ask' ">问答</span>
              <span class="share" v-if="i.tab ==='share' ">分享</span>
            </div>
            <div class="item-title" @click="toPost(i['id'])">
              <span>{{i.title}}</span>
            </div>
            <div class="item-data">
              <div class="item-time">
                <span>发表时间：{{i.create_at}}</span>
              </div>
              <div class="item-info">
                <mu-icon value="visibility" style="color: #5d7187" :size="16"/>
                <span> {{i.visit_count}} </span>
                <mu-icon value="reply"style="color: #5d7187" :size="16"/>
                <span>  {{i.reply_count}} </span>
              </div>
            </div>
          </div>
          </div>
      </div>
       <div class="content-load" v-show="loadingmoreStatus">
         <mu-circular-progress :size="20"/>
         &nbsp&nbsp正在加载更多...
       </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loading from './loading.vue'
import slide from './slide.vue'
export default {
  created () {
    this.$store.dispatch({
      type: 'getIndexData',
      activeTab: this.activetab,
      val: []
    })
    if (this.isLogin) {
      this.$store.dispatch('getNoReadNum', { token: this.userToken })
    }
  },
  data () {
    return {
      activetab: 'all',
      page: 1,
      slideshow: false
    }
  },
  methods: {
    handleslideshow () {
      this.slideshow = !this.slideshow
    },
    handleTabChange (val) { // 切换tab进行数据请求
      window.scrollTo(0, 0)
      this.page = 1
      this.activetab = val
      this.$store.dispatch('loadingIndex')
      this.$store.dispatch({
        type: 'getIndexData',
        activeTab: this.activetab,
        val: []
      })
    },
    toPost (postId) {
      this.$router.push({name: 'post', params: {postid: postId}}) // 跳转到具体帖子页
    },
    toNewPost () {
      if (this.isLogin) {
        this.$router.push('/newpost') // 跳转到新建帖子
      } else {
        alert('请登录后再进行新建帖子操作')
      }
    },
    toMyMessage () {
      this.$router.push(`/mymessage`)
    },
    loadmoredata () {
      // console.info('文档高度：' + document.querySelector('.content').offsetHeight)
      // console.info('滚动高度：' + pageYOffset)
      // console.info('相减：' + (document.querySelector('.content').offsetHeight - window.pageYOffset))
      // console.info('页面高度:' + window.screen.height)
      if (!this.loadingmoreStatus && document.querySelector('.content').offsetHeight - window.pageYOffset <= window.screen.height) { // 判断是否滚动到底部，并且没在载入状态下才进行请求数据
        this.page++
        this.$store.dispatch('loadingMoreIndex')
        this.$store.dispatch({
          type: 'getIndexMoreData',
          activeTab: this.activetab,
          pageCount: this.page,
          val: []
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'indexData',
      'loadingIndexStatus', // getters 映射到this.indexData注意命名不能冲突
      'loadingmoreStatus',
      'leavePagey',
      'isLogin',
      'userToken',
      'noReadNum'
    ])
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/login') {
      location.replace(document.referrer) // window.location.reload()
    }
    next((vm) => {
      window.scrollTo(0, vm.leavePagey)
      if (vm.isLogin) {
        vm.$store.dispatch('getNoReadNum', { token: vm.userToken })
      }
      setTimeout(() => {
        window.addEventListener('scroll', vm.loadmoredata)
      }, 100)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('setPagey', window.pageYOffset)
    window.removeEventListener('scroll', this.loadmoredata) // 当转移到其他路由时，移除scroll事件
    next()
  },
  components: {
    loading,
    slide
  }
}
</script>
<style  scoped lang="scss" rel="stylesheet/scss">
  $fontcolor:#5d7187;
  %textover{
      text-decoration:none;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    };
 .activeline{
   width: 100%;
   height: 4px;
   border-radius: 50px;
   margin-bottom: 2px;
   background-color: #ffffff;
 }
  .head{
    width: 100%;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    position: fixed;
    left: 0;
    top: 0;
  }
  .icon-badge {
    width: 20px;
    height: 20px;
  }
  .mu-badge-circle{
    width: 20px!important;
    height: 20px!important;
  }
  .content{
    margin-top: 104px;
    background-color: #eff2f7;
  }
  .item-tips{
    height: 25px;
  }
  .tips {
    display: inline-block;
    width: 32px;
    height: 18px;
    padding: 1px;
    border-radius:4px;
    font-size: 12px;
    color: white;
    text-align: center;
  }
  .stick-top{
    @extend .tips ;
    background-color: #2196f3;
  }
  .good{
    @extend .tips ;
     background-color: #81c784;
  }
  .question{
    @extend .tips ;
    background-color: #ff5722;
  }
  .share{
  @extend .tips ;
    background-color: #f57c00;
  }
  .content-tips{
    width: 100px;
  }
  .content-list{
    background-color: #fff;
  }
  .content-list-item{
    height: 148px;
    display: flex;
    padding: 12px;
    margin-bottom: 8px;
    background-color: #fff;
  }
  .avatar{
     display: flex;
     width:20%;
     align-items: center;
     flex-wrap:wrap;
     justify-content:center;
     padding:4px;
     color:  $fontcolor;
      img{
         width: 42px;
         height: 42px;
         border-radius: 50%;
      }
      .avatar-name{
          @extend %textover;
          -webkit-line-clamp: 1;
           width: 100%;
           font-size: 8px;
           text-align: center;
      }
  }
 .item-content{
      width: 80%;
      align-items: center;
      flex-wrap:warp;
      div{
        margin-top: 4px;
      }
      .item-title{
        &:hover {
            color: #2196f3;
         }
        @extend %textover;
        -webkit-line-clamp: 2;
        font-size:16px;
        color:  $fontcolor;
        height: 48px;
        -webkit-tap-highlight-color:transparent;
        font-weight: bold;
      }
 }
  .item-data{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    color:$fontcolor;
  }
 .item-info{
   display: flex;
   width: 50%;
   align-items: center;
   justify-content:flex-end;
   span{
     margin-left: 4px;
     margin-right: 12px;
     font-size: 10px;
   }
 }
  .item-time{
    display:flex;
    width:50%;
     span{
       color: $fontcolor;
       font-size: 12px;
     }
  }
  .content-load{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
</style>
