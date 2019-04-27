<template>
  <div class="home">
    <div class="container">
      <div class="grid">
        <div class="grid__left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae necessitatibus quis sed! Amet inventore ipsa, illo quod fugiat voluptatem itaque rem laudantium provident nisi, deserunt maiores sint saepe aut dolorum!
        </div>

        <div class="grid__center">
          <high-charts v-parallax="0.5" />
        </div>

        <div class="grid__right">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quibusdam suscipit doloremque voluptate ab quisquam doloribus magnam distinctio animi molestias, quidem deleniti consectetur porro, cum nemo mollitia accusamus labore excepturi.
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
