<template>
  <view class="chart-wrap">
   <mpvue-echarts class="ec-canvas" @onInit="onInit" canvasId="line" ref="normalChart" />
  </view>
</template>

<script>
import * as echarts from '@/components/echarts/echarts.simple.min.js';
import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
var that;
let chart = null;
let lineOption = {
  xAxis: {
    type: 'category',
    data: ['蛋白质', '维生素C', '铁', '锌', '钙', '热量']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [1435, 932, 901, 934, 1290, 1330],
      type: 'line'
    }
  ]
};

lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: [{name:'牛奶',textStyle: {color: 'red'}}, {name:'鸡蛋',textStyle: {color: 'red'}}, {name:'面包',textStyle: {color: 'red'}}],
    show:true
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['蛋白', '维C', '铁', '锌', '钙', '热量']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '牛奶',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
        }
      },
      data: [320, 302, 301, 334, 390, 330]
    },
    {
      name: '鸡蛋',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
        }
      },
      data: [120, 132, 101, 134, 90, 230]
    },
    {
      name: '面包',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
        }
      },
      data: [220, 182, 191, 234, 290, 330]
    },
    {
      name: '平均',
      type: 'line',
      label: {
        normal: {
          show: true
        }
      },
      data: [145, 255, 342, 156, 290, 654]
    }
  ]
};
export default {
  name: 'DietRecord',
  components: {
    mpvueEcharts
  },
  data() {
    return {
      echarts,
      onInit: this.initChart,
      chartOption:{},
    };
  },
  onLoad() {
    that = this
  },
  methods: {
    initChart(e) {
      let { width, height } = e;
      let canvas = this.$refs.normalChart.canvas;
      echarts.setCanvasCreator(() => canvas);
      let normalChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(normalChart);
      normalChart.setOption(lineOption);
      this.$refs.normalChart.setChart(normalChart);
    }
  }
};
</script>

<style>
  .chart-wrap{
    height: 100%;
  }
</style>
