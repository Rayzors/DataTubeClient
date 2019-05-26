<template>
  <div class="grid">
    <div class="grid__left"></div>
    <div class="grid__center">
      <bar-chart/>
    </div>
    <div class="grid__right"></div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  components: {
    BarChart,
  },
};
</script>

<style>

</style>
