<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";

const props = defineProps(['data', 'columns', 'loading', 'checkedRowKeys', 'total'])
const emits = defineEmits(['init'])
const height = ref()

const pagination = reactive({
  page: 1, //受控模式下的当前页
  pageSize: 10, //受控模式下的分页大小,每一页的数据大小
  showSizePicker: true, //是否显示每页条数
  pageSizes: [10, 20, 50], //每页条数,可自定义
  showQuickJumper: true,
  pageCount: 0,
  itemCount: 0, //总条数
  prefix: () => { //分页前缀
    return '共 ' + pagination.itemCount + ' 项';
  },
  onChange: page => { //切换第几页时
    pagination.page = page;
    emits('init')
    pagination.itemCount = props.total
    if (props.data.length == 0) {
      emits('init')
      pagination.itemCount = props.total
    }
  },
  onPageSizeChange: pageSize => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    emits('init')
    if (props.data.length == 0) {
      emits('init')
    }
  },
});

onMounted(()=>{
  pagination.itemCount = props.total
  height.value = `calc(100vh - ${document.querySelector(".n-card").clientHeight}px - 2rem - 3rem - 10rem)`;
})
</script>

<template>
  <n-data-table
      :style="{ height: `${height}` }"
      flex-height
      :loading="loading"
      ref="tableRef"
      striped
      :columns="columns"
      :pagination="pagination"
      :bordered="false"
      :data="data"
      :row-key="row => row.id"
      remote
      v-model:checked-row-keys="props.checkedRowKeys"
      max-height="100%"
  >
  </n-data-table>
</template>

<style scoped>

</style>