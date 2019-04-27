<template>
  <div class="select">
    <div class="select__picked" @click="toggleDropdown">{{ current.label }}</div>
    <ul class="select__dropdown" v-show="isOpen">
      <li v-for="(option, i) in options" :key="i">
        <label :for="`select-${i}`" @click="toggleDropdown">{{ option.label }}</label>
        <input type="radio" :value="option.value" :id="`select-${i}`" v-model="picked">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      isOpen: false,
      picked: "FR"
    };
  },
  methods: {
    toggleDropdown() {
      return (() => {
        this.isOpen = !this.isOpen;
      })();
    }
  },
  computed: {
    current() {
      return this.options.find(option => option.value === this.picked);
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  font-size: 20px;
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
    width: 251px;
    padding: 8px 16px;
    background: #fff;
    border-radius: 28px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);

    &::after {
      content: '';
      position: absolute;
      right: 16px;
      top: 50%;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid #000;
      transform: translateY(-50%);
    }
  }

  &__dropdown {
    position: absolute;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    border-radius: 28px;
    list-style: none;
    margin: 10px 0;
    padding: 10px 0;
    max-height: 50vh;
    overflow: auto;

    li {
      & + li {
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>
