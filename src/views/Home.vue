<template>
  <div class="home">
    <div class="container">
      <div class="grid">
        <div
          class="grid__left"
          v-parallax="0.2">
          <HomeBlock
            v-for="(average, i) in averages"
            :key="i"
            :title="average.title"
            :value="average.value"
            :important="average.important"/>
        </div>

        <div class="grid__center">
          <high-charts v-parallax="0.5" />
        </div>

        <div
          class="grid__right"
          v-parallax="0.2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quibusdam suscipit doloremque voluptate ab quisquam doloribus magnam distinctio animi molestias, quidem deleniti consectetur porro, cum nemo mollitia accusamus labore excepturi.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeBlock from '@/components/HomeBlock.vue';
import HighCharts from '@/components/HighCharts.vue';

export default {
  name: 'home',
  components: {
    HighCharts,
    HomeBlock,
  },
  data() {
    return {
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
    };
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
