import * as msg from './message'
import * as auth_api from '@/layouts/apis'

let instance: WebSocket | null = null;
let delay;

export function creatWebSocket(wsUrl: string) {
    console.log("websocket==================");
    // 判断当前浏览器是否支持WebSocket
    if ("WebSocket" in window) {
        console.log("当前浏览器支持 WebSocket");
    } else if ("MozWebSocket" in window) {
        console.log("当前浏览器支持 MozWebSocket");
    } else {
        console.log("当前浏览器不支持 WebSocket");
    }

    try {
        create_new_connect(wsUrl); // 初始化websocket连接
    } catch (e) {
        console.log("尝试创建连接失败");
        re_connect(wsUrl); // 如果无法连接上 webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
    }
}

const create_new_connect = (url) => {
    instance = new WebSocket(url);

    instance.onopen = function () {
        msg.success_notify('系统信息', 'websocket连接成功！')
    }

    instance.onmessage = (e) => {
        handle_active(JSON.parse(e.data).type, JSON.parse(e.data).data)
    }

    instance.onerror = () => {
        msg.error_notify('系统信息','ws重连')
        re_connect(url)
    }

    let interval = setInterval(()=>{
        try {
            instance.send('lifetime')
        }catch (e){
            clearInterval(interval);
            re_connect(url)
        }
    },500)
}

const re_connect = (url) => {
    delay = setTimeout(() => {
        create_new_connect(url);
        clearTimeout(delay)
    }, 5000)
}

const handle_active = (type, command) => {
    console.log(type)
    switch (type) {
        case 'normal':
            break
        case 'kick':
            auth_api.logout()
            msg.warning_notify('系统消息','您已被管理员踢出')
            break
        case 'lifecycle':
            break
    }
}
