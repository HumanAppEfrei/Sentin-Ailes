/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import authModule from './modules/auth';
import whitelistModule from './modules/whitelist';
import notesModule from './modules/notes';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    auth: authModule,
    whitelist: whitelistModule,
    notes: notesModule,
  },
});
