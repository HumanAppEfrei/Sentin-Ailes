<template>
  <v-container fluid>
      <v-row justify="center">
          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="orange" icon="person" text="Informations personnelles" link="/contact-info"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="blue" icon="event" text="Calendrier" link="/"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="pink" icon="mail" text="Messages" link="/"/>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import MenuTile from '@/components/MenuTile.vue';

export default {
  components: {
    MenuTile,
  },
};
</script>

<style>

</style>