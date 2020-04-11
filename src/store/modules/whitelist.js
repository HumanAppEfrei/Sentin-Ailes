/* eslint-disable no-shadow */

import { whitelistCollection } from '@/firebaseConfig';

const state = {
  whitelistStatus: { status: 'not found', type: 'none' },
  whitelistError: null,
};

const getters = {
  getWhitelistStatus(state) {
    return state.whitelistStatus;
  },
};

const mutations = {
  lookingForEmailInWhitelist(state) {
    state.whitelistStatus = { status: 'pending', type: 'none' };
  },
  userFound(state, userType) {
    state.whitelistStatus = { status: 'found', type: userType };
  },
  userNotFound(state) {
    state.whitelistStatus = { status: 'not found', type: 'error' };
  },
  errorWhileCheckingDatabase(state, message) {
    state.whitelistStatus = message;
  },
};

const actions = {
  async checkEmailInWhitelist({ commit }, { email }) {
    commit('lookingForEmailInWhitelist');
    try {
      // fetching the database for the email
      const dbResponse = await whitelistCollection.where('email', '==', email).get();

      // checking if database response is empty
      if (!dbResponse.empty) {
        commit('userFound', dbResponse.docs[0].data().userType);
      } else {
        commit('userNotFound');
      }
    } catch (err) {
      commit('errorWhileCheckingDatabase', err.message);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
