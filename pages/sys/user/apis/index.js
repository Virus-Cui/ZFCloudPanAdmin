import {service} from "assets/utils/request.js";
import {genQueryParam} from "assets/utils/commons.js";

export const load_all_users = (data) => {
    return new Promise(r => {
        service.get(`/usr/load_users?${genQueryParam(data)}`).then(res => {
            r(res)
        })
    })
}

export const delete_user = (user_id) => {
    return new Promise(r => {
        service.delete(`/usr/del_user/${user_id}`).then(res => {
            r(res)
        })
    })
}

export const new_user = (data) => {
    return new Promise(r => {
        service.post('/auth/register',data).then(res => {
            r(res)
        })
    })
}