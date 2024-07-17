<script setup lang="ts">
import {useLayoutStore} from "~/store/UseLayoutStore";
import {useUserStore} from "~/store/UseUserStore";
import {storeToRefs} from "pinia";
import {useLoadingBar} from "naive-ui";
import {reactive} from "vue";
import * as apis from './apis'

const loadingBar = useLoadingBar();
loadingBar.finish()
const layout = storeToRefs(useLayoutStore()).layout
const user = storeToRefs(useUserStore()).user_info


const formdata = reactive({
  username: '',
  password: ''
})

const login = ()=>{
  apis.login(formdata).then(res=>{
    localStorage.setItem("Authorization", <string>user.value?.token)
    layout.value = 'default'
  })
}
</script>

<template>
  <div class="login-box">
    <div class="left">

    </div>
    <div class="right">
      <div class="login-panel">
        <div style="display: flex;justify-content: center;margin: 1rem 0">
          <img src="~/assets/img/logo.png" width="200" alt="">
        </div>
        <div class="title">登陆 - 致飞网盘｜管理端</div>
        <div class="form">
          <n-form>
            <n-form-item label="用户名">
              <n-input v-model:value="formdata.username" placeholder="请输入用户名"></n-input>
            </n-form-item>
            <n-form-item label="密码">
              <n-input v-model:value="formdata.password" type="password" placeholder="请输入密码"></n-input>
            </n-form-item>
          </n-form>
        </div>
        <div class="btn">
          <n-button style="width: 100%" type="primary" @click="login()">登陆</n-button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.login-box{
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('assets/img/login-bk.jpg') no-repeat center;
  background-size: cover;
  .right{
    .login-panel{
      width: 24rem;
      border-radius: 8px;
      padding: 2rem;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0 0 0 / .2);
      backdrop-filter: blur(8px);
      background: rgba(255 255 255 / .4);
      .title{
        font-size: 1.2rem;
        text-align: center;
        margin: 0 0 1rem 0;
      }
    }
  }
}
</style>