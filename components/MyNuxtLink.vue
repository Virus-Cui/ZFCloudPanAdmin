<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
const props = defineProps(['to'])
</script>

<template>
<NuxtLink :to="props.to">
  <slot name="default"></slot>
</NuxtLink>
</template>

<style scoped>

</style>