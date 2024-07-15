<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {useRouter} from "#app";
import {definePageMeta} from "#imports";

const Route = useRouter()
definePageMeta({
  name: '个人中心',
  parent: null
});

onMounted(() => {
  console.log(Route.currentRoute.value)
})
</script>

<template>
  <div>
    My
  </div>
</template>

<style scoped>

</style>