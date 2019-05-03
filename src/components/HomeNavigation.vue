<template>
  <div class="home-nav">
    <ul class="home-nav__list-container">
      <HomeNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        :index="index"
        :name="category.name"
        :emoji="category.emoji"
      />
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
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
    }
  },
  watch: {
    $route: {
      handler(to) {
        if (to.params && to.params.category) {
          this.index = this.findCategoryIndexByName(to.params.category);
        } else {
          this.index = 0;
        }
        this.$emit('selectedCategory', this.index);
      },
      immediate: true,
    },
  },
  methods: {
    findCategoryIndexByName(_name) {
      return this.categories.findIndex(({ name }) => _.kebabCase(name) === _.kebabCase(_name));
    },
  },
};
</script>

<style lang="scss" scoped>
$dots-border: 2px;
$dots-size: 16px - $dots-border;
$main-red: #ee5355;
.home-nav {
  position: fixed;
  bottom: 0;

  &__list-container {
    display: flex;
    margin: 0;
    padding: 0;
  }
  &__list-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 32px;

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
