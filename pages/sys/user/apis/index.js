import {service} from "assets/utils/request.js";
import {genQueryParam} from "assets/utils/commons.js";
import * as msg from 'assets/utils/message'
import {warn_dialog} from "assets/utils/message";

export const change_user = (data) => {
    return new Promise(r => {
        service.put('/user', data).then(res => {
            r(res)
        })
    })
}


export const load_all_users = (data) => {
    return new Promise(r => {
        service.get(`/user?${genQueryParam(data)}`).then(res => {
            r(res)
        })
    })
}

export const delete_user = (user_id) => {

    return new Promise(r => {
        msg.warn_dialog('警告', '是否要删除这个用户').then(()=>{
            service.delete(`/user/${user_id}`).then(res => {
                r(res)
                msg.success('删除成功')
            })
        })

    })
}

export const new_user = (data) => {
    return new Promise(r => {
        service.post('/auth/register', data).then(res => {
            r(res)
        })
    })
}

export const kick_user = (id)=>{
    service.get(`/user/kick?user_id=${id}`).then(res=>{
        msg.success('踢出成功')
    })
}