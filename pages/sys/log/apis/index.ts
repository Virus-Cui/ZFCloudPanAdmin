import {service} from '~/assets/utils/request'
import {genQueryParam} from "assets/utils/commons";

export const load_all_logs = (data) => {
    return new Promise(r => {
        service.get(`/log?${genQueryParam(data)}`).then(res => {
            r(res)
        })
    })
}