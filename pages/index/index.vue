<template>
  <view class="page_edu">
    <view class="page_edu_header">
      <view class="header">
        <image src="/static/icon_main.png" class="btn"></image>
        <view class="input">
          <image src="/static/search.png" class="search"></image>
          <input type="text" value="" placeholder="搜索" />
        </view>
        <image src="/static/msg.png" class="btn"></image>
      </view>
      <view class="header_content"><bw-swiper :swiperList="swiperList" style="width:100%"></bw-swiper></view>
    </view>
    <view class="page_content">
      <view class="menu">
        <template   v-for="(it, i) in menus"  v-show="menus.length > 0" >
          <view class="item" @click="lists(it.menu_no)" :key="i" >
            <view class="img_view" :style="{ background: it.bg }"></view>
            <!-- <image :src="it.icon" class="image"></image> -->
            <text class="txt">{{ it.menu_name }}</text>
          </view>
        </template>
      </view>
      <view class="s_menu">
        <template v-for="(item, index) in second_menus">
          <view class="item" :key="index">
            <image :src="item.icon" class="image"></image>
            <text class="txt">{{ item.txt }}</text>
          </view>
        </template>
      </view>
      <view class="ad" @click="fromitem">
        <view class="ad_btn">
          <text class="title">教资面试课上线</text>
          <text class="sub_title">老用户现实立减100元</text>
        </view>
        <image src="/static/tag.png" class="bg"></image>
      </view>
    </view>
    <scroll-view scroll-x="true" class="slider">
      <template v-for="(it, i) in records">
        <view class="item" :key="i" :style="{ background: it.bg, marginRight: i === records.length - 1 ? '15px' : '0px' }">
          <view class="item_content">
            <view class="title">
              <text class="first">{{ it.title }}</text>
              <text class="main">主讲：{{ it.mainTeacher }}</text>
              <text class="sub" :style="{ color: it.subColor }">标题名称</text>
            </view>
            <!-- <image class="image" :src="it.icon"></image> -->
            <text class="free">免\n费</text>
          </view>
        </view>
      </template>
    </scroll-view>
    <!-- <button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">授权管理</button> -->
    <button type="primary" @tap="toDietRecord">饮食记录</button>
    <!-- <button type="primary" @click="openSetting">授权</button> -->
  </view>
</template>

