<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import notice from './components/notice.vue'
import slide from './components/slide.vue'
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  },
  components: {
    notice,
    slide
  }
}
</script>
<style>
  .view {
    position: absolute;
    width:100%;
    transition: all 0.42s cubic-bezier(.42, 0, .58, 1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translateY(500px);
    transform: translateY(500px);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
  }
  .lineclass{
    background-color: #2196f3;
  }
  .labelclass{
    color: #324057;
    font-size: 18px;
  }
  .textclass{
    color: #2196f3;
    font-size: 20px;
  }
  .activeline{
    width: 100%;
    height: 4px;
    border-radius: 50px;
    margin-bottom: 2px;
    background-color: #ffffff;
  }
  input,button,select,textarea{outline:none}

</style>
