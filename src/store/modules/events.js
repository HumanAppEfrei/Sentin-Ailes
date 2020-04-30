/* eslint-disable no-shadow */
import { eventCollection } from '@/firebaseConfig';

const state = {
  status: 'None',
  events: [],
};

const getters = {
  getStatus(state) {
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

  errorSendindEvent(state) {
    state.status = 'error';
  },
};

const actions = {
  async fetchAllEventsForUser({ commit }, { uid }) {
    commit('updatingEvents');

    const { docs: eventDocs } = await eventCollection
      .where('concerned', 'array-contains', uid).get();

    const events = eventDocs.map(event => ({ id: event.id, ...(event.data()) }));
    commit('eventsFeched', events);
  },

  async addEvent({ commit }, event) {
    commit('updatingEvents');

    try {
      await eventCollection.add(event);
      commit('newEventSent');
    } catch (e) {
      commit('errorSendindEvent');
    }
  },

  // async modifyEvent({ commit }, event) {
  //   commit('updatingEvents');
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
