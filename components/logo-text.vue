<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
const dark = ref(false)
onMounted(()=>{
  let doc = document.querySelector('body');
  setInterval(()=>{
   if(doc.getAttribute('style') != null && doc.getAttribute('style') == 'background-color: rgb(66, 66, 66);'){
     dark.value = true
   }else {
     dark.value = false
   }
  },100)
})
</script>

<template>
  <img v-show="!dark" src="~/assets/img/logo-text-black.png" width="120" style="display: flex" alt="">
  <img v-show="dark" src="~/assets/img/logo-text-white.png" width="120" style="display: flex" alt="">
</template>

<style scoped>

</style>