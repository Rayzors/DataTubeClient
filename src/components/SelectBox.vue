<template>
  <div class="select">
    <div class="select__picked" @click="toggleDropdown">{{ current.label }}</div>
    <ul class="select__dropdown" v-show="isOpen">
      <li v-for="(option, i) in options" :key="i">
        <input
          type="radio"
          :value="option.value"
          :id="`select-${i}${option.value}${name}`"
          v-model="picked"
        >
        <label :for="`select-${i}${option.value}${name}`" @click="toggleDropdown">{{ option.label }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [{ label: 'un label', value: 'value' }],
    },
    name: {
      type: String,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      picked: this.options[0].value,
    };
  },
  methods: {
    toggleDropdown() { this.isOpen = !this.isOpen },
  },
  computed: {
    current() {
      return this.options.find(option => option.value === this.picked);
    },
  },
  watch: {
    picked: {
      handler(value) {
        this.$store.dispatch('setSelect', {
          index: this.name,
          mutationName: this.mutation,
          value,
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  font-size: 17px;
  letter-spacing: 0.1px;
  display: inline-block;
  user-select: none;
  position: relative;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 100%;
    padding: 8px 16px;
    display: block;
  }

  &__picked {
    position: relative;
    cursor: pointer;
    width: 100%;
    padding: 8px 40px 8px 16px;
    background: #de543f;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);

    &::after {
      content: "";
      position: absolute;
      right: 16px;
      top: 50%;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid #fff;
      transform: translateY(-50%);
    }
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(63, 63, 68, 0.15),
      0 0 0 1px rgba(63, 63, 68, 0.05);
    border-radius: 3px;
    list-style: none;
    margin: 8px 0;
    padding: 6px 0;
    max-height: 50vh;
    overflow: auto;

    li {
      &:hover {
        background: #fafafa;
      }
    }
  }
}
</style>
