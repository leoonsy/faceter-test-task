import Vue from 'vue';
import VueRouter from 'vue-router';
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'planets',
        component: () => import(/* webpackChunkName: "planets" */ '@/views/Planets.vue'),
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "statistics" */ '@/views/Statistics.vue'),
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/error',
        name: 'error',
        component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue'),
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '*',
        name: '404',
        meta: {
            layout: EmptyLayout        
        },
        redirect: 'error'
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    store.commit('setLoading', true);
    next();
});

router.afterEach((to, from) => {
    store.commit('setLoading', false);
});

export default router;
