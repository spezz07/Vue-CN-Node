<template>
  <div class="mask">
    <mu-circular-progress :size="90" color="red"  />
    <h3>sdedfaefdasfdasfdafas.</h3>
   </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.mask{
  position: fixed;
  top: 50%;
  left: 50%;
  transform : translate(-50%,-50%);
  background-color: #fff;
  width: 240px;
  height: 180px;
  border-radius:12px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
}

</style>
