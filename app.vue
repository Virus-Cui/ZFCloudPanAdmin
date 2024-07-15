<script setup>
import {onMounted, ref} from "vue";
import {theme} from '~/assets/config/theme'
import {NConfigProvider, useMessage} from "naive-ui";
import {useLayoutStore} from "~/store/UseLayoutStore";
import {storeToRefs} from "pinia";
const layout = storeToRefs(useLayoutStore()).layout;
const themeOverrides = theme

onMounted(()=>{
})
</script>

<template>
  <div>
    <!--    <FullLoading v-if="isFullLoading" />-->
    <n-config-provider :theme-overrides="themeOverrides">
      <n-dialog-provider>
        <n-message-provider>
          <n-loading-bar-provider>
            <NuxtLayout :name="layout">
            </NuxtLayout>
          </n-loading-bar-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-config-provider>
  </div>

</template>

<style>
.page-enter-active,
.page-leave-active {
  opacity: 1;
  transform: translate(0);
  transition: all .4s;
}
.page-enter-from,
.page-leave-to {
  filter: blur(8px);
  transform: translate(10px);
  opacity: 0;
  //filter: blur(.6rem);
}
</style>