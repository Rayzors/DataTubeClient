<template>
  <div class="portail">
    <div class="portail__caption" v-parallax="0.2">
      <LogoSVG :ratio="2" />
      <div class="portail__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </div>
    </div>
    <div class="portail__image" v-parallax="0.2">
      <img :src="image" alt="image avec des gens qui font de la dataviz">
    </div>
    <router-link to="/home">
      <div class="portail__btn">
        Maintenez
      </div>
    </router-link>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import image from '@/assets/portail-bg.svg'
export default {
  data() {
    return {
      image,
    }
  },
  components: {
    LogoSVG,
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts/geomanist.css';
$main-red: #ee5355;
.portail {

  * {
    box-sizing: border-box;
  }
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;

  &__caption {
    display: block;

    font-family: 'geomanistregular', Arial, sans-serif;
    font-size: 24px;
    color: #7a7089;
  }

  &__image {
    img {
      display: block;
    }
  }

  &__btn {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    padding: 30px;
    border: solid 2px $main-red;

    background-color: $main-red;

    color: #FFF;

    transition: background-color 0.3s, border-width 0.3s;

    &:hover {
      background-color: #FFF;
      color: $main-red;
    }
  }
}

</style>