<template>
  <v-container fluid>
      <v-row justify="center">
          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="pink" icon="create" text="Ecrire un nouveau message" link="/messages/new-message"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="pink" icon="drafts" text="Anciens messages" link="/"/>
          </v-col>

          <v-col cols="12" lg="4" sm="6">
            <MenuTile color="pink" icon="mail" text="Nouveaux messages reçus" link="/" notif=""/>
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
