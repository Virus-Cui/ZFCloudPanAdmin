import request from 'axios'

export const service = request.create({
    baseURL: 'http://127.0.0.1:8080'
})

service.interceptors.request.use(config => {
    return config
})

