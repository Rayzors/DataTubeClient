<template>
  <div class="block" :class="{'block--right': alignRight}">
    <h3 class="block__title">{{ title }}</h3>
    <p class="block__value" :class="{important}">{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    important: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
.block {
  $block: &;
  margin-bottom: 32px;

  &--right {
    text-align: right;

    #{$block}__value.important {
      color: #3f78de;
    }
  }

  &__title {
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 0.3px;
    color: #7a7089;
    margin-bottom: 0;
  }

  &__value {
    font-size: 32px;
    font-family: 'Playfair Display', serif;
    letter-spacing: 0.2px;
    color: #000000;
    margin: 0;

    &.important {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 0.3px;
      color: #ee5355;
    }
  }
}
</style>
