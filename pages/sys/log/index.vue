<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import {renderIcon} from "assets/utils/icons.js";
import {Loading3QuartersOutlined} from '@vicons/antd'
import {NButton, NTag} from "naive-ui";
import * as apis from './apis'

const height = ref()
const tb_data = ref([])
const loading = ref(false)
const checkedRowKeys = ref()
const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '请求路径',
    key: 'path'
  },
  {
    title: '请求人',
    key: 'accessAs'
  },
  {
    title: '请求地址',
    key: 'accessFrom'
  },
  {
    title: '请求类型',
    key: 'method',
    render(row) {
      switch (row.method) {
        case 'GET':
          return h(NTag, {
            type: 'success'
          }, row.method)
        case 'POST':
          return h(NTag, {
            type: 'warning'
          }, row.method)
        case 'DELETE':
          return h(NTag, {
            type: 'error'
          }, row.method)
        case 'PUT':
          return h(NTag, {
            type: 'info'
          }, row.method)
      }
      return h(NTag, {}, row.method)
    }
  },
  {
    title: '操作',
    key: 'active',
    render() {
      return h(NButton, {
        type: 'primary',
        size: 'small'
      }, '详情')
    }
  }
]

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
    init();
  },
  onPageSizeChange: pageSize => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    init();
  },
});

const init = () => {
  loading.value = true
  // 初始化高度
  // if(process.client){
    height.value =`calc(100vh - ${document.querySelector(".n-card").clientHeight}px - 2rem - 3rem - 10rem)`;
  // }
  console.log(height.value);
  apis.load_all_logs({
    current_page: pagination.page,
    page_size: pagination.pageSize
  }).then(res => {
    tb_data.value = res.data.data.data
    pagination.itemCount = res.data.data.total
    loading.value = false
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <n-card id="action">
      <template #header>
        操作
      </template>
      <n-button :render-icon="renderIcon(Loading3QuartersOutlined)" @click="init()">刷新</n-button>
    </n-card>

    <n-card style="margin-top: 1rem;">
      <template #header>
          查询结果
      </template>
      <div>
        <n-data-table
            :style="{ height: `${height}` }"
            flex-height
            :loading="loading"
            ref="tableRef"
            striped
            :columns="columns"
            :pagination="pagination"
            :bordered="false"
            :data="tb_data"
            :row-key="row => row.name"
            remote
            v-model:checked-row-keys="checkedRowKeys"
        >
        </n-data-table>
      </div>
    </n-card>
  </div>
</template>

<style scoped>

</style>