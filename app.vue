<script setup>
import {onMounted} from "vue";
import {theme} from '~/assets/config/theme'
import {NConfigProvider, useMessage} from "naive-ui";
const themeOverrides = theme


</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-loading-bar-provider>
        <NuxtLayout>

        </NuxtLayout>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
:deep(.n-loading-bar) {

}
</style>