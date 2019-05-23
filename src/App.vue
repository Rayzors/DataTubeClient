<template>
  <div id="app">
    <vue-particles
      v-parallax="-0.5"
      color="#dedede"
      :hoverEffect="false"
      :clickEffect="false"
      class="particle-background"
      v-if="false"
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
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import SelectBoxContainer from '@/components/SelectBoxContainer.vue';

export default {
  components: { SelectBoxContainer, LogoSVG },
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
      categories: [
        {
          id: 1,
          emoji: '🎤',
          name: 'Musique',
          averageData: [38.6593, 28, 40, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 667 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 2,
          emoji: '⚽️',
          name: 'Sport',
          averageData: [18, 28, 40, 10],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 500 000',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 3,
          emoji: '💁🏻‍♀️',
          name: 'Makeup',
          averageData: [50, 28, 20, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '1 000 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 4,
          emoji: '📰',
          name: 'Politique',
          averageData: [50, 30, 10, 45],
          averages: [
            {
              title: 'Nombre de vues',
              value: '667 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
        {
          id: 5,
          emoji: '🎮',
          name: 'Jeux vidéo',
          averageData: [10, 20, 30, 40],
          averages: [
            {
              title: 'Nombre de vues',
              value: '367 093',
              important: true,
            },
            {
              title: 'Durée',
              value: '3 minutes',
              important: false,
            },
            {
              title: 'Meilleur jour de publication',
              value: 'Lundi',
              important: false,
            },
            {
              title: 'Meilleur moment de publication',
              value: 'Après-midi (15h30)',
              important: false,
            },
            {
              title: 'Likes',
              value: '61%',
              important: false,
            },
            {
              title: 'Dislikes',
              value: '39%',
              important: false,
            },
          ],
        },
      ],
      subscribersRanges: [
        {
          label: '0 - 1000 abonnés',
          value: '1',
        },
        {
          label: '1000 - 10 000 abonnés',
          value: '2',
        },
      ],
      hideParticles: true,
    };
  },
  methods: {},
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
