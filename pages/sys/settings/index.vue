<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {definePageMeta} from "#imports";
import {useHead} from "unhead";

useHead({
  title: '致飞网盘-Admin｜系统设置',
})

definePageMeta({
  name: '系统设置',
  parent: '系统管理'
});


</script>

<template>
  <div>
    系统设置
  </div>
</template>

<style scoped>

</style>