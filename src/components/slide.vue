<template>
  <div>
    <mu-drawer :open="slidestatus" :docked="docked" @close="slideopen(1)"  width="220">
      <div class="userinfo">
        <div v-if="isLogin">
        <div class="user-avatar">
          <img :src="userAvatar" alt="">
        </div>
        <div class="user-name" >
          <span>{{userName}}</span>
        </div>
        </div>
        <div v-else @click="slideopen(1)">
          <router-link to="/login" >
          <div class="user-avatar">
            <img src="../assets/user_defult.png" alt="">
          </div>
          <div class="user-name">
            <span>请登录后再操作</span>
          </div>
          </router-link>
        </div>
      </div>
      <mu-list @itemClick="slideopen(1)">
        <mu-list-item title="用户信息" @click="toUserInfo">
          <mu-icon slot="left" value="account_box" color="blue500"  />
        </mu-list-item>
        <mu-list-item title="我的收藏" @click="tocollection">
          <mu-icon slot="left" value="stars" color="blue500"/>
        </mu-list-item>
        <mu-list-item title="我的设置">
          <mu-icon slot="left" value="settings_applications" color="blue500"/>
        </mu-list-item>
        <mu-list-item title="退出登录" @click="loginout">
          <mu-icon slot="left" value="exit_to_app" color="blue500"/>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'slidebar',
  data () {
    return {
      open: true,
      docked: false,
      loginName: ''
    }
  },
  created () {},
  props: ['slidestatus'],
  methods: {
    slideopen (n) {
      setTimeout(() => {
        this.open = !this.open
        this.docked = !n
        this.$emit('slideopen')
      }, 0)
    },
    loginout () {
      this.$store.dispatch('userLoginout')
    },
    tocollection () {
      setTimeout(() => {
        this.$router.push('/collection')
      }, 100)
    },
    toUserInfo () {
      if (this.isLogin) {
        setTimeout(() => {
          this.$router.push({name: 'userdetail', params: {username: this.userName}})
        }, 100)
      } else {
        setTimeout(() => {
          this.$router.push({name: 'userdetail', params: {username: 'defult'}})
        }, 100)
      }
    }
  },
  computed: {
    ...mapGetters([
      'userName',
      'isLogin',
      'userAvatar'
    ])
  },
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
   .userinfo{
      display: flex;
      flex-wrap: wrap;
      background: url('../assets/background.jpg') no-repeat;
      background-size: cover;
      .user-avatar{
        width: 100%;
        padding:14px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        img{
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }
     }
     .user-name{
       width: 100%;
       display: flex;
       align-items: center;
       font-size: 16px;
       font-weight: bold;
       span{
         color: #fff;
         margin-left: 18px;
         margin-bottom: 18px;
       }
     }
   }
</style>
