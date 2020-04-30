<template>
  <v-container class="fill-height">
      <v-row justify="center">
          <v-col cols="12" sm="6">
            <MenuTile color="calendar" icon="event" text="Ajouter un évènement" link="/calendar/event-editor/new"/>
          </v-col>

          <v-col cols="12" sm="6">
            <MenuTile color="calendar" icon="event_note" text="Mes évènements programmés" link="/calendar/my-events"/>
          </v-col>

          <v-col cols="12" sm="6">
            <MenuTile color="calendar" icon="date_range" text="Demandes d'évènement" link="/calendar/event-requests" notif=""/>
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
