import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局CSS
import "./assets/css/global.css"
// 导入字体图标
import "./assets/fonts/iconfont.css"

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL= 'http://127.0.0.1:8888/api/private/v1/'
// 通过axios请求拦截器添加token，保证拥有获取数据的权限
// axios 请求拦截
axios.interceptors.request.use(config => {
  // Do something before request is sent
  // 为请求头对象，添加token验证的Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
},error => {
// Do something with request error
return Promise.reject(error);
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
