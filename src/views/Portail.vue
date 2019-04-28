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
    <svg class="portail__link" width="424px" height="393px" viewBox="0 0 424 393" >
      <g class="portail__btn" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" x="10" y="20">
        <router-link to="/home">
          <g id="Homepage" transform="translate(-382, -378)" fill="#EE5355">
            <path d="M601.59238,772.334192 C651.214169,772.334192 683.480778,730.104598 729.813504,694.506303 C782.005097,654.40653 807.385604,645.424244 807.385604,581.269504 C807.385604,540.369726 778.679062,521.017911 753.068092,479.238968 C702.842834,397.306963 661.429396,380.661357 591.546088,380.661357 C542.432601,380.661357 541.28582,430.936492 503.628281,478.373737 C460.38011,532.853507 384.385604,516.531366 384.385604,581.269504 C384.385604,648.62958 483.866693,673.872139 517.856338,694.506303 C544.977173,710.970603 554.763327,772.334192 601.59238,772.334192 Z" id="Oval" transform="translate(595.885604, 576.497775) rotate(1.000000) translate(-595.885604, -576.497775) "/>
          </g>
          <text class="portail__hold" x="10" y="20" font-size="26px" fill="#fff">Maintenez</text>
        </router-link>
      </g>  
    </svg>
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
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:600');
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

  &__link {
    position: absolute;
    bottom: -18%; // a animer
    right: -1%; // a animer
    // passer la hauteur et la largeur a 100% au maintiens
  }

  &__hold {
    position: absolute;
    
    font-size: 26px;
    transform: rotate(6deg) translate(39%, 31%);
    font-weight: bold;
  }

  &__btn {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    border: solid 2px $main-red;

    fill: $main-red;

    color: #FFF;
    transition: fill 3s;

    &:hover {
      g {
        fill: #FFF;
        stroke: $main-red;
        stroke-width: 6px;
      }
      .portail__hold {
        fill: $main-red;
      }
    }

    text {
      font-family: 'Josefin Sans', sans-serif;
    } 
  }
}

</style>