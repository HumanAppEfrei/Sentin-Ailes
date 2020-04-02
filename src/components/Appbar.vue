<template>
  <v-app-bar color="green darken-4">
    <v-app-bar-nav-icon v-if="this.$route.name !== 'home'">
      <v-icon v-on:click="back">arrow_back</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="white--text">Sentin'Ailes</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Appbar',
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
