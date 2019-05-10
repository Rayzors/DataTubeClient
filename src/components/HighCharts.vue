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
          opacity: 1,
          clip: false,
          margin: [0, 0, 0, 0],
          width: null,
          height: '95%',
          polar: true,
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        xAxis: [{
          type: 'category',
          categories: [
            'Nombre de vue',
            'Like',
            'Durée',
            'Dislike',
          ],
          labels: {
            style: {
              color: '#151515',
              cursor: 'default',
              fontSize: '13px',
              textOverflow: 'none',
              whiteSpace: 'nowrap',
              fontFamily: 'Josefin Sans',
              letterSpacing: '0.1px',
            },
          },
          tickColor: '#FF0000',
          tickPosition: 'inside',
          tickmarkPlacement: 'on',
          tickPixelInterval: 45,
          gridLineColor: '#ddd',
          lineColor: '#ddd',
        }],
        yAxis: {
          gridLineColor: '#ddd',
          gridLineWidth: 0,
          labels: {
            enabled: false,
          },
        },
        series:
        [
          {
            color: '#ee5355',
            fillOpacity: 0.65,
            name: 'Column',
            data: [],
            pointPlacement: 'on',
            lineWidth: 3,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: false,
          },
          {
            color: '#3f78de',
            fillOpacity: 0.65,
            name: 'Column',
            pointPlacement: 'on',
            lineWidth: 3,
            data: [20, 50, 30, 10],
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: false,
          },
        ],
      },
      chart: null,
    };
  },
  mounted() {
    this.chart = Highcharts.chart('container', this.options);
    this.chart.update(this.options);
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
#container {
  width: 100%;
}
</style>
