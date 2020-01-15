import Vue from 'vue'
import App from './App'
import api from '@/common/api.js' // 导入api清单
import flyio from '@/common/wx.js' // 引入flyio
import common from '@/common/common.js' // 公共方法
let fly = new flyio


Vue.config.productionTip = false
import router from './common/uni-app-router/useRouter.js'
Vue.prototype.$http = fly
Vue.prototype.$api = api

Vue.use(common)

//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  let outTime = uni.getStorageSync("expire_time") //过期时间
  let date = new Date().getTime()
  // let isExpired = outTime < date
  // console.log('登录是否过期:',isExpired)
  let bxAuthTicket = uni.getStorageSync("bx_auth_ticket")
  if (bxAuthTicket) {
    request.headers["bx_auth_ticket"] = bxAuthTicket
  }
  //打印出请求体
  // console.log(request.body)
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (res) => {
    //只将请求结果的data字段返回
    if (res.data.resultCode === "0011") { //未登录
    debugger
      uni.setStorageSync('is_login','false')
      let login_user_info = uni.getStorageSync('login_user_info')
      console.log('login_user_info',login_user_info)
      if(login_user_info.openid){
        uni.reLaunch({
          url: '/pages/login/login?openid='+login_user_info.openid
        });
      }
      // return res
    }else if(res.data.resultCode === '0000'&&res.data.state==='FAILURE'){
      // 没有访问权限
      uni.showModal({
        title:"警告",
        cancelText:"登录",
        confirmText:"返回",
        content:"无权限访问\n点击返回按钮返回上一级页面\n点击登录跳转到登录页面",
        success: (res) => {
         if(res.confirm){
           uni.navigateBack();
         } else if(res.cancel){
           uni.reLaunch({
             url:'/pages/login/login'
           })
         }
        }
      })
    }
    // return res.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)

App.mpType = 'app'

const app = new Vue({
  ...App,
  router
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式



	app.$mount(); //为了兼容小程序及app端必须这样写才有效果

