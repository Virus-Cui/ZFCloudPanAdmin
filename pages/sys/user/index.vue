<script setup lang="ts">
import {ref, reactive, onMounted, h} from "vue";
import * as apis from './apis'
import {NButton} from 'naive-ui'
import NewUserDialog from "~/pages/sys/user/dialog/NewUserDialog.vue";
import * as icons from "assets/utils/icons";
import {PlusOutlined} from "@vicons/antd";
import {useHead} from "unhead";
import {useUserStore} from "~/store/UseUserStore";
import {storeToRefs} from "pinia";

const user = storeToRefs(useUserStore()).user_info

useHead({
  title: '致飞网盘-Admin｜用户管理',
})

definePageMeta({
  name: '用户管理',
  parent: '系统管理'
});

const tb_date = ref([])
const columns = [
  {
    title: 'ID',
    key: 'id',
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
              type: "warning",
              disabled: user.value?.username == row.userName,
              onClick: () => hand_kick(row)
            },
            {default: () => '踢出'}
        ),
        h(
            NButton,
            {
              size: "small",
              type: "primary",
              onClick: () => hand_edit(row),
              style: "margin-left: 1rem"

            },
            {default: () => '编辑'}
        ),
        h(
            NButton,
            {
              size: "small",
              type: "error",
              onClick: () => hand_del(row),
              style: "margin-left: 1rem"
            },
            {default: () => '删除'}
        )
      ]
    }
  }
]
const checkedRowKeys = ref()
const loading = ref(false)
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
const drawer = ref()

const hand_del = (row) => {
  apis.delete_user(row.id).then(res => {
    init()
  })
}
const hand_edit = (row) => {
  drawer.value.dialog.show(row)
}

const hand_kick = (row)=>{
  apis.kick_user(row.id)
}
const height = ref()
const init = () => {
  loading.value = true
  height.value = `calc(100vh - ${document.querySelector(".n-card").clientHeight}px - 2rem - 6rem - 10rem)`;
  apis.load_all_users({
    current_page: pagination.page,
    page_size: pagination.pageSize
  }).then(res => {
    tb_date.value = res.data.data.data
    pagination.itemCount = res.data.data.total
    loading.value = false
    if (tb_date.value.length == 0 && pagination.page != 1) {
      pagination.page--;
      init()
    }
  })
}
onMounted(() => {
  init()
})
</script>

<template>
  <div style="width: 100%;height: 100%;">
    <n-card>
      <template #header>
        操作 -
        <n-tag type="info" >用户管理</n-tag>
      </template>
      <div>
        <n-button type="primary" :render-icon="icons.renderIcon(PlusOutlined)" @click="drawer.dialog.show()">
          添加用户
        </n-button>
      </div>
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
            :data="tb_date"
            :row-key="row => row.name"
            remote
            v-model:checked-row-keys="checkedRowKeys"
            max-height="100%"
        >
        </n-data-table>
      </div>
    </n-card>
    <NewUserDialog @success="init()" ref="drawer"/>
  </div>
</template>

<style scoped>

</style>