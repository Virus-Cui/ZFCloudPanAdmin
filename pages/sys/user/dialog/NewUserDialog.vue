<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import * as apis from "~/pages/sys/user/apis";
const emits = defineEmits(['success'])

const dialog = reactive({
  title: '添加用户',
  open: false,
  data: {
    id: '',
    userName: '',
    password: '',
    email: ''
  },
  show: (data)=>{
    console.log(data)
    if(data != null){
      Object.assign(dialog.data, data)
      dialog.title = '修改用户'
    }else {
      Object.assign(dialog.data, {
        id: '',
        userName: '',
        password: '',
        email: ''
      })
      dialog.title = '添加用户'
    }
    dialog.open = true
  },
  close: ()=>{
    Object.assign(dialog.data, {
      id: '',
      userName: '',
      password: '',
      email: ''
    })
    dialog.open = false
    dialog.title = '添加用户'
  },
  rules: {},
  submit: ()=>{
    if(dialog.title == '添加用户'){
      apis.new_user(dialog.data).then(res=>{
        dialog.close()
        emits('success')
      })
    }else {
      apis.change_user(dialog.data).then(res=>{
        dialog.close()
        emits('success')
      })
    }
  }
})
defineExpose({
  dialog
})
</script>

<template>
  <n-modal v-model:show="dialog.open">
    <n-card
        style="width: 600px"
        :title="dialog.title"
        :bordered="true"
        role="dialog"
        aria-modal="true"
    >
      <n-form>
        <n-form-item label="用户名">
          <n-input v-model:value="dialog.data.userName" placeholder="请输入用户名"></n-input>
        </n-form-item>
        <n-form-item v-if="dialog.title == '添加用户'" label="密码">
          <n-input v-model:value="dialog.data.password" placeholder="请输入密码"></n-input>
        </n-form-item>
        <n-form-item label="邮箱">
          <n-input v-model:value="dialog.data.email" placeholder="请输入邮箱"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <div style="display: flex;justify-content: right">
          <n-button @click="dialog.close()">取消</n-button>
          <n-button style="margin-left: 1rem" type="primary" @click="dialog.submit()">提交</n-button>
        </div>
      </template>
    </n-card>

  </n-modal>
</template>

<style scoped>

</style>