<template>
  <router-link :to="link">
    <v-card min-height=225 dark :color="color" hover>
      <v-card-title class="justify-center">
        <v-icon size="75">{{ icon }}</v-icon>
      </v-card-title>
      <v-card-text class="text-center display-1 font-weight-medium white--text">{{ text }}</v-card-text>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: [
    'color',
    'icon',
    'text',
    'link',
  ],
};
</script>

<style lang="css">
  a {  text-decoration: none;}
</style>
