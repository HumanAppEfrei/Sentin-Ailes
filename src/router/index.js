import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ContactInfo from '../views/ContactInfo.vue';

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
    path: '/contact-info',
    name: 'contact-info',
    component: ContactInfo,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
