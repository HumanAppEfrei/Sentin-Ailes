/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */

import { auth as fireAuth } from 'firebase';

import router from '@/router/index';

import { usersCollection, analytics } from '@/firebaseConfig';

const state = {
  loggedIn: false,
  loginStatus: null,
  loginError: null,
  registerStatus: null,
  registerError: null,
  roleClaim: null,
};

const getters = {
  user(state) {
    if (state.loggedIn) { // Ensure user logged in
      return fireAuth().currentUser;
    }
    return null;
  },

  isLoggedIn(state) {
    return state.loggedIn;
  },

  loginStatus(state) {
    return state.loginStatus;
  },

  loginError(state) {
    return state.loginError;
  },

  registerStatus(state) {
    return state.registerStatus;
  },

  registerError(state) {
    return state.registerError;
  },

  isBeneficiaire(state) {
    return state.roleClaim === 'beneficiaire';
  },

  isIntervenant(state) {
    return state.roleClaim === 'intervenant';
  },

  isAdmin(state) {
    return state.roleClaim === 'admin';
  },

  isSuperAdmin(state) {
    return state.roleClaim === 'superAdmin';
  },

  userRole(state) {
    return state.roleClaim;
  },
};

const mutations = {
  loginPending(state) {
    state.loggedIn = false;
    state.loginStatus = 'pending';
    state.loginError = null;
    state.registerStatus = null;
    state.registerError = null;
    state.roleClaim = null;
  },
  registerPending(state) {
    state.loggedIn = false;
    state.registerStatus = 'pending';
    state.registerError = null;
    state.loginStatus = null;
    state.loginError = null;
    state.roleClaim = null;
  },
  loginSuccess(state, payload) {
    state.loggedIn = true;
    state.loginStatus = 'success';
    state.loginError = null;
    state.registerStatus = null;
    state.registerError = null;
    state.roleClaim = payload;
  },
  loginFailure(state, payload) {
    state.loggedIn = false;
    state.loginStatus = 'failure';
    state.loginError = payload;
    state.registerStatus = null;
    state.registerError = null;
    state.roleClaim = null;
  },
  registerSuccess(state) {
    state.loggedIn = false;
    state.registerStatus = 'success';
    state.registerError = null;
    state.loginStatus = null;
    state.loginError = null;
    state.roleClaim = null;
  },
  registerFailure(state, payload) {
    state.loggedIn = false;
    state.registerStatus = 'failure';
    state.registerError = payload;
    state.loginStatus = null;
    state.loginError = null;
    state.roleClaim = null;
  },
  logout(state) {
    state.loggedIn = false;
    state.loginError = null;
    state.loginStatus = null;
    state.registerError = null;
    state.registerStatus = null;
    state.roleClaim = null;
  },
  reLoginSuccess(state, payload) {
    state.loggedIn = true;
    state.loginStatus = 'success';
    state.loginError = null;
    state.registerStatus = null;
    state.registerError = null;
    state.roleClaim = payload;
  },
};

const actions = {
  async loginWithEmailAndPassword({ commit, state }, { email, password }) {
    if (state.loggedIn) { // Perform authentication only if user is not already logged in
      commit('loginSuccess');
      return;
    }

    commit('loginPending');

    try {
      const { user } = await fireAuth().signInWithEmailAndPassword(email, password);

      // Gather user token (to get custom claims for role-based interface)
      const token = await fireAuth().currentUser.getIdTokenResult();

      const userRole = token.claims.role;
      commit('loginSuccess', userRole);

      analytics().setUserId(user.uid);
      analytics().setUserProperties({ user_type: userRole });
      analytics().logEvent('connection');

      // Redirect user to hub page
      router.push({ path: '/' });
    } catch (err) {
      commit('loginFailure', err);
    }
  },

  async registerWithEmailAndPassword({ commit, state }, { email, password, additionalData }) {
    if (state.loggedIn) { // Perform only if user is not already logged in
      commit('registerSuccess');
      return;
    }

    commit('registerPending');

    try {
      analytics().logEvent('registration_attempt');

      const { user } = await fireAuth().createUserWithEmailAndPassword(email, password);

      // Ensure user is logged out
      await fireAuth().signOut();

      // Write additional data to Firestore document of user
      await usersCollection.doc(user.uid).set(additionalData, { merge: true });

      commit('registerSuccess');

      // Redirect user to login page
      router.push({ name: 'login' });
    } catch (err) {
      commit('registerFailure', err);
    }
  },

  async logout({ commit }) {
    try {
      await fireAuth().signOut();
      commit('logout');
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  },

  async attemptRelogin({ commit }) {
    try {
      const user = await fireAuth().currentUser;

      if (user) {
        const { role } = (await user.getIdTokenResult()).claims;
        commit('reLoginSuccess', role); // Update state
        router.push('/'); // Redirect user to /
      } else {
        router.push({ name: 'login' }); // Default redirects to login page
      }
    } catch (err) {
      console.error(err);
      router.push({ name: 'login' }); // Defaults redirect to login page
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
