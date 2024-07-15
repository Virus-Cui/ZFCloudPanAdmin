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
    message_box = window.$message.success(msg, {duration: 3000})
}

export const warn = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.warning(msg, {duration: 3000})
}

export const err = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.error(msg,{duration: 3000})
}

export const info = (msg: any)=>{
    clear_message_box()
    message_box = window.$message.info(msg,{duration: 3000})
}

export const success_dialog = (title, msg)=>{
    return new Promise((resolve, reject)=>{
      window.$dialog.success({
          title: title,
          content: msg,
          positiveText: '确定',
          negativeText: '不确定',
          maskClosable: false,
          onMaskClick: () => {
              message.success('不能关闭')
          },
          onEsc: () => {
              message.success('通过 esc 关闭')
          },
          onNegativeClick: ()=>{
              reject()
          },
          onPositiveClick: ()=>{
              resolve()
          }
      })
    })
}

export const warn_dialog = (title, msg)=>{
    return new Promise((resolve, reject)=>{
        window.$dialog.warning({
            title: title,
            content: msg,
            positiveText: '确定',
            negativeText: '不确定',
            maskClosable: false,
            onMaskClick: () => {
                message.success('不能关闭')
            },
            onEsc: () => {
                message.success('通过 esc 关闭')
            },
            onNegativeClick: ()=>{
                reject()
            },
            onPositiveClick: ()=>{
                resolve()
            }
        })
    })
}