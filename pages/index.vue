<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {navigateTo} from "#app/composables/router";

onMounted(()=>{
  navigateTo('/dashboard')
})
</script>

<template>
  <div>正在跳转</div>
</template>

<style scoped>

</style>