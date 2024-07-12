import {service} from '~/assets/utils/request'
import * as msg from '~/assets/utils/message'
import {genQueryParam} from "assets/utils/commons";

export const load_all_roles = (data) => {
    return new Promise(r => {
        service.get(`/role?${genQueryParam(data)}`).then(res => {
            r(res)
        })
    })
}

export const new_role = (data) => {
    return new Promise(r => {
        service.post(`/role`, data).then(res => {
            r(res)
            msg.success('创建成功')
        })
    })
}

export const remove_role = (id) => {
    return new Promise(r => {
        msg.warn_dialog('警告', '要删除这个角色吗').then(() => {
            service.delete(`/role/${id}`).then(res => {
                r(res)
                msg.success('删除成功')
            })
        })
    })
}

export const change_role = (data) => {
    return new Promise(r => {
        service.put(`/role`, data).then(res => {
            r(res)
            msg.success('修改成功')
        })
    })
}