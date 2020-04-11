<template>
  <v-app-bar color="green darken-4">
    <v-app-bar-nav-icon v-if="this.$route.name !== 'hub'">
      <v-icon class="white--text" v-on:click="back">arrow_back</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">Sentin'Ailes</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn class="white--text" icon @click="logoutUser">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Appbar',
  methods: {
    back() {
      this.$router.back();
    },
    logoutUser() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
