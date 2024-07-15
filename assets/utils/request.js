import request from 'axios'
import * as msg from '~/assets/utils/message'
import {useLayoutStore} from "~/store/UseLayoutStore";
import {storeToRefs} from "pinia";
import {navigateTo} from "#app/composables/router";

export const service = request.create({
    baseURL: 'http://127.0.0.1:8080'
})


service.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("Authorization")
    return config
})

service.interceptors.response.use(
    (res)=>{
        if(res.data?.code === 2){
            msg.err(res.data.msg)
            storeToRefs(useLayoutStore()).layout.value = 'login'
        }else if(res.data?.code === 3){
            msg.warn('权限不足')
            navigateTo('/')
        }else if(res.data?.code === 200) {
            return res
        }else {
            msg.err(res.data.msg)
        }
    }
)
