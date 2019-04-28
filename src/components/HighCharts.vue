<template>
<div id="container">
</div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-more')(Highcharts);

export default {
  props: {
    values: {
      type: Array,
      required: true,
      default: () => [10, 10, 10, 10],
    },
  },
  data() {
    return {
      options: {
        title: {
          text: undefined,
        },
        chart: {
          margin: [0, 0, 0, 0],
          width: null,
          polar: true,
          type: 'areaspline',
        },
        colors: ['#f00'],
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        xAxis: {
          type: 'category',
          categories: [
            'Nombre de vue',
            'Like',
            'Durée',
            'Dislike',
          ],
          tickmarkPlacement: 'on',
        },
        yAxis: {
          min: 0,
          max: 50,
        },
        plotOptions: {
          series: {
            marker: false,
          },
          areaspline: {
            linecap: 'lol',
          },
        },
        series:
        [
          {
            name: 'Column',
            data: [],
            pointPlacement: 'on',
            lineWidth: 0,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
          },
        ],
      },
      chart: null,
    };
  },
  mounted() {
    this.chart = Highcharts.chart('container', this.options);
  },
  watch: {
    values: {
      handler(val) {
        this.options.series[0].data = [...val];
        if (this.chart) {
          this.chart.update(this.options);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.highcharts-credits { display: none; }
</style>
