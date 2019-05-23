import Vue from 'vue';
import Router from 'vue-router';
import Home from './layouts/Home.vue';
import Portail from './views/Portail.vue';
import CategoryAverage from './views/CategoryAverage.vue';
import Youtubers from './views/Youtubers.vue';

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
      children: [
        {
          path: '/category-average',
          name: 'categoryAverage',
          component: CategoryAverage,
        },
        {
          path: '/youtubers',
          name: 'youtubers',
          component: Youtubers,
        },
      ]
    },
  ],
});
