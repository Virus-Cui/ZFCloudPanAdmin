<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";

const dialog = reactive({
  title: '',
  open: false,
  data: {},
  show: (data)=>{
    Object.assign(dialog.data, data)
    dialog.open = true
  },
  close: ()=>{
    Object.assign(dialog.data, {})
    dialog.open = false
  },
  rules: {},
  submit: ()=>{}
})
</script>

<template>

</template>

<style scoped>

</style>