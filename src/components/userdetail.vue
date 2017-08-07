<template>
  <div>
    <!--<router-view v-if="isRecent"></router-view>-->
    <!--<div v-if="!isRecent">-->
      <mu-appbar title="用户信息">
        <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
      </mu-appbar>
      <div v-if="isNoContent" class="no-content">
        <img src="../assets/gg.svg" alt="" >
        <p>你还没登录呢~~</p>
      </div>
      <div v-if="!isNoContent">
        <div class="user-detail-info">
          <div class="info-left">
            <img :src="userDetailData.avatar_url" alt="">
          </div>
          <div class="info-right">
        <span class="info-user">
          <span class="info-name" style="font-weight: bold">用户名:{{userDetailData.loginname}}</span>
        </span>
            <span class="info-github">
              <mu-icon-button :href="userUrl">
                  <svg  height="20" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
              </mu-icon-button>
           </span>
            <span class="info-score">
          积分:{{userDetailData.score}}
        </span>
            <span class="info-data">注册日期:{{userDetailData.create_at}}</span>
          </div>
        </div>
        <div class="user-detail-topic" @click="torecent('topics')">
          <mu-icon value="description" :size="32" style="color: #2196f3" />
          <span>我最近参与的话题</span>
        </div>
        <div class="user-detail-reply" @click="torecent('replies')">
          <mu-icon value="message" :size="32" style="color: #ffb559"/>
          <span>我最近参与的回复</span>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userid: null,
      isNoContent: true,
      username: this.$route.params.username
      // isRecent: false
    }
  },
  methods: {
    routerback () {
      this.$router.goBack()
    },
    torecent (p) {
      this.$router.push(
        {
          name: 'recent',
          params: {
            username: this.$route.params.username
          },
          query: {
            to: p
          }
        })
      //  this.isRecent = true
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (to.params.username === 'defult') {
        vm.isNoContent = true
        return
      }
      if (to.params.username === vm.$route.params.username) {
        vm.$store.dispatch('getUserDetail', {username: vm.$route.params.username})
        vm.isNoContent = false
        return
      }
      if (from.path === '/') {
        vm.isLogin ? vm.$store.dispatch('getUserDetail', {username: vm.userName}) : vm.$store.dispatch('getUserDetail', {username: vm.$route.params.username})
        vm.isNoContent = false
        return
      }
    })
  },
  computed: {
    ...mapGetters([
      'userDetailData',
      'isLogin',
      'userName',
      'userUrl'
    ])
  },
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  $textcolor:#5d7187;
  %papershodow{
    box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)
  };
  .user-detail-info{
    width: 96%;
    margin: 12px auto;
    height: 96px;
    padding: 8px;
    display: flex;
    flex-wrap:wrap;
    box-shadow:0 1px 7px rgba(153,158,161,.24);
    overflow-y: hidden;
    overflow-x: hidden;
    color:$textcolor;
    .info-left{
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width:24%;
      img{
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid #ddd;
      }
    };
    .info-right{
      position: relative;
      width: 76%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      span{
        width: 100%;
        font-size: 14px;
      }
    }
  }
  .user-detail-topic{
    width: 96%;
    margin: 12px auto;
    height: 48px;
    display: flex;
    box-shadow:0 1px 7px rgba(153,158,161,.24);
  }
  .user-detail-reply{
    @extend .user-detail-topic
  }
  .info-github{
    position: absolute;
    top:-10%;
    right: -85%;
    svg{
      margin-left: -4px;
      margin-top: -4px;
    }
  }
  .user-detail-topic,.user-detail-reply{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    span{
      color:$textcolor;
      font-size: 16px;
      margin-left: 24px;
    }
  }
  .no-content {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
