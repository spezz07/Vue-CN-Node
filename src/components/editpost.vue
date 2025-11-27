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
<script setup>
import { ref, computed, onMounted, onDeactivated } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const list = ref(['问答', '分享', '求职', '客户端'])
const posttitle = ref('')
const posttab = ref('')
const postcontent = ref('')

const userToken = computed(() => store.getters.userToken)
const postData = computed(() => store.getters.postData)

onMounted(() => {
  posttitle.value = postData.value.title
  postcontent.value = postData.value.content
  const tabs = (t) => {
    switch (t) {
      case 'ask':
        posttab.value = '问答'
        break
      case 'share':
        posttab.value = '分享'
        break
      case 'job':
        posttab.value = '求职'
        break
      case 'dev':
        posttab.value = '客户端'
        return
    }
  }
  tabs(postData.value.tab)
})

// Vue 3 doesn't have $destroy, using onDeactivated instead
onDeactivated(() => {
  // Cleanup if needed
})

const routerback = () => {
  // Vue Router 4 doesn't have goBack method, using router.go()
  router.go(-1)
}

const submitData = (id) => {
  let temp
  switch (posttab.value) {
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
      store.dispatch('editMyPost', {
        token: userToken.value,
        title: title,
        content: content,
        tab: temp,
        postid: id
      })
    }
  }
  check(posttitle.value, posttab.value, postcontent.value)
}

// Vue 3 equivalent of beforeRouteEnter/beforeRouteLeave guard
// This would typically be handled in the router configuration
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
