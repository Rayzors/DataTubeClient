import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Portail from './views/Portail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'portail',
      component: Portail,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});
