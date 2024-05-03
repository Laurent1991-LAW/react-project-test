import { request } from "@/utils";

export function loginAPI(formData) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: formData
    })
}

export function getUserInfoAPI() {
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}