<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import * as apis from '../apis'

const emits = defineEmits(['success'])

const drawer = reactive({
  title: '添加用户',
  open: false,
  data: {
    username: '',
    password: '',
    email: ''
  },
  show: ()=>{
    drawer.open = true
  },
  close: ()=>{
    Object.assign(drawer.data, {
      username: '',
      password: '',
      email: ''
    })
    drawer.open = false
  },
  rules: {},
  submit: ()=>{
    console.log(drawer.data)
    apis.new_user(drawer.data).then(res=>{
      drawer.close()
      emits('success')
    })
  }
})

defineExpose({
  drawer
})
</script>

<template>
  <div>
    <n-drawer @close="drawer.close()" v-model:show="drawer.open" :width="502">
      <n-drawer-content :title="drawer.title">
        <n-form>
          <n-form-item label="用户名">
            <n-input v-model:value="drawer.data.username" placeholder="请输入用户名"></n-input>
          </n-form-item>
          <n-form-item label="密码">
            <n-input v-model:value="drawer.data.password" placeholder="请输入密码"></n-input>
          </n-form-item>
          <n-form-item label="邮箱">
            <n-input v-model:value="drawer.data.email" placeholder="请输入邮箱"></n-input>
          </n-form-item>
        </n-form>
        <template #footer>
            <n-button @click="drawer.close()" style="margin-right: 1rem">取消</n-button>
            <n-button @click="drawer.submit()" type="primary">提交</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped>

</style>