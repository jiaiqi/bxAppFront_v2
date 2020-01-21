<template>
  <view class="basic-info">
    <view class="cu-form-group" v-for="(item, index) in formData" :key="index">
      <view class="title">{{ item.label }}</view>
      <input :placeholder="item.placeholder" name="input" v-model="item.value" />
    </view>
  </view>
</template>

<script>
export default {
  // 基本信息
  name: 'basicInfo',
  data() {
    return {
      formData: [
        {
          label: '姓名',
          type: 'string',
          value: '',
          placeholder: '请输入您的姓名'
        },
        {
          label: '年龄',
          type: 'number',
          value: '',
          placeholder: ''
        },
        {
          label: '性别',
          type: 'enum',
          value: '',
          placeholder: ''
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.basic-info {
  width: 100%;
}
</style>
