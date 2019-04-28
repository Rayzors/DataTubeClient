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
          min: 0,
          max: 50,
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
            fillOpacity: 1,
            name: 'Column',
            data: [],
            pointPlacement: 'on',
            lineWidth: 0,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'areaspline',
            marker: false,
          },
          {
            fillOpacity: 0,
            animation: false,
            name: 'dots',
            data: [50, 50, 50, 50],
            pointPlacement: 'on',
            lineWidth: 0,
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: {
              enabled: true,
              fillColor: '#ee5355',
              symbol: 'circle',
            },
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
