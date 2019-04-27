<template>
<div id="container">
</div>
</template>

<script>
import Highcharts from 'highcharts';

require('highcharts/highcharts-more')(Highcharts);

export default {
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
            'Likes',
            'Followers',
            'Dislikes',
            'lol2',
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
            data: [38.6593, 28, 40, 45],
            pointPlacement: 'on',
            lineWidth: 0,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
          },
        ],
      },
      table: [38.6593, 28, 40, 45],
      chart: {},
    };
  },
  mounted() {
    this.chart = Highcharts.chart('container', this.options);
  },
  watch: {
    table(prevValue, newValue) {
      this.options.series[0].data = newValue;
      this.chart.update(this.options);
    },
  },
};
</script>

<style lang="scss">
.highcharts-credits { display: none; }
</style>
