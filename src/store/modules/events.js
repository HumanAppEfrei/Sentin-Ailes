/* eslint-disable no-shadow */
import { eventCollection } from '@/firebaseConfig';

const state = {
  updating: false,
  events: [],
};

const getters = {
  isUpdating(state) {
    return state.updating;
  },

  getEvents(state) {
    return state.events;
  },
};

const mutations = {
  fetchingEvents(state) {
    state.updating = true;
  },

  eventsFeched(state, payload) {
    state.events = payload;
  },
};

const actions = {
  async fetchAllEventsForUser({ commit }, { uid }) {
    commit('fetchingEvents');

    const { docs: eventDocs } = await eventCollection
      .where('concerned', 'array-contains', uid).get();

    const events = eventDocs.map(_ => _.data());
    commit('eventsFeched', events);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
