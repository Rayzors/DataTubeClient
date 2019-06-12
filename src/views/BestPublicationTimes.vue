<template>
  <div class="grid" >
    <section-title
      v-parallax="0.1"
      class="section_title"
      title="Meilleurs moment de publication"
      edito="(par tranche horaire)"
    />
    <div class="grid__left" v-parallax="0.2">
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
    <div class="grid__center" v-parallax="0.2">
      <transition name="fade">
        <bar-chart
          v-if="
            barChart &&
            getColumn1Datas.numberOfPublicationByDay !== undefined &&
            $store.state.column2.datas.numberOfPublicationByDay &&
            !$store.state.isLoading"
        />
      </transition>
      <high-charts :options="hcOptions" v-if="!barChart"/>
    </div>
    <div class="grid__right" v-parallax="0.2">
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
import SectionTitle from '@/components/SectionTitle.vue';
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
            text: 'Nombre de publications',
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
    SectionTitle,
  },
  methods: {
    toggleBarchart() {
      this.barChart = !this.barChart;
    },
    capitalizeFirstletter(value = 'string') {
      const newValue = value.toString();
      return newValue.charAt(0).toUpperCase() + newValue.slice(1);
    },
    getColumnPublicationMin(i, key) {
      const array = this[`getColumn${i}Datas`][key] || [];
      return array.find(element => element.value === Math.min(...this[`getColumn${i}Datas`][key].map(el => el.value)));
    },
  },
  computed: {
    ...mapGetters(['getColumn1Datas', 'getColumn2Datas']),
    column1() {
      if (this.barChart && this.getColumn1Datas.numberOfPublicationByDay !== undefined) {
        const label = this.getColumn1Datas.bestNumberOfPublication.label || '';
        const label2 = this.worstDaysOfPublication[0];
        let { value } = this.getColumn1Datas.bestNumberOfPublication;
        value += value > 1 ? ' publications' : ' publication';
        let value2 = label2.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        return [{
          name: 'Jour où le nombre de publication est le plus élevée',
          value: `
          ${this.capitalizeFirstletter(label)} (${value})`,
          type: 'string',
          important: false,
        }, {
          name: 'Jour où le nombre de publication est le moins élevée',
          value: `${this.capitalizeFirstletter(label2.label)} (${value2})`,
          type: 'string',
          important: false,
        }];
      }
      if (this.getColumn1Datas.bestTimeOfPublication !== undefined) {
        const label = this.getColumn1Datas.bestTimeOfPublication ? this.getColumn2Datas.bestTimeOfPublication.label : '';
        let value = this.getColumn1Datas.bestTimeOfPublication.value ? this.getColumn2Datas.bestTimeOfPublication.value : '';
        value += value > 1 ? ' publications' : ' publication';

        const worstTime = this.worstTimeOfPublication[0];
        let value2 = worstTime.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        const label2 = worstTime.label;
        console.log(worstTime);
        return [{
          name: 'Horaire où le nombre de publication est le plus élevée',
          value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
          type: 'string',
          important: false,
        }, {
          name: 'Horaire où le nombre de publication est le moins élevée',
          value: `
          ${this.capitalizeFirstletter(label2)} (${value2})
          `,
          type: 'string',
          important: false,
        }];
      }
      return [{
        name: '', value: '', type: 'string', important: false,
      }];
    },
    column2() {
      if (this.barChart && this.getColumn1Datas.numberOfPublicationByDay !== undefined) {
        const label = this.getColumn2Datas.bestNumberOfPublication.label || '';
        const label2 = this.worstDaysOfPublication[1];
        let { value } = this.getColumn2Datas.bestNumberOfPublication;
        value += value > 1 ? ' publications' : ' publication';
        let value2 = label2.value;
        value2 += value2 > 1 ? ' publications' : ' publication';
        return [{
          name: 'Jour où le nombre de publication est le plus élevée',
          value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
          type: 'string',
          important: false,
        }, {
          name: 'Jour où le nombre de publication est le moins élevée',
          value: `${this.capitalizeFirstletter(label2.label)} (${value2})`,
          type: 'string',
          important: false,
        }];
      }
      if (this.getColumn2Datas.numberOfPublicationByDay !== undefined) {
        const label = this.getColumn2Datas.bestNumberOfPublication ? this.getColumn2Datas.bestNumberOfPublication.label : '';
        let value = this.getColumn2Datas.bestNumberOfPublication.value ? this.getColumn2Datas.bestNumberOfPublication.value : '';
        value += value > 1 ? ' publications' : ' publication';
        return [{
          name: 'Horaire où le nombre de publication est le plus élevée',
          value: `
          ${this.capitalizeFirstletter(label)} (${value})
          `,
          type: 'string',
          important: false,
        }];
      }
      return [{
        name: '', value: '', type: 'string', important: false,
      }];
    },
    worstDaysOfPublication() {
      const min1 = this.getColumnPublicationMin(1, 'numberOfPublicationByDay');
      const min2 = this.getColumnPublicationMin(2, 'numberOfPublicationByDay');
      return [min1, min2];
    },
    worstTimeOfPublication() {
      const min1 = this.getColumnPublicationMin(1, 'timeOfPublication');
      const min2 = this.getColumnPublicationMin(2, 'timeOfPublication');
      return [min1, min2];
    },
  },
};
</script>

<style lang="scss" scoped>
.grid__center {
  min-width: 700px;
  min-height: 300px;
}
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
