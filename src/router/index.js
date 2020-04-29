/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Register from '@/views/Register.vue';
// import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import secureLS from '@/storage';
import { analytics } from '@/firebaseConfig';
import EventsList from '../views/EventsList.vue';
import EventEditor from '../views/EventEditor.vue';
import EventRequest from '../views/EventRequest.vue';
import ContactInfo from '../views/ContactInfo.vue';
import WhitelistView from '../views/Whitelist.vue';
import Hub from '../views/Hub.vue';
import CalendarHub from '../views/CalendarHub.vue';
import Notes from '../views/Notes.vue';
import AdminPanel from '../views/AdminPanel.vue';
import LinkUsers from '../views/LinkUsers.vue';
import ExercisesHub from '../views/ExercisesHub.vue';

import store from '../store';


Vue.use(VueRouter);

// eslint-disable-next-line no-unused-vars
function requiresAuthentication(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'intervenant', 'admin', 'superAdmin'].includes(userRole)) next();
  else next('/login');
}

// eslint-disable-next-line no-unused-vars
function requiresBeneficiaire(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'beneficiaire') next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresIntervenant(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'intervenant') next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'admin') next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresSuperAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (userRole === 'superAdmin') next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresBeneficiaireOrIntervenant(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'intervenant'].includes(userRole)) next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresIntervenantOrAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['intervenant', 'admin', 'superAdmin'].includes(userRole)) next();
  else next(false);
}

// eslint-disable-next-line no-unused-vars
function requiresBeneficiaireOrAdmin(to, from, next) {
  const userRole = store.getters['auth/userRole'];
  if (['beneficiaire', 'admin', 'superAdmin'].includes(userRole)) next();
  else next(false);
}

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
    path: '/notes',
    name: 'notes',
    component: Notes,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    beforeEnter: requiresAdminOrAbove,
    children: [
      {
        path: 'whitelist',
        component: WhitelistView,
      },
      {
        path: 'link-users',
        component: LinkUsers,
      },
      {
        path: '',
        redirect: 'whitelist',
      },
    ],
  },
  {
    path: '/calendar/event-editor/:id',
    name: 'event editor',
    component: EventEditor,
  },
  {
    path: '/calendar/event-requests',
    name: 'event requests',
    component: EventRequest,
  },
  {
    path: '/exercises',
    name: 'exercises-hub',
    component: ExercisesHub,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  // Global check if user trys to access app without logged in
  if (to.path !== '/login' && to.path !== '/register') {
    if (!store.getters['auth/isLoggedIn']) next('/login');
  }
  next();
});

// Persist displayed route after each route change
router.afterEach((to) => {
  if (to.name) {
    analytics().setCurrentScreen(to.name);
  }
  secureLS.set('current-route', to);
});

export default router;
