<template>
  <view class="diet-select">
    <view class="cu-bar search">
      <view class="search-form radius">
        <text class="cuIcon-search"></text>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索食物" confirm-type="search" v-model="searchValue" />
      </view>
      <view class="action" @click="clearText" v-if="searchValue">
        <text class="cuIcon-close"></text>
        <text>取消</text>
      </view>
    </view>
    <view class="foods-box">
      <view class="VerticalBox">
        <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 320upx)">
          <!-- <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)"> -->
          <view
            class="cu-item"
            :class="index == tabCur ? 'text-green cur' : ''"
            v-for="(item, index) in tabList"
            :key="index"
            @tap="TabSelect($event,item)"
            :data-id="index"
            style="height: 90upx;"
          >
            {{ item.label }}
          </view>
        </scroll-view>
        <scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 320upx)" :scroll-into-view="'main-' + mainCur" @scroll="VerticalMain">
          <!-- <scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)" :scroll-into-view="'main-' + mainCur" @scroll="VerticalMain"> -->
          <view class="food-item" v-for="(item, index) in foodList" :key="index">
            <div class="left">
              <view class="name">{{ item.label }}</view>
              <view class="weight">{{ item.weight }}</view>
            </div>
            <div class="right"><view class="lg  cuIcon-add" @click="openChooseBox($event, item)" data-target="ChooseFoodModal"></view></div>
            <view class="cu-modal" :class="modalName == 'ChooseFoodModal' ? 'show' : ''">
              <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="action" @tap="hideModal"><view class="cuIcon-close"></view></view>
                </view>
                <view class="modal-content">
                  <view class="select-time">
                    <!-- <view class="action">
                      <button type="primary" class="cu-btn bg-green shadow">早餐</button>
                      <button type="primary" class="cu-btn bg-green shadow">午餐</button>
                      <button type="primary" class="cu-btn bg-green shadow">晚餐</button>
                      <button type="primary" class="cu-btn bg-green shadow">饮料零食</button>
                      <button type="primary" class="cu-btn bg-green shadow">加餐</button>
                    </view> -->
                  </view>
                  <view class="food-wrap">
                    <view class="food-name">{{ currentFood.name }}</view>
                    <view class="food-calories">{{ currentFood.calories }}</view>
                    <view class="food-weight"><input class="input-number" type="text" value="" placeholder="填写数量" placeholder-style="font-size:20upx"/></view>
                    <button type="primary" class="cu-btn bg-gradual-blue shadow">确定</button>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="handle-box">
      <view class="select-button" @click="openSelectedBox">
        <text class="lg cuIcon-goodsnewfill"></text>
        <text>已选</text>
      </view>
      <view class="show-data">
        <text class="label">总热量:</text>
        <text class="numbers">
          <text class="number">555</text>
          大卡
        </text>
      </view>
      <view class="confirm-button bg-gradual-blue"><text>确认记录</text></view>
    </view>
  </view>
</template>

