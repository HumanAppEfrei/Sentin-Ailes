import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './modules/auth';
import whitelistModule from './modules/whitelist';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    whitelist: whitelistModule,
  },
});
