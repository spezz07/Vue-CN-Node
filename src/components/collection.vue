<template>
  <div >
     <div class="collection-head">
    <mu-appbar title="我的收藏">
      <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
    </mu-appbar>
  </div>
        <div  v-if="isLogin" class="collection-content" v-for="i in collectData" >
        <div class="collection-content-item">
          <div class="item-left" @click="toPost(i.id)">
            <span class="item-title" v-if="i.good" style="color: #81c784">{{i.title}}</span>
            <span class="item-title" v-else-if="i.top" style="color: #1d7ac6">{{i.title}}</span>
            <span class="item-title" v-else="i.top" >{{i.title}}</span>
            <span class="item-lastreply">最后回复时间:{{i.last_reply_at}}</span>
          </div>
       <div class="item-right">
         <img :src="i.author.avatar_url" alt="">
         <span class="item-right-authorname">{{i.author.loginname}}</span>
       </div>
        </div>
     </div>
        <div v-if="!isLogin" class="no-content" >
        <img src="../assets/gg.svg" alt="">
        <p>你还没登录呢~~</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'collection',
  data () {
    return {
    }
  },
  deactivated () {
    this.$destroy()
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('getMyCollect', {})
    }
  },
  methods: {
    routerback () {
      this.$router.back(-1)
    },
    toPost (postId) {
      this.$router.push({name: 'post', params: {postid: postId}}) // 跳转到具体帖子页
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'collectData'
    ])
  },
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  %papershodow{
    box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)
  };
  .collection-head{
  @extend %papershodow;
    width: 100%;
  }
  .collection-content{
    width: 96%;
    margin: 12px auto;
    display: flex;
    flex-wrap:wrap;
    .collection-content-item{
      display: inline-flex;
      box-shadow:0 1px 7px rgba(153,158,161,.24);
      border: 1px solid #eeeeee;
      height: 80px;
      width: 100%;
      border-radius: 4px;
      padding: 8px;
    };
    .item-left{
      display: inline-block;
     width: 80%;
      .item-title{
        text-decoration:none;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size:16px;
        -webkit-tap-highlight-color:transparent;
        font-weight: bold;
        height: 45px;
        color: #324057;
      }
      .item-lastreply{
        display: inline-block;
        color: #9f9f9f;
        font-size: 12px;
        height: 32px;
      }
  };
    .item-right{
      width: 30%;
      img{
        display: block;
        margin: 0 auto;
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
      .item-right-authorname{
        text-align: center;
        display: block;
        font-size: 13px;
      }
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
