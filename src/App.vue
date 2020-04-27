<template>
  <v-app id="app">
    <div id="nav">
      <Appbar/>
    </div>
    <router-view id="app-content" />
  </v-app>
</template>

<script>
import Appbar from '@/components/Appbar.vue';

export default {
  components: {
    Appbar,
  },

  beforeCreate() {
    // Attempt to log user (if authentication is still valid, he will be authenticated)
    this.$store.dispatch('auth/attemptRelogin');
  },
};

</script>

<style lang="scss">
#app {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
}

#app-content {
  overflow-y: scroll;
}
</style>
