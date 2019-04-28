<template>
  <div class="topbar">
    <div class="container">
      <div class="logo">
        <LogoSVG />
      </div>
      <SelectBox :options="countries"/>
    </div>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import SelectBox from '@/components/SelectBox.vue';
export default {
  props: {
    countries: {
      type: Array,
      default: [{label: 'France', value: 'FR'}]
    },
  },
  components: {
    SelectBox,
    LogoSVG,
  }
}
</script>

<style lang="scss" scoped>

</style>