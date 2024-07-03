<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {navigateTo} from "#app/composables/router";

onMounted(()=>{
  navigateTo('/dashborad')
})
</script>

<template>
正在跳转
</template>

<style scoped>

</style>