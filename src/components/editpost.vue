<template>
  <div>
    <div class="newpost-head" >
      <mu-appbar title="编辑帖子">
       <mu-icon-button icon="arrow_back" slot="left"  @click="routerback" />
    </mu-appbar>
  </div>
    <div class="newpost-area">
      <div class="newpost-title">
        <mu-text-field v-model="posttitle" label="帖子标题" hintText="请在这里输入帖子标题" class="newpost-title-text" underlineFocusClass="lineclass" labelFocusClass="textclass" labelClass="labelclass"/>
      </div>
      <div class="newpost-title">
        <mu-select-field v-model="posttab"  label="帖子标签" class="newpost-title-tabs" underlineFocusClass="lineclass" labelFocusClass="textclass" labelClass="labelclass">
          <mu-menu-item v-for="(text,index) in list" :key="index" :value="text" :title="text" />
        </mu-select-field>
    </div>
    </div>
    <div class="newpost-content-area">
     <div class="newpost-content">
        <mu-text-field v-model="postcontent" label="帖子内容" hintText="" multiLine :rows="10" class="input-area" :underlineShow="false" labelFocusClass="textclass" labelClass="labelclass"/>
      </div>
    </div>
    <mu-raised-button label="确定" class="submit-btn" @click="submitData(postData.id)"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: ['问答', '分享', '求职', '客户端'],
      posttitle: '',
      posttab: '',
      postcontent: ''
    }
  },
  deactivated () {
    this.$destroy()
  },
  created () {
    this.posttitle = this.postData.title
    this.postcontent = this.postData.content
    const tabs = (t) => {
      switch (t) {
        case 'ask':
          this.posttab = '问答'
          break
        case 'share':
          this.posttab = '分享'
          break
        case 'job':
          this.posttab = '求职'
          break
        case 'dev':
          this.posttab = '客户端'
          return
      }
    }
    tabs(this.postData.tab)
  },
  methods: {
    routerback () {
      this.$router.goBack()
    },
    submitData (id) {
      let temp
      switch (this.posttab) {
        case '问答':
          temp = 'ask'
          break
        case '分享':
          temp = 'share'
          break
        case '求职':
          temp = 'job'
          break
        case '客户端':
          temp = 'dev'
      }
      let check = (title, tab, content) => {
        let count = 0
        if (title !== '') {
          count++
        } else {
          alert('标题内容不能为空')
          return false
        }
        if (tab !== '') {
          count++
        } else {
          alert('帖子标签不能为空')
          return false
        }
        if (content !== '') {
          count++
        } else {
          alert('帖子内容不能为空')
          return false
        }
        if (count === 3) {
          this.$store.dispatch('editMyPost', {
            token: this.userToken,
            title: this.posttitle,
            content: this.postcontent,
            tab: temp,
            postid: id
          })
        }
      }
      check(this.posttitle, this.posttab, this.postcontent)
    }
  },
  computed: {
    ...mapGetters([
      'userToken',
      'postData'
    ])
  },
  beforeRouteEnter (to, from, next, vm) {
    if (localStorage.getItem('islogin')) {
      next()
    } else {
      alert('请登录后再操作')
      window.history.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  components: {
  }
}
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
  $fontcolor:#324057;
  .newpost-head{
    width: 100%;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  }
  .newpost-area,.newpost-content-area{
    width: 92%;
    margin: 12px auto;
    box-shadow: 0 1px 7px rgba(153,158,161,.24);
    border-radius: 2px;
  }
  .newpost-title {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 24px;
    height: 78px;
    overflow-y: hidden;
  }
  .newpost-title-text,.newpost-title-tabs{
    margin-top: 18px;
    width: 100%;
  }
  .newpost-content{
    width: 100%;
    padding: 24px;
    border: 0;
    overflow-y: auto;
  }
  .input-area{
    width: 100%;
    min-height: 300px;
  }
  .submit-btn{
    display: flex;
    justify-content: center;
    margin: 18px auto;
    width:92%;
    background-color: #2196f3;
    color: #fff;
  }

</style>
