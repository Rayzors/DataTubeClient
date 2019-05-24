<template>
  <div class="grid">
    <div
      class="grid__left"
      v-parallax="0.2">
      <video-duration-stats :statsSide="1" />
    </div>

    <div v-parallax="0.5" class="grid__center">
      <div
        class="statCategoryContainer"
        v-for="(statCategory, index) in statCategories"
        v-bind:key="index">
        <h2 class="statTitle">{{ statCategory.title }}</h2>
        <div class="statBlocks">
          <div class="statBlock1" :style="{ width: percentageSize(statCategory.videosDurations[0]) + '%' }"><p class="statText">{{ statCategory.videosNames[0] }}</p></div>
          <div class="statBlock2" :style="{ width: percentageSize(statCategory.videosDurations[1]) + '%' }"><p class="statText">{{ statCategory.videosNames[1] }}</p></div>
        </div>
      </div>
      <div class="statRulers">
        <div class="statRuler" v-for="i in 8" v-bind:key="i">
          <div class="statRulerMark"></div>
          <p class="statRulerText">{{ rulerTime(i) }} min</p>
        </div>
      </div>
    </div>

    <div
      class="grid__right"
      v-parallax="0.2"
    >
      <transition name="slide-fade" v-if="$store.state.compare">
        <video-duration-stats :statsSide="2" />
      </transition>
    </div>
  </div>
</template>

<script>
import videoDurationStats from '@/components/VideoDurationStats';

export default {
  components: { videoDurationStats },
  data () {
    return {
      statCategories: [
        {
          title: 'Durée de la vidéo la plus longue',
          videosDurations: [310, 256],
          videosNames: ['video 1', 'video 2']
        },
        {
          title: 'Durée moyenne des vidéos',
          videosDurations: [210, 158],
          videosNames: ['video 3', 'video 4']
        },
        {
          title: 'Durée de la vidéo la plus courte',
          videosDurations: [61, 51],
          videosNames: ['video 5', 'video 6']
        }
      ]
    };
  },
  computed: {
    highestValue () {
      let highestValue = 0
      this.statCategories.forEach(statCategory => {
        statCategory.videosDurations.forEach(videoDuration => {
          if (videoDuration > highestValue) {
            highestValue = videoDuration
          }
        })
      })
      return highestValue
    },
    statSize () {
      let ceiledHighestValue = Math.ceil(this.highestValue / 8)
      let statSize = (ceiledHighestValue % 2 ? ceiledHighestValue + 1 : ceiledHighestValue) * 8
      return statSize
    },
    percentageSize () {
      return value => parseInt(100 / this.statSize * value)
    },
    rulerTime () {
      return index => this.statSize / 8 * index
    },
    videoDurationValues () {
      return {
        max: 130,
        average: 31,
        min: 12
      }
    }
  }
}
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
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

    .statTitle {
      margin: 50px 0 10px 10px;
    }

    .statBlocks {
      .statBlock1, .statBlock2 {
        height: 32px;
        text-align: right;

        .statText {
          padding: 8px 17px 0 0;
          white-space: nowrap;
          margin: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          color: white;
        }
      }

      .statBlock1 {
        background: rgba(255,158,143,1);
        background: -moz-linear-gradient(left, rgba(255,158,143,1) 0%, rgba(222,84,63,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,158,143,1)), color-stop(100%, rgba(222,84,63,1)));
        background: -webkit-linear-gradient(left, rgba(255,158,143,1) 0%, rgba(222,84,63,1) 100%);
        background: -o-linear-gradient(left, rgba(255,158,143,1) 0%, rgba(222,84,63,1) 100%);
        background: -ms-linear-gradient(left, rgba(255,158,143,1) 0%, rgba(222,84,63,1) 100%);
        background: linear-gradient(to right, rgba(255,158,143,1) 0%, rgba(222,84,63,1) 100%);
        margin-bottom: 4px;
      }

      .statBlock2 {
        background: rgba(157,195,255,1);
        background: -moz-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(157,195,255,1)), color-stop(100%, rgba(63,121,222,1)));
        background: -webkit-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
        background: -o-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
        background: -ms-linear-gradient(left, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
        background: linear-gradient(to right, rgba(157,195,255,1) 0%, rgba(63,121,222,1) 100%);
      }
    }

    .statRulers {
      position: absolute;
      color: gray;
      font-size: 12px;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(1fr);
      top: 20px;
      left: 0;
      z-index: -100;
      width: 100%;
      height: 100%;

      .statRuler {
        height: 100%;
        &Mark {
          height: 110%;
          border-left: 1px solid #EEE;
        }

        &Text {
          margin-top: 5px;
        }
      }
    }
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
