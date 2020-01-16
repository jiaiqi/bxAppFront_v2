<template>
  <view class="diet-wrap"><mpvue-echarts class="ec-canvas" @onInit="lineInit" canvasId="line" ref="lineChart" /></view>
</template>

<script>
import * as echarts from '@/components/echarts/echarts.simple.min.js';
import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
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
    data: ['牛奶', '鸡蛋', '面包']
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
          // position: 'insideRight'
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
          // position: 'insideRight'
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
          // position: 'insideRight'
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
	      // position: 'insideRight'
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
      onInit: this.lineInit
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
