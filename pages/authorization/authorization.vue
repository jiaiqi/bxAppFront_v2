<template>
  <view class="authorization">
    <image src="../../static/img/run.svg" mode="" class="images"></image>
    <text class="text">为了给您提供更科学的饮食建议</text>
    <text class="text">我们需要访问您的账号信息</text>
    <div class="button-box">
      <button class="buttons" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">立即授权</button>
      <button class="buttons" type="default" @tap="toPreviousPage">暂不授权</button>
    </div>
  </view>
</template>

<script>
export default {
  // 授权按钮页面
  name: 'Authorization',
  data() {
    return {};
  },
  methods: {
    getuserinfo(e) {
      console.log('getUserInfo', e);
      if (e.detail.userInfo) {
        console.log('账号信息', e.detail.userInfo);
        uni.setStorageSync('userInfo', e.detail.userInfo);
        this.toPreviousPage();
      }
    }
  }
};
</script>

<style lang="scss">
.authorization {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .images {
    width: 100%;
    margin: 50upx 0;
  }
  .text {
    width: 90%;
    display: block;
    text-align: center;
    padding: 20upx 5%;
  }
  .button-box {
    margin-top: 50upx;
    height: 200upx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .buttons {
      width: 70%;
      height: 70upx;
      line-height: 70upx;
      border-radius: 0upx;
      font-size: 30upx;
    }
  }
}
</style>
