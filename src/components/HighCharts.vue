<template>
<div id="container">
</div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-more')(Highcharts);

export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    updateOptions: {
      type: Number,
      default: 0,
    },
    updateOptions: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = Highcharts.chart('container', this.options);
    this.chart.update(this.options);
    window.chart = this.chart;
    window.options = this.options;
  },
  watch: {
    options: {
      handler(newValue) {
        if (this.chart) {
          const [newOptions1, newOptions2] = [newValue.series[0].data, newValue.series[1].data];
          this.chart.series[0].setData(newOptions1);
          this.chart.series[1].setData(newOptions2);
          // this.chart.update(newValue);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.highcharts-credits { display: none; }
#container {
  width: 100%;
}
</style>
