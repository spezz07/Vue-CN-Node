<template>
  <div >
     <div class="recent-head">
    <mu-appbar :title="titletext">
      <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
    </mu-appbar>
  </div>
        <div >
        <div class="recent-content" v-for="i in userDetailData.recent_replies"  v-if="replies">
        <div class="recent-content-item">
          <div class="item-left" @click="toPost(i.id)">
            <span class="item-title">{{i.title}}</span>
            <span class="item-lastreply">最后回复时间:{{i.last_reply_at}}</span>
          </div>
       <div class="item-right">
         <img :src="i.author.avatar_url" alt="">
         <span class="item-right-authorname">{{i.author.loginname}}</span>
       </div>
        </div>
     </div>
      <div class="recent-content" v-for="i in userDetailData.recent_topics"  v-if="topics">
        <div class="recent-content-item">
          <div class="item-left" @click="toPost(i.id)">
            <span class="item-title">{{i.title}}</span>
            <span class="item-lastreply">最后回复时间:{{i.last_reply_at}}</span>
          </div>
          <div class="item-right">
            <img :src="i.author.avatar_url" alt="">
            <span class="item-right-authorname">{{i.author.loginname}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, computed, onDeactivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const replies = ref(false)
const topics = ref(false)
const titletext = ref('')

const userDetailData = computed(() => store.getters.userDetailData)

// Vue 3 doesn't have $destroy, using onDeactivated instead
onDeactivated(() => {
  // Cleanup if needed
})

const routerback = () => {
  // Vue Router 4 doesn't have goBack method, using router.go()
  router.go(-1)
}

const toPost = (postId) => {
  router.push({name: 'post', params: {postid: postId}}) // 跳转到具体帖子页
}

// Using onMounted with route handling since beforeRouteEnter is not available in setup
// This would typically be handled in the router configuration
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  %papershodow{
    box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)
  };
  .recent-head{
  @extend %papershodow;
    width: 100%;
  }
  .recent-content{
    width: 96%;
    margin: 12px auto;
    display: flex;
    flex-wrap:wrap;
    .recent-content-item{
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
  margin: calc( (100vh - 180px)/2 ) auto 0 auto;
}

</style>
