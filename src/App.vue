<template>
  <div id="app">
    <vue-particles
      v-parallax="-0.5"
      color="#dedede"
      :hoverEffect="false"
      :clickEffect="false"
      class="particle-background"
      v-if="hideParticles"
    />
    <div class="topbar" v-if="$route.path !== '/'">
      <div class="container">
        <div class="logo">
          <LogoSVG/>
        </div>
      </div>
      <select-box-container
        :countries="countries"
        :categories="categories"
        :subscribersRanges="subscribersRanges"
        v-if="countries.length && categories.length"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import SelectBoxContainer from '@/components/SelectBoxContainer.vue';
import RegionService from '@/services/regions.service.vue';
import CategoryService from '@/services/categories.service.vue';

export default {
  mixins: [RegionService, CategoryService],
  components: { SelectBoxContainer, LogoSVG },
  data() {
    return {
      hideParticles: false,
      categories: [],
      countries: [],
      subscribersRanges: [
        {
          label: '0 - 10 000',
          nbChannelInRange: '1',
          value: '0-10000',
        },
        {
          label: '1 000 000 - 10 000 000',
          nbChannelInRange: '11',
          value: '1000000-10000000',
        },
        {
          label: '10 000 - 100 000',
          nbChannelInRange: '11',
          value: '10000-100000',
        },
        {
          label: '100 000 - 500 000',
          nbChannelInRange: '22',
          value: '100000-500000',
        },
        {
          label: '500 000 - 1 000 000',
          nbChannelInRange: '12',
          value: '500000-1000000',
        },
      ],
    };
  },
  async created() {
    this.countries = await this.getAllRegions();
    this.categories = await this.getAllCategories();
  },
};
</script>


<style lang="scss">
@font-face {
  font-family: "Geomanist";
  font-style: normal;
  font-weight: normal;
  src: local("Geomanist Regular"),
    url("/fonts/Geomanist-Regular.woff") format("woff");
}

@font-face {
  font-family: "Geomanist";
  font-style: bold;
  font-weight: bold;
  src: local("Geomanist Bold"), url("/fonts/Geomanist-Bold.woff") format("woff");
}

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: "Geomanist", sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #180940;
}

.container {
  padding: 0 64px;
  margin: 0 auto;
}

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 2em 0;

  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
}

.highcharts-background {
  display: none;
}

.particle-background {
  background: #fafafa;
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
}
</style>
