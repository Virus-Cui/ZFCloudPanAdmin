<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
const props = defineProps(['sys'])
</script>

<template>
  <n-tag type="success" v-if="props.sys == 'sys'">后台</n-tag>
  <n-tag type="info" v-else>前台</n-tag>
</template>

<style scoped>

</style>
