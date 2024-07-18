<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue";
import {definePageMeta} from "#imports";
import {useHead} from "unhead";
import {useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";

const show = ref(false)
const set = storeToRefs(useSettingStore()).setting

const showModalRef = ref(false)
const previewImageUrlRef = ref('')

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}

const login_list = ref([])
const logo_small_list = ref([])
const logo_list = ref([])
const logo_text_black_list = ref([])
const logo_text_white_list = ref([])
useHead({
  title: '致飞网盘-Admin｜系统设置',
})

definePageMeta({
  name: '系统设置',
  parent: '系统管理'
});

onMounted(()=>{
  show.value = false
  let interval = setInterval(()=>{
    if(set.value != undefined){
      console.log('loginBgImg',set.value?.loginBgImg == '')
      login_list.value = set.value?.loginBgImg == ''? []: [{
        status: 'finished',
        url: set.value?.loginBgImg
      }]
      logo_small_list.value =set.value?.logoSmall == ''? []:  [{
        status: 'finished',
        url: set.value?.logoSmall
      }]
      logo_list.value =set.value?.logo == ''? []:  [{
        status: 'finished',
        url: set.value?.logo
      }]
      logo_text_black_list.value =set.value?.logoTextBlack == ''? []:  [{
        status: 'finished',
        url: set.value?.logoTextBlack
      }]
      logo_text_white_list.value =set.value?.logoTextWhite == ''? []:  [{
        status: 'finished',
        url: set.value?.logoTextWhite
      }]
      show.value = true
      clearInterval(interval)
    }
  },100)
})

import type { UploadFileInfo } from 'naive-ui'

</script>

<template>
  <div class="box">

    <n-descriptions label-placement="left" title="图像设置" bordered :column="1">
      <n-descriptions-item label-class="label" label="登录页图片">
        <n-upload
            v-if="show"
            :max="1"
            action="http://127.0.0.1:8080/setting/upload/1"
            :default-file-list="login_list"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="logo设置">
        <n-upload
            v-if="show"
            :max="1"
            action="http://127.0.0.1:8080/setting/upload/2"
            :default-file-list="logo_list"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="icon设置">
        <n-upload
            v-if="show"
            :max="1"
            action="http://127.0.0.1:8080/setting/upload/3"
            :default-file-list="logo_small_list"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="黑色文字logo">
        <n-upload
            v-if="show"
            :max="1"
            action="http://127.0.0.1:8080/setting/upload/4"
            :default-file-list="logo_text_black_list"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="白色文字logo">
        <n-upload
            v-if="show"
            :max="1"
            action="http://127.0.0.1:8080/setting/upload/5"
            :default-file-list="logo_text_white_list"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
    </n-descriptions>
    <n-divider />
    <n-descriptions label-placement="left" title="参数设置" bordered :column="1">
      <n-descriptions-item label-class="label" label="应用名称">
        <n-input placeholder="请输入应用名称"></n-input>
      </n-descriptions-item>
      <n-descriptions-item label-class="label" label="操作">
        <n-button type="primary">保存</n-button>
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<style scoped lang="scss">
.box{
  .upload_box{
    display: flex;
    justify-content: left;
    align-items: center;
    :deep(.n-upload){
      width: auto;
    }
  }
}

:deep(.n-descriptions-table-header){
  width: 200px;
}
</style>