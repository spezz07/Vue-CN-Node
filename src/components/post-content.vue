<template>
  <div>
    <loading v-show="loadingPostStatus"></loading>
    <mu-back-top :height="300" :bottom="50" :right="10" :duration="500" >
      <mu-float-button icon="publish" mini  style="background-color: #2196f3"/>
    </mu-back-top>
       <div class="head">
      <mu-appbar title="CN-Node社区">
        <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
      </mu-appbar>
    </div>
       <div class="post-content-author">
       <div class="content-item">
        <div class="item-title" >
          <div class="content-tips">
            <span class="stick-top" v-if="postData.top" >置顶</span>
            <span class="good"  v-if="postData.good">精华</span>
            <span class="item-article-last" >最后回复时间:{{postData['last_reply_at']}}</span>
          </div>
          <h6>
          {{postData.title}}
          </h6>
          <mu-icon value="star" :size="22" color="yellow500" class="item-collections" v-if="postData['is_collect']" @click="postcollection"/>
          <mu-icon value="star_border" :size="22" class="item-collections" v-else @click="postcollection"/>
        </div>
        <div class="item-info">
          <img :src="postData['author']['avatar_url']" alt="" @click="touserinfo(postData['author']['loginname'])">
          <div class="item-info-left">
            <span class="item-info-author">{{postData['author']['loginname']}}</span>
            <div class="item-info-tips">
              <span class="tips-lz" style="background-color: #81c784">楼主</span >
            </div>
            <span class="item-info-createtime">{{postData['create_at']}}</span>
          </div>
          <div class="item-info-right">
            <span class="item-info-reply">
              <mu-icon value="reply" color="grey800" :size="16"/>&nbsp&nbsp{{postData['reply_count']}}
             </span>
            <span class="item-info-visit"> <mu-icon value="visibility" color="grey800" :size="16"/>
              &nbsp&nbsp{{postData['visit_count']}}</span>
          </div>
        </div>
        <mu-divider/>
        <div class="item-article" v-html='postData.content'>
        </div>
      </div>
    </div>
       <div class="post-content" v-for=" (i,index) in postData.replies">
       <div class="content-item">
        <div class="item-info">
          <img :src="i.author['avatar_url']" alt="" @click="touserinfo(i['author']['loginname'])">
          <div class="item-info-left">
            <span class="item-info-author">{{i.author['loginname']}}
               <div class="item-info-tips">
                 <span class="tips-floor" style="background-color: #2196f3;display: inline-block">#{{index + 1}}</span >
                 <span class="tips-lz" style="background-color: #81c784;display: inline-block" v-if="postData['author']['loginname'] === i.author['loginname']">楼主</span >
               </div>
               </span>
            <span class="item-info-createtime">{{i['create_at']}}</span>
          </div>
          <div class="item-info-right">
            <span class="item-info-visit"/>
                 <mu-icon value="thumb_up" color="red500" :size="16" v-if="i.is_uped" @click="postups(i.id,index)"/>
                 <mu-icon value="thumb_up" color="grey800" :size="16" v-else  @click="postups(i.id,index)"/>
                 &nbsp {{i.ups.length}}
            </span>
            <span class="item-info-reply" @click="replyat(i.reply_id, i.author['loginname'])">
              <mu-icon value="reply" color="grey800" :size="16"/>&nbsp&nbsp回复该楼层
             </span>
          </div>
        </div>
        <mu-divider/>
        <div class="item-article" v-html="i.content">
        </div>
      </div>
    </div>
    <br><br>
       <div class="post-reply">
         <input class="post-reply-input" v-model="replycontent" placeholder="请输入你的回复内容"></input>
         <span v-html="replyname" @click='replyat(0, 0)' style="color: #fff"></span>
         <div class="post-reply-send">
           <mu-icon value="send" color="grey50" :size="36" @click="postreply"/>
         </div>
       </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loading from './loading.vue'
