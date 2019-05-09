<template>
  <div class="home-nav">
    <ul class="home-nav__list-container">
      <HomeNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        :index="index"
        :name="category.name"
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
$main-red: #ee5355;
.home-nav {
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: 65px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);

  &__list-container {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;

    height: 100%;
  }
  &__list-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: 13px;
    list-style-type: none;

    cursor: pointer;
    &--selected .home-nav__dot {
      background-color: #fff;
    }
  }
}
</style>
