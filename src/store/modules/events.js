/* eslint-disable no-shadow */
import { eventCollection, Timestamp } from '@/firebaseConfig';

const state = {
  updating: false,
  events: [],
};

const getters = {
  isUpdating(state) {
    return state.updating;
  },
};

const mutations = {
  fetchingEvents(state) {
    state.updating = true;
  },
};

const actions = {
  async fetchAllEventForUser({ commit }, { uid }) {
    commit('fetchingEvents');

    const userEvents = await eventCollection.where('with', 'array-contains', uid).get();
    console.log(userEvents);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
