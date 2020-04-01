import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
