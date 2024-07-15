import {defineStore} from "pinia";
import {ref} from 'vue'

export const useLayoutStore = defineStore('layout', ()=>{
    const layout = ref('default');
    return {layout}
})