import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import api from '@/common/api.js' // 导入api清单
// import flyio from '@/common/wx.js' // 引入flyio
import common from '@/common/common.js' // 公共方法
import bxUtil from '@/common/util.js' // 公共方法
// let fly = new flyio
import fly from '@/common/http.js'


Vue.config.productionTip = false

Vue.use(common) // 老板公共方法,最终要抛弃
Vue.use(bxUtil)  // 新版公共方法
Vue.prototype.$http = fly
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

app.$mount()