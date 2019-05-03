<template>
<div class="select-box">
  <div class="select-box-left">
    <select-box 
      :options="countries"
      name="country1"
      mutation="setCountry"
    />
    <select-box
      :options="categories"
      name="category1"
      mutation="setCategory"
    />
    <select-box
      :options="subscribersRanges"
      name="range1"
      mutation="setRange"
    />
  </div>
  <div class="select-box-right">
    <select-box 
      :options="countries"
      name="country2"
      mutation="setCountry"
    />
    <select-box
      :options="categories"
      name="category2"
      mutation="setCategory"
    />
    <select-box
      :options="subscribersRanges"
      name="range2"
      mutation="setRange"
    />
  </div>
</div>
</template>

<script>
import SelectBox from '@/components/SelectBox.vue'

export default {
  components: {
    SelectBox,
  },
  props: {
    countries: {
      type: Array,
      default: [],
      required: true
    },
    categories: {
      type: Array,
      default: [],
      required: true
    },
    subscribersRanges: {
      type: Array,
      default: [],
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: space-between;
}
</style>