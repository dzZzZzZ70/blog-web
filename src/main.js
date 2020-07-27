import Vue from 'vue'
import App from './App.vue'
// import layout from './layout/BlogLayout.vue'
// import Login from './pages/Login.vue'
import router from './router'
import './constants.js'
// import './plugins/element.js'
import vuetify from '@/plugins/vuetify'
import store from './store/index'
// 导入自定义的全局message 提示组件
import Message from './components/message/index'

// 组件注册到vue原型上
Vue.prototype.$message = Message

Vue.config.productionTip = false
// Vue.use(axios)
// Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
