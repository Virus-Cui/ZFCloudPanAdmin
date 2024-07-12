<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import * as icons from "assets/utils/icons";
import {PlusOutlined} from "@vicons/antd";
import {NButton} from 'naive-ui'
import * as apis from './apis'
import RoleDialog from "~/pages/sys/role/dialogs/RoleDialog.vue";
const height = ref()
const loading = ref()
const roleDialog = ref()
const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '角色名称',
    key: 'roleName'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    render(row){
      return h('div',null, [
          h(NButton, {
            type: 'warning',
            size: 'small',
            onClick: ()=>{
              console.log(row);
              roleDialog.value.dialog.show(row)
            }
          }, '编辑'),
          h(NButton, {
            type: 'error',
            size: 'small',
            style: "margin-left: 1rem",
            onClick: ()=>{
              apis.remove_role(row.id).then(res=>{
                init()
              })
            }
          }, '删除')
      ])
    }
  }
]
const tb_data = ref([{}])
const checkedRowKeys = ref([])
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

const init = ()=>{
  height.value = `calc(100vh - ${document.querySelector(".n-card").clientHeight}px - 2rem - 3rem - 10rem)`;
  apis.load_all_roles({
    current_page: pagination.page,
    page_size: pagination.pageSize
  }).then(res=>{
    tb_data.value = res.data.data.data
    pagination.itemCount = res.data.data.total
    if(tb_data.value.length == 0 && pagination.page != 1){
      pagination.page--;
      init()
    }
  })
}

onMounted(()=>{
  init()
})
</script>

<template>
  <div>
    <n-card id="active">
      <template #header>
        操作 -
        <n-tag type="info">角色管理</n-tag>
      </template>
      <n-button type="primary" @click="roleDialog.dialog.show(null)" :render-icon="icons.renderIcon(PlusOutlined)">创建角色</n-button>
    </n-card>
    <n-card style="margin-top: 1rem;">
      <template #header>
        查询结果
      </template>
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
          :row-key="row => row.id"
          remote
          v-model:checked-row-keys="checkedRowKeys"
      >
      </n-data-table>
    </n-card>
    <RoleDialog @success="init()" ref="roleDialog" />
  </div>
</template>

<style scoped>

</style>