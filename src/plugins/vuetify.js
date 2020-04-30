import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: { iconfont: 'fa' },
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        // main colors of the app
        main: colors.green.darken4,
        calendar: colors.blue.base,
        personalInfo: colors.orange.base,
        notes: colors.pink.base,
        exercise: colors.teal.base,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
