<template>
  <div class="home">
    <router-link to="/login">
      <v-btn color="primary">
        Go to login page
      </v-btn>
    </router-link>

    <v-container v-if="user">
      <v-card>
        <v-card-title>Connected User</v-card-title>
        <v-card-subtitle>{{ user.auth.email }}</v-card-subtitle>
        <v-card-text>
          <v-btn color="primary" @click="logoutUser">
            Logout
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {},
  computed: {
    ...mapState([
      'user',
    ]),
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
