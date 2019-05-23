<template>
  <div class="select">
    <input
      type="text"
      class="select__picked"
      v-model="searchFilter"
      @focus="toggleDropdown"
      @blur="close"
      @keyup.enter="select()"
    >
    <ul class="select__dropdown" v-show="isOpen">
      <li v-for="(option, i) in filteredOptions" :key="i">
        <div
          class="option"
          :class="[(picked.value === option.value) ? 'option--selected' : '']"
          @mousedown="select(option)"
        >{{ option.label }}</div>
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
      picked: this.options[0],
      searchFilter: this.options[0].label,
    };
  },
  methods: {
    select(option) {
      return (() => {
        if (option) {
          this.picked = option;
        } else {
          [this.picked] = this.filteredOptions;
        }
        this.isOpen = false;
        this.searchFilter = this.picked.label;
      })();
    },
    toggleDropdown() {
      return (() => {
        this.searchFilter = '';
        this.isOpen = true;
      })();
    },
    close() {
      return (() => {
        if (!this.picked.value) {
          this.picked = {};
          this.searchFilter = '';
        } else {
          this.searchFilter = this.picked.label;
        }
        this.isOpen = false;
      })();
    },
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => option.label.match(new RegExp(this.searchFilter, 'gi')),);
    },
  },
  watch: {
    picked: {
      handler(picked) {
        if (this.filteredOptions.length === 0) {
          this.picked = {};
        } else {
          [this.picked] = this.filteredOptions;
        }
        this.$store.dispatch('setSelect', {
          index: this.name,
          mutationName: this.mutation,
          value: picked.value,
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
  letter-spacing: 0.1px;
  display: inline-block;
  user-select: none;
  position: relative;

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

  .option {
    cursor: pointer;
    width: 100%;
    padding: 8px 16px;
    display: block;
  }

  &__picked {
    border: 0;
    font-size: 17px;
    cursor: pointer;
    width: 100%;
    padding: 8px 40px 8px 16px;
    background: #de543f;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);

    &:focus {
      outline: none;
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
