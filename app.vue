<script setup>
import {onMounted, ref} from "vue";
import {theme} from '~/assets/config/theme'
import {NConfigProvider, useMessage} from "naive-ui";
import FullLoading from '~/components/FullLoading.vue'
const themeOverrides = theme

const isFullLoading = ref(true)
</script>

<template>
  <div>
    <!--    <FullLoading v-if="isFullLoading" />-->
    <n-config-provider :theme-overrides="themeOverrides">
      <n-dialog-provider>
        <n-message-provider>
          <n-loading-bar-provider>
            <NuxtLayout>
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
  transition: all .4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.6rem);
}
</style>