<template>
  <view class="food-select">
    <view class="food-list">
      <view class="food-class cu-bar bg-white solid-bottom">
        <view class="action"><text class="cuIcon-titles text-orange">早餐</text></view>
        <text class="lg text-gray cuIcon-add padding-right" @click="toAddFoods()"></text>
      </view>
      <view class="food-table">
        <t-table @change="change">
          <t-tr>
            <t-th>序号</t-th>
            <t-th>名称</t-th>
            <t-th>数量</t-th>
            <t-th>质量</t-th>
          </t-tr>
          <t-tr v-for="item in foodList" :key="item.id">
            <t-td>{{ item.id + 1 }}</t-td>
            <t-td>{{ item.name }}</t-td>
            <t-td>{{ item.num }}</t-td>
            <t-td>{{ item.weight }}</t-td>
          </t-tr>
        </t-table>
      </view>

      <!--  <view class="cu-item">
      	<view class="content">
      		<text class="cuIcon-circlefill text-grey"></text>
      		<text class="text-grey">午餐</text>
          <text class="lg text-gray cuIcon-add"></text>
      	</view>
      </view>
      <view class="cu-item">
      	<view class="content">
      		<text class="cuIcon-circlefill text-grey"></text>
      		<text class="text-grey">晚餐</text>
          <text class="lg text-gray cuIcon-add"></text>
      	</view>
      </view>
      <view class="cu-item">
      	<view class="content">
      		<text class="cuIcon-circlefill text-grey"></text>
      		<text class="text-grey">其它</text>
          <text class="lg text-gray cuIcon-add"></text>
      	</view>
      </view> -->
    </view>
  </view>
</template>

<script>
import tTable from '@/components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
export default {
  components: {
    tTable,
    tTh,
    tTr,
    tTd
  },
  data() {
    return {
      foodList: [
        {
          id: 0,
          name: '牛奶',
          num: '19',
          weight: '200g'
        },
        {
          id: 1,
          name: '面包',
          num: '21',
          weight: '146g'
        },
        {
          id: 2,
          name: '鸡蛋',
          num: '29',
          weight: '221g'
        }
      ]
    };
  },
  methods: {
    change() {},
    toAddFoods() {}
  }
};
</script>

<style lang="scss">
.food-select {
  width: 100%;
  .food-list {
    width: 95%;
    margin: 0 auto;
    .food-class {
      width: 100%;
    }
    .food-table {
      width: 90%;
      margin: 0 auto;
    }
  }
  .cuIcon-add {
    float: right;
  }
}
</style>
