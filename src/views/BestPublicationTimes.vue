<template>
  <div class="grid">
    <div class="grid__left"></div>
    <div class="grid__center">
      <transition name="fade">
        <bar-chart v-if="barChart"/>
      </transition>
      <transition name="fade">
      <high-charts :options="hcOptions" v-if="!barChart"/>
      </transition>
    </div>
    <div class="grid__right"></div>
    <button @click="toggleBarchart">toggle</button>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import HighCharts from '@/components/HighCharts.vue';

export default {
  data() {
    return {
      barChart: true,
      hcOptions: {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Monthly Average Temperature',
        },
        subtitle: {
          text: 'Source: WorldClimate.com',
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)',
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        }, {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
        }],
      },
    };
  },
  components: {
    BarChart,
    HighCharts,
  },
  methods: {
    toggleBarchart() {
      this.barChart = !this.barChart;
    },
  },
};
</script>

<style lang="scss">
.fade {
  &-enter-active, &-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
