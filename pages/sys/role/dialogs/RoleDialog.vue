<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import {load_menus} from "~/pages/sys/menu/apis";
import * as apis from '../apis'
import * as icons from '~/assets/utils/icons'
import {ArrowRightOutlined} from '@vicons/antd'
import {NIcon} from "naive-ui";

const emits = defineEmits(['success'])
const tree = ref()
const menus = ref()
const dialog = reactive({
  title: '创建角色',
  open: false,
  data: {
    id: null,
    roleName: '',
    menuIds_list: [],
    authIds_list: [],
    menuIds: '',
    authIds: '',
  },
  show: (data) => {
    Object.assign(dialog.data, {
      id: null,
      roleName: '',
      menuIds_list: [],
      authIds_list: [],
      menuIds: '',
      authIds: '',
    })
    load_menus().then(res => {
      menus.value = res.data.data
    })
    if (data != null) {
      Object.assign(dialog.data, data)
      dialog.data.authIds_list = JSON.parse(dialog.data.authIds)
      dialog.data.menuIds_list = JSON.parse(dialog.data.menuIds)
      dialog.title = '修改角色'
    } else {
      dialog.title = '创建角色'
    }
    dialog.open = true
  },
  close: () => {
    Object.assign(dialog.data, {
      id: null,
      roleName: '',
      menuIds_list: [],
      authIds_list: [],
      menuIds: '',
      authIds: '',
    })
    dialog.open = false
  },
  rules: {},
  submit: (type) => {
    dialog.data.menuIds_list = tree.value.getCheckedData().keys
    for (let i = 0; i < tree.value.getIndeterminateData().keys.length; i++) {
      let ele = tree.value.getIndeterminateData().keys[i];
      dialog.data.menuIds_list.push(ele)
    }
    dialog.data.menuIds = JSON.stringify(dialog.data.menuIds_list)
    dialog.data.authIds = JSON.stringify(dialog.data.authIds_list)
    switch (type) {
      case 1:
        apis.new_role(dialog.data).then(res => {
          emits('success')
          dialog.close()
        })
        break
      case 2:
        apis.change_role(dialog.data).then(res => {
          emits('success')
          dialog.close()
        })
        break
    }
  }
})

defineExpose({
  dialog
})

const render = (opt) => {
  if (opt.option.treeMenus.length != 0) {
    return h(NIcon, null, {default: () => h(ArrowRightOutlined)});
  }
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
        <n-form-item label="角色名称">
          <n-input v-model:value="dialog.data.roleName" placeholder="请输入角色名称"></n-input>
        </n-form-item>
        <n-form-item label="权限列表">
          <n-tree-select
              ref="tree"
              v-model:value="dialog.data.authIds_list"
              cascade
              placeholder="请选择菜单或者按钮"
              checkable
              :options="menus" children-field="treeMenus" key-field="id" label-field="menuName"
              :render-switcher-icon="render" multiple></n-tree-select>
        </n-form-item>

      </n-form>
      <template #footer>
        <div style="display: flex;justify-content: right">
          <n-button @click="dialog.close()">取消</n-button>
          <n-button v-if="dialog.title == '创建角色'" style="margin-left: 1rem" type="primary"
                    @click="dialog.submit(1)">提交
          </n-button>
          <n-button v-else style="margin-left: 1rem" type="primary" @click="dialog.submit(2)">提交</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>