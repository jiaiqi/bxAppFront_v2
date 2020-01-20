import Vue from 'vue'
import flyio from '@/common/wx.js' // 引入flyio
let fly = new flyio
let FormateDate = function(date) {
  let o = {
    'yy':date.getFullYear(),
    'MM': date.getMonth() + 1,
    'dd': date.getDate(),
    'HH': date.getHours(),
    'mm': (()=>{
      let mm = date.getMinutes()
      if(mm<10){
        mm = '0' + mm
      }
      return mm
    })(),
    'ss': date.getSeconds()
  };
  return o.yy+'-'+o.MM+'-'+o.dd+' '+o.HH+':'+o.mm+':'+o.ss;
};
//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  const outTime = uni.getStorageSync("expire_timestamp") //过期时间
  const date = parseInt(new Date().getTime() / 1000)
  if(outTime){
    const isExpired = outTime < date
    console.log('登录是否过期:', isExpired, '\n过期时间:', FormateDate(new Date(outTime * 1000)),outTime,date)
  }
  const bxAuthTicket = uni.getStorageSync("bx_auth_ticket")
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
      uni.setStorageSync('is_login', false)
      console.log('login_user_info', login_user_info)
      if (login_user_info&&login_user_info.openid) {
        uni.reLaunch({
          url: '/pages/login/login?openid=' + login_user_info.openid
        });
      }
      // return res
    } else if (res.data.resultCode === '0000' && res.data.state === 'FAILURE') {
      // 没有访问权限
      uni.showToast({
        title:data.resultMessage
      })
    }
    // return res.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)
export default fly
