/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/views/Register.vue';
// import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import EventsList from '../views/EventsList.vue';
import ContactInfo from '../views/ContactInfo.vue';
import WhitelistView from '../views/Whitelist.vue';
import Hub from '../views/Hub.vue';
import CalendarHub from '../views/CalendarHub.vue';
import MessagesHub from '../views/MessagesHub.vue';
import WriteNewMessage from '../views/WriteNewMessage.vue';

import store from '../store';

Vue.use(VueRouter);

function requiresAdminOrAbove(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'admin' || userRole === 'superAdmin') next();
  else next('/');
}

const routes = [
  {
    path: '/',
    name: 'hub',
    component: Hub,
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
    beforeEnter: requiresAdminOrAbove,
  },
  {
    path: '/calendar',
    name: 'calendar-hub',
    component: CalendarHub,
  },
  {
    path: '/calendar/my-events',
    name: 'my-events',
    component: EventsList,
  },
  {
    path: '/messages',
    name: 'messages-hub',
    component: MessagesHub,
  },
  {
    path: '/messages/new-message',
    name: 'new-message',
    component: WriteNewMessage,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  // Global check if user trys to access app without logged in
  console.log(store.getters);
  if (to.path !== '/login' && to.path !== '/register') {
    if (!store.getters['auth/isLoggedIn']) next('/login');
  }
  next();
});

export default router;
