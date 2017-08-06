<template>
  <div id="app">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
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
  /*  watch: {
    '$route' (to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }    <transition :name="transitionName">
        <keep-alive>
      <router-view class="view"></router-view>
        </keep-alive>
      </transition>
  }, */
  components: {
    notice,
    slide
  }
}
</script>
<style>
  @import "./assets/style.css";
  .view {
    position: absolute;
    width:100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
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
