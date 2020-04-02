<template>
  <v-app id="app">
    <div id="nav">
      <Appbar/>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import Appbar from '@/components/Appbar.vue';

export default {
  components: {
    Appbar,
  },
};

</script>

<style lang="scss">
</style>
