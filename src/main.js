import Vue from 'vue';
import VueParticles from 'vue-particles';
import App from './App.vue';
import router from './router';
import store from './store';
import './directives/parallax';

Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
