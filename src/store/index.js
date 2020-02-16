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
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
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
        commit('setUser', authResponse.user);
        commit('setLoginStatus', 'success');
        commit('setLoginError', null);
      } catch (err) { // In case of an error
        // Update state accordingly to response from firebase auth
        commit('setLoginStatus', 'failure');
        commit('setLoginError', err.message);
      }
    },
  },
  modules: {
  },
});
