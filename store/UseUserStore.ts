import {defineStore} from "pinia";
import type {Ref} from 'vue'
type Menu = {
    id: number,
    menuName: string,
    menuPurview: string,
    menuRouterPath: string,
    menuPid: number,
    menuComment: string,
    icon: string,
    outline: boolean,
    menuType: string,
    treeMenus: Menu[]
}

type User = {
    username: string,
    token: string,
    menus: Menu[]
}

export const useUserStore = defineStore('user', ()=>{
    const user_info: Ref<User | undefined> = ref()
    return {user_info}
}, {
    persist: true
})