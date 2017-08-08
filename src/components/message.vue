<template>
  <div >
    <mu-dialog :open="dialog" title="提示一下" @close="close">
       {{dialogtext}}
        <mu-flat-button slot="actions" @click="close('1')" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="close('2')" label="确定"/>
      </mu-dialog>
     <div class="message-head">
    <mu-appbar title="我的信息">
      <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
    </mu-appbar>
  </div>
        <div v-if="!isLogin" class="no-content">
        <img src="../assets/gg.svg" alt="" >
      <p>你还没登录呢~~</p>
    </div>
        <div v-if="isLogin">
            <div class="message-noread">
              <span class="noread">没查看的话题
                <i class="noreadnum" v-if="noReadCount === 0" style="display:none">0</i>
                <i class="noreadnum" v-else>{{noReadCount}}</i>
              </span>
              <span class="all-mark" @click="open">标记全部已读</span>
          </div>
            <div class="message-content"  v-for="(i,index) in noReadData">
           <div class="message-content-item">
          <div class="item-head">
            <span class="item-title" @click="toPost(i.topic.id)">在{{i.topic.title}}</span>
          </div>
         <div class="item-content">
         <div class="item-content-avatar">
               <img :src="i.author.avatar_url" alt="">
         </div>
         <div class="item-content-info">
                 <div class="info-title">由 <span class="info-author" @click="toUserInfo(i.author.loginname)">{{i.author.loginname}}</span>
                   <span class="info-time">{{i.reply.create_at}}</span>
                   <span class="info-type" v-if="i.type === 'at' ">@了你</span>
                   <span class="info-type" v-if="i.type === 'reply' ">回复了你</span>
                 </div>
                 <div class="info-content"  @click="toPost(i.topic.id, i.id, i.has_read)">{{i.reply.content}}</div>
         </div>
       </div>
        </div>
     </div>
          <mu-divider/>
          <div class="message-read">
            <span class="read">已查看的话题
              <i class="readnum" v-if="readCount === 0" style="display:none">0</i></i>
              <i class="readnum" v-else >{{readCount}}</i></i>
            </span></span>
          </div>
          <div class="message-content"  v-for="(i,index) in readData">
            <div class="message-content-item">
              <div class="item-head">
                <span class="item-title" @click="toPost(i.topic.id)">{{i.topic.title}}</span>
              </div>
              <div class="item-content">
                <div class="item-content-avatar">
                  <img :src="i.author.avatar_url" alt="">
                </div>
                <div class="item-content-info">
                  <div class="info-title">由 <span class="info-author" @click="toUserInfo(i.author.loginname)">{{i.author.loginname}}</span>
                    <span class="info-time">在{{i.reply.create_at}}</span>
                    <span class="info-type" v-if="i.type === 'at' ">@了你</span>
                    <span class="info-type" v-if="i.type === 'reply' ">回复了你</span>
                  </div>
                  <div class="info-content" @click="toPost(i.topic.id, i.id, i.has_read)">{{i.reply.content}}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      dialogtext: ''
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('getMyMessage', {
        token: this.userToken
      })
    }
  },
  methods: {
    open () {
      this.dialog = true
      this.noReadCount !== 0 ? this.dialogtext = '确定要把全部未读信息标记为已读吗?' : this.dialogtext = '无未读信息'
    },
    close (reason) {
      if (this.noReadCount === 0) {
        this.dialogtext = '无未读信息'
        this.dialog = false
      } else {
        if (reason === '2') {
          this.$store.dispatch('postMarkAll', {
            token: this.userToken
          })
          this.dialogtext = '设置成功'
          setTimeout(() => {
            this.dialog = false
          }, 1500)
        } else {
          this.dialog = false
        }
      }
    },
    routerback () {
      this.$router.goBack()
    },
    toPost (postId, msgid, isread) {
      if (!isread) {
        this.$store.dispatch(' postMarkOne', {
          token: this.userToken,
          msgid: msgid
        })
      }
      this.$router.push({name: 'post', params: {postid: postId}}) // 跳转到具体帖子页
    },
    toUserInfo (name) {
      this.$router.push({name: 'userdetail', params: {username: name}})
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userToken',
      'noReadData',
      'readData',
      'readCount',
      'noReadCount'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
    })
  },
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  $fontcolor:#5d7187;
  %papershodow{
    box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)
  };
  %flexcenter{
     display: flex;
     justify-content: center;
     align-items: center;
   }
   %flexwarp{
      display: flex;
      flex-wrap:wrap;
    }
  %textlimit{
     text-decoration:none;
     overflow : hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     /*-webkit-line-clamp: 2;*/
     -webkit-tap-highlight-color:transparent;
     color: #324057;
   }
  .no-content {
    text-align: center;
    margin: calc( (100vh - 180px)/2 ) auto 0 auto;
  }
  .message-head{
  @extend %papershodow;
    width: 100%;
  }
  .message-content{
    width: 96%;
    margin: 4px auto;
  @extend %flexwarp;
    .message-content-item{
   @extend %flexwarp;
      box-shadow:0 1px 7px rgba(153,158,161,.24);
      border: 1px solid #eeeeee;
      height:112px;
      width: 100%;
      border-radius: 4px;
      margin-bottom: 8px;
      padding: 4px;
      .item-head{
      @extend %flexwarp;
        padding: 4px;
        width: 100%;
        height: 28%;
        .item-title{
        @extend %textlimit;
          font-weight: bold;
          -webkit-line-clamp: 1;
        }
      }
    };
  .item-content{
  @extend %flexwarp;
    margin-top: -4px;
    height: 73%;
    padding: 2px;
    width:100%;
    .item-content-avatar{
      width:14%;
      @extend %flexcenter;
          img{
              width: 42px;
              height: 42px;
              border: 1px solid #ddd;
              border-radius: 50%;
              margin-right: 8px;
         }
    };
     .item-content-info{
     @extend %flexwarp;
       width:86%;
       .info-title{
         width: 100%;
         height: 50%;
         font-size: 14px;
       };
       .info-content{
         @extend %textlimit;
         margin-top: 4px;
         width: 100%;
         height: 50%;
         -webkit-line-clamp: 2;
         font-size: 12px;
         color: #232323;
       }
     }
   }
  }
  .info-author,.info-type{
    color: #2196f3;
  }
  .info-time{
    color: #e4404c;
    font-size: 12px;
  }
.message-noread,.message-read{
  height: 32px;
  padding: 18px 18px 18px 8px;
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
  .noread,.read{
    width: 40%;
    color: $fontcolor;
    font-size: 14px;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .noreadnum,.readnum{
  @extend %flexcenter;
    margin-left:8px;
    font-size: 12px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ea3035;
    color: #fff;
  }
.no-content {
  text-align: center;
  margin: calc( (100vh - 180px)/2 ) auto 0 auto;
}
  .all-mark{
    border-radius:8px;
    font-size: 12px;
    color: #202020;
    text-align: center;
  }

</style>
