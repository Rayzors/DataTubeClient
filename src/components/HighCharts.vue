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
      default: {},
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
    window.chart = this.chart
    window.options = this.options
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        this.chart && this.chart.update(newValue);
      },
      deep: true
    }
  },
};
</script>

<style lang="scss">
.highcharts-credits { display: none; }
#container {
  width: 100%;
}
</style>
