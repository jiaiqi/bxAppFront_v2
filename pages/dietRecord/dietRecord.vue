<template>
  <view class="diet-wrap">
    <uniCharts></uniCharts>
  </view>
</template>

<script>
import uniCharts from '@/components/uni-charts/uni-charts.vue'
export default {
  name: 'DietRecord',
  components: {
    uniCharts
  },
  data() {
    return {
    };
  },
  onLoad() {},
  methods: {
    lineInit(e) {
      let { width, height } = e;
      let canvas = this.$refs.lineChart.canvas;
      echarts.setCanvasCreator(() => canvas);
      let lineChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(lineChart);
      lineChart.setOption(lineOption);
      this.$refs.lineChart.setChart(lineChart);
    }
  }
};
</script>

<style lang="scss">
.diet-wrap {
  width: 100%;
  background-color: #fff;
  padding: 2%;
  height: 600upx;
}
</style>
