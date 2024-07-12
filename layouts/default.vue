<script setup>
import {h, ref, onMounted, watch} from "vue";
import {NIcon, darkTheme, useOsTheme, NConfigProvider, useLoadingBar, useMessage, useDialog} from "naive-ui";
import swBtn from '@/components/switch.vue'
import text from '~/components/logo-text.vue'
import axios from 'axios'
import {useRouter} from "#app";
import LogoSmall from "~/components/logo-small.vue";
import {gen_router_paths} from "assets/utils/utils.js";
import NuxtLink from "#app/components/nuxt-link.js";
import {theme} from '~/assets/config/theme'
import * as apis from '../pages/sys/menu/apis'
import {renderIcon} from "assets/utils/icons.js";


const loading = ref(true)
const router = useRouter();
const path = ref()
const arr = ref([]);
const loadingBar = useLoadingBar();
// 设置前置路由守卫
router.beforeEach((to, from, next) => {
  // 路由中导入-开始
  loadingBar.start()
  next()
})
// 设置后置路由守卫
router.afterEach((to, from, next) => {
  // 路由中导入-结束
  loadingBar.finish()
})


const themeOverrides = theme
const dark = ref()
const header = {
  label:
      () => h(NuxtLink, {
        to: '/'
      }, renderIcon(text)),
  icon: renderIcon(LogoSmall)
}
const menuOptions = ref([])

const collapsed = ref(false)
let interval = ref()


watch(() => router.currentRoute.value, () => {
  setTimeout(() => {
    path.value = router.currentRoute.value.fullPath
  }, 100)
})


onMounted(async () => {
  $mount()
  loading.value = true
  if (process.client) {
    loadingBar.start()
    path.value = router.currentRoute.value.fullPath
  }
  await apis.load_menus().then(res => {
    arr.value = res.data.data
  })
  let genRouterPaths = await gen_router_paths(arr.value);
  genRouterPaths.unshift(header)
  menuOptions.value = genRouterPaths
  loading.value = false
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

const $mount = () => {
  if (process.client) {
    window.$message = useMessage()
    window.$dialog = useDialog()

  }
}

const changeTheme = (mode) => {
  clearInterval(interval.value)
  if (mode.mode) {
    dark.value = darkTheme
  } else {
    dark.value = undefined
  }
}

const change = (e) => {
  if (process.client) {
    console.log(path.value)
    localStorage.setItem('path', e.target.innerText)
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
            show-trigger="bar"
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <div style="display: flex;height: 100vh; width: 100%;  justify-content: space-between;flex-direction: column">
            <n-skeleton v-if="loading" :width="'100%'" :height="'100%'" size="medium"/>
            <n-menu
                v-else
                v-model:value="path"
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
                @click="change"
            />
            <div
                :style="{'position': 'relative', 'z-index': '999', 'height': '3rem'}" class="admin">
              <div v-if="!collapsed" style="display: flex;justify-content: left;align-items: center;width: 100%">
                <div style="margin: 0 1rem">
                  <n-avatar src="https://q1.qlogo.cn/g?b=qq&nk=2437916756&s=640"></n-avatar>
                </div>
                <div>
                  Admin
                </div>
              </div>
              <div v-else style="margin-left: 1rem">
                <n-avatar src="https://q1.qlogo.cn/g?b=qq&nk=2437916756&s=640"></n-avatar>
              </div>
            </div>
          </div>
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
                            style="height: calc(100vh - 6rem);display: flex;align-items: center;padding: 1rem 1rem;width: 100%;">
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
:deep(.n-menu > .n-menu-item:first-child > .n-menu-item-content.n-menu-item-content--selected::before) {
  background: none;
}

:deep(.n-layout-scroll-container) {
  width: 100%;
}

:deep(.n-layout-toggle-bar){
  right: -24px;
}

.admin{
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
}
</style>