<script>
export default {
  // 食物选择界面
  name: 'DietSelect',

  data() {
    return {
      InputBottom: 0,
      searchValue: '',
      tabList: [],
      foodList: [],
      currentFood: {
        name: '', //食物名称
        calories: '', //热量、卡路里
        weight: ''
      },
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      modalName: ''
    };
  },
  methods: {
    TabSelect(e,item) {
      console.log(`你选择了${item.label}`)
      this.foodList = []
      this.tabCur = e.currentTarget.dataset.id;
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
      this.getFoodList()
    },
    openSelectedBox() {
      // 弹出已选
    },
    openChooseBox(e, item) {
      // 弹出选择框
      console.log(e, item);
      this.currentFood.name = item.label;
      this.currentFood.calories = item.calories
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    VerticalMain(e) {
    //   // #ifdef MP-ALIPAY
    //   return false; //支付宝小程序暂时不支持双向联动
    //   // #endif
    //   let that = this;
    //   let tabHeight = 0;
    //   if (this.load) {
    //     for (let i = 0; i < this.list.length; i++) {
    //       let view = uni.createSelectorQuery().select('#main-' + this.list[i].id);
    //       view
    //         .fields(
    //           {
    //             size: true
    //           },
    //           data => {
    //             this.list[i].top = tabHeight;
    //             tabHeight = tabHeight + data.height;
    //             this.list[i].bottom = tabHeight;
    //           }
    //         )
    //         .exec();
    //     }
    //     this.load = false;
    //   }
    //   let scrollTop = e.detail.scrollTop + 10;
    //   for (let i = 0; i < this.list.length; i++) {
    //     if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
    //       this.verticalNavTop = (this.list[i].id - 1) * 50;
    //       this.tabCur = this.list[i].id;
    //       console.log(scrollTop);
    //       return false;
    //     }
    //   }
    },
    getTabList() {
      let list = ['水果', '蔬菜', '谷物', '肉类', '蛋类', '豆类', '乳制品', '甜品', '水饮', '中式', '酱料'];
      list = list.map(item => {
        return {
          label: item
        };
      });
      this.tabList = list;
    },
    getFoodList() {
      let list = [
        {
          label: '橘子',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        },
        {
          label: '香蕉',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        },
        {
          label: '苹果',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        },
        {
          label: '猕猴桃',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        },
        {
          label: '樱桃',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        },
        {
          label: '榴莲',
          unit: '个',
          weight: '200克',
          calories:'30千卡'
        }
      ];
      this.foodList = list;
    },
    clearText() {
      this.searchValue = '';
    },
    InputFocus(e) {
      this.InputBottom = e.detail.height;
      console.log(e.detail, 'Focus');
    },
    InputBlur(e) {
      this.InputBottom = 0;
      console.log(e.detail.value, 'blur');
    }
  },
  onLoad() {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
    this.getTabList(); //获取食物分类tab
    this.getFoodList();
  },
  onReady() {
    uni.hideLoading();
  }
};
</script>

<style lang="scss">
.diet-select {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cu-bar {
    background-color: #0bc99d;
    color: #fff;
  }
  .cu-modal {
    background-color: rgba($color: #000000, $alpha: 0.1);
    .cu-dialog {
      .cu-bar {
        background: transprance;
        background-color: #fff00000;
        height: 60upx;
        color: #0bc99d;
        .action {
          min-width: 40upx !important;
          min-height: 40upx !important;
          width: 50upx;
          height: 50upx;
          margin-right: 20upx;
          text-align: center;
          border-radius: 100%;
          color: #fff;
          background-color: #0BC99D;
        }
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        .food-wrap{
          display: flex;
          flex-direction: column;
          align-items: center;
          .food-name{
            font-size: 28upx;
            line-height: 30upx;
          }
          .food-calories{
            font-size: 24upx;
            color: #0BC99D;
            margin-bottom: 30upx;
          }
          .food-weight{
            font-size: 26upx;
            border-radius: 10upx;
            border: 1px solid #0BC99D;
            padding: 10upx;
            .input-number{
              
            }
          }
          .cu-btn{
            margin: 30upx 0;
            background-color: #0BC99D;
          }
        }
      }
    }
  }
  .foods-box {
    width: 100%;
    background-color: #fff;
    // flex: 1;
    .VerticalNav.nav {
      width: 200upx;
      white-space: initial;
    }

    .VerticalNav.nav .cu-item {
      width: 100%;
      text-align: center;
      background-color: #fff;
      margin: 0;
      border: none;
      height: 50px;
      position: relative;
    }

    .VerticalNav.nav .cu-item.cur {
      background-color: #f1f1f1;
    }

    .VerticalNav.nav .cu-item.cur::after {
      content: '';
      width: 8upx;
      height: 30upx;
      border-radius: 10upx 0 0 10upx;
      position: absolute;
      background-color: currentColor;
      top: 0;
      right: 0upx;
      bottom: 0;
      margin: auto;
    }

    .VerticalBox {
      display: flex;
    }

    .VerticalMain {
      background-color: #f1f1f1;
      flex: 1;
      .food-item {
        width: 90%;
        height: 120upx;
        margin: 20upx auto;
        padding: 20upx;
        background-color: #fff;
        border-radius: 10upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          .name {
            font-size: 28upx;
          }
          .weight {
            font-size: 24upx;
            color: #b6b6b6;
          }
        }
        .right {
          width: 50upx;
          height: 50upx;
          line-height: 50upx;
          text-align: center;
          font-size: 40upx;
          border-radius: 50%;
          background-color: #0bc99d;
          color: #fff;
        }
      }
    }
  }
  .handle-box {
    width: 100%;
    height: 100upx;
    background-color: #fff;
    padding-left: 20upx;
    display: flex;
    font-size: 28upx;
    .select-button {
      padding: 0 20upx;
      display: flex;
      align-items: center;
      .cuIcon-goodsnewfill {
        color: #0bc99d;
        padding-right: 10upx;
      }
    }
    .show-data {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .label {
        font-size: 20upx;
        color: #b6b6b6;
      }
      .numbers {
        font-size: 28upx;
        padding: 0 24upx 0 10upx;
        .number {
          font-weight: 600;
        }
      }
    }
    .confirm-button {
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
