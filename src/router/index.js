import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import EventsList from '../views/EventsList.vue';
import ContactInfo from '../views/ContactInfo.vue';
import WhitelistView from '../views/Whitelist.vue';


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
  {
    path: '/contact-info',
    name: 'contact-info',
    component: ContactInfo,
  },
  {
    path: '/whitelist',
    name: 'whitelist',
    component: WhitelistView,
  },
  {
    path: '/events',
    name: 'events',
    component: EventsList,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
