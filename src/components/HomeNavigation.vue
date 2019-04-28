<template>
  <div class="home-nav">
    <div class="home-nav__title">
      {{ `${twoNumber(index + 1)}.  ${categories[index].name}` }}
    </div>
    <div class="home-nav__top">
      <span>Top {{ categories.length }} categories</span>
    </div>
    <ul class="home-nav__list-container">
      <HomeNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        :index="index"
        :name="category.name"
        @select="select"
      />
    </ul>
  </div>
</template>

<script>
import Utils from '@/mixins/Utils.vue';
import HomeNavigationItem from '@/components/HomeNavigationItem.vue';

export default {
  mixins: [Utils],
  components: { HomeNavigationItem },
  data() {
    return {
      index: 0,
    };
  },
  props: {
    categories: {
      type: Array,
      default: () => [{ id: 0, name: 'Please chose a category' }],
    },
  },
  methods: {
    select(index) {
      this.index = index;
      this.$emit('selectedCategory', index);
    },
  },
};
</script>

<style lang="scss" scoped>
$dots-border: 2px;
$dots-size: 16px - $dots-border;
$main-red: #ee5355;
.home-nav {
  &__title {
    margin-bottom: 72px;

    color: #151515;
    font-size: 32px;
    font-weight: bold;
    text-align: right;
  }

  &__top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 48px;
    span {
      padding: 16px;
      background-color: $main-red;

      color: #fff;
      font-size: 14px;
      line-height: 24px;
      text-transform: uppercase;
    }
  }

  &__list-container {
    margin: 0;
    padding: 0;
  }
  &__list-item {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;

    font-size: 18px;
    list-style-type: none;

    cursor: pointer;
    &--selected .home-nav__dot {
      background-color: #fff;
    }
  }

  &__dot {
    display: block;
    width: $dots-size;
    height: $dots-size;
    margin-left: 12px;

    background-color: $main-red;

    border: solid $dots-border $main-red;
    border-radius: $dots-size;
  }
}
</style>
