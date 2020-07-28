import Vue from 'vue'
import { post, fetch, patch, put, del } from './http.js'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;

const loginURL = '/login'
export const login = function (data) {
    console.log('json', data)
    return Vue.prototype.$post(loginURL, { "userAccount": data.userAccount, "password": data.password })
}

const findSettingBlogLabelListURL = '/controller/setting/findSettingBlogLabelList'
export const findSettingBlogLabelList = function (data) {
    // eslint-disable-next-line no-console
    // console.log('原型', Vue.prototype, 'http', post)
    return Vue.prototype.$post(findSettingBlogLabelListURL, { "userId": json.userId })
}

const findSettingBlogTypeURL = '/controller/setting/findSettingBlogType'
export const findSettingBlogType = function (data) {
    return Vue.prototype.$post(findSettingBlogTypeURL, data)
}

// 保存博客内容
const saveBusinessBlogURL = '/controller/blog/saveBusinessBlog'
export const saveBusinessBlog = function (data) {
    return Vue.prototype.$post(saveBusinessBlogURL, data)
}

// 查询分类下的博客 分页
const findBlogByBlogTypeURL = '/controller/blog/findBlogByBlogType'
export const findBlogByBlogType = function (data) {
    return Vue.prototype.$post(findBlogByBlogTypeURL, data)
}

/**
 * 根据ID查询博客
 */
const findBlogURL = '/controller/blog/findBlog'
export const findBlog = function (data) {
    return Vue.prototype.$post(findBlogURL, data)
}

/**
 * 检查登录过期
 */
const checkSession = 'check'
