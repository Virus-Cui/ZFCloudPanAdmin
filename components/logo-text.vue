<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import { useThemeVars } from 'naive-ui'

const dark = ref(false)
onMounted(()=>{
  const theme = useThemeVars()
  setInterval(()=>{
   if(theme.value.baseColor == '#FFF'){
     dark.value = false
   }else {
     dark.value = true
   }
  },100)
})
</script>

<template>
  <img v-if="!dark" src="~/assets/img/logo-text-black.png" width="120" style="display: flex" alt="">
  <img v-else src="~/assets/img/logo-text-white.png" width="120" style="display: flex" alt="">
</template>

<style scoped>

</style>