export default {
  data () {
    return {
      replyname: '',
      replyid: '',
      replycontent: '',
      postid: this.$route.params.postid
    }
  },
  deactivated () {
    this.$destroy()
  },
  created () {
    this.$store.dispatch('loadingPost')
    this.$store.dispatch({
      type: 'getPostData',
      postid: this.$route.params.postid,
      token: this.userToken,
      data: []
    })
    window.scrollTo(0, 0)
  },
  methods: {
    routerback () {
      this.$router.goBack()
    },
    replyat (id, name) {
      if (id === 0 && name === 0) {
        this.replyname = ''
        this.replyid = ''
      } else {
        this.replyid = id
        this.replyname = `@${name}`
      }
    },
    postreply () {
      if (this.isLogin) {
        if (this.replycontent) {
          this.$store.dispatch('postReply', {
            postId: this.postid,
            content: this.replycontent,
            replyId: this.replyid,
            token: this.userToken,
            replyName: this.replyname
          })
          /* let reply = async () => {
            try {
              await this.$store.dispatch('postReply', {
                postId: this.postid,
                content: this.replycontent,
                replyId: this.replyid,
                token: this.userToken,
                replyName: this.replyname
              })
              await this.$store.dispatch({
                type: 'getPostData',
                postid: this.$route.params.postid,
                token: this.userToken,
                data: []
              })
            } catch (err) {
              alert(err.response.data['error_msg'])
            }
          }
          reply() */ // es7 async
        } else { alert('不能回复空内容') }
      } else { alert('请登录后再进行回复') }
    },
    postcollection () {
      if (this.isLogin) {
        this.$store.dispatch('postCollection', {
          collect: this.isCollection,
          token: this.userToken,
          postid: this.postid
        })
      } else {
        alert('请登录后再收藏帖子')
      }
    },
    postups (id, index) {
      if (this.isLogin) {
        this.$store.dispatch('postUps', {
          token: this.userToken,
          replyId: id,
          index: index
        })
      } else {
        alert('请登录后再点赞')
      }
    },
    touserinfo (name) {
      console.log(name)
      this.$router.push({name: 'userdetail', params: {username: name}})
    }
  },
  computed: {
    ...mapGetters([
      'postData',
      'loadingPostStatus',
      'userId',
      'userToken',
      'isLogin',
      'isCollection'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (vm.loadmoredata) {
        alert('111')
      }
    })
  },
  components: {
    loading
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  $fontcolor:#324057;
  a{
    color: #2196f3;
  };
  %papershodow{
     box-shadow:0 1px 7px rgba(153,158,161,.24);
   };
  %textover{
     text-decoration:none;
     overflow : hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
   };
  %flexcenter{
    display: flex;
    justify-content: center;
    align-items: center;
   };
  .head{
    width: 100%;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    z-index: 88;
    position: fixed;
    left: 0;
    top: 0;
  };
  .post-content-author{
  @extend %papershodow;
    width: 96%;
    margin: 64px auto 14px auto;
    border-radius: 2px;
  };
  .post-content{
  @extend %papershodow;
    border-radius: 2px;
    width: 96%;
    margin: 0 auto 14px auto;

  }
  .content-tips{
    width: 100%;
    margin: 0;
    display: inline-block;
    height: 24px;
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
  @extend .tips;
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
  .item-article-last{
    float: right;
    font-size: 10px;
    color: #878787;
    line-height: 22px;
  }
  .content-item{
    width: 100%;
    padding: 4px;
    min-height: 128px;
  .item-title{
      width: 100%;
      padding: 4px;
      border-bottom: 1px solid #ddd;
      position: relative;
        h6{
              display:inline-flex;
              align-items: center;
              color: $fontcolor;
              margin: 4px 0 4px 0;
              font-size:16px;
              width: 95%;

       };
       .item-collections{
         position: absolute;
         right: 3px;
         top: 36px;
         width: 5%;
       }
    }
  .item-info{
      display: flex;
      padding: 4px;
      justify-content:space-between;
      align-items: center;
        img{
        width: 38px;
        height: 38px;
        border-radius: 50%;
  }
  };
  .item-info-tips span{
    @extend .tips;
     height: 18px;
     display: inline-block;
     text-align: center;
     line-height: 18px;
  }
   .item-info-left{
     width:42%;
     color:fontcolor;
     font-size:14px;
     span{
      display: block;
     }
   }
  .item-info-right{
    @extend .item-info-left;
    text-align: end;
    padding: 2px;
  }
  }
  .item-article{
    color: $fontcolor;
    padding: 4px;
    img{
      width: 100%;
      height: 100%;
    }
    table {
      margin: 0 auto;
      font-size: 12px;
      text-align: center;
      width: 100%;
      table-layout:fixed;
      border-collapse:collapse;
      th{
        background-color: #2196f3;
        padding: 8px;
        color: #fff;
      }
      td{
        border: 1px solid #f5f5f5;
        max-width: 120px;
        word-wrap:break-word;
        word-break:break-all
      }
    }
  }
  .post-reply{
    display: flex;
    align-items: center;
    width: 100%;
    position: fixed;
    bottom: 0px;
    min-height: 40px;
    background-color:rgba(0,0,0,0.8);
    box-shadow:0 -1px 6px rgba(0,0,0,.117647),0 -1px 4px rgba(0,0,0,.117647);
    .post-reply-input{
      margin: 4px;
      padding-left: 4px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 36px;
      font-size: 16px;
    }
    .post-reply-send{
      margin-left: 4px;
       display: flex;
       align-items: center;
       justify-content: flex-end;
     }
  }
</style>
