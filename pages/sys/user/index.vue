<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import * as apis from './apis'
import {NButton} from 'naive-ui'
import NewUserDrawer from "~/pages/sys/user/drawer/NewUserDrawer.vue";

const tb_date = ref([])
const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '用户名',
    key: 'userName'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return [
        h(
            NButton,
            {
              size: "small",
              type: "primary",
              onClick: () => hand_edit(row)
            },
            { default: () => '编辑' }
        ),
        h(
            NButton,
            {
              size: "small",
              type: "error",
              onClick: () => hand_del(row),
              style: "margin-left: 1rem"
            },
            { default: () => '删除' }
        )
      ]
    }
  }
]
const checkedRowKeys = ref()
const loading = ref(false)
const page_params = reactive({
  total: 0,
  current_page: 1,
  page_size: 10
})
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
    page_params.current_page = page
    init();
  },
  onPageSizeChange: pageSize => {
    pagination.pageSize = pageSize;
    page_params.page_size = pageSize;
    pagination.page = 1;
    init();
  },
});
const drawer = ref()

const hand_del = (row)=>{
  apis.delete_user(row.id).then(res=>{
    init()
  })
}

const hand_edit = (row)=>{
  apis.delete_user(row.id).then(res=>{
    init()
  })
}

const init = ()=>{
  loading.value = true
  apis.load_all_users(page_params).then(res=>{
    tb_date.value = res.data.data.data
    page_params.total = res.data.data.total
    pagination.itemCount = res.data.data.total
    loading.value = false
    if(tb_date.value.length == 0 && page_params.current_page != 1){
      page_params.current_page--;
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
  <div style="width: 100%;height: 100%;">
    <n-card>
      <template #header>
        <n-skeleton v-if="loading" text width="60%" />
        <template v-else>
          操作
        </template>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
      <template v-else>
        <div>
          <n-button type="primary" @click="drawer.drawer.show()">
            添加用户
          </n-button>
        </div>
      </template>
    </n-card>
    <n-card style="margin-top: 1rem;">
      <template #header>
        <n-skeleton v-if="loading" text width="60%" />
        <template v-else>
          查询结果
        </template>
      </template>
      <n-skeleton v-if="loading" text :repeat="6" />
      <template v-else>
        <div>
          <n-data-table
              :loading="loading"
              ref="tableRef"
              striped
              :columns="columns"
              :pagination="pagination"
              :bordered="false"
              :data="tb_date"
              :row-key="row => row.name"
              remote
              v-model:checked-row-keys="checkedRowKeys"
              max-height="100%"
          >
          </n-data-table>
        </div>
      </template>
    </n-card>


    <NewUserDrawer @success="init()" ref="drawer" />
  </div>

</template>

<style scoped>
:deep(.n-data-table__pagination){
  display: flex;
  justify-content: center;
}
</style>