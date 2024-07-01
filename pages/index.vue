<script setup>
import { h, ref, onMounted } from "vue";
import { NIcon, darkTheme, useOsTheme, NConfigProvider } from "naive-ui";
import {
  Home12Filled,
  PersonCircle12Filled
} from '@vicons/fluent'

const themeOverrides = {
  common: {
    primaryColor: '#377cf6'
  },
}
const dark = ref()
const menuOptions = [
  {
    label: "控制台",
    key: "console",
    disabled: false,
    icon: renderIcon(Home12Filled)
  },
  {
    label: "用户管理",
    key: "user",
    disabled: false,
    icon: renderIcon(PersonCircle12Filled),
    children: [
      {
        label: "客户管理",
        key: "client"
      }
    ]
  }
];
const collapsed = ref(false)

const renderIcon =  (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
onMounted(()=>{
  setInterval(()=>{
    if(useOsTheme().value == 'dark'){
      dark.value = darkTheme
    }else {
      dark.value = undefined
    }
  },100)
})

</script>

<template>
  <ClientOnly>
    <n-config-provider :theme="dark" :theme-overrides="themeOverrides">
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            width="240px"
            style="height: 100vh"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <n-menu
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :render-label="renderMenuLabel"
          />
        </n-layout-sider>
        <n-layout>
          <n-layout-header bordered style="height: 3rem;display: flex;align-items: center;padding: 0 1rem">
            abab
          </n-layout-header>
          <n-layout-content bordered style="height: calc(100vh - 6rem);display: flex;align-items: center;padding: 1rem 1rem">
            abab
          </n-layout-content>
          <n-layout-footer bordered style="height: 3rem;display: flex;align-items: center;padding: 0 0 0 1rem">Powered By Virus_Cui</n-layout-footer>
        </n-layout>
      </n-layout>
    </n-config-provider>

  </ClientOnly>

</template>

<style scoped>

</style>