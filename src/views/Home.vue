<template>
  <div class="home">
    <div class="container">
      <div class="grid">
        <div
          class="grid__left"
          v-parallax="0.2">
          <HomeBlock
            v-for="(average, i) in selectedCategory.averages"
            :key="i"
            :title="average.title"
            :value="average.value"
            :important="average.important"/>
        </div>

        <div class="grid__center">
          <high-charts v-parallax="0.5" :averageData="selectedCategory.averageData" />
        </div>

        <div
          class="grid__right"
          v-parallax="0.2"
        >
          <home-navigation
            :categories="categories"
            @selectedCategory="selectedCategoryID = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBlock from '@/components/HomeBlock.vue';
import HighCharts from '@/components/HighCharts.vue';
import HomeNavigation from '@/components/HomeNavigation.vue';

export default {
  name: 'home',
  components: {
    HighCharts,
    HomeBlock,
    HomeNavigation,
  },
  data() {
    return {
      selectedCategoryID: 0,
      categories: [
        {
          id: 1,
          emoji: '🎤',
          name: 'Musique',
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
          emoji: '⚽️',
          name: 'Sport',
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
          emoji: '💁🏻‍♀️',
          name: 'Makeup',
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
          emoji: '📰',
          name: 'Politique',
          averageData: [60, 30, 10, 45],
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
          emoji: '🎮',
          name: 'Jeux vidéo',
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
      ],
    };
  },
  computed: {
    selectedCategory() {
      return this.categories.find((category, i) => i === this.selectedCategoryID);
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 10em;
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
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
}
</style>
