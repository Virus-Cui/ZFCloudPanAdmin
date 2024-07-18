import {service} from "assets/utils/request";

export const load_setting = () => {
    return new Promise(r => {
        service.get(`/setting`).then(res => {
            r(res)
        })
    })
}