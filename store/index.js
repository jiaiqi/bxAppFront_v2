import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openid: null,
    is_login: false, //登录状态 Boolean
    bx_auth_ticket: "", // token String
    openid: null, // openid Number
    expire_timestamp: 0, // 过期截止时间 Number
    login_user_info: null, // 登录用户信息 Object
    visiter_user_info: null, // 匿名用户信息 Object
    author_state: false, // 微信授权状态 Boolean
    user_type: '游客', // 用户类型 String 游客(浏览器环境)/登录用户/匿名用户(微信环境)
    client_type: 'browser', //客户端类型 android||ios||browser
    client_env: 'web' // 客户端所在环境 wxmp(微信小程序)||wxh5(公众号)||web(网页)||app
  },
  mutations: {
    setLoginState(state, is_login) {
      state.is_login = is_login;
    },
    setOpenid(state, openid) {
      console.log('openid',openid)
      state.openid = openid
    },
    setTicket(state, ticket) {
      state.bx_auth_ticket = ticket
    },
    setExpireDate(state, expire_timestamp) {
      state.expire_timestamp = expire_timestamp
    },
    setUserInfo(state, login_user_info) {
      state.testvuex = false
    },
    setVisitorInfo(state, visitorInfo) {
      state.visiter_user_info = visitorInfo
    },
    setAuthorState(state, author_state) {
      state.author_state = author_state
    },
    setUserType(state, user_type) {
      state.user_type = user_type
    },
    setClientType(state, client_type) {
      state.client_type = client_type
    },
    setClientEnv(state, client_env) {
      state.client_env = client_env
    }
  },
  getters: {
    getLoginState(state) {
      return state.is_login
    },
    getOpenid(state) {
      return state.openid
    },
    getTicket(state) {
      return state.bx_auth_ticket
    },
    getExpireDate(state) {
      return state.expire_timestamp
    },
    getUserInfo(state) {
      return state.testvuex
    },
    getVisitorInfo(state) {
      return state.visiter_user_info
    },
    getAuthorState(state) {
      return state.author_state
    },
    getUserType(state, user_type) {
      return state.user_type
    },
    getClientType(state, client_type) {
      return state.client_type
    },
    getClientEnv(state, client_env) {
      return state.client_env
    }
  },
  actions: {

  }
})

export default store
