import { request } from "@/utils";

// get drag-down channel list 
export function getChnlsAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// add new article
export function createArticleAPI(formData) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data: formData
    })
}

// get articles list
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// delete article
export function deleteArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

// get article details
export function getArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`
    })
}

// update article details
export function updateArticleAPI(data) {
    return request({
        url: `/mp/articles/${data.id}`,
        method: 'PUT',
        data
    })
}