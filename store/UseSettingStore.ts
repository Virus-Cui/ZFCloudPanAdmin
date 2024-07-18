import {defineStore} from "pinia";
import {type Ref, ref} from 'vue'

export type Setting = {
    id: number,
    title: string,
    loginBgImg: string,
    logoSmall: string,
    logo: string,
    logoTextBlack: string,
    logoTextWhite: string
}

export const useSettingStore = defineStore('SysSetting', () => {
    let setting: Ref<Setting | undefined> = ref()
    return { setting };
})