<script>
import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
import { mapGetters } from 'vuex'
export default {
  components: {
    bwSwiper
  },
  computed:{
    ...mapGetters([
      'getLoginState',
    ])
  },
  data() {
    return {
      openid: '',
      userInfoAuth: '', //是否授权访问用户信息
      client_env: '', //当前环境(wxh5||h5||wx_mp||app)
      client_type: '', // 客户端(APP)类型
      swiperList: [
        {
          img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
          text: '加油'
        },
        {
          img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
          text: '加油'
        },
        {
          img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
          text: '加油'
        }
      ],
      menus: [],
      bgcolor: [
        'linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))',
        'linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))',
        'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
        'linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))'
      ],
      second_menus: [
        {
          icon: '/static/exam.png',
          txt: '考试教案'
        },
        {
          icon: '/static/textbook.png',
          txt: '教材教案'
        },
        {
          icon: '/static/book_ticket.png',
          txt: '青书券'
        },
        {
          icon: '/static/more.png',
          txt: '全部课程'
        }
      ],
      records: [
        {
          bg: 'linear-gradient(-30deg,rgba(171,218,255,1),rgba(215,239,255,1))',
          title: '教师考情分析',
          mainTeacher: '小A',
          subTitle: '标题名称',
          subColor: '#15639F',
          icon: '/static/test2.png',
          isFree: true
        },
        {
          bg: 'linear-gradient(-30deg,rgba(192,253,227,1),rgba(224,252,240,1))',
          title: '查看详情',
          mainTeacher: '小B',
          subTitle: '标题名称',
          subColor: '#07B77B',
          icon: '/static/test.png',
          isFree: false
        },
        {
          bg: 'linear-gradient(-30deg,rgba(171,218,255,1),rgba(215,239,255,1))',
          title: '教师考情分析',
          mainTeacher: '小A',
          subTitle: '标题名称',
          subColor: '#15639F',
          icon: '/static/test2.png',
          isFree: true
        }
      ]
    };
  },
  onLoad() {
    const clientInfo = this.judgeClientEnviroment();
    const client_env = clientInfo.client_env;
    const client_type = clientInfo.client_type;
    console.log('client_env:', client_env, '\nclient_type:', client_type);
  },
  onShow() {
    this.checkLoginStatus(); //检测登录状态
    
   this.getMenuData();
     this.saveWxUser();
    // 主动判断环境逻辑
    
    this.checkAuthorization(); // 检测是否授权读取用户信息
  },
  methods: {
    initLogin() {
      let that = this;
      let code = this.$route.query.code;
      let isLogin = uni.getStorageSync('is_login');
      console.log('登录状态:', isLogin);
      let authorState = uni.getStorageSync('author_state');
      let isWeixinClient = this.isWeixinClient();
      if (isWeixinClient && authorState) {
        // 公众号环境 授权登录 已授权
        that.getMenuData();
      } else if (isWeixinClient && !authorState) {
        //公众号环境 未授权
        if (code) {
          // 已经得到code,进行验证登录
          this.saveWxUser();
        } else {
          // 获取授权
          that.getAuthorized();
        }
      } else if (!isWeixinClient) {
        // 非微信环境(H5或APP)
        if (isLogin) {
          that.getMenuData();
        } else {
          uni.showModal({
            title: '提示',
            content: '未登录,是否跳转到登录页面',
            success: res => {
              if (res.confirm) {
                uni.navigateTo({
                  url: '../login/login'
                });
              } else {
                // 设置当前用户类型为游客(浏览器环境)
                uni.setStorageSync('user_type', '游客');
              }
            }
          });
        }
      }
    },
    judgeClientEnviroment() {
      let client_env = '';
      // #ifdef H5
      const isWeixin = this.isWeixinClient();
      console.log('isWeixin', isWeixin);
      client_env = isWeixin ? 'wxh5' : 'web';
      // #endif
      // #ifdef MP-WEIXIN
      client_env = 'wxmp';
      //#endif
      // #ifdef APP-PLUS
      client_env = 'app';
      // #endif

      let client_type = '';
      // #ifdef APP-PLUS
      switch (uni.getSystemInfoSync().platform) {
        case 'android':
          console.log('运行Android上');
          client_type = 'android';
          break;
        case 'ios':
          console.log('运行iOS上');
          client_type = 'ios';
          break;
      }
      // #endif
      // #ifdef H5||MP-WEIXIN
      client_type = 'browser';
      //#endif
      console.log('SYSTEMINFO:', uni.getSystemInfoSync());
      this.client_type = client_type;
      this.client_env = client_env;
      uni.setStorageSync('client_env', client_env);
      uni.setStorageSync('client_type', client_type);
      return {
        client_env: client_env,
        client_type: client_type
      };
    },
    getuserinfo(e) {
      // 获取用户信息
      // #ifdef MP-WEIXIN
      console.log('同意用户信息授权', e.detail.rawData);
      if (e.detail.rawdata) {
        console.log('账号信息', e.detail.rawdata);
        uni.setStorageSync('userInfo', e.detail.rawdata);
      }
      // #endif
    },
    openSetting() {
      // 打开权限设置页面
      uni.openSetting({
        success(res) {
          console.log(res.authSetting);
        }
      });
    },
    checkLoginStatus() {
      let that = this;
      let isLogin = false;
      // 检测登录状态
      // #ifdef MP-WEIXIN
      wx.checkSession({
        success() {
          uni.setStorageSync('is_login', true);
          console.log('登录未过期');
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          uni.setStorageSync('is_login', false);
          console.log('登录过期');
          // session_key 已经失效，需要重新执行登录流程
          // that.toLogin(); //重新登录
        }
      });
      // #endif
      // #ifdef APP-PLUS || H5
      isLogin = uni.getStorageSync('is_login');
      if (isLogin == true) {
        this.getMenuData();
      } else {
        console.log('H5?APP 环境检测到未登录')
        this.toAccountLogin();
      }
      // #endif
    },
    checkAuthorization() {
      // 查看是否授权
      // #ifdef MP-WEIXIN
      let that = this;
      uni.authorize({
        scope: 'scope.userInfo',
        success(res) {
          that.userInfoAuth = true;
          // 获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success: function(infoRes) {
              uni.setStorageSync('userInfo', infoRes.rawData);
            }
          });
        },
        fail(errMsg) {
          that.userInfoAuth = false;
          console.log(errMsg);
          let toAuthPageTimes = uni.getStorageSync('toAuthPageTimes');
          console.log('toAuthPageTimes', toAuthPageTimes);
          if (!toAuthPageTimes) {
            uni.setStorageSync('toAuthPageTimes', 0);
          }
          if (toAuthPageTimes == 0 || parseInt(toAuthPageTimes) % 4 === 0) {
            // 记录跳转到授权页面的次数，如果未跳转过则跳转
            uni.navigateTo({
              url: '../authorization/authorization'
            });
          } else {
            toAuthPageTimes = parseInt(toAuthPageTimes);
            toAuthPageTimes++;
            uni.setStorageSync('toAuthPageTimes', toAuthPageTimes);
          }
        }
      });
      // #endif
    },
    async getAuthorized() {
      // 公众号环境获取回调地址(在回调地址中获取code)
      let url = this.getServiceUrl('wx', 'srvwx_public_page_authorization', 'operate');
      let req = [
        {
          data: [
            {
              app_no: 'APPNO20200107181133',
              redirect_uri: 'http://test1.100xsys.cn/home'
            }
          ],
          serviceName: 'srvwx_public_page_authorization'
        }
      ];
      let response = await this.$http.post(url, req);
      if (response.data.response[0].response.authUrl) {
        console.log('redirctUrl:', response.data.response[0].response.authUrl);
        window.location.href = response.data.response[0].response.authUrl;
      } else {
        uni.showToast({
          title: response.data.resultMessage,
          icon: 'none'
        });
      }
    },
    saveWxUser() {
      // 静默登录
      let that = this;
      // #ifdef MP-WEIXIN
      wx.login({
        // 获取小程序code
        success(res) {
          if (res.code) {
            //验证登录
            let url = that.getServiceUrl('wx', 'srvwx_app_login_verify', 'operate');
            let req = [
              {
                data: [
                  {
                    code: res.code,
                    app_no: 'APPNO20200115100113'
                  }
                ],
                serviceName: 'srvwx_app_login_verify'
              }
            ];
            that.$http.post(url, req).then(response => {
              if (response.data.resultCode === 'SUCCESS') {
                let resData = response.data.response[0].response;
                let expire_timestamp = parseInt(new Date().getTime() / 1000) + resData.expire_time; //过期时间的时间戳
                uni.setStorageSync('bx_auth_ticket', resData.bx_auth_ticket);
                uni.setStorageSync('expire_time', resData.expire_time); // 过期时间
                uni.setStorageSync('expire_timestamp', expire_timestamp); // 过期时间
                if (resData.login_user_info) {
                  //匿名登录
                  uni.setStorageSync('visiter_user_info', resData.login_user_info); //匿名登录信息
                  that.openid = resData.login_user_info.openid;
                  uni.setStorageSync('user_type', '匿名用户'); //微信环境匿名用户
                  console.log('微信小程序环境检测到未登录')
                  // that.toAccountLogin();
                } else {
                  // 已绑定账号用户登录
                  uni.setStorageSync('is_login', true);
                }
              } else if (response.data.resultCode === 'FAILURE') {
                uni.showToast({
                  title: response.data.resultMessage
                });
              }
            });
          } else {
            uni.setStorageSync('is_login', true); // 登录状态
            console.log('登录失败！' + res.errMsg);
          }
        }
      });
      // #endif
      // #ifdef H5
      const isWeixinClient = this.isWeixinClient();
      if (isWeixinClient) {
        let req = {};
      }
      // #endif
    },
    toAccountLogin() {
      // 账号登录
      uni.showModal({
        title: '提示',
        content: '未登录,是否跳转到登录页面?',
        // showCancel: false,
        confirmText: '登录',
        success: res => {
          if (res.confirm) {
            uni.navigateTo({
              url: '../login/login?openid=' + this.openid
            });
          }
        }
      });
    },
    //获取快捷方式菜单
    getMenuData() {
      let url = this.getServiceUrl('oa', 'srvsys_user_menu_select', 'select');
      let req = {
        serviceName: 'srvsys_user_menu_select',
        colNames: ['*'],
        order: [{ colName: 'seq', orderType: 'asc' }]
      };
      this.$http.post(url, req).then(response => {
        let item = response.data.data;
        console.log('item', item);
        let newArr = [];
        for (let i in item) {
          if (item[i].shortcut_flag == '是') {
            this.$set(item[i], 'bg', this.bgcolor[i]);
            newArr.push(item[i]);
          }
        }
        this.menus = newArr;
      });
    },
	async	getmenu(val){
			let url = this.getServiceUrl('oa', `srvsys_service_columnex_v2_select?colsel_v2=${val}_select`, 'select');
			let req = {
				"serviceName":"srvsys_service_columnex_v2_select",
				"colNames":["*"],
				"condition":[
					{"colName":"service_name","value":`${val}_select`,"ruleType":"eq"},
					{"colName":"use_type","value":"treelist","ruleType":"eq"},
				],
				"order":[{"colName":"seq","orderType":"asc"}]}
			let res =await this.$http.post(url, req)
			let listName = ['treeList','tabList']
			let LNindex = res.data.data.is_tree?0:1
				uni.navigateTo({
					url:`../list/${listName[LNindex]}?val=`+res.data.data.service_name
				})
			
		},
    lists(val) {
		this.getmenu(val)
    },
    fromitem() {
      uni.navigateTo({
        url: '../form/formitem'
      });
    },
    toDietRecord() {
      uni.navigateTo({
        url: '../dietRecord/dietSelect'
        // url:'../dietRecord/dietRecord'
      });
    }
  }
};
</script>

