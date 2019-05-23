<template>
  <div class="home">
    <div class="container">
      <router-view />
      <home-navigation />
    </div>
  </div>
</template>

<script>
import HomeNavigation from '@/components/HomeNavigation.vue';

export default {
  components: { HomeNavigation },
  name: 'home',
};
</script>

<style lang="scss" scoped>
</style>
