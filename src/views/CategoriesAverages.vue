<template>
  <div class="grid">
    <section-title
      v-parallax="0.1"
      class="section_title"
      title="Moyenne des catégories"
      edito="Vous pourrez comprendre ce qui marche autour de vous."
    />
    <div class="grid__left" v-parallax="0.2">
      <div class="information__container">
        <home-block
          v-for="(block, i) in column1"
          :key="i"
          :title="block.title"
          :value="block.value"
          :important="block.important"
          :type="block.type"
        />
      </div>
    </div>

    <div class="grid__center">
      <high-charts v-parallax="0.5" :options="chartOptions"/>
    </div>

    <div class="grid__right" v-parallax="0.2">
      <div class="information__container">
        <home-block
          v-if="getCompare"
          v-for="(block, i) in column2"
          :key="i"
          :title="block.title"
          :value="block.value"
          :important="block.important"
          :type="block.type"
          :alignRight="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBlock from '@/components/HomeBlock.vue';
import HighCharts from '@/components/HighCharts.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    HighCharts,
    HomeBlock,
    SectionTitle,
  },
  data() {
    return {
      models: [
        {
          title: 'Nombre de vues',
          value: 'averageViewCount',
          type: 'string',
          important: true,
        },
        {
          title: 'Durée moyenne des vidéos',
          value: 'averageTime',
          type: 'string',
          important: false,
        },
        {
          title: 'Meilleur moment de publication',
          value: 'bestNumberOfPublication',
          type: 'object',
          important: false,
        },
        {
          title: 'Meilleur moment de publication',
          value: 'bestTimeOfPublication',
          type: 'object',
          important: false,
        },
        {
          title: 'Likes / Dislike',
          value: 'likePourcentage',
          type: 'string',
          important: false,
        },
        {
          title: 'Tags les plus utilisés',
          value: 'bestTags',
          type: 'array',
          important: false,
        },
      ],
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
        xAxis: [
          {
            type: 'category',
            categories: ['Nombre de vue', 'Like', 'Durée', 'Dislike'],
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
          },
        ],
        yAxis: {
          gridLineColor: '#ddd',
          gridLineWidth: 0,
          labels: {
            enabled: false,
          },
          max: 100,
        },
        series: [
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
            name: 'Column2',
            pointPlacement: 'on',
            lineWidth: 3,
            data: [],
            events: {
              mouseOver: false,
            },
            enableMouseTracking: false,
            type: 'area',
            marker: false,
            animation: {
              duration: 1000,
            },
          },
        ],
      },
    };
  },
  computed: {
    column1() {
      return this.models.map(model => ({
        ...model,
        value: this.getColumn1Datas[model.value],
      }));
    },
    column2() {
      return this.models.map(model => ({
        ...model,
        value: this.getColumn2Datas[model.value],
      }));
    },
    averageData1() {
      return [
        Math.round(
          (this.getColumn1Datas.averageViewCount * 100)
            / (this.getColumn2Datas.averageViewCount
              + this.getColumn1Datas.averageViewCount),
        ),
        this.getColumn1Datas.likePourcentage,
        Math.round(
          (this.getColumn1Datas.averageTime * 100)
            / (this.getColumn1Datas.averageTime
              + this.getColumn2Datas.averageTime),
        ),
        this.getColumn1Datas.dislikePourcentage,
      ];
    },
    averageData2() {
      return [
        Math.round(
          (this.getColumn2Datas.averageViewCount * 100)
            / (this.getColumn2Datas.averageViewCount
              + this.getColumn1Datas.averageViewCount),
        ),
        this.getColumn2Datas.likePourcentage,
        Math.round(
          (this.getColumn2Datas.averageTime * 100)
            / (this.getColumn1Datas.averageTime
              + this.getColumn2Datas.averageTime),
        ),
        this.getColumn2Datas.dislikePourcentage,
      ];
    },
    chartOptions() {
      const newOptions = { ...this.options };
      newOptions.series[0].data = [...this.averageData1];
      if (this.getCompare) {
        newOptions.series[1].data = [...this.averageData2];
        newOptions.series[1].lineWidth = 3;
      } else {
        newOptions.series[1].data = [0, 0, 0, 0];
        newOptions.series[1].lineWidth = 0;
      }
      return { ...newOptions };
    },
    ...mapGetters([
      'getColumn1Selection',
      'getColumn2Selection',
      'getColumn1Datas',
      'getColumn2Datas',
      'getCompare',
    ]),
  },
  methods: {
    toggleCompare() {
      this.$store.dispatch('toggleCompare');
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-areas:
    "a a a"
    "b c d";
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: max-content auto;
  grid-gap: 1em;
  align-items: center;
  padding-top: 12vh;
  z-index: 3;
  position: relative;

  .section_title {
    grid-area: a;
  }

  &__center {
    grid-area: c;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  &__right {
    grid-area: d;
  }

  &__left {
    grid-area: b;
  }

  &__right,
  &__left {
    display: flex;
    flex-flow: column wrap;
  }
}

.slide-fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateX(25px);
    opacity: 0;
  }
}
</style>
