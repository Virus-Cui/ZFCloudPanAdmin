<script setup>
import {h, ref, onMounted} from "vue";
import {NIcon, darkTheme, useOsTheme, NConfigProvider, useLoadingBar} from "naive-ui";
import swBtn from '@/components/switch.vue'
import text from './assets/img/freecompress-out.png'
import {
  Home12Filled,
  PersonCircle12Filled
} from '@vicons/fluent'
import LogoSmall from "~/components/logo-small.vue";
import {gen_router_paths} from "assets/utils/utils.js";



const arr = [
  {
    name: 'index',
    path: '/index',
    icon: 'PersonCircle12Filled',
    disable: false,
    children: [
      {
        name: 'index1',
        path: '/index1',
        icon: 'Home12Filled',
        disable: false,
      }
    ]
  }
];


const themeOverrides = {
  common: {
    primaryColor: '#377cf6'
  },
}
const dark = ref()
const renderIcon = (icon) => {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const header = {
  label: () => h('img', {
    src: text,
    width: 120,
    height: '100%',
    style: 'display: flex;left: .3rem;position: relative;'
  }),
  icon: renderIcon(LogoSmall)
}
// const menuOptions = [
//   {
//     label: () =>h('img',{
//       src: text,
//       width: 120,
//       height: '100%',
//       style: 'display: flex;left: .3rem;position: relative;'
//     }),
//     icon: renderIcon(LogoSmall)
//   },
//   {
//     label: "控制台",
//     key: "console",
//     disabled: false,
//     icon: renderIcon(Home12Filled)
//   },
//   {
//     label: "用户管理",
//     key: "user",
//     disabled: false,
//     icon: renderIcon(PersonCircle12Filled),
//     children: [
//       {
//         label: "客户管理",
//         key: "client"
//       }
//     ]
//   }
// ];

const menuOptions = ref([])

const collapsed = ref(false)
let interval = ref()
onMounted(async () => {
  let genRouterPaths = await gen_router_paths(arr);
  genRouterPaths.unshift(header)
  console.log('router', genRouterPaths)
  menuOptions.value = genRouterPaths
  interval.value = setInterval(() => {
    if (useOsTheme().value == 'dark') {
      dark.value = darkTheme
    } else {
      dark.value = undefined
    }
  }, 100)
})

const changeTheme = (mode) => {
  clearInterval(interval.value)
  console.log(mode.mode)
  if (mode.mode) {
    dark.value = darkTheme
  } else {
    dark.value = undefined
  }
}
</script>

<template>
  <ClientOnly>
    <n-config-provider :theme="dark" :theme-overrides="themeOverrides">
      <n-loading-bar-provider>
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
            />
          </n-layout-sider>
          <n-layout>
            <n-layout-header bordered style="height: 3rem;display: flex;align-items: center;padding: 0 1rem">
              <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
                <div>123</div>
                <div>
                  <swBtn @change="changeTheme"></swBtn>
                </div>
              </div>
            </n-layout-header>
            <n-layout-content bordered
                              style="height: calc(100vh - 6rem);display: flex;align-items: center;padding: 1rem 1rem">
              <NuxtPage/>

            </n-layout-content>
            <n-layout-footer bordered style="height: 3rem;display: flex;align-items: center;padding: 0 0 0 1rem">Powered
              By Virus_Cui
            </n-layout-footer>
          </n-layout>
        </n-layout>
      </n-loading-bar-provider>
    </n-config-provider>
  </ClientOnly>
</template>

<style scoped>
:deep(.n-menu-item:nth-of-type(1) .n-menu-item-content.n-menu-item-content--selected::before) {
  background: none;
}


</style>