<template>
  <div class="grid">
    <div class="grid__left">
       <div class="information__container">
        <home-block
          v-for="(block, i) in column1"
          :key="i"
          :title="block.name"
          :value="block.value"
          :important="block.important"
          :type="block.type"
        />
      </div>
    </div>
    <div class="grid__center">
      <transition name="fade">
        <bar-chart v-if="barChart && !$store.state.isLoading"/>
      </transition>
      <transition name="fade">
      <high-charts :options="hcOptions" v-if="!barChart"/>
      </transition>
    </div>
    <div class="grid__right">
      <div class="information__container">
        <home-block
          v-for="(block, i) in column2"
          :key="i"
          :title="block.name"
          :value="block.value"
          :important="block.important"
          :type="block.type"
        />
      </div>
    </div>
    <button @click="toggleBarchart"></button>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import HighCharts from '@/components/HighCharts.vue';
import { mapGetters } from 'vuex';
import HomeBlock from '@/components/HomeBlock.vue';

export default {
  data() {
    return {
      barChart: true,
      hcOptions: {
        chart: {
          type: 'line',
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
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        }, {
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
        }],
      },
      models: [
        {
          title: 'Jour où le nombre de publication est le plus élevée',
          value: 'bestNumberOfPublication',
          type: 'string',
          important: false,
        },
        {
          title: 'Durée moyenne des vidéos',
          value: 'averageTime',
          type: 'string',
          important: false,
        },
      ],
    };
  },
  components: {
    BarChart,
    HighCharts,
    HomeBlock,
  },
  methods: {
    toggleBarchart() {
      this.barChart = !this.barChart;
    },
    capitalizeFirstletter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    min(array) {
      // eslint-disable-next-line prefer-spread
      console.log(array);
    },
  },
  computed: {
    ...mapGetters(['getColumn1Datas', 'getColumn2Datas']),
    column1() {
      return [{
        name: 'Jour où le nombre de publication est le plus élevée',
        value: `
        ${this.capitalizeFirstletter(this.getColumn1Datas.bestNumberOfPublication.label)} (${this.getColumn1Datas.bestNumberOfPublication.value}
        ${this.getColumn1Datas.bestNumberOfPublication.value > 1 ? 'publications' : 'publication'})`,
        type: 'string',
        important: false,
      }, {
        name: 'Jour où le nombre de publication est le moins élevée',
        value: this.capitalizeFirstletter(this.getColumn1Datas.bestNumberOfPublication.label),
        type: 'string',
        important: false,
      }];
    },
    column2() {
      return [{
        name: 'Jour où le nombre de publication est le plus élevée',
        value: `
        ${this.capitalizeFirstletter(this.getColumn2Datas.bestNumberOfPublication.label)} (${this.getColumn2Datas.bestNumberOfPublication.value}
        ${this.getColumn2Datas.bestNumberOfPublication.value > 1 ? 'publications' : 'publication'})`,
        type: 'string',
        important: false,
      }, {
        name: 'Jour où le nombre de publication est le moins élevée',
        value: this.capitalizeFirstletter(this.getColumn2Datas.bestNumberOfPublication.label),
        type: 'string',
        important: false,
      }];
    },

  },
};
</script>

<style lang="scss">
.fade {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  &-enter-active, &-leave-active {
    position: absolute;
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &-enter, &-leave-to {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    opacity: 0;
  }
}
</style>