<style>
page {
  width: 100%;
  background-color: #ebebeb;
}
</style>
<style lang="scss" scoped>
@function realSize($args) {
  @return $args / 1.5;
}

.page_edu {
  width: 100%;
}

.page_edu_header {
  padding-top: var(--status-bar-height);
  background-color: #0bc99d;
  width: 100%;
  height: realSize(415px);

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: realSize(20px);

    .btn {
      width: realSize(36px);
      height: realSize(30px);
    }

    .input {
      height: realSize(50px);
      width: 100%;
      margin-left: realSize(20px);
      margin-right: realSize(20px);
      background: rgba(255, 255, 255, 1);
      border-radius: realSize(30px);
      display: flex;
      flex-direction: row;
      align-items: center;

      .search {
        width: realSize(30px);
        height: realSize(30px);
        margin-left: realSize(20px);
        margin-right: realSize(20px);
      }
    }
  }

  .header_content {
    display: flex;
    flex-direction: row;
    .left {
      display: flex;
      flex-direction: column;
      width: 57%;
      margin-top: 10px;
      margin-left: 15px;
      margin-right: 15px;

      .title {
        width: realSize(419px);
        height: realSize(59px);
        font-size: realSize(47px);
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }

      .sub_title {
        margin-top: 3px;
        font-size: realSize(18px);
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

        background: linear-gradient(0deg, rgba(120, 255, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .btn {
        margin-top: 3px;
        width: realSize(198px);
        height: realSize(60px);
        background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
        box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
        border-radius: realSize(30px);
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.page_content {
  width: 100%;
  margin-top: -74px;

  .menu {
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    height: realSize(176px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .img_view {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        .image {
          width: 50px;
          height: 50px;
        }
      }

      .txt {
        margin-top: 5px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .s_menu {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .image {
        width: 35px;
        height: 35px;
      }

      .txt {
        margin-top: 5px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .ad {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .bg {
      position: absolute;
      width: 120px;
      height: 105px;
      left: 0;
    }

    .ad_btn {
      width: 100%;
      height: 63px;
      margin: 30px;
      background: linear-gradient(0deg, rgba(253, 155, 28, 1), rgba(251, 197, 33, 1));
      border-radius: 67px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        font-size: realSize(38px);
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
      }

      .sub_title {
        background: linear-gradient(0deg, rgba(255, 128, 37, 1), rgba(255, 153, 32, 1));
        box-shadow: 0px 4px 5px 0px rgba(92, 53, 48, 0.3), 0px 1px 0px 0px rgba(228, 228, 228, 1);
        border-radius: realSize(24px);
        font-size: realSize(24px);
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        font-style: italic;
        color: rgba(255, 236, 177, 1);
        line-height: realSize(26px);
      }
    }
  }
}

.slider {
  white-space: nowrap;
  width: 100%;
  background-color: white;

  .item {
    display: inline-block;
    margin-left: 15px;
    margin-top: 13px;
    margin-bottom: 13px;
    width: 60%;
    height: 125px;
    border-radius: 10px;

    .item_content {
      display: flex;
      flex-direction: row;
      position: relative;

      .title {
        width: 36%;
        margin: 20px;
        display: flex;
        flex-direction: column;

        .first {
          font-size: 16px;
          color: rgba(46, 65, 69, 1);
        }

        .main {
          font-size: 13px;
          color: rgba(79, 103, 101, 1);
          margin-top: 5px;
        }

        .sub {
          width: 60px;
          font-size: 10px;
          margin-top: 20px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .image {
        margin-top: 35px;
        width: 80px;
        height: 80px;
      }

      .free {
        background: rgba(11, 147, 252, 1);
        border-radius: 0px 0px 22px 22px;
        width: 25px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
}
</style>
