<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import {load_menus} from "~/pages/sys/menu/apis";
import * as apis from '../apis'
import * as icons from '~/assets/utils/icons'
import {ArrowRightOutlined} from '@vicons/antd'
import {NIcon} from "naive-ui";

const menus = ref()
const dialog = reactive({
  title: '创建角色',
  open: false,
  data: {
    roleName: '',
    menuIds: []
  },
  show: (data) => {
    load_menus().then(res => {
      menus.value = res.data.data
    })
    if (data != null) {
      Object.assign(dialog.data, data)
      dialog.title = '修改角色'
    } else {
      dialog.title = '创建角色'
    }
    dialog.open = true
  },
  close: () => {
    Object.assign(dialog.data, {})
    dialog.open = false
  },
  rules: {},
  submit: (type) => {
    switch (type){
      case 1:
        // apis.new_role(dialog.data);
        console.log(dialog.data)
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
              v-model:value="dialog.data.menuIds"
              cascade
              checkable
              :options="menus" children-field="treeMenus" key-field="id" label-field="menuName"
                         :render-switcher-icon="render" multiple></n-tree-select>
        </n-form-item>

      </n-form>
      <template #footer>
        <div style="display: flex;justify-content: right">
          <n-button @click="dialog.close()">取消</n-button>
          <n-button style="margin-left: 1rem" type="primary" @click="dialog.submit(1)">提交</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>