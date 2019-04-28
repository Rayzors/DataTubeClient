<template>
  <li
    :class="{'home-nav__list-item--selected': isSelected}"
    class="home-nav__list-item"
   @click="select"
  >
    <span>{{ `${twoNumber(index + 1)}. ${name}` }}</span>
    <span class="home-nav__dot"></span>
  </li>
</template>

<script>
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
  },
  methods: {
    select() {
      this.$emit('select', this.index);
    },
  },
  computed: {
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
