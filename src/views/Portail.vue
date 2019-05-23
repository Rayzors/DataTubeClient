<template>
  <div class="portail">
    <div class="portail__caption" v-parallax="0.2"  v-if="index === 0">
      <LogoSVG :ratio="2"/>
      <div class="portail__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
    </div>
    <!-- <div class="portail__image" v-parallax="0.2">
      <img :src="image" alt="image avec des gens qui font de la dataviz">
    </div> -->
    <step1 v-if="index === 1"/>
    <step2 v-if="index === 2"/>
    <div>
      <button
        @click="nextStep"
        class="portail__btn-next"
      >Suivant</button>
      <!-- <router-link
        @click="nextStep"
        class="portail__btn-next"
        :to="`/home/${slugifyName}`"
      >Retour</router-link> -->
      <button
        v-if="index >= 1"
        @click="prevStep"
        class="portail__btn-prev"
      >Retour</button>
    </div>
  </div>
</template>

<script>
import LogoSVG from '@/components/LogoSVG.vue';
import image from '@/assets/portail-bg.svg';
import Step1 from '@/components/Step1.vue';
import Step2 from '@/components/Step2.vue';

export default {
  data() {
    return {
      index: 0,
      image,
    };
  },
  components: {
    LogoSVG,
    Step1,
    Step2,
  },
  methods: {
    nextStep() {
      this.index++
    }, 
    prevStep() {
      this.index--
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/fonts/geomanist.css";
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:600");
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

    font-family: "geomanistregular", Arial, sans-serif;
    font-size: 24px;
    color: #7a7089;
  }

  &__image {
    img  {
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
     text {
        font-family: "Josefin Sans", sans-serif;
      }
    &-next {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      border: solid 2px $main-red;

      padding: 10px;
      font-size: 26px;
      background-color: $main-red; 
      color: #fff;
      transition: fill 3s;
      text-transform: uppercase;
      outline: none;
 
    }
    &-prev {
      position: absolute;
      left: 12%;
      top: 35%;

      cursor: pointer;

      background-color: transparent;
      border: none;
      text-transform: uppercase;
      outline: none;

      
      &::before{
        content: url("../assets/arrow_right.png")
      }
    }
  }
}
</style>
