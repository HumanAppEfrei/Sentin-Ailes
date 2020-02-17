import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';
import { usersCollection } from '@/firebaseConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loginStatus: null,
    loginError: null,
    registerError: null,
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
    setRegisterError(state, payload) {
      state.registerError = payload;
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

    async registerWithEmailandPassword({ commit }, { email, password, additionalData }) {
      try {
        // First perform authentication
        const authResponse = await firebase.auth().createUserWithEmailAndPassword(email, password);

        commit('setAuthUser', authResponse.user);
        commit('setLoginStatus', 'success');
        commit('setRegisterError', null);

        // Then, create Firestore record with additional data
        try {
          usersCollection.doc(authResponse.user.uid).set(additionalData);
        } catch (err) {
          commit('setRegisterError', err.message);
        }
      } catch (err) {
        commit('setRegisterError', err.message);
      }
    },
  },
  modules: {},
});
