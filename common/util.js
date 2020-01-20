export default {
  install(Vue, options) {
    Vue.prototype.pageTitle = '加载中…' // 可以自定义变量
    /**
     * 登录相关
     */

    /**
     *@param {Array} loginInfoList 要存储的登录信息 [{key:'',value:''}]
     */
    Vue.prototype.saveLoginInfo = function(loginInfoList = []) {
      loginInfoList.map(item => {
        uni.setStorageSync(item.key, item.value)
      })
    }

    Vue.prototype.$logout = function() {
      try {
        uni.clearStorageSync();
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * v2
     */

    // -------------------公共方法-------------------------------
    /**
     * @param {String} app 
     * @param {String} srv - 服务名(serviceName)
     * @param {String} srvType 
     * @param {String} url - 协议+ip+端口
     */
    Vue.prototype.getServiceUrl = function(app, srv, srvType, url) {
        // 获取转换URL app, srv, srvType, url

        let urlVal = url || Vue.prototype.$api.srvHost
        let appVal = app
        let srvTypeVal = srvType
        let srvVal = srv
        return urlVal + '/' + appVal + '/' + srvTypeVal + '/' + srvVal
      },
      Vue.prototype.deepClone = function(obj) {
        // 深拷贝
        function isObject(o) {
          return (typeof o === 'object' || typeof o === 'function') && o !== null
        }
        if (!isObject(obj)) {
          throw new Error('非对象')
        }
        let isArray = Array.isArray(obj)
        let newObj = isArray ? [...obj] : { ...obj
        }
        Reflect.ownKeys(newObj).forEach(key => {
          newObj[key] = isObject(obj[key]) ? Vue.prototype.deepClone(obj[key]) : obj[key]
        })
        return newObj
      }

    Vue.prototype.toPreviousPage = function() {
      uni.navigateBack({
        animationDuration: 2000,
        animationType: 'zoom-fade-in',
        delta: 1
      });
    }

    Vue.prototype.formateDate = function(date) {
      let o = {
        'yy': date.getFullYear(),
        'MM': date.getMonth() + 1,
        'dd': date.getDate(),
        'HH': date.getHours(),
        'mm': (() => {
          let mm = date.getMinutes()
          if (mm < 10) {
            mm = '0' + mm
          }
          return mm
        })(),
        'ss': date.getSeconds()
      };
      return o.yy + '-' + o.MM + '-' + o.dd + ' ' + o.HH + ':' + o.mm + ':' + o.ss;
    };
    // -------------------- 微信相关 -----------------
    /**
     *  判断是否当前环境是微信
     *  @return {boolean} true||false
     */
    Vue.prototype.isWeixinClient = function() {
      // #ifdef H5
      let ua = navigator.userAgent.toLowerCase()
      // 微信公众号环境
      let isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin) {
        return true
      } else {
        return false
      }
      // #endif
      // #ifdef MP-WEIXIN
      // 微信小程序环境
      return true
      // #endif
    }

  }
}
