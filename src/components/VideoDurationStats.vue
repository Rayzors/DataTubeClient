<template>
  <div class="videoDurationStats">
    <div
      class="videoDurationStat"
      v-for="(statData, index) in statDatas"
      v-bind:key="index">
      <h3 class="videoDurationStatTitle">{{ statData.title }}</h3>
      <p class="videoDurationStatValue">{{ valueString(statData.value) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoDurationValues: {
      type: Object,
      default: () => ({
        max: 0,
        average: 0,
        min: 0
      })
    }
  },
  data () {
    return {
      statDatas: [
        {
          title: 'Durée max des vidéos',
          value: this.videoDurationValues.max
        },
        {
          title: 'Durée moyenne des vidéos',
          value: this.videoDurationValues.average
        },
        {
          title: 'Durée min des vidéos',
          value: this.videoDurationValues.min
        }
      ]
    }
  },
  computed: {
    valueString () {
      return value => value + ' min'
    }
  }
}
</script>

<style lang="scss">
.videoDurationStats {
  .videoDurationStat {
    margin-bottom: 40px;
    &Title {
      margin: 0 0 5px 0;
      color: #AAA;
      font-weight: normal;
      font-size: 16px;
    }

    &Value {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }
  }
}
</style>
