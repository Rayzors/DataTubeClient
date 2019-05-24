<template>
  <div class="grid">
    <div
      class="grid__left"
      v-parallax="0.2">
      <likes-stats :likes="{ min: minLikes(1), max: maxLikes(1) }" :dislikes="{ min: minDislikes(1), max: maxDislikes(1) }" />
    </div>

    <div v-parallax="0.5" class="grid__center">
      <h2>Likes</h2>
      <gauge-comparator :showBoth="$store.state.compare" title="Vidéo avec le plus de likes" :percentages="percentages('maxLikes')" />
      <gauge-comparator :showBoth="$store.state.compare" title="Vidéo avec le moins de likes" :percentages="percentages('minLikes')" />
      <h2>Dislikes</h2>
      <gauge-comparator :showBoth="$store.state.compare" title="Vidéo avec le plus de dislikes" :percentages="percentages('maxDislikes')" />
      <gauge-comparator :showBoth="$store.state.compare" title="Vidéo avec le moins de dislikes" :percentages="percentages('minDislikes')" />
    </div>

    <div
      class="grid__right"
      v-parallax="0.2"
    >
      <transition name="slide-fade" v-if="$store.state.compare">
        <likes-stats :likes="{ min: minLikes(2), max: maxLikes(2) }" :dislikes="{ min: minDislikes(2), max: maxDislikes(2) }" />
      </transition>
    </div>
  </div>
</template>

<script>
import gaugeComparator from '@/components/GaugeComparator.vue'
import likesStats from '@/components/LikesStats.vue'
import { api } from '@/api'

export default {
  components: { gaugeComparator, likesStats },
  computed: {
    minLikes () { return statsSide => this.$store.getters['getMinLikes'](statsSide) },
    maxLikes () { return statsSide => this.$store.getters['getMaxLikes'](statsSide) },
    minDislikes () { return statsSide => this.$store.getters['getMinDislikes'](statsSide) },
    maxDislikes () { return statsSide => this.$store.getters['getMaxDislikes'](statsSide) },
    percentages () {
      return type => {
        let side1 = this[type](1)
        let side2 = this[type](2)
        let higherSide = Math.max(side1, side2)
        let lowerSide = Math.min(side1, side2)
        return [
          side1 / (higherSide || 1) * 100,
          side2 / (higherSide || 1) * 100
        ]
      }
    }
  },
  async mounted () {
    const datas = (await api.fetchVideosLikes('france', 'musique')).data
    let maxLikes = 0
    let minLikes = datas.length ? datas[0].likeCount : 0
    let maxDislikes = 0
    let minDislikes = datas.length ? datas[0].dislikeCount : 0
    datas.forEach(data => {
      let likeCount = data.likeCount
      let dislikeCount = data.dislikeCount
      if (likeCount > maxLikes) { maxLikes = likeCount }
      if (likeCount < minLikes) { minLikes = likeCount }
      if (dislikeCount > maxDislikes) { maxDislikes = dislikeCount }
      if (dislikeCount < maxDislikes) { minDislikes = dislikeCount }
    })
    this.$store.commit('setMinLikes', { statsSide: 1, value: minLikes })
    this.$store.commit('setMaxLikes', { statsSide: 1, value: maxLikes })
    this.$store.commit('setMinDislikes', { statsSide: 1, value: minDislikes })
    this.$store.commit('setMaxDislikes', { statsSide: 1, value: maxDislikes })
    this.$store.commit('setMinLikes', { statsSide: 2, value: 1000 })
    this.$store.commit('setMaxLikes', { statsSide: 2, value: 500000 })
    this.$store.commit('setMinDislikes', { statsSide: 2, value: 100 })
    this.$store.commit('setMaxDislikes', { statsSide: 2, value: 5000 })
  }
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
