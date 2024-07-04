<script setup>
import {h, ref, onMounted, watch} from "vue";
import {NIcon, darkTheme, useOsTheme, NConfigProvider, useLoadingBar} from "naive-ui";
import swBtn from '@/components/switch.vue'
import text from '~/components/logo-text.vue'
import axios from 'axios'
import {useRouter} from "#app";
import LogoSmall from "~/components/logo-small.vue";
import {gen_router_paths} from "assets/utils/utils.js";

const router = useRouter();
const path = ref()
const arr = ref([]);
const loadingBar = useLoadingBar();
// 设置前置路由守卫
router.beforeEach((to,from,next)=>{
  // 路由中导入-开始
  loadingBar.start()
  next()
})
// 设置后置路由守卫
router.afterEach((to,from,next)=>{
  // 路由中导入-结束
  loadingBar.finish()
})

watch(router.currentRoute, (value, oldValue, onCleanup) => {
  console.log(value.fullPath)
  if (process.client) {
    window.localStorage.setItem('path', value.fullPath)
  }
})

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
  label: renderIcon(text),
  icon: renderIcon(LogoSmall)
}
const menuOptions = ref([])

const collapsed = ref(false)
let interval = ref()
onMounted(async () => {
  if (process.client) {
    console.log('lvar',loadingBar)
    loadingBar.start()
    path.value = localStorage.getItem('path') == undefined ? '/dashboard' : localStorage.getItem('path')
  }
  console.log()
  await axios.get('http://127.0.0.1:8080/auth/menus').then(res => {
    arr.value = res.data.data
  })
  let genRouterPaths = await gen_router_paths(arr.value);
  genRouterPaths.unshift(header)
  menuOptions.value = genRouterPaths
  interval.value = setInterval(() => {
    if (useOsTheme().value == 'dark') {
      dark.value = darkTheme
    } else {
      dark.value = undefined
    }
  }, 100)
  if (process.client) {
    loadingBar.finish()
  }
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
                v-model:value="path"
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
      </n-config-provider>
  </ClientOnly>
</template>

<style scoped>
:deep(.n-menu-item:nth-of-type(1) .n-menu-item-content.n-menu-item-content--selected::before) {
  background: none;
}


</style>