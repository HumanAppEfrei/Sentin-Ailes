<template>
  <v-app>
      <Appbar/>
      <v-content>
        <router-view/>
      </v-content>
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
