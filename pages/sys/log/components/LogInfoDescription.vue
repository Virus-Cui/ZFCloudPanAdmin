<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";

const props = defineProps(['info'])
</script>

<template>
  <n-descriptions label-placement="left" bordered :column="3">
    <n-descriptions-item label="请求ID">
      {{ props.info.id }}
    </n-descriptions-item>
    <n-descriptions-item label="请求方法">
      <n-tag type="success" v-if="props.info.method == 'GET'">GET</n-tag>
      <n-tag type="warning" v-if="props.info.method == 'POST'">POST</n-tag>
      <n-tag type="error" v-if="props.info.method == 'DELETE'">DELETE</n-tag>
      <n-tag type="info" v-if="props.info.method == 'PUT'">PUT</n-tag>
    </n-descriptions-item>
    <n-descriptions-item label="请求路径">
      {{ props.info.path }}
    </n-descriptions-item>
    <n-descriptions-item label="请求结果">
      {{ props.info.result }}
    </n-descriptions-item>
    <n-descriptions-item label="请求参数">
      {{ props.info.params }}
    </n-descriptions-item>
  </n-descriptions>
</template>

<style scoped>

</style>