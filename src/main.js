import Vue from 'vue';
import VueSweetAlert2 from 'vue-sweetalert2';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import { firestorePlugin } from 'vuefire';

import * as fb from './firebaseConfig';


let app;

fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueSweetAlert2);
