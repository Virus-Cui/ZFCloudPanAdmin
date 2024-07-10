import { useMessage } from 'naive-ui'
import type {MessageReactive } from 'naive-ui'
const message_ins = useMessage();
let message_box:MessageReactive | null = null

const clear_message_box = ()=>{
    if(message_box != null){
        message_box.destroy();
        message_box = null;
    }

}

export const success = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.success(msg)
}

export const warn = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.warning(msg, {duration: 0})
}

export const err = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.error(msg,{duration: 0})
}

export const info = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.info(msg,{duration: 0})
}