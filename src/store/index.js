import Vue from 'vue';
import Vuex from 'vuex';

import router from '@/router';

import firebase from 'firebase';
import { usersCollection, whitelistCollection } from '@/firebaseConfig.js';

import authModule from './modules/auth';
import whitelistModule from './modules/whitelist';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loginStatus: null,
    loginError: null,
    registerError: null,
    whitelistStatus: { status: 'not found', type: 'none' },
    whitelistError: null,
  },
  getters: {
    userRecord(state) {
      return state.user === null ? null : state.user.record;
    },
    authUser(state) {
      return state.user === null ? null : state.user.auth;
    },
    getWhitelistStatus(state) {
      return state.whitelistStatus;
    },
  },
  mutations: {
    setAuthUser(state, payload) {
      if (state.user === null) {
        state.user = { auth: null, record: null };
      }
      state.user.auth = payload;
    },
    removeAuthUser(state) {
      if (state.user === null) {
        state.user = { auth: null, record: null };
      }
      state.user.auth = null;
    },
    setUserRecord(state, payload) {
      if (state.user === null) {
        state.user = { auth: null, record: null };
      }
      state.user.record = payload;
    },
    removeUserRecord(state) {
      if (state.user === null) {
        state.user = { auth: null, record: null };
      }
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
    setWhitelistStatus(state, payload) {
      state.whitelistStatus = payload;
    },
    setWhitelisError(state, payload) {
      state.whitelistError = payload;
    },
  },
  actions: {
    async checkEmailInWhitelist({ commit }, { email }) {
      // console.log('checking');
      commit('setWhitelistStatus', { status: 'pending', type: 'none' });
      try {
        const dbResponse = await whitelistCollection.where('email', '==', email).get()
          .then(snapshot => snapshot);

        // console.log(dbResponse.docs[0].data().userType);
        if (!dbResponse.empty) {
          commit('setWhitelistStatus', { status: 'found', type: dbResponse.docs[0].data().userType });
        } else {
          commit('setWhitelistStatus', { status: 'not found', type: 'error' });
        }
      } catch (err) {
        commit('setWhitelistError', err.message);
      }
    },

    async loginWithEmailAndPassword({ commit }, { email, password }) {
      try {
        // Attempt login
        const authResponse = await firebase.auth().signInWithEmailAndPassword(email, password);

        // Update state accordingly to login response from firebase auth
        commit('setAuthUser', authResponse.user);
        commit('setLoginStatus', 'success');
        commit('setLoginError', null);

        router.push({ name: 'home' });
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
          usersCollection.doc(authResponse.user.uid).set(additionalData, { merge: true });
        } catch (err) {
          commit('setRegisterError', err.message);
        }
      } catch (err) {
        commit('setRegisterError', err.message);
      }
    },

    async logout({ commit }) {
      try {
        await firebase.auth().signOut();

        commit('setAuthUser', null);
        commit('setUserRecord', null);
        commit('setLoginStatus', null);

        router.push({ name: 'login' });
      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {
    auth: authModule,
    whitelist: whitelistModule,
  },
});
