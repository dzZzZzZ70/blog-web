import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
// import { Toast } from 'element-ui'
import Message from '../components/message/index'

// axios 配置
axios.defaults.timeout = 15000
axios.defaults.baseURL = '/api'
// axios.defaults.withCredentials=true;
// axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log('err', error.response)
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('login')
          
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' &&
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path },
            })
        
          case 302:
          store.commit('login')
          if (router.currentRoute.path !== 'login') {
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path }
            })
          }
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response)
  },
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        if(response.data.code === 200){
        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data.data);//我们后台所有数据都是放在返回的data里所以这里统一处理了
        }else{
        //错误处理
        Message.error(response.data.msg)
        }
      })
      .catch(err => {
        reject(err);
        let message = '请求失败！请检查网络';
        //错误返回
        if(err.response)message=err.response.data.message;
        Message.error(message)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        if(response.status === 200){
          resolve(response.data);
          if (response.data.flag !== '0') {
            if (response.data.flag === '1' && response.data.message === 'outOfDate') {
              router.push('/login')
              Message.warning("登录过期，请重新登录")
              return
            }
            Message.warning(response.data.message)
          }
        }else{
          Message.error("请求失败")
        }
      })
      .catch(err => {
          // reject(err);
          let message = '请求失败！请检查网络';
          if(err.response)message=err.response.data.message;
          Message.warning(message)
        }
      )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        if(response.status === 200){
          resolve(response.data);
          if (response.data.flag !== '0') {
            if (response.data.flag === '1' && response.data.message === 'outOfDate') {
              router.push('/login')
              Message.warning("登录过期，请重新登录")
              return
            }
            Message.warning(response.data.message)
          }
        }else{
          Message.error("请求失败")
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        Message.error(message)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data.data);
        }else{
          Message.error(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        Message.error(message)
      })
  })
}

export function del(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data.data);
        }else{
          Message.error(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        Message.error(message)
      })
  })
}