<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route'(to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style>
  .view {
    position: absolute;
    width:100%;
    transition: all 0.35s cubic-bezier(.42, 0, .58, 1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translateX(500px);
    transform: translateX(500px);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translateX(-500px);
    transform: translateX(-500px);
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
  .mu-badge-circle{
    width: 18px!important;
    height: 18px!important;
    top: -6px;
  }
</style>
