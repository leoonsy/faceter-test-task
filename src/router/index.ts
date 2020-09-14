import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: 'planets'
  },
  {
    path: '/planets',
    name: 'planets',
    component: () =>
      import(/* webpackChunkName: "planets" */ '@/views/Planets.vue'),
    meta: {
      layout: MainLayout
    },
    beforeEnter: (to: Route, from: Route, next: any) => {
      const page = to.query.page;
      if (page && !(typeof page === 'string' && /^\d+$/.test(page))) {
        next({ name: 'error', replace: true });
      } else next();
    }
  },
  {
    path: '/planets/:id',
    name: 'planet',
    component: () =>
      import(/* webpackChunkName: "planet" */ '@/views/Planet.vue'),
    meta: {
      layout: MainLayout
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () =>
      import(/* webpackChunkName: "statistics" */ '@/views/Statistics.vue'),
    meta: {
      layout: MainLayout
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () =>
      import(/* webpackChunkName: "error" */ '@/views/Error.vue'),
    meta: {
      layout: MainLayout
    }
  },
  {
    path: '*',
    redirect: { name: 'error' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((_to, _from, next) => {
  store.commit('setRouteLoading', true);
  next();
});

router.afterEach(() => {
  store.commit('setRouteLoading', false);
});

export default router;
