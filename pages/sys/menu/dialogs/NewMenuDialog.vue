<script setup lang="ts">
import {ref, reactive, onMounted, h, type Component} from "vue";
import * as menu_apis from '../apis'
import {NAvatar, NIcon, NText, type SelectRenderLabel, type SelectRenderTag, type TreeOption} from "naive-ui";
import {ChevronForward} from "@vicons/ionicons5";
import {icon_mapping} from "assets/utils/icons";
import * as icon from "assets/utils/icons";

const emits = defineEmits(['success'])

function renderIcon (icon: Component) {
  return h(NIcon, {
    size: '1.4rem'
  }, { default: () => h(icon) })
}
const menu = ref([])
const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
  let icon = null
  for (let i = 0; i < icon_mapping.length; i++) {
    let ele = icon_mapping[i]
    if(ele.label == option.label){
      icon = ele.value
    }
  }
  return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      [
        renderIcon(icon),
        option.label as string
      ]
  )
}

const renderLabel: SelectRenderLabel = (option) => {
  let icon = null
  for (let i = 0; i < icon_mapping.length; i++) {
    let ele = icon_mapping[i]
    if(ele.label == option.label){
      icon = ele.value
    }
  }
  return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      [
        renderIcon(icon),
        h(
            'div',
            {
              style: {
                marginLeft: '12px',
                padding: '4px 0'
              }
            },
            [
              h('div', null, [option.label as string]),
              h(
                  NText,
                  { depth: 3, tag: 'div' },
                  {
                    default: () => 'description'
                  }
              )
            ]
        )
      ]
  )
}

const dialog = reactive({
  title: '添加菜单',
  open: false,
  data: {
    menuName: '',
    menuPurview: '',
    menuRouterPath: '',
    menuPid: '',
    menuComment: '',
    icon: '',
    outline: '',
    menuType: ''
  },
  show: ()=>{
    dialog.open = true
    menu_apis.load_menus().then(res => {
      menu.value = res.data.data
      menu.value = [
        {
          menuName: '主类目',
          id: 0,
          treeMenus: menu.value
        }
      ]
    })
  },
  close: ()=>{
    Object.assign(dialog.data, {
      menuName: '',
      menuPurview: '',
      menuRouterPath: '',
      menuPid: '',
      menuComment: '',
      icon: '',
      menuType: '',
      outline: ''
    })
    dialog.open = false
  },
  rules: {},
  submit: ()=>{
    console.log(dialog.data)
    menu_apis.add_menu(dialog.data).then(res=>{
      emits('success')
    })
  }
})

const renderSwitcherIcon = (option: TreeOption, expanded: boolean, selected: boolean) => {
  if(option.option.treeMenus.length == 0){
    return ''
  }
  return h(NIcon, null, {default: () => h(ChevronForward)})
}

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
        <n-form-item label="菜单名称">
          <n-input placeholder="请输入菜单名称" v-model:value="dialog.data.menuName"></n-input>
        </n-form-item>
        <n-form-item label="菜单列表">
          <n-tree-select
              v-model:value="dialog.data.menuPid"
              key-field="id"
              label-field="menuName"
              children-field="treeMenus"
              :options="menu"
              :render-switcher-icon="renderSwitcherIcon"
              clearable
              placeholder="请选择父级"
          />
        </n-form-item>
        <n-form-item label="菜单图标">
          <n-select  placeholder="请选择图标" clearable v-model:value="dialog.data.icon" value-field="label" :render-label="renderLabel" :render-tag="renderSingleSelectTag" :options="icon_mapping"></n-select>
        </n-form-item>
        <n-form-item label="权限标识">
          <n-radio-group v-model:value="dialog.data.menuType">
            <n-radio value="FOLDER" label="目录"></n-radio>
            <n-radio value="ITEM" label="菜单"></n-radio>
            <n-radio value="ACTIVE" label="按钮"></n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="权限标识">
          <n-input v-model:value="dialog.data.menuPurview" placeholder="请输入权限标识"></n-input>
        </n-form-item>
        <n-form-item label="路由地址">
          <n-input v-model:value="dialog.data.menuRouterPath" placeholder="请输入路由地址"></n-input>
        </n-form-item>
        <n-form-item label="菜单备注">
          <n-input v-model:value="dialog.data.menuComment" placeholder="请输入菜单备注"></n-input>
        </n-form-item>
        <n-form-item label="是否为外链地址">
          <n-switch v-model:value="dialog.data.outline"></n-switch>
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