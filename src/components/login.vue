<template>
  <div>
    <mu-appbar title="CN-Node社区">
      <mu-icon-button icon="arrow_back"  @click="routerback" slot="left"/>
    </mu-appbar>
    <div class="login">
           <mu-text-field  v-model="tokenvalue" class="logininput" underlineFocusClass="lineclass" labelFocusClass="textclass" label="请输入你的Token" labelFloat/>
           <p class="login-des">请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录</p>
           <mu-raised-button label="确定" class="logininput-btn"  @click="loginin" />
         </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      tokenvalue: ''
    }
  },
  methods: {
    loginin () {
      if (this.tokenvalue === '') {
        alert('token值不能为空')
      } else {
        this.$store.dispatch('userLogin', this.tokenvalue)
      }
    },
    routerback () {
      this.$router.goBack()
    }
  },
  computed: {
    ...mapGetters([])
  },
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped >
  %papershodow{
    box-shadow:0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647)
  };
  .login{
  @extend %papershodow;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 14px auto ;
    width: 96%;
    height: 200px;
    padding: 8px;
    overflow-y: hidden;
  p{
    width: 90%;
    margin: -52px;
    padding: 0;
    color: #324057;;
  }
  }

  .logininput{
    width: 90%;
    max-height: 48px!important;
  }
  .logininput-btn{
    width:90%;
    position: absolute;
    bottom:20px;
    background-color: #2196f3;
    color: #fff;
  }
  .lineclass{
    background-color: #2196f3;
  }
  .textclass{
    color: #2196f3;
  }
  .iconclass{
    color: #2196f3;
  }

</style>
