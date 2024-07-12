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
        })
    })
}

export const remove_role = (id) => {
    return new Promise(r => {
        service.delete(`/role/${id}`).then(res => {
            r(res)
        })
    })
}

export const change_role = (data) => {
    return new Promise(r => {
        service.put(`/role`, data).then(res => {
            r(res)
        })
    })
}