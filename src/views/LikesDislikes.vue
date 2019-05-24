<template>
  <div class="grid">
    <div
      class="grid__left"
      v-parallax="0.2">
      a<!-- <video-duration-stats :statsSide="1" /> -->
    </div>

    <div v-parallax="0.5" class="grid__center">
      <h2>Likes</h2>
      <gauge-comparator title="Vidéo avec le plus de likes" :percentages="[90, 40]" />
      <gauge-comparator title="Vidéo avec le moins de likes" :percentages="[90, 40]" />
      <h2>Dislikes</h2>
      <gauge-comparator title="Vidéo avec le plus de dislikes" :percentages="[90, 40]" />
      <gauge-comparator title="Vidéo avec le moins de dislikes" :percentages="[90, 40]" />
    </div>

    <div
      class="grid__right"
      v-parallax="0.2"
    >
      <transition name="slide-fade" v-if="$store.state.compare">
        <div>b</div><!-- <video-duration-stats :statsSide="2" /> -->
      </transition>
    </div>
  </div>
</template>

<script>
import gaugeComparator from '@/components/GaugeComparator.vue'

export default {
  components: { gaugeComparator }
}
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 0;
  align-items: center;
  height: 100vh;
  z-index: 3;
  position: relative;

  &__center {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
