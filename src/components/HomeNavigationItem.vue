<template>
  <router-link
    :class="{'home-nav__list-item--selected': isSelected}"
    class="home-nav__list-item"
    :to="`/home/${slugifyName}`"
    tag="li"
  >
    <span>{{ `${twoNumber(index + 1)}. ${name} ${emoji}` }}</span>
    <span class="home-nav__dot"></span>
  </router-link>
</template>

<script>
import _ from 'lodash';
import Utils from '@/mixins/Utils.vue';

export default {
  mixins: [Utils],
  props: {
    index: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'Category',
    },
    emoji: {
      type: String,
      default: '🙈',
    },
  },
  computed: {
    slugifyName() {
      return _.kebabCase(this.name);
    },
    isSelected() {
      return this.index === this.$parent.index;
    },
  },
};
</script>

<style lang="scss" scoped>
$dots-border: 2px;
$dots-size: 16px - $dots-border;
$main-red: #ee5355;
.home-nav {
  &__list-item {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 32px;

    color: #7a7089;
    font-size: 18px;
    list-style-type: none;

    cursor: pointer;
    &--selected {
      color: $main-red;

      & .home-nav__dot {
        background-color: #fff;
      }
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
