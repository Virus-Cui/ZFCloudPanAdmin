<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import * as apis from "~/pages/sys/user/apis";
import {icon_mapping} from "assets/utils/icons";
import {load_all_roles} from "~/pages/sys/role/apis";

const emits = defineEmits(['success'])
const roles = ref()
const role_page_params = reactive({
  current_page: 1,
  page_size: 10,
  total: 0
})
const dialog = reactive({
  title: '添加用户',
  open: false,
  data: {
    id: '',
    userName: '',
    password: '',
    email: '',
    role: null
  },
  show: (data)=>{
    change(1)
    if(data != null){
      Object.assign(dialog.data, data)
      dialog.title = '修改用户'
    }else {
      Object.assign(dialog.data, {
        id: '',
        userName: '',
        password: '',
        email: '',
        role: null
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
      email: '',
      role: null
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

const change = (a)=>{
  role_page_params.current_page = a
  load_all_roles(role_page_params).then(res=>{
    role_page_params.total = res.data.data.total
    roles.value = res.data.data.data
  })
}
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
        <n-form-item label="角色">
          <n-select  placeholder="请选择图标" clearable v-model:value="dialog.data.role" value-field="id" label-field="roleName"  :options="roles">
            <template #action>
              <n-pagination v-model:page="role_page_params.current_page" :page-size="role_page_params.page_size" @change="change" />
            </template>
          </n-select>
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