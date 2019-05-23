<template>
  <div class="select-box container">
    <div class="select-box-left">
      <select-box :options="countries" name="country1" mutation="setCountry"/>
      <select-box :options="categories" name="category1" mutation="setCategory"/>
      <select-box :options="subscribersRanges" name="range1" mutation="setRange"/>
    </div>
    <div class="select-box-right" v-show="$store.state.compare">
      <select-box :options="countries" name="country2" mutation="setCountry"/>
      <select-box :options="categories" name="category2" mutation="setCategory"/>
      <select-box :options="subscribersRanges" name="range2" mutation="setRange"/>
    </div>
  </div>
</template>

<script>
import SelectBox from '@/components/SelectBox.vue';

export default {
  components: {
    SelectBox,
  },
  props: {
    countries: {
      type: Array,
      default: () => [],
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
      required: true,
    },
    subscribersRanges: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style lang="scss">
.select-box {
  display: flex;
  justify-content: space-between;

  &-left,
  &-right {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, calc(100% / 3)));
    grid-gap: 8px;
    width: 45%;
  }

  &-left {
    padding-right: 10px;

    .select__picked {
      background: #de543f;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .select .option.option--selected {
      background: #de543f;
      color: #fff;
    }
  }

  &-right {
    padding-left: 10px;

    .select__picked {
      background: #3f78de;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .select .option.option--selected {
      background: #de543f;
      color: #fff;
    }
  }
}
</style>
