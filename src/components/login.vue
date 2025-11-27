<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <el-button type="primary" @click="routerback" icon="el-icon-arrow-left" plain>返回</el-button>
    </el-header>
    <div class="login">
           <el-input 
             v-model="tokenvalue" 
             class="logininput" 
             placeholder="请输入你的Token"
             type="textarea"
             :autosize="{ minRows: 2, maxRows: 4}"
           />
           <p class="login-des">请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录</p>
           <el-button type="primary" class="logininput-btn" @click="loginin">确定</el-button>
         </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'login',
  setup() {
    const tokenvalue = ref('')
    const store = useStore()
    const router = useRouter()
    
    const loginin = () => {
      if (tokenvalue.value === '') {
        alert('token值不能为空')
      } else {
        store.dispatch('userLogin', tokenvalue.value)
      }
    }
    
    const routerback = () => {
      router.goBack()
    }
    
    return {
      tokenvalue,
      loginin,
      routerback
    }
  }
}
</script>

<style lang="scss" scoped>
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
