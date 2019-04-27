<template>
  <div class="home">
    <div class="container">
      <div class="grid">
        <div class="home__left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque expedita dignissimos ducimus iusto quas aut voluptate reprehenderit magnam. Ab accusantium doloribus sed voluptatem est. Aut eaque vitae officiis aliquam aspernatur.
        </div>

        <div class="home__center">
          <high-charts v-parallax="0.5" />
        </div>

        <div class="home__right">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ipsum corrupti ipsam sunt odio ullam sed quos accusantium laboriosam voluptatum dolorem ipsa totam, facere assumenda quisquam voluptatem? Iusto, dolorum earum?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HighCharts from '@/components/HighCharts.vue';

export default {
  name: 'home',
  components: {
    HighCharts,
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  height: 100vh;
}
</style>
