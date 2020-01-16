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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }
  ]
};
var xData = (function() {
  var data = [];
  for (var i = 1; i < 13; i++) {
    data.push(i + '月份');
  }
  return data;
})();

lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
          // position: 'insideRight'
        }
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
          // position: 'insideRight'
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
          // position: 'insideRight'
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
          // position: 'insideRight'
        }
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
          // position: 'insideRight'
        }
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
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
  width: 96%;
  background-color: #fff;
  padding: 2%;
  height: 300px;
}
</style>
