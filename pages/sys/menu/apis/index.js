import {service} from 'assets/utils/request.js'
import * as msg from 'assets/utils/message'

export const load_menus = () => {
    return new Promise(r => {
        service.get('/menu').then(res => {
            r(res)
        })
    })
}

export const add_menu = (data) => {
    return new Promise(r => {
        service.post('/menu', data).then(res => {
            r(res)
        })
    })
}

export const change_menu = (data) =>{
    return new Promise(r=>{
        service.put(`/menu`, data).then(res=>{
            r(res)
        })
    })
}

export const del_menu = (id)=>{
    return new Promise(r=>{
        msg.warn_dialog('警告', '确定要删除吗').then(()=>{
            service.delete(`/menu/${id}`).then(res=>{
                msg.success('删除成功')
                r(res)
                location.reload()
            })
        })
    })
}