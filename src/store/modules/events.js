/* eslint-disable no-shadow */
import { eventCollection } from '@/firebaseConfig';

const state = {
  status: 'None',
  events: [],
};

const getters = {
  isUpdating(state) {
    return state.status;
  },

  getEvents(state) {
    return state.events;
  },
};

const mutations = {
  updatingEvents(state) {
    state.status = 'updating';
  },

  eventsFeched(state, payload) {
    state.events = payload;
    state.status = 'success';
  },

  newEventSent(state) {
    state.status = 'sent';
  },
};

const actions = {
  async fetchAllEventsForUser({ commit }, { uid }) {
    commit('updatingEvents');

    const { docs: eventDocs } = await eventCollection
      .where('concerned', 'array-contains', uid).get();

    const events = eventDocs.map(_ => _.data());
    commit('eventsFeched', events);
  },

  async addEvent({ commit, dispatch }, { event }) {
    commit('updatingEvents');

    await eventCollection.add(event);
    commit('newEventSent');
    dispatch('events/fetchAllEventsForUser');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
