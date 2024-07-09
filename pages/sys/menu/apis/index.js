import {service} from 'assets/utils/request.js'

export const load_menus = () => {
    return new Promise(r => {
        service.get('/menu/menu').then(res => {
            r(res)
        })
    })
}

export const add_menu = (data) => {
    return new Promise(r => {
        service.post('/menu/menu', data).then(res => {
            r(res)
        })
    })
}