import Vue from 'vue'
import App from './App'
import api from '@/common/api.js' // 导入api清单
// import flyio from '@/common/wx.js' // 引入flyio
import common from '@/common/common.js' // 公共方法
// let fly = new flyio
import fly from '@/common/http.js'


Vue.config.productionTip = false

Vue.use(common)
Vue.prototype.$http = fly
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()