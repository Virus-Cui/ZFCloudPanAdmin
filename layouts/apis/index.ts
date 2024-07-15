import {service} from "assets/utils/request";
import * as msg from 'assets/utils/message'
import {useUserStore} from "~/store/UseUserStore";
import {useLayoutStore} from "~/store/UseLayoutStore";
import {storeToRefs} from "pinia";

export const logout = () => {
    service.post('/auth/logout').then(res=>{
        const user = storeToRefs(useUserStore()).user_info
        const layout = storeToRefs(useLayoutStore()).layout
        // @ts-ignore
        user.value = undefined
        layout.value = 'login'
        // msg.success('退出成功')
    })
}


export const login = (data: any) => {
    return new Promise(r => {
        service.post(`/auth/login`, data).then(res => {
            const user = storeToRefs(useUserStore()).user_info
            // @ts-ignore
            user.value = res.data.data
            msg.success(`登陆成功`)
            r(res)
        })
    })
}