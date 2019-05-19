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
  },
  watch: {
    options: {
      handler(newValue) {
        if (this.chart) {
          const [newData1, newData2] = [newValue.series[0].data, newValue.series[1].data];
          const [newLineWidth1, newLineWidth2] = [newValue.series[0].lineWidth, newValue.series[1].lineWidth]
          this.chart.update({
            series: [{
              data: newData1,
              lineWidth: newLineWidth1,
            },{
              data: newData2,
              lineWidth: newLineWidth2,
            }]
          });
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
