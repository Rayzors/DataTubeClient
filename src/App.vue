<template>
  <div id="app">
    <vue-particles
      v-parallax="-0.5"
      color="#dedede"
      :hoverEffect="false"
      :clickEffect="false"
      class="particle-background"
    />
    <div class="topbar">
      <div class="container">
        <div class="logo">
          <LogoSVG />
        </div>
        <SelectBox :options="countries"/>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import SelectBox from '@/components/SelectBox.vue';

export default {
  components: { SelectBox, LogoSVG },
  data() {
    return {
      countries: [
        {
          label: 'France',
          value: 'FR',
        },
        {
          label: 'USA',
          value: 'US',
        },
      ],
    };
  },
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display');
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans');

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: 'Josefin Sans', sans-serif;
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

  .select {
    margin-left: 24px;
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
