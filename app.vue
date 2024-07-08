<script setup>
import {theme} from '~/assets/config/theme'
import {NConfigProvider} from "naive-ui";
const themeOverrides = theme
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <NuxtLayout>

      </NuxtLayout>
    </n-loading-bar-provider>
  </n-config-provider>

</template>

<style scoped>
:deep(.n-loading-bar) {

}
</style>