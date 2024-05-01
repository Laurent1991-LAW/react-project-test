import axios from "axios"
import { getToken, removeToken } from "./token"
import router from "@/router"

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// request interceptor
request.interceptors.request.use((config) => {
    // put token into header
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

// response interceptor
request.interceptors.response.use((response) => {
    // 2xx response
    return response.data
}, (error) => {
    // not 2xx response
    if (error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }

    return Promise.reject(error)
})

export { request }