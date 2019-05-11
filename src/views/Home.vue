<template>
  <div class="home">
    <div class="container">
      <div class="grid">
        <div
          class="grid__left"
          v-parallax="0.2">
          <home-block
            v-for="(average, i) in selectedCategory1.averages"
            :key="i"
            :title="average.title"
            :value="average.value"
            :important="average.important"
          />
        </div>

        <div class="grid__center">
          <high-charts
            v-parallax="0.5"
            :values="selectedCategory1.averageData"
            :options="options"
          />
        </div>

        <div
          class="grid__right"
          v-parallax="0.2"
        >
          <transition-group name="slide-fade">
            <home-block
              v-if="$store.state.compare"
              v-for="(average, i) in selectedCategory2.averages"
              :key="i"
              :title="average.title"
              :value="average.value"
              :important="average.important"
              :alignRight="true"
            />
          </transition-group>
        </div>
        <home-navigation
          :sections="sections"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBlock from '@/components/HomeBlock.vue';
import HighCharts from '@/components/HighCharts.vue';
import HomeNavigation from '@/components/HomeNavigation.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    HighCharts,
    HomeBlock,
    HomeNavigation,
  },
  data() {
    return {
      selectedCategoryID1: 0,
      selectedCategoryID2: 1,
      sections: [
        {
          id: 0,
          name: 'Moyenne des catégories'
        },
        {
          id: 1,
          name: 'Youtubeurs'
        },
        {
          id: 2,
          name: 'Nombre de vues'
        },
        {
          id: 3,
          name: 'Durée des vidéos'
        },
        {
          id: 4,
          name: 'Meilleur moment de publication'
        },
        {
          id: 5,
          name: 'Like / dislike'
        },
      ],
      categories: [
        {
          id: 1,
          averageData: [38.6593, 28, 40, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 667 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 2,
          averageData: [18, 28, 40, 10],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 500 000',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 3,
          averageData: [50, 28, 20, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 000 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 4,
          averageData: [50, 30, 10, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '667 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 5,
          averageData: [10, 20, 30, 40],
          averages: [
            {
              title: 'Nombre de vues',
              value: '367 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 6,
          averageData: [50, 30, 10, 45],
          averages: [
            {
              title: 'Like / dislike',
              value: '667 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
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
            marker: false
          },
        ],
      },
    };
  },
  computed: {
    selectedCategory1() {
      return this.categories[this.selectedCategoryID1];
    },
    selectedCategory2() {
      return this.categories[this.selectedCategoryID2];
    },
    ...mapGetters(['getSelectedCategories']),
  },
  watch: {
    selectedCategory1: {
      handler(newValue) {
        this.$set(this.options.series[0], 'data', [...newValue.averageData])
      },
      immediate: true
    },
    selectedCategory2: {
      handler(newValue) {
        this.$set(this.options.series[1], 'data', [...newValue.averageData])
      },
      immediate: true
    },
    getSelectedCategories(newValue) {
      this.selectedCategoryID1 = newValue.category1
      this.selectedCategoryID2 = newValue.category2
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 0;
  align-items: center;
  height: 100vh;
  z-index: 3;
  position: relative;

  &__center {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  &__right {
    display: block;
  }
}

.slide-fade {
  &-enter-active, &-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &-enter, &-leave-to {
    transform: translateX(25px);
    opacity: 0;
  }
}
</style>
