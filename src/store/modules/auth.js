/* eslint-disable no-shadow */

import { auth as fireAuth } from 'firebase';

import router from '@/router/index';

import { usersCollection } from '@/firebaseConfig';

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
};

const actions = {
  async loginWithEmailAndPassword({ commit, state }, { email, password }) {
    if (state.loggedIn) { // Perform authentication only if user is not already logged in
      commit('loginSuccess');
      return;
    }

    commit('loginPending');

    try {
      await fireAuth().signInWithEmailAndPassword(email, password);

      // Gather user token (to get custom claims for role-based interface)
      const token = await fireAuth().currentUser.getIdTokenResult();

      const userRole = token.claims.role;
      commit('loginSuccess', userRole);
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
    } catch (err) {
      console.error(err);
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
