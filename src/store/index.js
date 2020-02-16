import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loginStatus: null,
    loginError: null,
  },
  getters: {
    userRecord(state) {
      return state.user === null ? null : state.user.record;
    },
    authUser(state) {
      return state.user === null ? null : state.user.auth;
    },
  },
  mutations: {
    setAuthUser(state, payload) {
      state.user.auth = payload;
    },
    removeAuthUser(state) {
      state.user.auth = null;
    },
    setUserRecord(state, payload) {
      state.user.record = payload;
    },
    removeUserRecord(state) {
      state.user.record = null;
    },
    setLoginStatus(state, payload) {
      state.loginStatus = payload;
    },
    setLoginError(state, payload) {
      state.loginError = payload;
    },
  },
  actions: {
    async loginWithEmailAndPassword({ commit }, { email, password }) {
      try {
        // Attempt login
        const authResponse = await firebase.auth().signInWithEmailAndPassword(email, password);

        // Update state accordingly to login response from firebase auth
        commit('setAuthUser', authResponse.user);
        commit('setLoginStatus', 'success');
        commit('setLoginError', null);
      } catch (err) {
        // In case of an error
        // Update state accordingly to response from firebase auth
        commit('setLoginStatus', 'failure');
        commit('setLoginError', err.message);
      }
    },
  },
  modules: {},
});
