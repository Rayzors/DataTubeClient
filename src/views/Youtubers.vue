<template>
  <div class="youtubers">
    <h1 class="youtubers__title">Chaîne youtube</h1>
    <span class="youtubers__subtitle">Sport</span>  
    <div class="youtubers__container"> 
      <div class="youtubers__container-left">
        <channels />
        <channels />
        <channels />
      </div>
      <div class="youtubers__container-right" v-if="$store.state.compare === true">
        <channels />
        <channels />
        <channels />

      </div> 
    </div> 
  </div>
</template>

<script>
import Channels from "@/components/Channels.vue";

export default {
  components: {
    Channels,
  },
}
</script>

<style lang="scss" scoped>
.youtubers {
  &__title {
    font-size: 28px;
    letter-spacing: -0.8px;
    line-height: 1.21;
    font-weight: bold;

  }
  &__subtitle {
    color: #de543f;
    font-size: 24px;
  }

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      width: 48%;
    }

    &-right{
      width: 48%;
        .channel {
          flex-direction: row-reverse;
      }
    }
  }

}
</style>
